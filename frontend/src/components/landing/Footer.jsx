import { Link } from "react-router-dom";
import { LOGO_URL } from "@/lib/brand";
import { Github, Twitter } from "lucide-react";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "Features", to: "/#features", type: "anchor" },
      { label: "Demo", to: "/#analyzer", type: "anchor" },
      { label: "Dashboard", to: "/#dashboard", type: "anchor" },
      { label: "Docs", to: "/docs", type: "route" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", to: "/docs", type: "route" },
      { label: "API", to: "/docs#api", type: "anchor" },
      { label: "Quick Start", to: "/docs#quickstart", type: "anchor" },
      { label: "Repository Analysis", to: "/docs#analysis", type: "anchor" },
    ],
  },
  {
    title: "Integrations",
    links: [
      { label: "Gitlawb", to: "/gitlawb", type: "route" },
      { label: "Gitlawb Docs", to: "/docs#gitlawb", type: "anchor" },
      { label: "Ecosystem", to: "/gitlawb", type: "route" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/gitlawb", type: "route" },
      { label: "Roadmap", to: "/gitlawb", type: "route" },
      { label: "Security", to: "/docs#analysis", type: "anchor" },
    ],
  },
];

function FooterLink({ link }) {
  if (link.type === "route") {
    return (
      <Link to={link.to} className="text-sm text-neutral-400 hover:text-white transition-colors">
        {link.label}
      </Link>
    );
  }
  // anchor with optional pathname
  return (
    <Link to={link.to} className="text-sm text-neutral-400 hover:text-white transition-colors">
      {link.label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#070707]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="relative inline-flex h-8 w-8 rounded-lg overflow-hidden gs-border bg-black">
                <img src={LOGO_URL} alt="GitSense logo" className="h-full w-full object-cover" />
              </span>
              <span className="font-display text-lg font-semibold text-white">GitSense</span>
            </Link>
            <p className="mt-4 text-sm text-neutral-400 max-w-sm leading-relaxed">
              AI repository intelligence for engineering teams. Understand any codebase in seconds.
            </p>
            <Link
              to="/gitlawb"
              className="mt-5 inline-flex items-center gap-2 rounded-lg gs-border bg-white/[0.02] px-3 py-2 text-xs text-neutral-300 font-mono hover:text-white hover:bg-white/[0.05] transition"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#00E676] pulse-dot" />
              Native Gitlawb integration →
            </Link>
            <div className="mt-6 flex items-center gap-2">
              <a
                data-testid="footer-github"
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg gs-border bg-black/40 text-neutral-400 hover:text-white hover:border-white/20 transition"
              >
                <Github size={15} />
              </a>
              <a
                data-testid="footer-twitter"
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg gs-border bg-black/40 text-neutral-400 hover:text-white hover:border-white/20 transition"
              >
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <div className="text-[11px] font-mono tracking-[0.15em] uppercase text-neutral-500 mb-4">
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink link={l} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs font-mono text-neutral-500">
            © {new Date().getFullYear()} GitSense Labs · All rights reserved.
          </span>
          <span className="text-xs font-mono text-neutral-600">
            Powered by AI · Built for developers
          </span>
        </div>
      </div>
    </footer>
  );
}
