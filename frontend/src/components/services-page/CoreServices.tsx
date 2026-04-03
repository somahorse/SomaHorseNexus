import { services } from "@/data/Services_data";
import { ScrollReveal } from "../ui/ScrollReveal";
import { BadgeCheck } from "lucide-react";


export default function CoreServices() {
    return (
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
    )
}