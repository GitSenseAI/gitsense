import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LogoMarquee from "@/components/landing/LogoMarquee";
import LiveAnalyzer from "@/components/landing/LiveAnalyzer";
import Features from "@/components/landing/Features";
import Metrics from "@/components/landing/Metrics";
import DashboardPreview from "@/components/landing/DashboardPreview";
import Testimonials from "@/components/landing/Testimonials";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import PageTransition from "@/components/PageTransition";

export default function Landing() {
  const location = useLocation();

  // When arriving with a hash (e.g. /#analyzer from another page),
  // wait for layout and smooth-scroll to that section.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash;
    const t = setTimeout(() => {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <main data-testid="landing-page" className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      <PageTransition>
        <Hero />
        <LogoMarquee />
        <LiveAnalyzer />
        <Features />
        <Metrics />
        <DashboardPreview />
        <Testimonials />
        <CTASection />
      </PageTransition>
      <Footer />
    </main>
  );
}
