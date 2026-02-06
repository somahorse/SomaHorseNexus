"use client";

import type { ComponentType, CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  ChevronDown,
  Factory,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Footer from "@/components/Footer";

type Service = {
  id: string;
  title: string;
  summary: string;
  outcomes: string[];
  deliverables: string[];
  timeline: string;
  tierFocus: string;
  icon: ComponentType<{ size?: number }>;
};

const services: Service[] = [
  {
    id: "talent-foundry",
    title: "Talent Foundry",
    summary:
      "Transform potential into verified, deployable skill through real deliverables and rigorous assessment gates.",
    outcomes: [
      "Assessment-gated talent readiness",
      "Verified portfolios built on live deliverables",
      "Continuous feedback loops for growth",
    ],
    deliverables: ["Aptitude + coding assessment pack", "Portfolio-ready project artifacts", "Readiness status badge"],
    timeline: "2-6 weeks onboarding",
    tierFocus: "Talent onboarding and verification",
    icon: Sparkles,
  },
  {
    id: "solutions-hub",
    title: "Industrial Solutions Hub",
    summary:
      "Select an AI blueprint, choose a tier, and let Somahorse Nexus orchestrate delivery from kickoff to approval.",
    outcomes: ["Blueprint-led project scoping", "Milestone-driven execution", "Client approval workflow"],
    deliverables: ["Project plan + milestones", "Delivery artifacts", "Approval and handover pack"],
    timeline: "4-10 weeks per solution",
    tierFocus: "Business delivery and execution",
    icon: Layers,
  },
  {
    id: "impact-dashboard",
    title: "Capital & Impact Dashboard",
    summary:
      "Live KPIs track developer earnings, client efficiency gains, completion rates, and ecosystem health.",
    outcomes: ["Economic impact visibility", "Performance and retention metrics", "Ecosystem health signals"],
    deliverables: ["KPI summaries", "Revenue split tracking", "Client ROI snapshots"],
    timeline: "Always on",
    tierFocus: "Impact measurement",
    icon: BarChart3,
  },
];

const tiers = [
  {
    title: "Basic",
    price: "Fast validation",
    detail: "Rapid prototype, essential features, and a clear delivery roadmap.",
  },
  {
    title: "Standard",
    price: "Production-ready",
    detail: "Full solution build, QA cycles, and stakeholder reporting.",
  },
  {
    title: "Premium",
    price: "Enterprise scale",
    detail: "Advanced integrations, compliance support, and ongoing optimization.",
  },
];

const fintechCatalog = [
  {
    title: "Credit Scoring",
    detail: "Alternative data models for SMEs and thin-file customers.",
  },
  {
    title: "Fraud Detection",
    detail: "Real-time anomaly detection for digital payments.",
  },
  {
    title: "Unified Payment Gateway",
    detail: "Multi-rail orchestration with compliance-ready reporting.",
  },
];

const processSteps = [
  {
    title: "Discovery",
    detail: "Align on scope, success metrics, and tier selection.",
    icon: Target,
  },
  {
    title: "Match",
    detail: "Verified teams are assigned based on skills and delivery fit.",
    icon: BadgeCheck,
  },
  {
    title: "Delivery",
    detail: "Milestones, reviews, and handover with clear accountability.",
    icon: Factory,
  },
  {
    title: "Impact",
    detail: "Dashboards track ROI, earnings, and ecosystem health.",
    icon: ShieldCheck,
  },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const dragStartY = useRef<number | null>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!activeService) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveService(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeService]);

  const closeDrawer = () => {
    setDragOffset(0);
    setActiveService(null);
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

  const isOpen = Boolean(activeService);

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
              <Zap size={14} className="text-[var(--nexus-primary)]" />
              Services
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              We deliver verified talent, industry-grade solutions, and measurable impact.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--nexus-primary)] via-indigo-500 to-[var(--nexus-secondary)]">
                Built for Africa&apos;s most ambitious teams.
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-slate-600">
              Somahorse Nexus is a vertically integrated operating system that transforms raw talent into deployable
              teams and connects them to real industry problems with end-to-end delivery.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--nexus-ink)] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/20 transition-transform hover:scale-105"
              >
                Request a proposal
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
              >
                Join as talent
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Core services</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Three engines working together to deliver outcomes.
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} delay={0.1 * index}>
                <div className="group h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <service.icon size={22} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{service.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.outcomes.slice(0, 2).map((outcome) => (
                      <span
                        key={outcome}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                      >
                        {outcome}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveService(service)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
                  >
                    View details
                    <ChevronDown size={16} />
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Tiers */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Engagement tiers</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Choose the intensity that matches your roadmap.
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {tiers.map((tier, index) => (
              <ScrollReveal key={tier.title} delay={0.1 * index}>
                <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-xl font-semibold text-slate-900">{tier.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-indigo-600">{tier.price}</p>
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed">{tier.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fintech catalog */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <ScrollReveal direction="right">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                  Fintech blueprint catalog
                </p>
                <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  Start with proven financial infrastructure.
                </h2>
                <p className="mt-4 text-base text-slate-600">
                  These are structured solution pages with clear requirements, tier selection, and delivery artifacts.
                </p>
                <div className="mt-8 space-y-4">
                  {fintechCatalog.map((tool) => (
                    <div key={tool.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                      <h3 className="text-base font-semibold text-slate-900">{tool.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{tool.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.2}>
              <div className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-xl">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
                  <BookOpen size={18} />
                  Blueprint highlights
                </div>
                <h3 className="mt-4 text-2xl font-bold">What each blueprint includes</h3>
                <div className="mt-6 space-y-4 text-sm text-slate-200">
                  {[
                    "Business requirements + data intake checklist",
                    "Milestone plan with measurable success metrics",
                    "Delivery artifact templates and demo assets",
                    "Compliance and security review pathway",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <BadgeCheck size={18} className="mt-1 text-indigo-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Delivery process</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              A clear loop from discovery to impact.
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.title} delay={0.1 * index}>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <step.icon size={20} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{step.detail}</p>
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
                Build with Somahorse Nexus
              </div>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Ready to deliver an industry-grade solution?
              </h2>
              <p className="mt-4 text-base text-slate-600">
                We design the loop, assemble verified teams, and measure impact from day one.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--nexus-ink)] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/25 transition-transform hover:scale-105"
                >
                  Start a project
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
                >
                  Join the talent pool
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
              aria-label="Close service detail"
              onClick={closeDrawer}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Desktop modal */}
            <div
              className={`absolute left-1/2 top-1/2 hidden w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 md:block transition-all duration-300 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
            >
              {activeService && (
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Service detail</p>
                      <h3 className="mt-3 text-2xl font-bold text-slate-900">{activeService.title}</h3>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed">{activeService.summary}</p>
                    </div>
                    <button
                      type="button"
                      onClick={closeDrawer}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Close
                    </button>
                  </div>
                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Outcomes</p>
                      <div className="mt-3 space-y-3 text-sm text-slate-700">
                        {activeService.outcomes.map((item) => (
                          <div key={item} className="flex items-start gap-2">
                            <BadgeCheck size={16} className="mt-0.5 text-indigo-500" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Deliverables</p>
                      <div className="mt-3 space-y-3 text-sm text-slate-700">
                        {activeService.deliverables.map((item) => (
                          <div key={item} className="flex items-start gap-2">
                            <BadgeCheck size={16} className="mt-0.5 text-indigo-500" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      Timeline: {activeService.timeline}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      Focus: {activeService.tierFocus}
                    </span>
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Request this service
                      <ArrowRight size={16} />
                    </Link>
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
                className="rounded-t-3xl border border-slate-200 bg-white p-6 shadow-2xl"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200" />
                {activeService && (
                  <>
                    <h3 className="text-xl font-bold text-slate-900">{activeService.title}</h3>
                    <p className="mt-3 text-sm text-slate-600">{activeService.summary}</p>
                    <div className="mt-4 space-y-3 text-sm text-slate-700">
                      {activeService.outcomes.slice(0, 3).map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <BadgeCheck size={16} className="mt-0.5 text-indigo-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {activeService.timeline}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {activeService.tierFocus}
                      </span>
                    </div>
                    <div className="mt-6">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                      >
                        Request this service
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}
