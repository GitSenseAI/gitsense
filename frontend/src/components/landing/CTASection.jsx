import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative rounded-3xl gs-border bg-[#0a0a0a] overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40 radial-fade" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-[80%] bg-[#00E676]/[0.07] blur-3xl rounded-full" />

          <div className="relative px-6 sm:px-12 py-16 sm:py-20 text-center">
            <span className="inline-flex items-center gap-2 rounded-full gs-border bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300 font-mono">
              <Sparkles size={13} className="text-[#00E676]" /> ready when you are
            </span>
            <h2 className="font-display mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
              Start Analyzing Repositories
              <br />
              <span className="text-[#00E676]">with AI.</span>
            </h2>
            <p className="mt-5 text-neutral-400 max-w-xl mx-auto">
              No setup. Drop a Gitlawb URL and get architecture, risk, and contributor intelligence in seconds.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <button
                data-testid="cta-launch-btn"
                onClick={() => scrollTo("#analyzer")}
                className="group inline-flex items-center gap-2 rounded-xl bg-[#00E676] text-black px-6 py-3.5 text-sm font-medium hover:bg-[#00d169] active:scale-[0.98] transition"
              >
                Launch GitSense
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                data-testid="cta-docs-btn"
                onClick={() => scrollTo("#docs")}
                className="inline-flex items-center gap-2 rounded-xl gs-border bg-white/[0.02] px-6 py-3.5 text-sm font-medium text-white hover:bg-white/[0.05] transition"
              >
                Read the docs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
