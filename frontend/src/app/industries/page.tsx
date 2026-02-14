"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  ChevronDown,
  CreditCard,
  Factory,
  GraduationCap,
  HeartPulse,
  Layers,
  Leaf,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Footer from "@/components/Footer";
import { sectorCatalog, type Sector } from "@/lib/solutions-data";

/* ── Sector Visual Config ────────────────────────────────── */

const sectorMeta: Record<
  Sector,
  { icon: typeof CreditCard; gradient: string; accent: string; cardBg: string }
> = {
  fintech: {
    icon: CreditCard,
    gradient: "from-indigo-500 to-blue-600",
    accent: "text-indigo-600",
    cardBg: "bg-indigo-50/50",
  },
  agriculture: {
    icon: Leaf,
    gradient: "from-emerald-500 to-teal-600",
    accent: "text-emerald-600",
    cardBg: "bg-emerald-50/50",
  },
  healthcare: {
    icon: HeartPulse,
    gradient: "from-rose-500 to-pink-600",
    accent: "text-rose-600",
    cardBg: "bg-rose-50/50",
  },
  education: {
    icon: GraduationCap,
    gradient: "from-violet-500 to-purple-600",
    accent: "text-violet-600",
    cardBg: "bg-violet-50/50",
  },
  manufacturing: {
    icon: Factory,
    gradient: "from-cyan-500 to-blue-600",
    accent: "text-cyan-600",
    cardBg: "bg-cyan-50/50",
  },
};

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
    detail: "Dashboards track ROI, earnings, completion rates, and ecosystem health signals.",
    icon: BarChart3,
  },
];

export default function IndustriesPage() {
  const [expandedSector, setExpandedSector] = useState<Sector | null>(null);

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      {/* Hero — Dark immersive */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 bg-slate-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-[15%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal direction="up" delay={0.1} className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 mb-6">
              <Sparkles size={14} className="text-cyan-400" />
              Industries
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl leading-[0.95]">
              Sector-Specific AI for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500">
                Africa&apos;s Key Industries
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-slate-400">
              We begin with Fintech, then expand into Agriculture, Healthcare, Education, and
              Manufacturing. Each solution is offered in three transparent tiers — Basic, Standard,
              and Premium.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/20 transition-transform hover:scale-105"
              >
                Request an industry brief
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

      {/* Sector Cards */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
              5 sectors · 15 AI solutions
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Each sector gets a dedicated solution catalogue.
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {sectorCatalog.map((sector, index) => {
              const meta = sectorMeta[sector.id];
              const Icon = meta.icon;
              const isExpanded = expandedSector === sector.id;

              return (
                <ScrollReveal key={sector.id} delay={index * 0.08}>
                  <div
                    className={`group relative rounded-2xl border bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${isExpanded ? "border-cyan-300 shadow-lg ring-2 ring-cyan-500/20" : "border-slate-200"
                      }`}
                    onClick={() => setExpandedSector(isExpanded ? null : sector.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setExpandedSector(isExpanded ? null : sector.id);
                      }
                    }}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${meta.gradient} text-white shadow-md mb-4`}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{sector.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      {sector.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        {sector.solutions.length} solutions
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                          }`}
                      />
                    </div>

                    {/* Expanded solution list */}
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-80 opacity-100 mt-4 pt-4 border-t border-slate-100" : "max-h-0 opacity-0"
                        }`}
                    >
                      <div className="space-y-3">
                        {sector.solutions.map((sol) => (
                          <div key={sol.id} className={`rounded-xl ${meta.cardBg} p-3`}>
                            <p className="text-sm font-semibold text-slate-800">{sol.name}</p>
                            <p className="text-xs text-slate-500 mt-1">
                              {sol.tiers.basic.price} – {sol.tiers.premium.price}
                            </p>
                          </div>
                        ))}
                      </div>
                      <Link
                        href="/pricing"
                        className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${meta.accent} hover:underline`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        View full pricing
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/8 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
              How we deliver
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              From discovery to measurable impact.
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <ScrollReveal key={pillar.title} delay={0.1 * index}>
                <div className="rounded-3xl bg-white/5 border border-white/10 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-400">
                    <pillar.icon size={20} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm text-slate-400">{pillar.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal className="flex flex-col items-center">
            <Factory size={24} className="text-cyan-500 mb-4" />
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl mb-4">
              Ready to deploy AI in your sector?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              We build verified teams, align on measurable outcomes, and deliver solutions that
              scale.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:scale-105"
              >
                Talk to our team
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
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
