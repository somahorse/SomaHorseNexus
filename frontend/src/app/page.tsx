"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Code,
  Globe,
  Zap,
  CheckCircle,
  Users,
  Building2,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Footer from "@/components/Footer";
import FAQSection from "@/components/Faq";
import Hero from "@/components/homepage/Hero";
import IndustriesPreview from "@/components/homepage/IndustriesPreview";
import HowItWorks from "@/components/homepage/HowItWorks";
import DevelopersSection from "@/components/homepage/DevelopersSection";
import BusinessSection from "@/components/homepage/BusinessSection";
import CTASection from "@/components/homepage/CTASection";


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col bg-white overflow-hidden">
      {/* Hero Section — Dark immersive */}
      <Hero />

      {/* Industries Preview */}
      <IndustriesPreview />

      {/* How It Works Section — Dark */}
      <HowItWorks />

      {/* For Developers Section */}
      <DevelopersSection />

      {/* For Businesses Section */}
      <BusinessSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </main>
  );
}


