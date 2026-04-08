import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Stats from "./components/Stats";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import CustomCursor from "./components/CustomCursor";

function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.8 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="section-divider separator-animated mx-auto max-w-5xl origin-center"
    />
  );
}

function App() {
  useEffect(() => {
    const sectionTitles: Record<string, string> = {
      home: "Home",
      features: "Features",
      "how-it-works": "How It Works",
      stats: "Results",
      pricing: "Pricing",
      faq: "FAQ",
      contact: "Contact",
    };

    const baseTitle = "Market Lab — Train Smart. Trade Confident.";
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]"),
    );

    if (sections.length === 0) {
      document.title = baseTitle;
      return;
    }

    const setTitleFor = (sectionId: string) => {
      const sectionTitle = sectionTitles[sectionId];
      document.title = sectionTitle
        ? `Market Lab — ${sectionTitle} | Train Smart. Trade Confident.`
        : baseTitle;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          const activeSection = visibleEntries[0].target as HTMLElement;
          setTitleFor(activeSection.id);
        }
      },
      {
        // Prioritize sections near the center of the viewport.
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));
    setTitleFor("home");

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-surface-950 overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        {/* <MarketOverview /> */}
        {/* <SectionDivider /> */}
        <Features />
        <SectionDivider />
        <HowItWorks />
        <SectionDivider />
        <Stats />
        <SectionDivider />
        {/* <Courses />
        <SectionDivider />
        <Mentors />
        <SectionDivider />
        <Testimonials />
        <SectionDivider /> */}
        <Pricing />
        <SectionDivider />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
