"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CreditCard,
  Factory,
  GraduationCap,
  HeartPulse,
  Layers,
  Leaf,
  MapPin,
  Rocket,
  Sparkles,
  Target,
  Zap,
  Globe,
  Shield,
  TrendingUp,
  Users,
  Cpu,
  Lightbulb,
  Award,
  Activity,
  BadgeCheck,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Footer from "@/components/Footer";
import { sectorCatalog, type Sector } from "@/lib/solutions-data";
import { systemPillars } from "@/data/system_pillars_data";
import AboutUsHero from "@/components/about-page/AboutUsHero";
import MissionSection from "@/components/about-page/Mission";
import WorkingLoop from "@/components/about-page/WorkingLoop";
import TeamMemberSection from "@/components/about-page/TeamSection";
import CTA_Section from "@/components/about-page/CTA_section";


const sectorIcons: Record<Sector, typeof CreditCard> = {
  fintech: CreditCard,
  agriculture: Leaf,
  healthcare: HeartPulse,
  education: GraduationCap,
  manufacturing: Factory,
};

const sectorGradients: Record<Sector, string> = {
  fintech: "from-indigo-500 to-blue-600",
  agriculture: "from-emerald-500 to-teal-600",
  healthcare: "from-rose-500 to-pink-600",
  education: "from-violet-500 to-purple-600",
  manufacturing: "from-cyan-500 to-blue-600",
};

const engagementIncludes = [
  "A dedicated project lead",
  "A verified AI delivery team",
  "Deployment into a secure, production-ready environment",
  "Post-deployment performance audit",
  "Platform support during the warranty period",
];

const deliveryStandards = [
  {
    title: "Assessment-gated readiness",
    description: "Talent access is unlocked only after real project deliverables prove capability.",
  },
  {
    title: "Milestone-based delivery",
    description: "Every engagement is scoped, tracked, and verified through clear milestones.",
  },
  {
    title: "Client approval workflow",
    description: "Delivery artifacts are reviewed and approved before payments are recorded.",
  },
  {
    title: "Transparent revenue split",
    description: "The 60/40 developer-platform split is logged and visible in dashboards.",
  },
];

const impactMetrics = [
  { label: "Developer earnings tracked", value: "60/40 split visibility" },
  { label: "Client efficiency gains", value: "ROI + delivery metrics" },
  { label: "Completion rates", value: "Milestone-level tracking" },
  { label: "Ecosystem health", value: "Retention + pipeline KPIs" },
];



export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      {/* Hero — Dark Immersive */}
      <AboutUsHero />

      {/* Mission — Light */}
      <MissionSection />

      {/* Working Loop — Dark */}
      <WorkingLoop />


      {/* All Engagements Include */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-emerald-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700 mb-6">
              <Shield size={14} />
              Every engagement includes
            </div>
            <h2 className="text-3xl font-black text-slate-900 md:text-4xl tracking-tight">
              Enterprise-grade{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">delivery standards</span>{" "}
              as standard.
            </h2>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 place-items-center justify-center justify-items-center gap-4">
            {engagementIncludes.map((item, i) => (
              <ScrollReveal key={item} delay={i * 0.08} className="w-full! h-full! " >
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                  <BadgeCheck size={20} className="mt-0.5 text-emerald-500 shrink-0" />
                  <p className="text-sm font-semibold text-slate-800">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries — All 5 Sectors */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-violet-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-600 mb-6 shadow-sm">
              <Globe size={14} className="text-indigo-500" />
              5 Sectors · 15 Solutions
            </div>
            <h2 className="text-3xl font-black text-slate-900 md:text-5xl tracking-tight">
              Starting with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">Fintech</span>,
              expanding everywhere.
            </h2>
            <p className="mt-6 text-lg text-slate-500">
              We deliver tailored AI solutions across Africa&apos;s most critical sectors.
            </p>
          </ScrollReveal>

          {/* Sector Cards with solution counts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto mb-10">
            {sectorCatalog.map((sector, i) => {
              const Icon = sectorIcons[sector.id];
              const gradient = sectorGradients[sector.id];
              return (
                <ScrollReveal key={sector.id} delay={i * 0.08}>
                  <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 text-center">
                    <div className={`w-11 h-11 rounded-xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-br ${gradient} text-white shadow-md`}>
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{sector.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-2">{sector.description}</p>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                      {sector.solutions.length} solutions
                    </span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          <ScrollReveal delay={0.3} className="text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              View full pricing catalogue
              <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Delivery Standards + Metrics — Light with Dark Card */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-indigo-50/80 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700 mb-6">
              <Shield size={14} />
              Delivery Standards
            </div>
            <h2 className="text-3xl font-black text-slate-900 md:text-5xl tracking-tight">
              Built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">verification</span>
              {" "}and commercial readiness.
            </h2>
            <p className="mt-6 text-lg text-slate-500">
              Every project runs through clear gates — keeping talent accountable, clients confident, and outcomes measurable.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left: Standards Grid */}
            <ScrollReveal direction="right">
              <div className="grid sm:grid-cols-2 gap-4 h-full">
                {deliveryStandards.map((standard, i) => {
                  const colors = [
                    "border-l-indigo-500 bg-indigo-50/50",
                    "border-l-violet-500 bg-violet-50/50",
                    "border-l-cyan-500 bg-cyan-50/50",
                    "border-l-emerald-500 bg-emerald-50/50",
                  ];
                  const iconColors = ["text-indigo-600", "text-violet-600", "text-cyan-600", "text-emerald-600"];
                  return (
                    <div key={standard.title} className={`rounded-2xl border border-slate-200 border-l-4 ${colors[i]} p-5 hover:shadow-md transition-all duration-300`}>
                      <CheckCircle2 size={20} className={`mb-3 ${iconColors[i]}`} />
                      <h3 className="font-bold text-slate-900 mb-2">{standard.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{standard.description}</p>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Right: Impact Dashboard (Dark) */}
            <ScrollReveal direction="left" delay={0.15}>
              <div className="rounded-3xl bg-slate-950 p-8 shadow-2xl shadow-slate-900/30 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                      <BarChart3 size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Impact Dashboard</h3>
                      <p className="text-xs text-slate-500">Live ecosystem metrics</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {impactMetrics.map((metric, i) => {
                      const barColors = [
                        "from-emerald-400 to-emerald-500",
                        "from-cyan-400 to-blue-500",
                        "from-violet-400 to-purple-500",
                        "from-amber-400 to-orange-500",
                      ];
                      const widths = ["w-[85%]", "w-[72%]", "w-[90%]", "w-[65%]"];
                      return (
                        <div key={metric.label} className="rounded-xl bg-white/[0.06] border border-white/10 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-slate-400">{metric.label}</p>
                            <p className="text-xs font-bold text-white">{metric.value}</p>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full ${widths[i]} bg-gradient-to-r ${barColors[i]} rounded-full`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <p className="mt-6 text-xs text-slate-600 text-center">
                    Success is measured by functional solutions — not certificates.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <TeamMemberSection />


      {/* CTA */}
      <CTA_Section />


      <Footer />
    </main>
  );
}

