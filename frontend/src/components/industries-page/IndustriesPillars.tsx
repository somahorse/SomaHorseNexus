import { pillars } from "@/data/industries_page_data";
import { ScrollReveal } from "../ui/ScrollReveal";




export default function IndustriesPillars() {
    return (
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
                <div className="mt-12 grid gap-6 grid-cols-1 lg:grid-cols-3 place-items-center justify-items-center">
                    {pillars.map((pillar, index) => (
                        <ScrollReveal key={pillar.title} delay={0.1 * index} className="w-full! "  >
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
    )
}