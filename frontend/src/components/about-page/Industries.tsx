import Link from "next/link";
import { ScrollReveal } from "../ui/ScrollReveal";
import { ArrowRight, Globe } from "lucide-react";
import { sectorCatalog } from "@/lib/solutions-data";
import { sectorGradients, sectorIcons } from "@/data/sector-data";



export default function Industries() {
    return (
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
                            <ScrollReveal key={sector.id} delay={i * 0.08} className="flex items-stretch justify-center "  >
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
                <ScrollReveal delay={0.3} className="text-center  mx-auto ">
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
    )
}