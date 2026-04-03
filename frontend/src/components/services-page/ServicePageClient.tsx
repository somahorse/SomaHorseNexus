"use client";

import Footer from "@/components/Footer";
import ServiceHero from "./ServiceHero";
import CoreServices from "./CoreServices";
import EngagementIncludesSection from "./EnagagementIncludes";
import EngagementSection from "./EngagementSection";
import CrossSector from "./CrossSector";
import DeveloperPartnership from "./DeveloperPartnership";
import ProcessSection from "./ProcessSection";
import ServicesCTA from "./Services_CTA";



export default function ServicePageClient() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <ServiceHero />
      <CoreServices />
      <EngagementIncludesSection />
      <EngagementSection />
      <CrossSector />
      <DeveloperPartnership />
      <ProcessSection />
      <ServicesCTA />
      <Footer />
    </main>
  );
}
