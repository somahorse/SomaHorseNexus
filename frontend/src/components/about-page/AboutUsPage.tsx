"use client";


import {
  BarChart3,
  CheckCircle2,
  CreditCard,
  Factory,
  GraduationCap,
  HeartPulse,
  Leaf,
  Shield,
  BadgeCheck,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Footer from "@/components/Footer";
import { type Sector } from "@/lib/solutions-data";
import AboutUsHero from "@/components/about-page/AboutUsHero";
import MissionSection from "@/components/about-page/Mission";
import WorkingLoop from "@/components/about-page/WorkingLoop";
import TeamMemberSection from "@/components/about-page/TeamSection";
import CTA_Section from "@/components/about-page/CTA_section";
import Industries from "./Industries";
import Engagements from "./Engagements";
import DeliveryStandards from "./DeliveryStandards";



export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <AboutUsHero />
      <MissionSection />
      <WorkingLoop />
      <Engagements />
      <Industries />
      <DeliveryStandards />
      <TeamMemberSection />
      <CTA_Section />
      <Footer />
    </main>
  );
}

