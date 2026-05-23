import { Link } from "react-router-dom";
import { LOGO_URL } from "@/lib/brand";
import { ArrowRight } from "lucide-react";

const NAV = [
  { label: "Features", href: "/#features" },
  { label: "Demo", href: "/#analyzer" },
  { label: "Docs", href: "/docs" },
  { label: "Gitlawb", href: "/gitlawb" },
];

export default function SubPageHeader({ active }) {
  const goAnchor = (e, href) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "#");
      // navigate home then scroll
      if (window.location.pathname !== "/") {
        window.location.assign(`/${id}`);
      } else {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header
      data-testid="subpage-navbar"
      className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[96%] sm:w-[92%] max-w-6xl backdrop-blur-xl bg-[#0a0a0a]/80 gs-border rounded-2xl"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <Link to="/" data-testid="subpage-logo" className="flex items-center gap-2.5">
          <span className="relative inline-flex h-8 w-8 rounded-lg overflow-hidden gs-border bg-black">
            <img src={LOGO_URL} alt="GitSense logo" className="h-full w-full object-cover" />
          </span>
          <span className="font-display text-[17px] font-semibold tracking-tight text-white">
            GitSense
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((link) => {
            const isAnchor = link.href.startsWith("/#");
            const isActive = active === link.label.toLowerCase();
            const cls = `px-3.5 py-2 text-sm rounded-lg transition-colors ${
              isActive ? "text-white bg-white/[0.05]" : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`;
            return isAnchor ? (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => goAnchor(e, link.href)}
                className={cls}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                data-testid={`subnav-link-${link.label.toLowerCase()}`}
                className={cls}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/#analyzer"
          data-testid="subpage-cta"
          onClick={(e) => goAnchor(e, "/#analyzer")}
          className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#00E676] text-black px-4 py-2 text-sm font-medium hover:bg-[#00d169] active:scale-[0.98] transition"
        >
          Analyze Repo
          <ArrowRight size={14} />
        </Link>
      </div>
    </header>
  );
}
