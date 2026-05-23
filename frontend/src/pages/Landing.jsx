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

export default function Landing() {
  return (
    <main data-testid="landing-page" className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <LiveAnalyzer />
      <Features />
      <Metrics />
      <DashboardPreview />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
