"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  CreditCard,
  Factory,
  GraduationCap,
  HeartPulse,
  Layers,
  Leaf,
  Shield,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Footer from "@/components/Footer";
import { sectorCatalog, type Sector } from "@/lib/solutions-data";

/* ── Data ──────────────────────────────────────────────────── */

type Service = {
  id: string;
  title: string;
  summary: string;
  outcomes: string[];
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
    icon: Sparkles,
  },
  {
    id: "solutions-hub",
    title: "Industrial Solutions Hub",
    summary:
      "Select an AI blueprint, choose a tier, and let Somahorse Nexus orchestrate delivery from kickoff to approval.",
    outcomes: ["Blueprint-led project scoping", "Milestone-driven execution", "Client approval workflow"],
    icon: Layers,
  },
  {
    id: "impact-dashboard",
    title: "Capital & Impact Dashboard",
    summary:
      "Live KPIs track developer earnings, client efficiency gains, completion rates, and ecosystem health.",
    outcomes: ["Economic impact visibility", "Performance and retention metrics", "Ecosystem health signals"],
    icon: BarChart3,
  },
];

const tiers = [
  {
    title: "Basic",
    price: "From R10,000",
    detail:
      "Rapid prototype for validation. Essential features, demo-ready outputs, and a clear delivery roadmap. Ideal for testing your concept before full integration.",
  },
  {
    title: "Standard",
    price: "From R40,000",
    detail:
      "Production-ready solution with live integrations, dashboards, and stakeholder reporting. Built for growing businesses needing real operational tools.",
    featured: true,
  },
  {
    title: "Premium",
    price: "From R120,000",
    detail:
      "Enterprise-grade deployment with advanced integrations, compliance support, continuous optimisation, and dedicated project management.",
  },
];

const engagementIncludes = [
  "A dedicated project lead",
  "A verified AI delivery team",
  "Deployment into a secure, production-ready environment",
  "Post-deployment performance audit",
  "Platform support during the warranty period",
];

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

const processSteps = [
  { title: "Discovery", detail: "Align on scope, success metrics, and tier selection.", icon: Target },
  { title: "Match", detail: "Verified teams are assigned based on skills and delivery fit.", icon: BadgeCheck },
  { title: "Delivery", detail: "Milestones, reviews, and handover with clear accountability.", icon: Factory },
  { title: "Impact", detail: "Dashboards track ROI, earnings, and ecosystem health.", icon: BarChart3 },
];

export default function ServicePageClient() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      {/* Hero — Dark immersive */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 bg-slate-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-[15%] w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col  items-center justify-center">
          <ScrollReveal direction="up" delay={0.1} className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 mb-6">
              <Zap size={14} className="text-cyan-400" />
              Services
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl leading-[0.95]">
              Verified Talent.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500">
                Industry-Grade Solutions.
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-slate-400">
              A vertically integrated operating system that transforms raw talent into deployable
              teams and connects them to real industry problems with end-to-end delivery.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/20 transition-transform hover:scale-105"
              >
                Request a proposal
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                View full pricing
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600">Core services</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Three engines working together to deliver outcomes.
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} delay={0.1 * index}>
                <div className="group h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-cyan-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 text-cyan-600 group-hover:from-cyan-500/20 group-hover:to-violet-500/20 transition-colors">
                    <service.icon size={22} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{service.summary}</p>
                  <div className="mt-6 space-y-2">
                    {service.outcomes.map((outcome) => (
                      <div key={outcome} className="flex items-start gap-2 text-sm text-slate-700">
                        <BadgeCheck size={15} className="mt-0.5 text-cyan-500 shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What Every Engagement Includes */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700 mb-6">
              <Shield size={14} />
              Included with every project
            </div>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Every engagement comes standard.
            </h2>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-4">
              {engagementIncludes.map((item, i) => (
                <ScrollReveal key={item} delay={i * 0.08} className="w-full! " >
                  <div className="flex w-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                    <BadgeCheck size={20} className="mt-0.5 text-emerald-500 shrink-0" />
                    <p className="text-sm font-semibold text-slate-800">{item}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Tiers */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/8 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
              Engagement tiers
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Choose the intensity that matches your roadmap.
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {tiers.map((tier, index) => (
              <ScrollReveal key={tier.title} delay={0.1 * index} className={`rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 ${tier.featured
                ? "bg-gradient-to-br from-white/[0.12] to-white/[0.04] border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                : "bg-white/5 border border-white/10 hover:border-cyan-500/30"
                }`} >
                {tier.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-300 border border-cyan-500/30 mb-4">
                    <Sparkles size={12} />
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-white">{tier.title}</h3>
                <p className="mt-2 text-sm font-semibold text-cyan-400">{tier.price}</p>
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">{tier.detail}</p>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.3} className="mt-8 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              See detailed pricing for all 15 solutions
              <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Cross-Sector Solutions Preview */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <ScrollReveal direction="right">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600">
                  Solutions across 5 sectors
                </p>
                <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  15 AI solutions tailored for Africa&apos;s key industries.
                </h2>
                <p className="mt-4 text-base text-slate-600">
                  Each solution is offered in three transparent tiers so you can select the level
                  that aligns with your operational needs and strategic goals.
                </p>
                <div className="mt-8 space-y-3">
                  {sectorCatalog.map((sector) => {
                    const Icon = sectorIcons[sector.id];
                    const gradient = sectorGradients[sector.id];
                    return (
                      <div
                        key={sector.id}
                        className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-cyan-200 hover:shadow-md transition-all flex items-center gap-4"
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-slate-900">{sector.name}</h3>
                          <p className="text-sm text-slate-500 truncate">{sector.description}</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 shrink-0">
                          {sector.solutions.length}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <Link
                  href="/pricing"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
                >
                  View full pricing catalogue
                  <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.2}>
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-xl">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                  <BookOpen size={18} />
                  What you get
                </div>
                <h3 className="mt-4 text-2xl font-bold">Blueprint-driven delivery</h3>
                <div className="mt-6 space-y-4 text-sm text-slate-200">
                  {[
                    "Business requirements + data intake checklist",
                    "Milestone plan with measurable success metrics",
                    "Delivery artifact templates and demo assets",
                    "Compliance and security review pathway",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <BadgeCheck size={18} className="mt-1 text-cyan-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Developer Partnership */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal className="max-w-4xl mx-auto">
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 lg:p-10 shadow-sm">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 mb-4">
                    <Users size={14} />
                    Developer Partnership
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">60/40 Revenue Share</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    Developers earn 60% of the project fee — ensuring fair, high-value compensation.
                    The platform retains 40% to cover operations, sales, support, and continued scaling.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-950 p-6 text-white">
                  <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">
                    Example: Standard Fraud Detection (R100,000)
                  </p>
                  <div className="space-y-3">
                    <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-400 text-sm font-bold">Developer</span>
                        <span className="text-lg font-black">R60,000</span>
                      </div>
                    </div>
                    <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-400 text-sm font-bold">Platform</span>
                        <span className="text-lg font-black">R40,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600">
              Delivery process
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              A clear loop from discovery to impact.
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.title} delay={0.1 * index}>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-cyan-200">
                  <div className="text-5xl font-black text-slate-100 mb-4">0{index + 1}</div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 text-cyan-600">
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
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <ScrollReveal className="flex flex-col items-center  mx-auto">
            <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">
              Ready to deliver an industry-grade solution?
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              We design the loop, assemble verified teams, and measure impact from day one.
            </p>
            <div className=" w-full justify-center flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:scale-105"
              >
                Start a project
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                View pricing catalogue
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
