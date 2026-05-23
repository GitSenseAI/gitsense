import { ArrowRight, Play, Sparkles } from "lucide-react";
import { LOGO_URL } from "@/lib/brand";
import HeroVisual from "@/components/landing/HeroVisual";

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 grid-bg radial-fade opacity-90" />
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[#00E676]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -top-10 left-[-8%] h-[320px] w-[320px] rounded-full bg-[#00C2FF]/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
        {/* Left */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full gs-border bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300">
            <Sparkles size={13} className="text-[#00E676]" />
            <span className="font-mono">v2.4 · AI repository intelligence</span>
          </div>

          <h1 className="font-display mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white">
            Understand Any
            <br />
            Repository{" "}
            <span className="relative inline-block">
              <span className="text-[#00E676]">Instantly.</span>
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E676] to-transparent opacity-60" />
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed">
            GitSense uses AI to analyze architecture, dependencies, contributors,
            security risks, and repository health in seconds.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              data-testid="hero-cta-analyze"
              onClick={() => scrollTo("#analyzer")}
              className="group inline-flex items-center gap-2 rounded-xl bg-[#00E676] text-black px-5 py-3 text-sm font-medium hover:bg-[#00d169] active:scale-[0.98] transition"
            >
              Analyze Repository
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              data-testid="hero-cta-demo"
              onClick={() => scrollTo("#dashboard")}
              className="inline-flex items-center gap-2 rounded-xl gs-border bg-white/[0.02] px-5 py-3 text-sm font-medium text-white hover:bg-white/[0.05] transition"
            >
              <Play size={14} className="text-[#00C2FF]" /> Live Demo
            </button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-[#00E676] pulse-dot" />
              </span>
              <span className="font-mono">182,439 repos analyzed</span>
            </div>
            <div className="hidden sm:block h-3 w-px bg-white/10" />
            <div className="hidden sm:block font-mono">~1.8s avg scan</div>
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <HeroVisual logoUrl={LOGO_URL} />
        </div>
      </div>
    </section>
  );
}
