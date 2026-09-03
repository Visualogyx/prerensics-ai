import Link from "next/link";

const BLOG_URL =
  "https://vlx.ai/blog/prerensics-moving-from-containment-to-prevention/";

// TODO: confirm the address that should receive Prerensics platform inquiries.
const CONTACT_EMAIL = "info@vlx.ai";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 hero-gradient" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />

      <div className="relative">
        <Header />
        <Hero />
        <Shift />
        <Principles />
        <KYP />
        <Platform />
        <Consulting />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link href="/" className="flex items-center gap-2.5">
        <Logo />
        <span className="font-semibold tracking-tight text-lg">
          Prerensics<span className="text-[var(--color-accent)]">™</span>
        </span>
      </Link>
      <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--color-text-secondary)]">
        <a href="#methodology" className="hover:text-[var(--color-text)] transition">
          Methodology
        </a>
        <a href="#kyp" className="hover:text-[var(--color-text)] transition">
          KYPit
        </a>
        <a href="#platform" className="hover:text-[var(--color-text)] transition">
          Platform
        </a>
        <a
          href="https://vlx.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-text)] transition"
        >
          VLX
        </a>
      </nav>
      <a
        href={BLOG_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition"
      >
        Read the post →
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 pb-24 md:pt-28 md:pb-36">
      <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/60 px-3 py-1 text-xs text-[var(--color-text-secondary)] backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] glow" />
        A methodology by{" "}
        <a
          href="https://vlx.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition"
        >
          VLX
        </a>
      </div>

      <h1 className="animate-fade-up-delay-1 mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
        From <span className="text-[var(--color-text-tertiary)]">containment</span>
        <br />
        to <span className="text-[var(--color-accent)]">prevention</span>.
      </h1>

      <p className="animate-fade-up-delay-2 mt-8 max-w-2xl text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
        <strong className="text-[var(--color-text)]">Prerensics™</strong> is a
        methodology of validations that mitigates supply chain risk{" "}
        <em className="not-italic text-[var(--color-text)]">before</em>{" "}
        disruptions occur — not after. Forensics asks what went wrong.
        Prerensics ensures it never does.
      </p>

      <div className="animate-fade-up-delay-3 mt-10 flex flex-wrap items-center gap-4">
        <a
          href={BLOG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-accent-dim)] transition glow"
        >
          Read the methodology
          <span aria-hidden>→</span>
        </a>
        <a
          href="#methodology"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] hover:border-[var(--color-accent)] transition"
        >
          Explore the framework
        </a>
      </div>
    </section>
  );
}

function Shift() {
  return (
    <section id="methodology" className="mx-auto max-w-6xl px-6 py-20 border-t border-[var(--color-border)]">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
            The shift
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
            Traditional supply chains investigate disruptions <em className="not-italic text-[var(--color-text-tertiary)]">after</em> they happen.
          </h2>
          <p className="mt-6 text-[var(--color-text-secondary)] leading-relaxed">
            Paper-based systems are slow, error-prone, and manipulable. By the
            time a forensic audit identifies the failure, the cost has already
            been absorbed — in delays, in losses, in eroded trust.
          </p>
          <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed">
            Prerensics inverts the model. It replaces post-event analysis with
            continuous, structural validation — so that risk is identified and
            contained at the point of origin.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Stat label="Reactive" value="Forensics" tone="dim" />
          <Stat label="Preventive" value="Prerensics" tone="accent" />
          <Stat label="Post-event" value="Containment" tone="dim" />
          <Stat label="Pre-event" value="Validation" tone="accent" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "accent" | "dim";
}) {
  const accent = tone === "accent";
  return (
    <div
      className={`rounded-2xl border p-6 ${
        accent
          ? "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/5"
          : "border-[var(--color-border)] bg-[var(--color-bg-card)]/40"
      }`}
    >
      <div
        className={`text-xs font-mono uppercase tracking-widest ${
          accent ? "text-[var(--color-accent)]" : "text-[var(--color-text-tertiary)]"
        }`}
      >
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

const PRINCIPLES = [
  {
    title: "Technology as Structural Advantage",
    body:
      "Replace paper's instability with stability, consistency, and transparency. Standardized processes, enforced compliance, real-time traceability — built into the workflow itself.",
  },
  {
    title: "Incumbent-Friendly Design",
    body:
      "Adapts to existing workflows without disruption. Organizations mirror their current risk frameworks rather than rebuilding around new tooling.",
  },
  {
    title: "Prevention-Focused Paradigm",
    body:
      "Identify and mitigate risk proactively, not after disruption. Every validation is a checkpoint that closes the gap forensics would have opened.",
  },
];

function Principles() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 border-t border-[var(--color-border)]">
      <div className="max-w-2xl">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
          Three foundations
        </div>
        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
          The Prerensics framework.
        </h2>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {PRINCIPLES.map((p, i) => (
          <article
            key={p.title}
            className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/50 p-7 hover:border-[var(--color-border-hover)] transition"
          >
            <div className="text-3xl font-mono text-[var(--color-accent)]/70">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">
              {p.title}
            </h3>
            <p className="mt-3 text-[var(--color-text-secondary)] leading-relaxed text-sm">
              {p.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function KYP() {
  return (
    <section id="kyp" className="mx-auto max-w-6xl px-6 py-20 border-t border-[var(--color-border)]">
      <div className="rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-bg-card)]/40 p-10 md:p-16 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        <div className="relative">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
            Know Your Product
          </div>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight leading-tight max-w-3xl">
            KYPit<span className="text-[var(--color-accent)]">™</span> is the engine behind Prerensics.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Just as KYC reshaped financial trust, <strong className="text-[var(--color-text)]">Know Your Product</strong>{" "}
            gives organizations a verified, real-time understanding of what
            moves through their supply chain — so risk is managed proactively,
            not reconstructed retroactively.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-3xl">
            {["Verify at origin", "Validate at every hop", "Trace in real time"].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/40 px-4 py-3 text-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const CAPABILITIES: {
  title: string;
  body: string;
  fullWidth?: boolean;
}[] = [
  {
    title: "Multifactor authentication with KYPit™",
    body:
      "KYPit™ validates every inspection against five independent signals — image validation, user identity, domain analytics, activity analytics, and IP analytics. Authenticity is established by the relationships between those signals and their metadata, not by any one of them, so a substituted photo or a spoofed location fails against the rest. This is how Prerensics™ verifies data accuracy and detects fraudulent activity from tampering as it happens, instead of discovering it in an audit.",
  },
  {
    title: "Inspections, validations, verifications, and field exams",
    body:
      "Prerensics™ is delivered through VLX software for inspections, validations, verifications, field exams, and supply chain operations. Inspectors capture photos, video, and voice notes with GPS tagging — on mobile, and offline where there is no signal. Data accuracy is verified at the point of capture, in the field, rather than reviewed after the fact.",
  },
  {
    title: "Logic applied to your datasets",
    body:
      "Prerensics™ applies logic to product and supply chain process datasets to ascertain quality, origin, and product integrity. Templates carry conditional logic, scoring and flagging, calculated fields, and repeatable sections, so those criteria are evaluated against data as it is captured. Prerensics™ defines which conditions constitute risk; the VLX platform enforces them on every inspection, every time.",
  },
  {
    title: "Multi-stage authenticity, combined into one report",
    body:
      "Each stage of a supply chain process produces its own authenticity dataset — the evidence captured there, and the KYPit™ validation results that corroborate it. Prerensics™ powers those multi-stage datasets and combines them into a single report, so authenticity is assessed across the whole process rather than one checkpoint at a time.",
  },
  {
    title: "Reports about data captured throughout the supply chain",
    body:
      "The VLX report engine turns data captured across the supply chain — inspection results, flagged exceptions, validation signals, and quality findings — into reports in PDF, Excel, or Word, branded and delivered automatically on completion. One auditable document that can be issued to a buyer, an auditor, or a regulator.",
    fullWidth: true,
  },
];

const DELIVERY = [
  "Enabled on VLX",
  "Browser and mobile",
  "Works offline",
  "Subscription licensed",
  "REST API and integrations",
];

function Platform() {
  return (
    <section
      id="platform"
      className="mx-auto max-w-6xl px-6 py-20 border-t border-[var(--color-border)]"
    >
      <div className="max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
          Delivered as software
        </div>
        <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
          Prerensics<span className="text-[var(--color-accent)]">™</span> is a
          methodology. VLX is how you run it.
        </h2>
        <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
          Prerensics™ is not a separate product. It is the methodology{" "}
          <a
            href="https://vlx.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition"
          >
            VLX
          </a>{" "}
          (Visualogyx, Inc.) built its platform to enforce — and it is delivered
          to customers as software, hosted and operated by VLX. Organizations
          enable Prerensics™ on their VLX workspace, and the platform&apos;s
          evidence capture, authentication, and reporting services are
          configured to run to the Prerensics™ standard. Nothing to install;
          licensed as a subscription.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {CAPABILITIES.map((c, i) => (
          <article
            key={c.title}
            className={`rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/50 p-7 hover:border-[var(--color-border-hover)] transition ${
              c.fullWidth ? "md:col-span-2" : ""
            }`}
          >
            <div className="text-2xl font-mono text-[var(--color-accent)]/70">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">
              {c.title}
            </h3>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {c.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {DELIVERY.map((d) => (
          <span
            key={d}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/60 px-4 py-2 text-xs text-[var(--color-text-secondary)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            {d}
          </span>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Enable%20Prerensics%20on%20VLX`}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-accent-dim)] transition glow"
        >
          Enable Prerensics™ on VLX
          <span aria-hidden>→</span>
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Prerensics%20platform%20walkthrough`}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] hover:border-[var(--color-accent)] transition"
        >
          Book a walkthrough
        </a>
      </div>
    </section>
  );
}

function Consulting() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 border-t border-[var(--color-border)] bg-[var(--color-bg-card)]/40">
      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.95fr] items-start">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
            Consulting Engagements
          </div>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
            PRERENSICS™ helps organizations tailor inspection protocols and controls to meet evolving supply chain regulations.
          </h2>
          <p className="mt-6 text-[var(--color-text-secondary)] leading-relaxed text-lg">
            Under the PRERENSICS™ mark, VLX provides consulting engagements that translate product identity, traceability,
            and quality insights into practical inspection and compliance workflows.
          </p>
          <ul className="mt-8 grid gap-4 text-[var(--color-text-secondary)] text-sm leading-relaxed">
            <li>
              • Tailoring inspection protocols to support regulatory compliance and product authenticity across the supply chain.
            </li>
            <li>
              • Advising on logistics, product identity, and quality control procedures that reduce risk and improve audit readiness.
            </li>
            <li>
              • Designing processes that help clients capture reliable metadata and evidence of inspection, verification, and quality activities.
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/80 p-8">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
            Inspection and Compliance Support
          </div>
          <p className="mt-4 text-[var(--color-text-secondary)] leading-relaxed text-sm">
            PRERENSICS™ consulting engagements are focused on helping clients create and refine inspection protocols,
            controls, and advisory processes that align with supply chain, logistics, product identity, and quality regulations.
          </p>
          <div className="mt-6 space-y-3 text-sm text-[var(--color-text)]">
            <div className="rounded-2xl bg-[var(--color-bg-card)] p-4">
              PRERENSICS™ consulting helps organizations translate product traceability into inspection workflows that are easier to manage and defend.
            </div>
            <div className="rounded-2xl bg-[var(--color-bg-card)] p-4">
              The services described support the development of tailored inspection protocols, quality checks, and compliance documentation.
            </div>
            <div className="rounded-2xl bg-[var(--color-bg-card)] p-4">
              VLX partners with clients to design advisory engagements that keep inspections aligned with regulatory expectations and emerging industry standards.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 text-center">
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
        Stop investigating disruptions.
        <br />
        <span className="text-[var(--color-accent)]">Start preventing them.</span>
      </h2>
      <p className="mt-6 max-w-xl mx-auto text-[var(--color-text-secondary)]">
        Prerensics is a VLX methodology. Read the full piece by Jorge
        Woldenberg, co-founder of Visualogyx.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href={BLOG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-accent-dim)] transition"
        >
          Read on vlx.ai →
        </a>
        <a
          href="https://vlx.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold hover:border-[var(--color-accent)] transition"
        >
          Visit VLX
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-tertiary)]">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span>
            Prerensics<span className="text-[var(--color-accent)]">™</span> · a methodology by{" "}
            <a
              href="https://vlx.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition"
            >
              VLX
            </a>
          </span>
        </div>
        <div className="text-center md:text-right">
          <div>
            Prerensics™ software services are delivered on the VLX platform by
            Visualogyx, Inc.
          </div>
          <div className="mt-1">
            © {new Date().getFullYear()} Visualogyx, Inc.
          </div>
        </div>
      </div>
    </footer>
  );
}

function Logo() {
  return (
    <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/40">
      <span className="h-2.5 w-2.5 rounded-sm bg-[var(--color-accent)] glow" />
    </span>
  );
}
