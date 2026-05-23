import SubPageHeader from "@/components/landing/SubPageHeader";
import Footer from "@/components/landing/Footer";
import PageTransition from "@/components/PageTransition";
import {
  Network,
  GitBranch,
  Globe,
  Sparkles,
  Cpu,
  ShieldCheck,
  Boxes,
  ArrowRight,
  Clock,
} from "lucide-react";

const INTEGRATION_CARDS = [
  {
    icon: GitBranch,
    title: "Native gitlawb:// URLs",
    body: "Paste any gitlawb:// link into GitSense and get a complete intelligence brief — no host accounts, no proprietary indexes.",
    accent: "#00E676",
  },
  {
    icon: Cpu,
    title: "AI repository analysis",
    body: "Six dedicated agents scan architecture, dependencies, contributors, security, docs, and ecosystem signals in parallel.",
    accent: "#00C2FF",
  },
  {
    icon: ShieldCheck,
    title: "Decentralized-friendly security",
    body: "CVE matching, secret scanning, and risk scoring designed for the public, peer-to-peer reality of decentralized repos.",
    accent: "#00E676",
  },
  {
    icon: Boxes,
    title: "Ecosystem awareness",
    body: "Track upstream releases, breaking changes, and dependency drift across the wider decentralized stack.",
    accent: "#00C2FF",
  },
];

const ECOSYSTEM_PILLARS = [
  {
    k: "01",
    t: "Repositories without gatekeepers",
    d: "Source code lives on a decentralized network. Anyone can publish, mirror, and verify without trusting a single host.",
  },
  {
    k: "02",
    t: "Intelligence layer on top",
    d: "GitSense adds an AI reasoning layer — turning raw repos into structured, queryable intelligence anyone can act on.",
  },
  {
    k: "03",
    t: "Composable tooling",
    d: "From analyzers to release graphs to security signals — every piece is built to plug into other decentralized tools.",
  },
];

export default function GitlawbPage() {
  return (
    <main data-testid="gitlawb-page" className="relative min-h-screen bg-[#050505] text-white">
      <SubPageHeader active="gitlawb" />
      <PageTransition>
        <GitlawbContent />
      </PageTransition>
      <Footer />
    </main>
  );
}

function GitlawbContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="absolute inset-0 pointer-events-none grid-bg radial-fade opacity-90" />
        <div className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[#00E676]/[0.06] blur-3xl pointer-events-none" />
        <div className="absolute -top-10 left-[-8%] h-[320px] w-[320px] rounded-full bg-[#00C2FF]/[0.05] blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full gs-border bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300 font-mono">
              <Network size={13} className="text-[#00E676]" /> gitlawb integration
            </span>
            <h1 className="font-display mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
              Built for the
              <br />
              <span className="text-[#00E676]">decentralized</span> web of code.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed">
              GitSense is engineered for repositories that don't live on a single host.
              Native Gitlawb compatibility makes peer-to-peer codebases as legible as
              any traditional one — with AI doing the heavy lifting.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/#analyzer"
                data-testid="gitlawb-try-btn"
                className="inline-flex items-center gap-2 rounded-xl bg-[#00E676] text-black px-5 py-3 text-sm font-medium hover:bg-[#00d169] active:scale-[0.98] transition"
              >
                Analyze a Gitlawb repo
                <ArrowRight size={16} />
              </a>
              <a
                href="/docs"
                data-testid="gitlawb-docs-link"
                className="inline-flex items-center gap-2 rounded-xl gs-border bg-white/[0.02] px-5 py-3 text-sm font-medium text-white hover:bg-white/[0.05] transition"
              >
                Read the docs
              </a>
            </div>
          </div>

          {/* Right brand card */}
          <div className="relative">
            <div className="relative aspect-[5/4] w-full rounded-2xl gs-border bg-gradient-to-b from-[#0d0d0d] to-[#070707] overflow-hidden p-6">
              <div className="scan-line" />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-neutral-500">protocol</span>
                <span className="text-[11px] font-mono text-[#00E676] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00E676] pulse-dot" />
                  COMPATIBLE
                </span>
              </div>

              <div className="mt-10 flex flex-col items-start">
                <Globe size={22} className="text-[#00E676]" />
                <div className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                  Gitlawb
                </div>
                <div className="mt-1 font-mono text-xs text-neutral-500">
                  decentralized repository network
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 rounded-xl gs-border bg-black/50 backdrop-blur p-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-2">
                  <span>SAMPLE URL</span>
                  <Sparkles size={11} className="text-[#00E676]" />
                </div>
                <code className="block text-sm font-mono text-neutral-200 truncate">
                  gitlawb://gitsense/repository-demo
                </code>
              </div>

              {/* Decorative nodes */}
              {[
                { top: "18%", right: "12%", c: "#00E676" },
                { top: "30%", right: "30%", c: "#00C2FF" },
                { bottom: "30%", right: "10%", c: "#00E676" },
              ].map((n, i) => (
                <div
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full node-pulse"
                  style={{ top: n.top, right: n.right, bottom: n.bottom, background: n.c }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration cards */}
      <section className="relative py-20 border-t border-white/[0.05]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="inline-flex items-center gap-2 rounded-full gs-border bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300 font-mono">
              <Sparkles size={13} className="text-[#00E676]" /> what you get
            </span>
            <h2 className="font-display mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              A complete intelligence layer for Gitlawb.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {INTEGRATION_CARDS.map((c, i) => (
              <article
                key={c.title}
                data-testid={`gitlawb-card-${i}`}
                className="card-hover relative rounded-2xl gs-border bg-[#0c0c0c] p-6 overflow-hidden"
              >
                <div
                  className="absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-[0.08] blur-2xl"
                  style={{ background: c.accent }}
                />
                <div
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl gs-border bg-black mb-5"
                  style={{ boxShadow: `inset 0 0 0 1px ${c.accent}22` }}
                >
                  <c.icon size={18} style={{ color: c.accent }} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="relative py-20 border-t border-white/[0.05]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 grid lg:grid-cols-[1fr_1.4fr] gap-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full gs-border bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300 font-mono">
              <Globe size={13} className="text-[#00C2FF]" /> ecosystem
            </span>
            <h2 className="font-display mt-5 text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              The decentralized tooling vision.
            </h2>
            <p className="mt-4 text-neutral-400 leading-relaxed">
              GitSense is one node in a larger ecosystem of decentralized developer
              tools. Our goal is to make peer-to-peer codebases first-class — observable,
              auditable, and improvable by anyone.
            </p>
          </div>

          <div className="space-y-3">
            {ECOSYSTEM_PILLARS.map((p) => (
              <div key={p.k} className="rounded-2xl gs-border bg-[#0c0c0c] p-5 sm:p-6 flex gap-4">
                <span className="font-mono text-[11px] text-[#00E676] mt-1">{p.k}</span>
                <div>
                  <div className="font-display text-lg font-medium text-white">{p.t}</div>
                  <p className="mt-1 text-sm text-neutral-400 leading-relaxed">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="relative py-20 border-t border-white/[0.05]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="relative rounded-3xl gs-border bg-[#0a0a0a] overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30 radial-fade" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-[80%] bg-[#00E676]/[0.06] blur-3xl rounded-full" />
            <div className="relative px-6 sm:px-12 py-14 sm:py-16 text-center">
              <div className="inline-flex items-center gap-2 rounded-full gs-border bg-black/40 px-3 py-1.5 text-xs text-neutral-300 font-mono">
                <Clock size={13} className="text-[#00C2FF]" /> roadmap
              </div>
              <h2 className="font-display mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                Full integration coming soon.
              </h2>
              <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
                Webhook subscriptions, network-wide indexing, and a Gitlawb-native CLI
                are on the way. Early access opens with the v1 API release.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="/#analyzer"
                  data-testid="gitlawb-cta-launch"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#00E676] text-black px-5 py-3 text-sm font-medium hover:bg-[#00d169] active:scale-[0.98] transition"
                >
                  Launch the analyzer
                  <ArrowRight size={16} />
                </a>
                <a
                  href="/docs"
                  className="inline-flex items-center gap-2 rounded-xl gs-border bg-white/[0.02] px-5 py-3 text-sm font-medium text-white hover:bg-white/[0.05] transition"
                >
                  Read the docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
