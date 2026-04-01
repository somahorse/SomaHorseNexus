import { BadgeCheck, Shield } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";
import { engagementIncludes } from "@/data/engagements_includes";



export default function Engagements() {
    return (
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
    )
}