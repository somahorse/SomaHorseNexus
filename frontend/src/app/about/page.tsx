"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Factory,
  Layers,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Footer from "@/components/Footer";

const systemPillars = [
  {
    title: "Talent Foundry",
    description:
      "Assessment gates entry, real project deliverables build proof, and verification is tied to outcomes, not resumes.",
    icon: Sparkles,
    highlights: ["Assessment -> projects -> verification", "Certified AI-ready talent pool", "Verifiable portfolios"],
  },
  {
    title: "Industrial Solutions Hub",
    description:
      "A catalog of AI blueprints matched to teams. We manage initiation, delivery, approval, and payment.",
    icon: Layers,
    highlights: ["Solution catalog + tiers", "Project orchestration", "End-to-end delivery"],
  },
  {
    title: "Capital & Impact Dashboard",
    description:
      "Live KPIs show developer earnings, partner efficiency gains, completion rates, and ecosystem health.",
    icon: BarChart3,
    highlights: ["Economic impact tracking", "Revenue + retention metrics", "Ecosystem health signals"],
  },
];

const workingLoop = [
  "Talent signs up and completes a streamlined assessment.",
  "Client selects a tool (Credit Scoring, Fraud Detection, or Unified Payments) and submits a request.",
  "Admin matches verified talent to the project.",
  "Talent submits a delivery artifact; client reviews and approves.",
  "Payment is recorded with a 60/40 split and dashboards update in real time.",
];

const industries = [
  { title: "Fintech", detail: "Credit scoring, fraud detection, and payments infrastructure." },
  { title: "AgriTech", detail: "Yield optimization, supply chain visibility, and pricing intelligence." },
  { title: "HealthTech", detail: "Triage support, operational analytics, and care logistics." },
  { title: "Education", detail: "Learning analytics, adaptive pathways, and workforce readiness." },
  { title: "Manufacturing", detail: "Predictive maintenance, quality control, and demand planning." },
];

const fintechTools = [
  {
    title: "Credit Scoring",
    detail: "Alternative data models for thin-file customers and SME underwriting.",
  },
  {
    title: "Fraud Detection",
    detail: "Real-time anomaly detection for digital payments and onboarding flows.",
  },
  {
    title: "Unified Payment Gateway",
    detail: "Multi-rail payments orchestration with compliance-ready reporting.",
  },
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

const teamMembers = [
  { name: "Uchenna Ngubane", role: "Founder & CEO", country: "South Africa" },
  { name: "Sorotiah Mazando", role: "Chief Technology Officer", country: "Zimbabwe" },
  { name: "Nokwazi Xaba", role: "Chief Product Officer", country: "South Africa" },
  { name: "Nkululeko Menziwa", role: "Head Of Sales And Outreach", country: "South Africa" },
  { name: "Nkosinathi Ngwenya", role: "Full Stack Dev", country: "South Africa" },
  { name: "Salami Abiodun", role: "Full Stack Dev", country: "Nigeria" },
  { name: "Chizua Akabike", role: "Head of Nigerian Operations", country: "Nigeria" },
  { name: "Mohamed Massoud", role: "Full Stack Dev", country: "Egypt" },
];

export default function AboutPage() {
  return (
    <main
      className="flex min-h-screen flex-col bg-white text-slate-900"
      style={
        {
          "--nexus-teal": "#4f46e5",
          "--nexus-sun": "#8b5cf6",
          "--nexus-ink": "#0b1020",
        } as CSSProperties
      }
    >
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(79,70,229,0.28)_0%,_rgba(79,70,229,0)_68%)] blur-2xl" />
          <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(139,92,246,0.25)_0%,_rgba(139,92,246,0)_70%)] blur-2xl" />
          <div className="absolute left-10 top-24 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(15,23,42,0.14)_0%,_rgba(15,23,42,0)_70%)] blur-2xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal direction="up" delay={0.1} className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">
              <Sparkles size={14} className="text-[var(--nexus-teal)]" />
              About Somahorse Nexus
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              Africa&apos;s greatest asset is its young, growing population.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--nexus-teal)] via-indigo-500 to-[var(--nexus-sun)]">
                We turn potential into progress.
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-slate-600">
              Somahorse Nexus builds the infrastructure that connects Africa&apos;s technical talent with the complex
              challenges of its most important industries, creating a new engine for economic growth.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--nexus-ink)] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/20 transition-transform hover:scale-105"
              >
                Join as Talent
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
              >
                Request a Proposal
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission + System */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <ScrollReveal direction="right">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--nexus-teal)]">
                  What Somahorse Nexus Is
                </p>
                <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  An Africa AI Talent Operating System, not a job board, not a freelance marketplace, not traditional
                  recruitment.
                </h2>
                <p className="mt-6 text-base leading-relaxed text-slate-600">
                  We operate a vertically integrated factory that transforms raw technical talent into verified,
                  deployable skill through real deliverables, matches that talent to industry problems, and delivers
                  complete AI/software solutions end-to-end. Success is measured by functional solutions and commercial
                  readiness, not certificates.
                </p>
                <div className="mt-6 grid gap-4">
                  {[
                    "Transforms potential into verified skill with real projects.",
                    "Matches verified teams to industry-grade problems.",
                    "Delivers complete solutions with measurable impact.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle2 size={20} className="mt-1 text-[var(--nexus-teal)]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2}>
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--nexus-ink)]">
                  How the system works
                </p>
                <div className="mt-6 space-y-6">
                  {systemPillars.map((pillar) => (
                    <div key={pillar.title} className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                        <pillar.icon size={22} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{pillar.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {pillar.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Working Loop */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">The MVP working loop</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              One end-to-end delivery cycle that proves the business model.
            </h2>
            <p className="mt-4 text-base text-slate-600">
              We focus on a demonstrable loop before expanding into advanced AI matching, MLOps, or deeper industry
              personalization.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <ScrollReveal direction="right">
              <div className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-2xl">
                <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
                  <Rocket size={18} />
                  MVP Loop
                </div>
                <h3 className="mt-4 text-2xl font-bold">From onboarding to approved delivery.</h3>
                <p className="mt-4 text-sm text-slate-200">
                  The loop keeps everyone accountable: talent readiness, client value, and platform economics.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold">
                    60% Developer Share
                  </div>
                  <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold">
                    40% Platform Share
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.2}>
              <ol className="space-y-4">
                {workingLoop.map((step, index) => (
                  <li key={step} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--nexus-teal)] text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Industries + Fintech tools */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <ScrollReveal direction="right">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                  Industries we unlock
                </p>
                <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  Starting with Fintech, expanding across Africa&apos;s critical sectors.
                </h2>
                <p className="mt-4 text-base text-slate-600">
                  Somahorse Nexus connects verified talent to real industry problems in Fintech, AgriTech, HealthTech,
                  Education, and Manufacturing.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {industries.map((industry) => (
                    <div key={industry.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <h3 className="text-base font-semibold text-slate-900">{industry.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{industry.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.2}>
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--nexus-sun)]">
                  <Target size={16} />
                  Fintech tools
                </div>
                <h3 className="mt-4 text-2xl font-bold text-slate-900">Initial catalog focus</h3>
                <p className="mt-3 text-sm text-slate-600">
                  For the MVP, these offerings can be demo pages with structured descriptions and request flows. The
                  focus is the platform workflow, not full production AI in week one.
                </p>
                <div className="mt-6 space-y-4">
                  {fintechTools.map((tool) => (
                    <div key={tool.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <h4 className="text-base font-semibold text-slate-900">{tool.title}</h4>
                      <p className="mt-2 text-sm text-slate-600">{tool.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Delivery Standards + Metrics */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <ScrollReveal direction="right">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Delivery standards</p>
                <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  Built for verification and commercial readiness.
                </h2>
                <p className="mt-4 text-base text-slate-600">
                  Every project runs through clear gates: assessment, assignment, delivery, approval, and payment.
                  That keeps talent accountable, clients confident, and outcomes measurable.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {deliveryStandards.map((standard) => (
                    <div key={standard.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="mt-1 text-[var(--nexus-teal)]" />
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">{standard.title}</h3>
                          <p className="mt-2 text-sm text-slate-600">{standard.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.2}>
              <div className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-xl">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
                  <BarChart3 size={18} />
                  Impact dashboard
                </div>
                <h3 className="mt-4 text-2xl font-bold">Live metrics for the ecosystem.</h3>
                <p className="mt-3 text-sm text-slate-200">
                  We measure success by functional solutions and commercial readiness, not certificates.
                </p>
                <div className="mt-6 grid gap-4">
                  {impactMetrics.map((metric) => (
                    <div key={metric.label} className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">{metric.label}</p>
                      <p className="mt-2 text-sm font-semibold text-white">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Our team</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              A pan-African leadership team building the future.
            </h2>
            <p className="mt-4 text-base text-slate-600">
              We operate across South Africa, Zimbabwe, Nigeria, and Egypt with a shared mission to build economic
              opportunity through AI-ready talent.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <ScrollReveal key={member.name} delay={0.1}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--nexus-teal)]">
                    {member.country}
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{member.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{member.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal className="rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.2),_rgba(255,255,255,0.9))] p-10 text-center shadow-sm">
            <div className="mx-auto flex max-w-3xl flex-col items-center">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                <Factory size={16} />
                Build with Somahorse Nexus
              </div>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Let&apos;s turn Africa&apos;s talent into global solutions.
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Whether you&apos;re a developer ready to prove your skills or a business seeking an AI partner, we can
                build the next milestone together.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--nexus-ink)] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/25 transition-transform hover:scale-105"
                >
                  Start the journey
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
                >
                  Explore industries
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

