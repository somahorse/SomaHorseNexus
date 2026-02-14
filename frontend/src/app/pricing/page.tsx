"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    BadgeCheck,
    BarChart3,
    ChevronDown,
    ChevronRight,
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
import { sectorCatalog, type Solution, type Sector } from "@/lib/solutions-data";

/* ── Icon + Color Maps ─────────────────────────────────────── */

const sectorMeta: Record<
    Sector,
    { icon: typeof CreditCard; gradient: string; accent: string; bg: string; border: string }
> = {
    fintech: {
        icon: CreditCard,
        gradient: "from-indigo-500 to-blue-600",
        accent: "text-indigo-600",
        bg: "bg-indigo-50",
        border: "border-indigo-200",
    },
    agriculture: {
        icon: Leaf,
        gradient: "from-emerald-500 to-teal-600",
        accent: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
    },
    healthcare: {
        icon: HeartPulse,
        gradient: "from-rose-500 to-pink-600",
        accent: "text-rose-600",
        bg: "bg-rose-50",
        border: "border-rose-200",
    },
    education: {
        icon: GraduationCap,
        gradient: "from-violet-500 to-purple-600",
        accent: "text-violet-600",
        bg: "bg-violet-50",
        border: "border-violet-200",
    },
    manufacturing: {
        icon: Factory,
        gradient: "from-cyan-500 to-blue-600",
        accent: "text-cyan-600",
        bg: "bg-cyan-50",
        border: "border-cyan-200",
    },
};

const engagementIncludes = [
    { text: "A dedicated project lead", icon: Users },
    { text: "A verified AI delivery team", icon: BadgeCheck },
    { text: "Deployment into a secure, production-ready environment", icon: Shield },
    { text: "Post-deployment performance audit", icon: BarChart3 },
    { text: "Platform support during the warranty period", icon: Sparkles },
];

/* ── Solution Card Component ───────────────────────────────── */

function SolutionCard({ solution }: { solution: Solution }) {
    const [expanded, setExpanded] = useState(false);
    const meta = sectorMeta[solution.sector];
    const tiers = [
        { key: "basic" as const, label: "Basic", color: "from-slate-500 to-slate-600" },
        { key: "standard" as const, label: "Standard", color: "from-cyan-500 to-blue-600" },
        { key: "premium" as const, label: "Premium", color: "from-violet-500 to-purple-600" },
    ];

    return (
        <div
            className={`rounded-2xl border bg-white shadow-sm transition-all duration-300 overflow-hidden ${expanded ? "shadow-lg border-slate-300" : "border-slate-200 hover:shadow-md hover:-translate-y-0.5"
                }`}
        >
            {/* Header */}
            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
            >
                <div className="flex items-center gap-4 min-w-0">
                    <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${meta.gradient} text-white shadow-md`}
                    >
                        <meta.icon size={20} />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight truncate">
                            {solution.name}
                        </h3>
                        <p className="text-sm text-slate-500 mt-0.5">{solution.tagline}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {solution.tiers.basic.price} – {solution.tiers.premium.price}
                    </span>
                    <ChevronDown
                        size={20}
                        className={`text-slate-400 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                    />
                </div>
            </button>

            {/* Expanded Content */}
            <div
                className={`transition-all duration-300 ease-in-out ${expanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
            >
                <div className="px-5 sm:px-6 pb-6 pt-0">
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">{solution.description}</p>
                    <div className="grid gap-4 md:grid-cols-3">
                        {tiers.map((tier) => {
                            const data = solution.tiers[tier.key];
                            return (
                                <div
                                    key={tier.key}
                                    className={`rounded-xl border border-slate-200 p-5 transition-all hover:shadow-md ${tier.key === "standard" ? "ring-2 ring-cyan-500/30 border-cyan-200" : ""
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span
                                            className={`inline-flex items-center rounded-full bg-gradient-to-r ${tier.color} px-3 py-1 text-xs font-bold text-white`}
                                        >
                                            {tier.label}
                                        </span>
                                        {tier.key === "standard" && (
                                            <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-600">
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-2xl font-black text-slate-900 mb-1">{data.price}</p>
                                    <p className="text-sm text-slate-500 mb-4">{data.description}</p>
                                    <ul className="space-y-2">
                                        {data.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                                                <BadgeCheck size={15} className={`mt-0.5 shrink-0 ${meta.accent}`} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-4 pt-3 border-t border-slate-100">
                                        <p className="text-xs text-slate-500">
                                            <span className="font-semibold text-slate-700">Ideal for: </span>
                                            {data.ideal}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Main Page Component ───────────────────────────────────── */

export default function PricingPage() {
    const [activeSector, setActiveSector] = useState<Sector | "all">("all");

    const filteredCatalog =
        activeSector === "all"
            ? sectorCatalog
            : sectorCatalog.filter((s) => s.id === activeSector);

    return (
        <main className="flex min-h-screen flex-col bg-white text-slate-900">
            {/* ─── Hero ────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-slate-950 pt-20 pb-28 lg:pt-28 lg:pb-36">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-cyan-600/20 via-violet-500/15 to-transparent rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-indigo-500/15 to-transparent rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGN4PSIyMCIgY3k9IjIwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-60" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal direction="up" delay={0.1} className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 mb-6">
                            <Zap size={14} className="text-cyan-400" />
                            Transparent Pricing
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl leading-[0.95]">
                            Sector-Specific{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500">
                                AI Solutions
                            </span>
                            <br />
                            Catalogue
                        </h1>
                        <p className="mt-6 max-w-3xl text-lg text-slate-400">
                            Tailored AI solutions for Africa&apos;s key industries. Three transparent tiers —
                            Basic, Standard, and Premium — so you can select the level that aligns with your
                            operational needs and strategic goals.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/20 transition-transform hover:scale-105"
                            >
                                Discuss your needs
                                <ArrowRight size={18} />
                            </Link>
                            <a
                                href="#solutions"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                            >
                                View all solutions
                                <ChevronDown size={18} />
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* ─── All Engagements Include ─────────────────────────── */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700 mb-6">
                            <Shield size={14} />
                            Included with every engagement
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 md:text-4xl tracking-tight">
                            Every project comes with{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                                enterprise-grade
                            </span>{" "}
                            delivery standards.
                        </h2>
                    </ScrollReveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                        {engagementIncludes.map((item, i) => (
                            <ScrollReveal key={item.text} delay={i * 0.08}>
                                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 text-center">
                                    <div className="w-11 h-11 rounded-xl mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 text-emerald-600 group-hover:from-emerald-500/20 group-hover:to-cyan-500/20 transition-colors">
                                        <item.icon size={20} />
                                    </div>
                                    <p className="text-sm font-semibold text-slate-800 leading-snug">{item.text}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Tier Overview ───────────────────────────────────── */}
            <section className="py-20 bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/8 rounded-full blur-[120px]" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
                        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
                            Three tiers
                        </p>
                        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                            Choose the tier that fits your stage.
                        </h2>
                    </ScrollReveal>
                    <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
                        {[
                            {
                                title: "Basic",
                                from: "From R10,000",
                                desc: "Rapid prototype for validation. Essential features, demo-ready outputs, and a clear delivery roadmap. Ideal for testing your concept before full integration.",
                                gradient: "from-slate-500 to-slate-600",
                            },
                            {
                                title: "Standard",
                                from: "From R40,000",
                                desc: "Production-ready solution with live integrations, dashboards, and stakeholder reporting. Built for growing businesses needing real operational tools.",
                                gradient: "from-cyan-500 to-blue-600",
                                featured: true,
                            },
                            {
                                title: "Premium",
                                from: "From R120,000",
                                desc: "Enterprise-grade deployment with advanced integrations, compliance support, continuous optimisation, and dedicated project management.",
                                gradient: "from-violet-500 to-purple-600",
                            },
                        ].map((tier, i) => (
                            <ScrollReveal key={tier.title} delay={0.1 * i}>
                                <div
                                    className={`rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 ${tier.featured
                                            ? "bg-gradient-to-br from-white/[0.12] to-white/[0.04] border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                                            : "bg-white/5 border border-white/10 hover:border-cyan-500/30"
                                        }`}
                                >
                                    {tier.featured && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-300 border border-cyan-500/30 mb-4">
                                            <Sparkles size={12} />
                                            Most Popular
                                        </span>
                                    )}
                                    <h3 className="text-xl font-bold text-white">{tier.title}</h3>
                                    <p className="mt-2 text-sm font-bold text-cyan-400">{tier.from}</p>
                                    <p className="mt-4 text-sm text-slate-400 leading-relaxed">{tier.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Solutions by Sector ──────────────────────────────── */}
            <section id="solutions" className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-violet-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <ScrollReveal className="text-center max-w-3xl mx-auto mb-10">
                        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                            Full Catalogue
                        </p>
                        <h2 className="mt-4 text-3xl font-black text-slate-900 md:text-4xl tracking-tight">
                            15 AI Solutions Across{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">
                                5 Sectors
                            </span>
                        </h2>
                        <p className="mt-4 text-lg text-slate-500">
                            Click any solution card to expand full tier-by-tier pricing, features, and ideal
                            customers.
                        </p>
                    </ScrollReveal>

                    {/* Sector Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        <button
                            type="button"
                            onClick={() => setActiveSector("all")}
                            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${activeSector === "all"
                                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg shadow-violet-500/25"
                                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                }`}
                        >
                            All Sectors
                        </button>
                        {sectorCatalog.map((sector) => {
                            const meta = sectorMeta[sector.id];
                            const Icon = meta.icon;
                            return (
                                <button
                                    key={sector.id}
                                    type="button"
                                    onClick={() => setActiveSector(sector.id)}
                                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${activeSector === sector.id
                                            ? `bg-gradient-to-r ${meta.gradient} text-white shadow-lg`
                                            : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                        }`}
                                >
                                    <Icon size={16} />
                                    {sector.name}
                                </button>
                            );
                        })}
                    </div>

                    {/* Sector Sections */}
                    <div className="max-w-5xl mx-auto space-y-16">
                        {filteredCatalog.map((sector) => {
                            const meta = sectorMeta[sector.id];
                            const Icon = meta.icon;
                            return (
                                <div key={sector.id}>
                                    {/* Sector Header */}
                                    <ScrollReveal>
                                        <div className={`flex items-center gap-4 mb-6 pb-4 border-b ${meta.border}`}>
                                            <div
                                                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${meta.gradient} text-white shadow-lg`}
                                            >
                                                <Icon size={22} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900">{sector.name}</h3>
                                                <p className="text-sm text-slate-500">{sector.description}</p>
                                            </div>
                                            <span className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                                                {sector.solutions.length} solutions
                                            </span>
                                        </div>
                                    </ScrollReveal>

                                    {/* Solution Cards */}
                                    <div className="space-y-4">
                                        {sector.solutions.map((solution, si) => (
                                            <ScrollReveal key={solution.id} delay={si * 0.08}>
                                                <SolutionCard solution={solution} />
                                            </ScrollReveal>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── Revenue Share ───────────────────────────────────── */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-indigo-50/80 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
                        <ScrollReveal direction="right">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 mb-6">
                                    <Layers size={14} />
                                    Developer Partnership
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 md:text-4xl tracking-tight">
                                    60/40{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                                        Revenue Share
                                    </span>{" "}
                                    Model
                                </h2>
                                <p className="mt-4 text-lg text-slate-500 leading-relaxed">
                                    All projects operate on a transparent 60/40 revenue share — ensuring developers
                                    earn fair, high-value compensation while Somahorse Nexus sustains operations,
                                    sales, support, and continued scaling.
                                </p>
                                <ul className="mt-6 space-y-3">
                                    {[
                                        "Developers earn 60% of the project fee",
                                        "Platform retains 40% for operations, sales, and support",
                                        "Transparent split logged in real-time dashboards",
                                        "Motivates talent with high earnings while scaling across Africa",
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                                            <BadgeCheck size={16} className="mt-0.5 text-indigo-500 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="left" delay={0.15}>
                            <div className="rounded-3xl bg-slate-950 p-8 shadow-2xl shadow-slate-900/30 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-full blur-2xl" />
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold text-white mb-2">Example Breakdown</h3>
                                    <p className="text-sm text-slate-400 mb-6">
                                        Standard Tier Fraud Detection at R100,000
                                    </p>

                                    <div className="space-y-4">
                                        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-emerald-400 font-bold">Developer Share</span>
                                                <span className="text-2xl font-black text-white">R60,000</span>
                                            </div>
                                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full w-[60%] bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" />
                                            </div>
                                            <p className="mt-2 text-xs text-slate-500">
                                                Split per team agreement
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-indigo-500/10 border border-indigo-500/20 p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-indigo-400 font-bold">Platform Share</span>
                                                <span className="text-2xl font-black text-white">R40,000</span>
                                            </div>
                                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full w-[40%] bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full" />
                                            </div>
                                            <p className="mt-2 text-xs text-slate-500">
                                                Fuels growth and support services
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ─── CTA ─────────────────────────────────────────────── */}
            <section className="py-24 bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[150px]" />
                </div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <ScrollReveal className="flex flex-col items-center">
                        <Target size={24} className="text-cyan-500 mb-4" />
                        <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">
                            Interested in deploying AI in your sector?
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-4">
                            Let&apos;s discuss which tool and tier best fit your needs.
                        </p>
                        <p className="text-sm text-slate-500 mb-8">
                            Email:{" "}
                            <a
                                href="mailto:somahorsenexus@gmail.com"
                                className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                            >
                                somahorsenexus@gmail.com
                            </a>
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:scale-105"
                            >
                                Get in touch
                                <ArrowRight size={18} />
                            </Link>
                            <Link
                                href="/signup"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                            >
                                Join as talent
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <Footer />
        </main>
    );
}
