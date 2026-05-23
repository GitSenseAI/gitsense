const ITEMS = [
  "Gitlawb",
  "Vercel",
  "Linear",
  "Raycast",
  "Supabase",
  "Stripe",
  "OpenAI",
  "Anthropic",
  "Cloudflare",
  "Datadog",
];

export default function LogoMarquee() {
  return (
    <section className="relative py-10 border-y border-white/[0.05] bg-[#070707]">
      <p className="text-center text-[11px] tracking-[0.2em] text-neutral-500 font-mono uppercase mb-6">
        Trusted by engineering teams at
      </p>
      <div className="overflow-hidden">
        <div className="marquee-track flex gap-14 whitespace-nowrap w-max">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-display text-xl sm:text-2xl text-neutral-600 hover:text-neutral-300 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
