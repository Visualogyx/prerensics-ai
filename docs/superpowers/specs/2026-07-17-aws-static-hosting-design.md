# AWS Static Hosting for prerensics-ai

## Goal

Host the Next.js landing page (`prerensics-ai`) as a static site on AWS, on a custom
domain the team already owns and manages in Route 53, with automated deploys from
GitHub on every push to `master`.

## Context

- The app (`src/app/page.tsx`, `layout.tsx`) has no API routes, server actions, or
  other server-only features — it's a pure static landing page. Next.js 16 supports
  static export (`output: 'export'`) for exactly this case.
- The domain is already registered and hosted in Route 53 (existing hosted zone).
- Deploys should be automated via GitHub Actions, not manual CLI runs.

## Architecture

```
GitHub push to master
   -> GitHub Actions workflow
        -> npm ci && next build   (produces static files in out/)
        -> assume AWS IAM role via OIDC (no stored AWS keys)
        -> aws s3 sync out/ -> S3 bucket
        -> aws cloudfront create-invalidation

End user request
   -> Route 53 (A/AAAA ALIAS records)
   -> CloudFront distribution (HTTPS via ACM cert, us-east-1)
        -> Origin Access Control -> S3 bucket (private, not public)
```

Components:

- **S3 bucket** — stores the built static output. Bucket is private; all public
  access is blocked. Only CloudFront (via Origin Access Control) can read it.
- **CloudFront distribution** — CDN + TLS termination + caching. Custom domain
  (apex and/or `www`) as alternate domain names (CNAMEs). Redirects/serves
  `index.html` for the root and handles 403/404 by serving Next.js's static
  `404.html`.
- **ACM certificate** — issued in `us-east-1` (CloudFront requirement), validated
  via DNS (CNAME record in the existing Route 53 hosted zone).
- **Route 53** — alias records in the existing hosted zone pointing the domain to
  the CloudFront distribution. No new hosted zone needed.
- **GitHub Actions + OIDC** — a GitHub Actions workflow assumes an AWS IAM role via
  OpenID Connect (`aws-actions/configure-aws-credentials`). No long-lived AWS access
  keys are stored as GitHub secrets. The IAM role is scoped to only:
  `s3:PutObject`/`s3:DeleteObject`/`s3:ListBucket` on the site bucket, and
  `cloudfront:CreateInvalidation` on the distribution.

## Changes in this repo

1. `next.config.ts` — add `output: 'export'` (and `images.unoptimized: true`, since
   the Next.js Image Optimization API needs a server and isn't available in static
   export).
2. `.github/workflows/deploy.yml` — CI workflow: build on push to `master`, sync to
   S3, invalidate CloudFront. Reads bucket name / distribution ID / IAM role ARN
   from repository variables/secrets (not committed).
3. `README.md` — full setup guide: one-time AWS setup (S3, CloudFront, ACM, Route 53,
   IAM OIDC role) via AWS CLI, plus the ongoing deploy flow and local dev
   instructions.

## Out of scope

- Actually provisioning the AWS resources (bucket, distribution, IAM role, DNS
  records) — that's a one-time manual/CLI setup the user runs themselves using the
  README as a guide, since it requires their AWS account and domain access.
- Infrastructure-as-code (Terraform/CDK) — not requested; can be a follow-up if the
  team wants the AWS setup itself version-controlled.

## Testing

- `npm run build` locally must succeed and produce a static `out/` directory with
  no server-only warnings.
