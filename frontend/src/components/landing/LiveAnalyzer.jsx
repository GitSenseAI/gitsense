import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Search, Sparkles, ShieldAlert, Users, GitBranch, FileCode, CheckCircle2, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SCAN_STEPS = [
  "Cloning repository metadata",
  "Indexing source files",
  "Analyzing dependency graph",
  "Detecting security risks",
  "Mapping contributor activity",
  "Generating AI summary",
];

export default function LiveAnalyzer() {
  const [repo, setRepo] = useState("gitlawb://blvckout/core-node");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const runScan = async () => {
    if (!repo.trim()) {
      toast.error("Enter a repository URL");
      return;
    }
    setLoading(true);
    setResult(null);
    setStep(0);
    setProgress(0);

    const total = SCAN_STEPS.length;
    let cur = 0;
    const interval = setInterval(() => {
      cur += 1;
      setStep(cur);
      setProgress(Math.min(100, Math.round((cur / total) * 100)));
      if (cur >= total) clearInterval(interval);
    }, 380);

    try {
      const res = await axios.post(`${API}/analyze`, { repo_url: repo.trim() });
      // ensure animation finishes
      await new Promise((r) => setTimeout(r, 380 * total + 200));
      setResult(res.data);
      toast.success(`Scan complete · ${res.data.repo_name}`);
    } catch (err) {
      clearInterval(interval);
      toast.error(err?.response?.data?.detail || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="analyzer" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full gs-border bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300 font-mono">
            <Sparkles size={13} className="text-[#00E676]" /> live analyzer
          </span>
          <h2 className="font-display mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Paste a repo. Get instant intelligence.
          </h2>
          <p className="mt-3 text-neutral-400 max-w-xl">
            Our AI scans architecture, dependencies, and contributors in seconds.
            Try the demo with a sample Gitlawb URL below.
          </p>
        </div>

        {/* Input + scanner */}
        <div className="mt-10 rounded-2xl gs-border bg-[#0a0a0a] overflow-hidden">
          <div className="flex flex-col sm:flex-row items-stretch border-b border-white/[0.06]">
            <div className="flex items-center gap-3 flex-1 px-4 sm:px-5 py-3.5">
              <Search size={16} className="text-neutral-500 shrink-0" />
              <input
                data-testid="analyzer-input"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                placeholder="gitlawb://owner/repo"
                disabled={loading}
                className="flex-1 bg-transparent outline-none border-0 placeholder:text-neutral-600 text-sm sm:text-base font-mono text-neutral-100"
                onKeyDown={(e) => e.key === "Enter" && !loading && runScan()}
              />
            </div>
            <button
              data-testid="analyzer-run-btn"
              onClick={runScan}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-[#00E676] text-black px-6 py-3.5 text-sm font-medium hover:bg-[#00d169] active:scale-[0.99] transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {loading ? "Analyzing…" : "Analyze"}
            </button>
          </div>

          {/* Scan steps */}
          <div className="relative grid sm:grid-cols-2 gap-x-6 gap-y-2.5 p-5 sm:p-6">
            {SCAN_STEPS.map((s, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <div key={s} className="flex items-center gap-3 text-sm">
                  <div className="relative inline-flex h-5 w-5 items-center justify-center rounded-full gs-border bg-black">
                    {done ? (
                      <CheckCircle2 size={14} className="text-[#00E676]" />
                    ) : active ? (
                      <Loader2 size={12} className="animate-spin text-[#00C2FF]" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                    )}
                  </div>
                  <span className={done ? "text-neutral-200" : active ? "text-white" : "text-neutral-600"}>
                    {s}
                  </span>
                </div>
              );
            })}

            <div className="sm:col-span-2 mt-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-2">
                <span>SCAN PROGRESS</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-[#00E676] to-[#00C2FF] transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
                {loading && <div className="absolute inset-0 shimmer" />}
              </div>
            </div>
          </div>
        </div>

        {/* Result panel */}
        {result && (
          <div data-testid="analyzer-result" className="mt-6 grid lg:grid-cols-3 gap-4">
            <ResultCard
              icon={<FileCode size={14} className="text-[#00E676]" />}
              label="Repo Health"
              value={`${result.health_score}/100`}
              detail={`${result.files_analyzed.toLocaleString()} files · ${result.lines_of_code.toLocaleString()} LOC`}
              bar={result.health_score}
            />
            <ResultCard
              icon={<ShieldAlert size={14} className="text-[#00C2FF]" />}
              label="Security Risks"
              value={`${result.security_risks.length} found`}
              detail={result.security_risks[0]?.title || "No risks detected"}
              bar={Math.min(100, result.security_risks.length * 22)}
              barColor="#00C2FF"
            />
            <ResultCard
              icon={<Users size={14} className="text-[#00E676]" />}
              label="Contributors"
              value={`${result.contributors.length} active`}
              detail={`${result.contributors[0]?.name} · ${result.contributors[0]?.commits} commits`}
              bar={75}
            />

            <div className="lg:col-span-2 rounded-2xl gs-border bg-[#0a0a0a] p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-neutral-500">ARCHITECTURE</span>
                <span className="text-xs font-mono text-[#00E676]">{result.repo_name}</span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">{result.architecture_summary}</p>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-2">
                {Object.entries(result.languages).map(([lang, pct]) => (
                  <div key={lang} className="rounded-lg gs-border bg-black/40 px-3 py-2">
                    <div className="text-[11px] font-mono text-neutral-500">{lang}</div>
                    <div className="text-sm text-white font-medium">{pct}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl gs-border bg-[#0a0a0a] p-5">
              <div className="flex items-center gap-2 mb-3">
                <GitBranch size={14} className="text-[#00E676]" />
                <span className="text-xs font-mono text-neutral-500">DEPENDENCIES</span>
              </div>
              <ul className="space-y-2">
                {result.dependencies.slice(0, 5).map((d) => (
                  <li key={d.name} className="flex items-center justify-between text-sm">
                    <span className="text-neutral-200 font-mono">{d.name}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-[11px] text-neutral-500 font-mono">{d.version}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          d.risk === "high"
                            ? "bg-red-500/10 text-red-400"
                            : d.risk === "medium"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-[#00E676]/10 text-[#00E676]"
                        }`}
                      >
                        {d.risk}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3 rounded-2xl gs-border bg-[#0a0a0a] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-[#00E676]" />
                <span className="text-xs font-mono text-neutral-500">AI RECOMMENDATIONS</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {result.ai_recommendations.map((r, i) => (
                  <div key={i} className="flex gap-3 rounded-lg gs-border bg-black/40 p-3">
                    <span className="font-mono text-[11px] text-[#00E676] mt-0.5">0{i + 1}</span>
                    <p className="text-sm text-neutral-300">{r}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ResultCard({ icon, label, value, detail, bar, barColor = "#00E676" }) {
  return (
    <div className="rounded-2xl gs-border bg-[#0a0a0a] p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-neutral-500 inline-flex items-center gap-2">
          {icon} {label}
        </span>
      </div>
      <div className="mt-3 text-2xl font-display font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs text-neutral-500 truncate">{detail}</div>
      <div className="mt-4 h-1 w-full rounded-full bg-white/[0.05] overflow-hidden">
        <div className="h-full" style={{ width: `${bar}%`, background: barColor }} />
      </div>
    </div>
  );
}
