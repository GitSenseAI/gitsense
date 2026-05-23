import { useEffect, useState } from "react";

/**
 * Wraps a route with a subtle fade + slight upward translate on mount.
 * Also forces window scroll to top on each render so deep links from nav
 * don't land mid-page.
 */
export default function PageTransition({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div
      data-testid="page-transition"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 480ms ease, transform 520ms ease",
      }}
    >
      {children}
    </div>
  );
}
