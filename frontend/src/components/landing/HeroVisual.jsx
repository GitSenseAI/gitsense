import { GitBranch, Activity, Cpu, ShieldCheck } from "lucide-react";

export default function HeroVisual({ logoUrl }) {
  return (
    <div className="relative aspect-[5/4] w-full">
      {/* Outer frame */}
      <div className="absolute inset-0 rounded-2xl gs-border bg-gradient-to-b from-[#0d0d0d] to-[#070707] overflow-hidden">
        {/* Scan line */}
        <div className="scan-line" />

        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
          </div>
          <div className="font-mono text-[11px] text-neutral-500">
            gitlawb://gitsense/repository-demo
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#00E676] font-mono">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-[#00E676] pulse-dot" />
            </span>
            LIVE
          </div>
        </div>

        {/* Body */}
        <div className="relative grid grid-cols-5 gap-3 p-4 h-[calc(100%-40px)]">
          {/* Left rail */}
          <div className="col-span-2 flex flex-col gap-3">
            <div className="rounded-xl gs-border bg-[#0e0e0e] p-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 font-mono">HEALTH</span>
                <Activity size={13} className="text-[#00E676]" />
              </div>
              <div className="mt-2 flex items-end gap-1.5">
                <span className="text-3xl font-display font-semibold text-white">87</span>
                <span className="text-xs text-neutral-500 mb-1">/100</span>
              </div>
              <div className="mt-3 h-1.5 w-full rounded-full bg-white/[0.05] overflow-hidden">
                <div className="h-full bg-[#00E676]" style={{ width: "87%" }} />
              </div>
            </div>

            <div className="rounded-xl gs-border bg-[#0e0e0e] p-3 flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-neutral-500 font-mono">CONTRIBUTORS</span>
                <GitBranch size={13} className="text-[#00C2FF]" />
              </div>
              <div className="space-y-2">
                {[
                  { n: "gitsense", c: 1428 },
                  { n: "neon.dev", c: 612 },
                  { n: "kira.x", c: 318 },
                ].map((c) => (
                  <div key={c.n} className="flex items-center justify-between">
                    <span className="text-xs text-neutral-300 font-mono">{c.n}</span>
                    <span className="text-[10px] text-neutral-500 font-mono">{c.c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right rail — graph */}
          <div className="col-span-3 relative rounded-xl gs-border bg-[#0a0a0a] overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-50" />
            {/* Center logo node */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="relative h-16 w-16 rounded-xl gs-border bg-black overflow-hidden float-y">
                  <img src={logoUrl} alt="" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
            {/* Pulsing nodes */}
            {[
              { top: "12%", left: "18%", c: "#00E676" },
              { top: "20%", right: "14%", c: "#00C2FF" },
              { bottom: "18%", left: "10%", c: "#00C2FF" },
              { bottom: "12%", right: "20%", c: "#00E676" },
              { top: "50%", left: "8%", c: "#00E676" },
              { top: "55%", right: "8%", c: "#00C2FF" },
            ].map((n, i) => (
              <div
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full node-pulse"
                style={{ top: n.top, left: n.left, right: n.right, bottom: n.bottom, background: n.c }}
              />
            ))}
            {/* SVG connections */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0" stopColor="#00E676" stopOpacity="0.0" />
                  <stop offset="0.5" stopColor="#00E676" stopOpacity="0.45" />
                  <stop offset="1" stopColor="#00E676" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {[
                ["18,12", "50,50"],
                ["86,20", "50,50"],
                ["10,82", "50,50"],
                ["80,88", "50,50"],
                ["8,50", "50,50"],
                ["92,55", "50,50"],
              ].map(([a, b], i) => (
                <line
                  key={i}
                  x1={a.split(",")[0]}
                  y1={a.split(",")[1]}
                  x2={b.split(",")[0]}
                  y2={b.split(",")[1]}
                  stroke="url(#g1)"
                  strokeWidth="0.25"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            {/* Bottom stat strip */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg gs-border bg-black/60 backdrop-blur px-3 py-2">
              <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                <Cpu size={12} className="text-[#00E676]" />
                <span className="font-mono">AI scan · 1,247 files</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                <ShieldCheck size={12} className="text-[#00C2FF]" />
                <span className="font-mono">3 risks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
