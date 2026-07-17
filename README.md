# prerensics-ai

Static landing page for Prerensics, built with Next.js and deployed as a static
site to AWS (S3 + CloudFront).

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
```

`next.config.ts` sets `output: "export"`, so this produces a fully static site in
`out/` — plain HTML/CSS/JS, no Node.js server required at runtime.

## Hosting on AWS: S3 + CloudFront

This is the recommended setup for a single static site on AWS: cheap
(typically $1-5/month for low traffic), no servers to patch or scale, and
CloudFront gives you HTTPS, a CDN, and a custom domain out of the box.

**Why not alternatives:**

- **AWS Amplify Hosting** — simpler initial setup (built-in CI/CD), but less
  control and a bit more expensive; under the hood it's the same S3 +
  CloudFront primitives with a managed layer on top.
- **EC2 / Elastic Beanstalk** — overkill for static files; you'd be paying for
  and patching a server that just serves HTML.

### Architecture

```
GitHub push to master
  -> GitHub Actions: npm ci && npm run build
  -> assume AWS IAM role via OIDC (no stored AWS keys)
  -> aws s3 sync ./out -> S3 bucket
  -> aws cloudfront create-invalidation

Visitor request
  -> Route 53 (ALIAS record, existing hosted zone)
  -> CloudFront (HTTPS via ACM cert)
  -> Origin Access Control -> S3 bucket (private)
```

### One-time AWS setup

Replace `YOUR_DOMAIN`, `YOUR_BUCKET_NAME`, `YOUR_AWS_ACCOUNT_ID`, and
`YOUR_GITHUB_ORG/YOUR_GITHUB_REPO` below with real values. Run these with the
AWS CLI configured against the target account.

**1. Create the S3 bucket (private — no public access)**

```bash
aws s3api create-bucket \
  --bucket YOUR_BUCKET_NAME \
  --region us-east-1

aws s3api put-public-access-block \
  --bucket YOUR_BUCKET_NAME \
  --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

**2. Request an ACM certificate (must be in `us-east-1` for CloudFront)**

```bash
aws acm request-certificate \
  --domain-name YOUR_DOMAIN \
  --subject-alternative-names "www.YOUR_DOMAIN" \
  --validation-method DNS \
  --region us-east-1
```

Add the CNAME validation record ACM gives you to the existing Route 53 hosted
zone for `YOUR_DOMAIN`, then wait for the certificate status to become
`ISSUED`.

**3. Create a CloudFront distribution**

- Origin: the S3 bucket, using **Origin Access Control (OAC)** — not a public
  bucket website endpoint.
- Alternate domain names (CNAMEs): `YOUR_DOMAIN`, `www.YOUR_DOMAIN`.
- Custom SSL certificate: the ACM certificate from step 2.
- Default root object: `index.html`.
- Custom error responses: map 403/404 to `/404.html` (or `/index.html` for a
  single-page fallback) with a `200` response so client-side routing/direct
  links to unbuilt paths don't show CloudFront's raw error page.

After creating the distribution, apply the generated bucket policy that grants
`cloudfront.amazonaws.com` read access scoped to that distribution (the
console's "Copy policy" button on the OAC setup screen gives you this).

**4. Point DNS at CloudFront (existing Route 53 hosted zone)**

```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id YOUR_HOSTED_ZONE_ID \
  --change-batch '{
    "Changes": [{
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "YOUR_DOMAIN",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z2FDTNDATAQYW2",
          "DNSName": "YOUR_CLOUDFRONT_DOMAIN.cloudfront.net",
          "EvaluateTargetHealth": false
        }
      }
    }]
  }'
```

(`Z2FDTNDATAQYW2` is CloudFront's fixed alias hosted zone ID — the same for
every CloudFront distribution.) Repeat for `www.YOUR_DOMAIN` if you're using
the `www` subdomain too.

**5. Create the IAM OIDC role for GitHub Actions**

One-time setup of the GitHub OIDC identity provider in the AWS account (skip
if it already exists in this account):

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

Create a role trusted by that provider, scoped to this repo's `master` branch:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Federated": "arn:aws:iam::YOUR_AWS_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com" },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
      "StringLike": { "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_ORG/YOUR_GITHUB_REPO:ref:refs/heads/master" }
    }
  }]
}
```

Attach a policy to the role scoped to only what the deploy needs:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME",
        "arn:aws:s3:::YOUR_BUCKET_NAME/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::YOUR_AWS_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
    }
  ]
}
```

**6. Configure the GitHub repo**

In the repo's Settings → Secrets and variables → Actions:

- Secret `AWS_DEPLOY_ROLE_ARN` — ARN of the IAM role from step 5.
- Variable `AWS_REGION` — e.g. `us-east-1`.
- Variable `AWS_S3_BUCKET` — the bucket name from step 1.
- Variable `AWS_CLOUDFRONT_DISTRIBUTION_ID` — the distribution ID from step 3.

### Ongoing deploys

Every push to `master` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
build the static site, sync it to S3, and invalidate the CloudFront cache so
changes go live within a minute or two. No manual deploy steps needed.

To deploy manually instead:

```bash
npm run build
aws s3 sync ./out s3://YOUR_BUCKET_NAME --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```
