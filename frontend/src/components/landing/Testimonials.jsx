import { Quote } from "lucide-react";

const ITEMS = [
  {
    q: "GitSense gave us a full architecture briefing on a 200k-line monorepo in under two seconds. It now sits in our onboarding flow.",
    n: "Mira Tanaka",
    r: "Staff Engineer · Halycon",
    accent: "#00E676",
  },
  {
    q: "The dependency risk view alone has saved us from two production incidents. The AI recommendations are weirdly good.",
    n: "Devon Park",
    r: "Tech Lead · Northstack",
    accent: "#00C2FF",
  },
  {
    q: "I open GitSense before every code review. Contributor heatmaps and ownership signals removed an entire layer of guesswork.",
    n: "Aaliyah Reyes",
    r: "Principal Eng · Vector Labs",
    accent: "#00E676",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl mb-12">
          <span className="inline-flex items-center gap-2 rounded-full gs-border bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300 font-mono">
            <Quote size={13} className="text-[#00E676]" /> testimonials
          </span>
          <h2 className="font-display mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Engineers don't have time for noise.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {ITEMS.map((t, i) => (
            <article
              key={i}
              data-testid={`testimonial-${i}`}
              className="card-hover relative rounded-2xl gs-border bg-[#0c0c0c] p-6 sm:p-7 flex flex-col"
            >
              <Quote size={18} style={{ color: t.accent }} className="opacity-70" />
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-200">"{t.q}"</p>
              <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center gap-3">
                <span
                  className="inline-block h-9 w-9 rounded-full"
                  style={{ background: `${t.accent}26`, border: `1px solid ${t.accent}66` }}
                />
                <div>
                  <div className="text-sm font-medium text-white">{t.n}</div>
                  <div className="text-[11px] font-mono text-neutral-500">{t.r}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
