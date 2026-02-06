"use client";

import type { ComponentType, CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  ChevronDown,
  Factory,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Footer from "@/components/Footer";

type Industry = {
  id: string;
  title: string;
  summary: string;
  image: string;
  icon: ComponentType<{ size?: number }>;
  focusAreas: string[];
  solutions: string[];
  outcomes: string[];
  impact: string[];
};

const industries: Industry[] = [
  {
    id: "fintech",
    title: "Fintech",
    summary:
      "Build secure, scalable financial infrastructure that unlocks access for consumers, SMEs, and enterprise partners.",
    image: "/industries/fintech.png",
    icon: BarChart3,
    focusAreas: ["Credit scoring", "Fraud detection", "Unified payments", "Compliance analytics"],
    solutions: [
      "Alternative data underwriting models",
      "Real-time fraud detection pipelines",
      "Multi-rail payment orchestration",
      "Regulatory reporting dashboards",
    ],
    outcomes: ["Lower default rates", "Faster onboarding", "Higher transaction trust"],
    impact: ["Risk visibility in days, not weeks", "Reduced fraud exposure", "Unified payment operations"],
  },
  {
    id: "agritech",
    title: "AgriTech",
    summary:
      "Elevate agribusiness with data-driven yield optimization, pricing intelligence, and supply chain visibility.",
    image: "/industries/agritech.png",
    icon: Sparkles,
    focusAreas: ["Yield forecasting", "Market pricing", "Inventory visibility", "Farm-to-market logistics"],
    solutions: [
      "Crop yield prediction models",
      "Demand and pricing optimization",
      "Supplier and inventory dashboards",
      "Logistics and route optimization",
    ],
    outcomes: ["Improved margin stability", "Reduced spoilage", "Smarter production planning"],
    impact: ["Higher farmer earnings", "Stronger regional supply chains", "Data-backed market access"],
  },
  {
    id: "healthtech",
    title: "HealthTech",
    summary:
      "Improve patient outcomes and operational efficiency with AI-ready workflows for clinical and operational teams.",
    image: "/industries/healthtech.png",
    icon: ShieldCheck,
    focusAreas: ["Triage support", "Care logistics", "Operational analytics", "Patient engagement"],
    solutions: [
      "Triage decision support tools",
      "Clinic operations dashboards",
      "Capacity and staffing models",
      "Patient engagement workflows",
    ],
    outcomes: ["Reduced wait times", "Improved care coordination", "Higher staff utilization"],
    impact: ["Faster patient throughput", "Operational cost visibility", "Better care continuity"],
  },
  {
    id: "education",
    title: "Education",
    summary:
      "Enable personalized learning, workforce readiness, and data-driven oversight for education providers.",
    image: "/industries/education.png",
    icon: Target,
    focusAreas: ["Learning analytics", "Adaptive pathways", "Assessment insights", "Workforce readiness"],
    solutions: [
      "Student performance dashboards",
      "Adaptive learning pathways",
      "Assessment scoring automation",
      "Program impact measurement",
    ],
    outcomes: ["Improved learning outcomes", "Faster skill verification", "Stronger program retention"],
    impact: ["Higher completion rates", "Better learner engagement", "Clear ROI on training"],
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    summary:
      "Deliver predictive maintenance, quality control, and demand planning with integrated data workflows.",
    image: "/industries/manufacturing.png",
    icon: Factory,
    focusAreas: ["Predictive maintenance", "Quality control", "Demand planning", "Production analytics"],
    solutions: [
      "Machine health monitoring",
      "Quality inspection analytics",
      "Demand forecasting models",
      "Production throughput dashboards",
    ],
    outcomes: ["Reduced downtime", "Higher yield quality", "Smarter capacity planning"],
    impact: ["Lower maintenance costs", "Improved supply alignment", "Clear production KPIs"],
  },
];

const pillars = [
  {
    title: "Verified delivery",
    detail: "Every industry engagement is built on assessment-gated talent and milestone verification.",
    icon: BadgeCheck,
  },
  {
    title: "Blueprint-driven",
    detail: "We start with proven AI blueprints to accelerate scoping and reduce delivery risk.",
    icon: Layers,
  },
  {
    title: "Impact visibility",
    detail: "Dashboards track ROI, earnings, completion rates, and ecosystem health signals ORI.",
    icon: BarChart3,
  },
];

export default function IndustriesPage() {
  const [activeIndustry, setActiveIndustry] = useState<Industry | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const dragStartY = useRef<number | null>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!activeIndustry) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndustry(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndustry]);

  const closeDrawer = () => {
    setDragOffset(0);
    setActiveIndustry(null);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    dragStartY.current = event.touches[0]?.clientY ?? null;
    isDragging.current = true;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || dragStartY.current === null) return;
    const currentY = event.touches[0]?.clientY ?? dragStartY.current;
    const nextOffset = Math.max(0, currentY - dragStartY.current);
    setDragOffset(nextOffset);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    if (dragOffset > 120) {
      closeDrawer();
      return;
    }
    setDragOffset(0);
  };

  const isOpen = Boolean(activeIndustry);

  return (
    <main
      className="flex min-h-screen flex-col bg-white text-slate-900"
      style={
        {
          "--nexus-primary": "#4f46e5",
          "--nexus-secondary": "#7c3aed",
          "--nexus-ink": "#0b1020",
        } as CSSProperties
      }
    >
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(79,70,229,0.28)_0%,_rgba(79,70,229,0)_68%)] blur-2xl" />
          <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(124,58,237,0.25)_0%,_rgba(124,58,237,0)_70%)] blur-2xl" />
          <div className="absolute left-10 top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(15,23,42,0.18)_0%,_rgba(15,23,42,0)_70%)] blur-2xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal direction="up" delay={0.1} className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">
              <Sparkles size={14} className="text-[var(--nexus-primary)]" />
              Industries
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              We build industry-grade AI systems across Africa&apos;s most critical sectors.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--nexus-primary)] via-indigo-500 to-[var(--nexus-secondary)]">
                Each industry has a tailored delivery loop.
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-slate-600">
              Somahorse Nexus combines verified talent, blueprint-driven solutions, and measurable impact to unlock
              growth in Fintech, AgriTech, HealthTech, Education, and Manufacturing.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--nexus-ink)] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/20 transition-transform hover:scale-105"
              >
                Request an industry brief
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
              >
                Explore services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Industry Cards */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Industry focus</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Each industry gets a dedicated delivery playbook.
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <div
                key={industry.id}
                className="group relative h-[480px] overflow-hidden rounded-[2rem] shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Image */}
                <Image
                  src={industry.image}
                  alt={`${industry.title} illustration`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  {/* Title */}
                  <h3 className="text-3xl font-bold text-white tracking-tight mb-3">
                    {industry.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/80 leading-relaxed mb-5 line-clamp-3">
                    {industry.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white">
                      <industry.icon size={12} />
                      {industry.focusAreas[0]}
                    </span>
                    <span className="rounded-full bg-white/15 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white">
                      {industry.focusAreas.length} Focus Areas
                    </span>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => setActiveIndustry(industry)}
                    className="w-full rounded-full bg-white py-3.5 text-sm font-bold text-slate-900 shadow-lg transition-all duration-300 hover:bg-slate-100 hover:shadow-xl active:scale-[0.98]"
                  >
                    Explore {industry.title}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">How we deliver</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Built to move from discovery to measurable impact.
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <ScrollReveal key={pillar.title} delay={0.1 * index}>
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <pillar.icon size={20} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{pillar.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{pillar.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <ScrollReveal className="rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.2),_rgba(255,255,255,0.9))] p-10 text-center shadow-sm">
            <div className="mx-auto flex max-w-3xl flex-col items-center">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                <Factory size={16} />
                Industry delivery
              </div>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Ready to activate your industry roadmap?
              </h2>
              <p className="mt-4 text-base text-slate-600">
                We build verified teams, align on measurable outcomes, and deliver solutions that scale.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--nexus-ink)] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/25 transition-transform hover:scale-105"
                >
                  Talk to our team
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
                >
                  View services
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      {/* Modal / Drawer */}
      {isMounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[999] transition-opacity duration-300 ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
              }`}
          >
            <button
              type="button"
              aria-label="Close industry detail"
              onClick={closeDrawer}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Desktop modal */}
            <div
              className={`absolute left-1/2 top-1/2 hidden w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 md:block transition-all duration-300 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
            >
              {activeIndustry && (
                <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl">
                  {/* Hero Section with Image */}
                  <div className="relative h-64 w-full">
                    <Image
                      src={activeIndustry.image}
                      alt={`${activeIndustry.title} illustration`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                    {/* Close button */}
                    <button
                      type="button"
                      onClick={closeDrawer}
                      className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white">
                          <activeIndustry.icon size={12} />
                          Industry Playbook
                        </span>
                      </div>
                      <h3 className="text-4xl font-bold text-white tracking-tight">{activeIndustry.title}</h3>
                      <p className="mt-2 text-sm text-white/80 max-w-xl">{activeIndustry.summary}</p>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    {/* Focus Areas Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {activeIndustry.focusAreas.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Two Column Content */}
                    <div className="grid gap-8 lg:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                          Example Solutions
                        </h4>
                        <div className="space-y-3">
                          {activeIndustry.solutions.map((item) => (
                            <div key={item} className="flex items-start gap-3 text-slate-700">
                              <BadgeCheck size={18} className="mt-0.5 text-indigo-500 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                          Outcomes We Track
                        </h4>
                        <div className="space-y-3">
                          {activeIndustry.outcomes.map((item) => (
                            <div key={item} className="flex items-start gap-3 text-slate-700">
                              <BadgeCheck size={18} className="mt-0.5 text-emerald-500 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                        <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mt-6 mb-4">
                          Impact Signals
                        </h4>
                        <div className="space-y-3">
                          {activeIndustry.impact.map((item) => (
                            <div key={item} className="flex items-start gap-3 text-slate-700">
                              <BadgeCheck size={18} className="mt-0.5 text-violet-500 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <Link
                        href="/contact"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-slate-800 hover:shadow-xl"
                      >
                        Request {activeIndustry.title} Playbook
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile bottom drawer */}
            <div
              className={`absolute inset-x-0 bottom-0 block md:hidden transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"
                }`}
              style={isOpen ? { transform: `translateY(${dragOffset}px)` } : undefined}
            >
              <div
                className="rounded-t-[2rem] bg-white shadow-2xl max-h-[85vh] overflow-y-auto"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Drag handle */}
                <div className="sticky top-0 bg-white pt-4 pb-2">
                  <div className="mx-auto h-1.5 w-12 rounded-full bg-slate-200" />
                </div>

                {activeIndustry && (
                  <div className="px-6 pb-8">
                    {/* Title Section */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                        <activeIndustry.icon size={12} />
                        Industry Playbook
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{activeIndustry.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{activeIndustry.summary}</p>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {activeIndustry.focusAreas.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Outcomes */}
                    <div className="mt-6">
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">
                        Outcomes We Track
                      </h4>
                      <div className="space-y-2">
                        {activeIndustry.outcomes.map((item) => (
                          <div key={item} className="flex items-start gap-2 text-slate-700">
                            <BadgeCheck size={16} className="mt-0.5 text-emerald-500 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-6">
                      <Link
                        href="/contact"
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 py-4 text-sm font-bold text-white shadow-lg"
                      >
                        Request {activeIndustry.title} Playbook
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}
