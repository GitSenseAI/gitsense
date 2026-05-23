import { Activity, GitBranch, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";

const CONTRIBS = [
  { n: "blvckout", c: 1428, color: "#00E676" },
  { n: "neon.dev", c: 612, color: "#00C2FF" },
  { n: "kira.x", c: 318, color: "#00E676" },
  { n: "ascii_void", c: 204, color: "#00C2FF" },
  { n: "0xRaven", c: 142, color: "#00E676" },
];

const RECS = [
  "Upgrade lodash to >=4.17.21 (CVE-2020-8203)",
  "Split services/index.ts into domain modules",
  "Add E2E tests for the auth refresh flow",
];

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="relative py-24 sm:py-32 border-t border-white/[0.05]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl mb-12">
          <span className="inline-flex items-center gap-2 rounded-full gs-border bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300 font-mono">
            <Activity size={13} className="text-[#00C2FF]" /> dashboard preview
          </span>
          <h2 className="font-display mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            One pane of glass for repo intelligence.
          </h2>
          <p className="mt-3 text-neutral-400">
            Real-time health, risk, and contributor signals — composed into a workspace built for engineers.
          </p>
        </div>

        {/* Dashboard mock */}
        <div className="relative rounded-2xl gs-border bg-[#0a0a0a] overflow-hidden shadow-[0_30px_120px_-30px_rgba(0,230,118,0.18)]">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 sm:px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
              </div>
              <span className="hidden sm:inline text-xs font-mono text-neutral-500">gitsense · workspace</span>
            </div>
            <span className="text-[11px] font-mono text-[#00E676] flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00E676] pulse-dot" />
              SYNCED
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-4 p-4 sm:p-5">
            {/* Health */}
            <div className="lg:col-span-4 rounded-xl gs-border bg-[#0e0e0e] p-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-500">REPO HEALTH</span>
                <TrendingUp size={14} className="text-[#00E676]" />
              </div>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-5xl font-display font-semibold text-white">87</span>
                <span className="text-sm text-neutral-500 mb-1.5">/100</span>
                <span className="ml-auto text-[11px] font-mono text-[#00E676]">+6 this week</span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { l: "Docs", v: 78 },
                  { l: "Tests", v: 71 },
                  { l: "Sec", v: 92 },
                ].map((x) => (
                  <div key={x.l} className="rounded-lg gs-border bg-black/40 p-2.5">
                    <div className="text-[10px] font-mono text-neutral-500">{x.l}</div>
                    <div className="text-sm font-display text-white mt-0.5">{x.v}</div>
                    <div className="mt-1.5 h-1 rounded-full bg-white/[0.05] overflow-hidden">
                      <div className="h-full bg-[#00E676]" style={{ width: `${x.v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contributor graph (bars) */}
            <div className="lg:col-span-5 rounded-xl gs-border bg-[#0e0e0e] p-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-500">CONTRIBUTOR ACTIVITY · 30D</span>
                <GitBranch size={14} className="text-[#00C2FF]" />
              </div>
              <div className="mt-5 flex items-end gap-1.5 h-32">
                {Array.from({ length: 30 }).map((_, i) => {
                  const h = 18 + Math.abs(Math.sin(i * 0.7) * 70) + (i % 5 === 0 ? 15 : 0);
                  const isToday = i === 29;
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        background: isToday
                          ? "#00E676"
                          : i % 3 === 0
                          ? "rgba(0,194,255,0.45)"
                          : "rgba(255,255,255,0.08)",
                      }}
                    />
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>Oct 25</span>
                <span>Nov 24</span>
              </div>
            </div>

            {/* Risks */}
            <div className="lg:col-span-3 rounded-xl gs-border bg-[#0e0e0e] p-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-500">RISK ANALYSIS</span>
                <ShieldAlert size={14} className="text-[#00C2FF]" />
              </div>
              <div className="mt-4 space-y-2.5">
                {[
                  { lvl: "HIGH", c: "#ff4d4d", t: "lodash CVE" },
                  { lvl: "MED", c: "#febc2e", t: "Hardcoded token" },
                  { lvl: "LOW", c: "#00E676", t: "CSP headers" },
                ].map((r) => (
                  <div key={r.t} className="flex items-center justify-between rounded-md bg-black/30 px-3 py-2 gs-border">
                    <span className="text-xs text-neutral-300 truncate pr-2">{r.t}</span>
                    <span className="text-[10px] font-mono" style={{ color: r.c }}>
                      {r.lvl}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dependency tree */}
            <div className="lg:col-span-7 rounded-xl gs-border bg-[#0e0e0e] p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-neutral-500">DEPENDENCY TREE</span>
                <span className="text-[11px] font-mono text-neutral-600">218 packages</span>
              </div>
              <DepTree />
            </div>

            {/* AI recs */}
            <div className="lg:col-span-5 rounded-xl gs-border bg-[#0e0e0e] p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-neutral-500">AI RECOMMENDATIONS</span>
                <Sparkles size={14} className="text-[#00E676]" />
              </div>
              <ul className="space-y-3">
                {RECS.map((r, i) => (
                  <li key={i} className="flex gap-3 rounded-lg bg-black/30 gs-border p-3">
                    <span className="font-mono text-[11px] text-[#00E676] mt-0.5">0{i + 1}</span>
                    <p className="text-sm text-neutral-300">{r}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                <div className="text-[11px] font-mono text-neutral-500 mb-2">TOP CONTRIBUTORS</div>
                <div className="space-y-1.5">
                  {CONTRIBS.slice(0, 3).map((c) => (
                    <div key={c.n} className="flex items-center gap-3">
                      <span
                        className="inline-block h-5 w-5 rounded-full"
                        style={{ background: `${c.color}40`, border: `1px solid ${c.color}` }}
                      />
                      <span className="text-xs text-neutral-200 font-mono flex-1">{c.n}</span>
                      <span className="text-[10px] text-neutral-500 font-mono">{c.c.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DepTree() {
  const nodes = [
    { name: "core", x: 50, y: 50, c: "#00E676", r: 6 },
    { name: "auth", x: 22, y: 22, c: "#00C2FF" },
    { name: "ui", x: 78, y: 22, c: "#00C2FF" },
    { name: "api", x: 18, y: 78, c: "#00E676" },
    { name: "db", x: 82, y: 78, c: "#00E676" },
    { name: "ai", x: 50, y: 12, c: "#00C2FF" },
    { name: "cache", x: 12, y: 50, c: "#00E676" },
    { name: "queue", x: 88, y: 50, c: "#00C2FF" },
    { name: "log", x: 50, y: 88, c: "#00E676" },
  ];
  const edges = nodes.slice(1).map((n) => ["50,50", `${n.x},${n.y}`]);

  return (
    <div className="relative h-56 sm:h-64 rounded-lg gs-border bg-black/30 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="dep-g" x1="0" x2="1">
            <stop offset="0" stopColor="#00E676" stopOpacity="0.0" />
            <stop offset="0.5" stopColor="#00E676" stopOpacity="0.5" />
            <stop offset="1" stopColor="#00E676" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={a.split(",")[0]}
            y1={a.split(",")[1]}
            x2={b.split(",")[0]}
            y2={b.split(",")[1]}
            stroke="url(#dep-g)"
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {nodes.map((n) => (
        <div
          key={n.name}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <span
            className="block rounded-full"
            style={{
              width: n.r ? 14 : 9,
              height: n.r ? 14 : 9,
              background: n.c,
              boxShadow: `0 0 0 4px ${n.c}1a`,
            }}
          />
          <span className="text-[10px] font-mono text-neutral-400">{n.name}</span>
        </div>
      ))}
    </div>
  );
}
