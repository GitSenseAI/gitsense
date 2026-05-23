import { useEffect, useState } from "react";
import { LOGO_URL } from "@/lib/brand";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Demo", href: "#analyzer" },
  { label: "Docs", href: "#docs" },
  { label: "Gitlawb", href: "#gitlawb" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      data-testid="navbar"
      className={`fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[96%] sm:w-[92%] max-w-6xl transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-[#0a0a0a]/80" : "backdrop-blur-md bg-[#0a0a0a]/55"
      } gs-border rounded-2xl`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <button
          data-testid="navbar-logo-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group"
        >
          <span className="relative inline-flex h-8 w-8 rounded-lg overflow-hidden gs-border bg-black">
            <img src={LOGO_URL} alt="GitSense logo" className="h-full w-full object-cover" />
          </span>
          <span className="font-display text-[17px] font-semibold tracking-tight text-white">
            GitSense
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              onClick={() => scrollTo(link.href)}
              className="px-3.5 py-2 text-sm text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            data-testid="navbar-cta-analyze"
            onClick={() => scrollTo("#analyzer")}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#00E676] text-black px-4 py-2 text-sm font-medium hover:bg-[#00d169] active:scale-[0.98] transition"
          >
            Analyze Repo
            <span className="font-mono text-[11px] opacity-70">↗</span>
          </button>
          <button
            data-testid="navbar-mobile-toggle"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg gs-border bg-black/40"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div data-testid="mobile-menu" className="md:hidden border-t border-white/[0.06] px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-left px-3 py-2 text-sm text-neutral-300 hover:text-white rounded-lg hover:bg-white/[0.04]"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#analyzer")}
            className="mt-2 rounded-lg bg-[#00E676] text-black px-4 py-2 text-sm font-medium"
          >
            Analyze Repo
          </button>
        </div>
      )}
    </header>
  );
}
