import { BarChart3, CheckCircle2, Shield } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";
import { deliveryStandards } from "@/data/delivery_standards";
import { impactMetrics } from "@/data/impactMetricsData";



export default function DeliveryStandards() {
    return (
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
                        Every project runs through clear gates, keeping talent accountable, clients confident, and outcomes measurable.
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
    )
}