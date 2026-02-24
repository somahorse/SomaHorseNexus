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
  "Client selects a solution from our catalog (Fintech, Agriculture, Healthcare, Education, or Manufacturing) and submits a request.",
  "Admin matches verified talent to the project.",
  "Talent submits a delivery artifact; client reviews and approves.",
  "Payment is recorded with a 60/40 split and dashboards update in real time.",
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

const teamMembers = [
  {
    name: "Uchenna Ngubane",
    role: "Founder & CEO",
    country: "South Africa",
    bio: "Visionary leader driving Africa's AI talent revolution and building the bridge between potential and opportunity.",
    gradient: "from-indigo-500 to-violet-600",
    accent: "indigo",
  },
  {
    name: "Nkululeko Menziwa",
    role: "Sales Lead",
    country: "South Africa",
    bio: "Strategic growth driver forging partnerships and expanding Somahorse Nexus across the African continent.",
    gradient: "from-cyan-500 to-blue-600",
    accent: "cyan",
  },
  {
    name: "Mark Hefer",
    role: "Digital Marketer",
    country: "South Africa",
    bio: "Creative storyteller amplifying the Somahorse brand and connecting with talent and clients through digital channels.",
    gradient: "from-amber-500 to-orange-600",
    accent: "amber",
  },
  {
    name: "Minenhle Cele",
    role: "Software Engineer",
    country: "South Africa",
    bio: "Full-stack craftsman building the robust platform infrastructure that powers the entire Nexus ecosystem.",
    gradient: "from-emerald-500 to-teal-600",
    accent: "emerald",
  },
  {
    name: "Syed Hussain",
    role: "AI Engineer",
    country: "South Africa",
    bio: "Machine learning specialist designing the intelligent matching algorithms and AI solutions at the heart of the platform.",
    gradient: "from-rose-500 to-pink-600",
    accent: "rose",
  },
];

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      {/* Hero — Dark Immersive */}
      <section className="relative overflow-hidden bg-slate-950 pt-20 pb-28 lg:pt-28 lg:pb-36">
        {/* Ambient glow orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-indigo-600/25 via-violet-500/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-500/15 via-blue-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-r from-fuchsia-500/10 to-transparent rounded-full blur-3xl" />
          {/* Dot grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGN4PSIyMCIgY3k9IjIwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-60" />
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col  items-center justify-center">
          <ScrollReveal direction="up" delay={0.1} className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-2.5 mb-8">
              <Image src="/south-africa.svg" alt="South Africa" width={18} height={18} />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">About Somahorse Nexus</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95]">
              Africa&apos;s greatest asset
              <br className="hidden sm:block" />
              is its{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400">
                people.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed mx-auto">
              Somahorse Nexus delivers tailored AI solutions designed for Africa&apos;s key industries — building the operating system for Africa&apos;s AI economy.
            </p>

            {/* Stats row */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              {[
                { value: "60/40", label: "Revenue Split", icon: TrendingUp },
                { value: "5+", label: "Industries", icon: Globe },
                { value: "15", label: "AI Solutions", icon: Cpu },
                { value: "100%", label: "South African", icon: Award },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <stat.icon size={18} className="text-indigo-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-black text-lg">{stat.value}</p>
                    <p className="text-slate-500 text-xs">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:scale-105"
              >
                Join as Talent
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Request a Proposal
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Mission — Light */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-100/60 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-violet-100/50 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 mb-6">
              <Lightbulb size={14} />
              What We Are
            </div>
            <h2 className="text-3xl font-black text-slate-900 md:text-5xl tracking-tight">
              An AI Talent{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Operating System</span>
              {" "}for Africa.
            </h2>
            <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
              Not a job board. Not freelance. Not traditional recruitment. We transform raw talent into verified, deployable skill — and deliver complete AI solutions end-to-end.
            </p>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-3 max-w-5xl mx-auto place-items-center justify-center justify-items-center mb-16">
            {[
              { icon: CheckCircle2, title: "Verify", desc: "Transforms potential into verified skill with real project deliverables.", color: "indigo" },
              { icon: Users, title: "Match", desc: "Matches verified teams to industry-grade problems using intelligent algorithms.", color: "violet" },
              { icon: Rocket, title: "Deliver", desc: "Delivers complete solutions with measurable impact and transparent economics.", color: "cyan" },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1} className="group h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500  " >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${item.color === "indigo" ? "bg-indigo-100 text-indigo-600" :
                      item.color === "violet" ? "bg-violet-100 text-violet-600" :
                        "bg-cyan-100 text-cyan-600"
                    }`}>
                    <item.icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </ScrollReveal>
            ))}
          </div>

          {/* System Pillars */}
          <ScrollReveal delay={0.15} className=" mx-auto" >
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 lg:p-10 shadow-sm max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                  <Cpu size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">The Three Pillars</h3>
                  <p className="text-sm text-slate-500">How the system works under the hood</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {systemPillars.map((pillar, i) => (
                  <div key={pillar.title} className="relative">
                    {i < systemPillars.length - 1 && (
                      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-3/4 bg-slate-200" />
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white">
                        <pillar.icon size={16} />
                      </div>
                      <h4 className="font-bold text-slate-900">{pillar.title}</h4>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{pillar.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.highlights.map((h) => (
                        <span key={h} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{h}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Working Loop — Dark */}
      <section className="relative py-28 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-b from-indigo-600/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-t from-violet-600/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGN4PSIyMCIgY3k9IjIwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-indigo-300 mb-6">
              <Rocket size={14} />
              How It Works
            </div>
            <h2 className="text-3xl font-black text-white md:text-5xl tracking-tight">
              One delivery cycle.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                Proven model.
              </span>
            </h2>
            <p className="mt-6 text-lg text-slate-400">
              From talent onboarding to approved delivery — every step is tracked, verified, and transparent.
            </p>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-center">
              {/* Left: Revenue Split Card */}
              <ScrollReveal direction="right">
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                      <Activity size={18} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Revenue Economics</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-emerald-400 font-bold">Developer Share</span>
                        <span className="text-2xl font-black text-white">R60,000</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[60%] bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" />
                      </div>
                      <p className="mt-2 text-xs text-slate-500">Split per team agreement</p>
                    </div>
                    <div className="rounded-2xl bg-indigo-500/10 border border-indigo-500/20 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-indigo-400 font-bold">Platform Share</span>
                        <span className="text-2xl font-black text-white">R40,000</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[40%] bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full" />
                      </div>
                      <p className="mt-2 text-xs text-slate-500">Fuels growth and support services</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-slate-500">Example: Standard Tier Fraud Detection at R100,000</p>
                </div>
              </ScrollReveal>

              {/* Right: Steps */}
              <ScrollReveal direction="left" delay={0.15}>
                <div className="space-y-3">
                  {workingLoop.map((step, index) => {
                    const stepColors = [
                      "from-cyan-500 to-blue-600",
                      "from-indigo-500 to-violet-600",
                      "from-violet-500 to-purple-600",
                      "from-fuchsia-500 to-pink-600",
                      "from-emerald-500 to-teal-600",
                    ];
                    return (
                      <div key={step} className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.08] transition-all duration-300">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${stepColors[index]} text-white text-sm font-black shadow-lg`}>
                          {index + 1}
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed pt-2">{step}</p>
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Top fade from white */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent" />
      </section>

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
          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
            {engagementIncludes.map((item, i) => (
              <ScrollReveal key={item} delay={i * 0.08}>
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
      <section className="relative py-28 bg-slate-950 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-500/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-violet-600/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGN4PSIyMCIgY3k9IjIwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-2.5 mb-6">
              <Image src="/south-africa.svg" alt="South Africa" width={20} height={20} />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">Proudly South African</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
              Meet the team behind
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">
                the Nexus.
              </span>
            </h2>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
              A passionate South African team united by the mission to unlock Africa&apos;s AI potential and build the infrastructure for the future of work.
            </p>
          </ScrollReveal>

          {/* Founder Spotlight */}
          <ScrollReveal delay={0.1} className="mb-12">
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-1 max-w-4xl mx-auto overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative rounded-[1.25rem] bg-slate-950/80 p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="relative">
                    <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-5xl lg:text-6xl font-black shadow-2xl shadow-indigo-500/25">
                      U
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center border border-white/10">
                      <Image src="/south-africa.svg" alt="ZA" width={22} height={22} />
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-3">
                      <h3 className="text-2xl lg:text-3xl font-black text-white">Uchenna Ngubane</h3>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 w-fit mx-auto lg:mx-0">
                        <Sparkles size={12} />
                        Founder & CEO
                      </span>
                    </div>
                    <p className="text-slate-400 text-base leading-relaxed max-w-xl">
                      Visionary leader driving Africa&apos;s AI talent revolution and building the bridge between potential and opportunity. Uchenna founded Somahorse Nexus with the belief that Africa&apos;s greatest untapped resource is its people.
                    </p>
                    <div className="mt-4 flex items-center gap-2 justify-center lg:justify-start">
                      <MapPin size={14} className="text-indigo-400" />
                      <span className="text-sm text-slate-500">South Africa</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Team Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {teamMembers.slice(1).map((member, index) => {
              const gradients: Record<string, string> = {
                cyan: "from-cyan-500 to-blue-600",
                amber: "from-amber-500 to-orange-600",
                emerald: "from-emerald-500 to-teal-600",
                rose: "from-rose-500 to-pink-600",
              };
              const glows: Record<string, string> = {
                cyan: "shadow-cyan-500/20",
                amber: "shadow-amber-500/20",
                emerald: "shadow-emerald-500/20",
                rose: "shadow-rose-500/20",
              };
              const accents: Record<string, string> = {
                cyan: "text-cyan-300 bg-cyan-500/20 border-cyan-500/30",
                amber: "text-amber-300 bg-amber-500/20 border-amber-500/30",
                emerald: "text-emerald-300 bg-emerald-500/20 border-emerald-500/30",
                rose: "text-rose-300 bg-rose-500/20 border-rose-500/30",
              };
              const gradient = gradients[member.accent] || gradients.cyan;
              const glow = glows[member.accent] || glows.cyan;
              const accent = accents[member.accent] || accents.cyan;

              return (
                <ScrollReveal key={member.name} delay={0.1 + index * 0.1}>
                  <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500">
                    <div className="flex flex-col items-center text-center">
                      {/* Avatar */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl font-black shadow-xl ${glow} group-hover:scale-110 transition-transform duration-500`}>
                        {member.name.charAt(0)}
                      </div>

                      {/* Flag */}
                      <div className="mt-3 flex items-center gap-1.5">
                        <Image src="/south-africa.svg" alt="ZA" width={14} height={14} />
                        <span className="text-[11px] text-slate-500 font-medium">{member.country}</span>
                      </div>

                      {/* Info */}
                      <h3 className="mt-3 text-lg font-bold text-white">{member.name}</h3>
                      <span className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${accent}`}>
                        {member.role}
                      </span>

                      {/* Bio */}
                      <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Bottom Tagline */}
          <ScrollReveal delay={0.3} className="mt-14">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center -space-x-3">
                {teamMembers.map((member) => {
                  const gradients: Record<string, string> = {
                    indigo: "from-indigo-500 to-violet-600",
                    cyan: "from-cyan-500 to-blue-600",
                    amber: "from-amber-500 to-orange-600",
                    emerald: "from-emerald-500 to-teal-600",
                    rose: "from-rose-500 to-pink-600",
                  };
                  const gradient = gradients[member.accent] || gradients.indigo;
                  return (
                    <div
                      key={member.name}
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold ring-2 ring-slate-950`}
                    >
                      {member.name.charAt(0)}
                    </div>
                  );
                })}
              </div>
              <p className="text-sm text-slate-500 text-center">
                5 passionate individuals.&nbsp; 1 mission.&nbsp; Infinite potential.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA — Light with Gradient Accent */}
      <section className="py-28 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-indigo-100/60 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden max-w-4xl mx-auto">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGN4PSIyMCIgY3k9IjIwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-indigo-500/30 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-violet-500/20 to-transparent rounded-full blur-3xl" />

              {/* Content */}
              <div className="relative p-10 lg:p-16 text-center">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-2.5 mb-8">
                  <Image src="/south-africa.svg" alt="South Africa" width={16} height={16} />
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">Build with us</span>
                </div>

                <h2 className="text-3xl font-black text-white md:text-5xl tracking-tight mb-6">
                  Let&apos;s turn Africa&apos;s talent into
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400">
                    global solutions.
                  </span>
                </h2>

                <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">
                  Whether you&apos;re a developer ready to prove your skills or a business seeking an AI partner — let&apos;s build together.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/signup"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:scale-105"
                  >
                    Start the Journey
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Explore Industries
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

