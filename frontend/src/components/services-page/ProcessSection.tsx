import { processSteps } from "@/data/Services_data";
import { ScrollReveal } from "../ui/ScrollReveal";



export default function ProcessSection() {
    return (
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
    )
}