import { Network } from "lucide-react";

export default function LogoMarquee() {
  return (
    <section className="relative border-t border-white/[0.05] bg-[#070707]">
      {/* subtle accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00E676]/30 to-transparent" />

      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full gs-border bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300 font-mono">
          <Network size={13} className="text-[#00E676]" /> ecosystem
        </div>

        <h2 className="font-display mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          Powered by Gitlawb
        </h2>
        <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl mx-auto">
          Built for decentralized repositories and AI-native developer infrastructure.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
