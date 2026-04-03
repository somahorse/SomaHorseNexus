import { Users } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";



export default function DeveloperPartnership() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <ScrollReveal className="max-w-4xl mx-auto">
                    <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 lg:p-10 shadow-sm">
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 mb-4">
                                    <Users size={14} />
                                    Developer Partnership
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">60/40 Revenue Share</h3>
                                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                                    Developers earn 60% of the project fee — ensuring fair, high-value compensation.
                                    The platform retains 40% to cover operations, sales, support, and continued scaling.
                                </p>
                            </div>
                            <div className="rounded-2xl bg-slate-950 p-6 text-white">
                                <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">
                                    Example: Standard Fraud Detection (R100,000)
                                </p>
                                <div className="space-y-3">
                                    <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-emerald-400 text-sm font-bold">Developer</span>
                                            <span className="text-lg font-black">R60,000</span>
                                        </div>
                                    </div>
                                    <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-indigo-400 text-sm font-bold">Platform</span>
                                            <span className="text-lg font-black">R40,000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>

    )
}