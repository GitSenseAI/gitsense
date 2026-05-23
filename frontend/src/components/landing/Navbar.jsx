import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGO_URL } from "@/lib/brand";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", to: "/#features", type: "anchor" },
  { label: "Demo", to: "/#analyzer", type: "anchor" },
  { label: "Docs", to: "/docs", type: "route" },
  { label: "Gitlawb", to: "/gitlawb", type: "route" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goAnchor = (id) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate(`/${id}`);
      return;
    }
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (link) => {
    if (link.type === "anchor") {
      const id = link.to.replace("/", "");
      goAnchor(id);
    } else {
      setOpen(false);
      navigate(link.to);
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
          onClick={() => {
            if (location.pathname !== "/") navigate("/");
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
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
          {NAV_LINKS.map((link) =>
            link.type === "anchor" ? (
              <button
                key={link.label}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                onClick={() => handleNavClick(link)}
                className="px-3.5 py-2 text-sm text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-colors"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="px-3.5 py-2 text-sm text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            data-testid="navbar-cta-analyze"
            onClick={() => goAnchor("#analyzer")}
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
          {NAV_LINKS.map((link) =>
            link.type === "anchor" ? (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-left px-3 py-2 text-sm text-neutral-300 hover:text-white rounded-lg hover:bg-white/[0.04]"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-left px-3 py-2 text-sm text-neutral-300 hover:text-white rounded-lg hover:bg-white/[0.04]"
              >
                {link.label}
              </Link>
            )
          )}
          <button
            onClick={() => goAnchor("#analyzer")}
            className="mt-2 rounded-lg bg-[#00E676] text-black px-4 py-2 text-sm font-medium"
          >
            Analyze Repo
          </button>
        </div>
      )}
    </header>
  );
}
