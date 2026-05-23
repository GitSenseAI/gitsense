import {
  Brain,
  Network,
  ShieldCheck,
  Users,
  FileText,
  Activity,
} from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "AI Repository Analysis",
    desc: "Deep semantic understanding of code structure, patterns, and intent — not just keyword search.",
    accent: "#00E676",
  },
  {
    icon: Network,
    title: "Dependency Mapping",
    desc: "Visualize every package, its blast radius, version drift, and the critical paths in your graph.",
    accent: "#00C2FF",
  },
  {
    icon: ShieldCheck,
    title: "Security Intelligence",
    desc: "Real-time CVE matching, secret scanning, and risk scoring with actionable AI remediations.",
    accent: "#00E676",
  },
  {
    icon: Users,
    title: "Contributor Insights",
    desc: "Bus factor, ownership heatmaps, and review velocity for every module and surface area.",
    accent: "#00C2FF",
  },
  {
    icon: FileText,
    title: "Documentation Detection",
    desc: "Spot stale READMEs, missing API docs, and inconsistent guides — auto-graded by AI reviewers.",
    accent: "#00E676",
  },
  {
    icon: Activity,
    title: "Ecosystem Monitoring",
    desc: "Track upstream releases, breaking changes, and ecosystem signals across your dependency tree.",
    accent: "#00C2FF",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full gs-border bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300 font-mono">
              <Brain size={13} className="text-[#00E676]" /> capabilities
            </span>
            <h2 className="font-display mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Built for developers who need
              <br /> answers, not noise.
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md text-sm sm:text-base">
            Six dedicated AI agents work in parallel — each focused on one
            dimension of repository quality.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              data-testid={`feature-card-${i}`}
              className="card-hover relative rounded-2xl gs-border bg-[#0c0c0c] p-6 overflow-hidden"
            >
              <div
                className="absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-[0.07] blur-2xl"
                style={{ background: f.accent }}
              />
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl gs-border bg-black mb-5"
                style={{ boxShadow: `inset 0 0 0 1px ${f.accent}22` }}
              >
                <f.icon size={18} style={{ color: f.accent }} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{f.desc}</p>
              <div className="mt-6 flex items-center gap-1 text-[11px] font-mono text-neutral-500">
                <span className="h-1 w-1 rounded-full" style={{ background: f.accent }} />
                <span>module · 0{i + 1}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
