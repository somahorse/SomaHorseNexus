"use client";

import Footer from "@/components/Footer";
import IndustriesHeroSection from "./IndustriesHeroSection";
import SectorSolutions from "./SectorsSolution";
import IndustriesPillars from "./IndustriesPillars";
import IndustriesCTA from "./IndustriesCTA";

/* ── Sector Visual Config ────────────────────────────────── */
export default function IndustriesPageClient() {

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      {/* Hero — Dark immersive */}
      <IndustriesHeroSection />


      {/* Sector Cards */}
      <SectorSolutions />

      {/* Pillars */}
      <IndustriesPillars />


      {/* CTA */}
      <IndustriesCTA />

      <Footer />
    </main>
  );
}
