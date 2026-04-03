import { tiers } from "@/data/Services_data";
import { ScrollReveal } from "../ui/ScrollReveal";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";



export default function EngagementSection() {
    return (
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
    )
}