import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function useCountUp(target, duration = 1600, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start || !target) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

export default function Metrics() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [data, setData] = useState({
    repositories_analyzed: 42,
    ai_scans_completed: 138,
    contributors_tracked: 12,
    average_analysis_ms: 1820,
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    axios.get(`${API}/metrics`).then((r) => setData(r.data)).catch(() => {});
  }, []);

  const repos = useCountUp(data.repositories_analyzed, 1800, inView);
  const scans = useCountUp(data.ai_scans_completed, 1800, inView);
  const contribs = useCountUp(data.contributors_tracked, 1800, inView);
  const speed = useCountUp(data.average_analysis_ms, 1400, inView);

  const fmt = (n) => n.toLocaleString();

  return (
    <section ref={ref} className="relative py-24 sm:py-32 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard testid="metric-repos" value={fmt(repos)} label="Repositories analyzed" />
          <MetricCard testid="metric-scans" value={fmt(scans)} label="AI scans completed" highlight />
          <MetricCard testid="metric-contribs" value={fmt(contribs)} label="Contributors tracked" />
          <MetricCard testid="metric-speed" value={`${(speed / 1000).toFixed(2)}s`} label="Avg analysis speed" highlight />
        </div>
      </div>
    </section>
  );
}

function MetricCard({ value, label, highlight, testid }) {
  return (
    <div
      data-testid={testid}
      className="relative rounded-2xl gs-border bg-[#0a0a0a] p-5 sm:p-7 overflow-hidden"
    >
      {highlight && (
        <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-[#00E676]/[0.08] blur-2xl" />
      )}
      <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
        {value}
      </div>
      <div className="mt-2 text-[11px] sm:text-xs uppercase tracking-[0.15em] font-mono text-neutral-500">
        {label}
      </div>
    </div>
  );
}
