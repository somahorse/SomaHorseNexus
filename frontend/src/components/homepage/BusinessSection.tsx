import Link from "next/link";
import { ListItem } from "../ui/ListItem";
import { ArrowRight, Building2 } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";


export default function BusinessSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-violet-400/15 rounded-full blur-[100px]" />
            </div>
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <ScrollReveal direction="right" delay={0.3} className="w-full order-2 lg:order-1">
                        <div className="relative rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-8 shadow-2xl text-white overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Building2 size={120} />
                            </div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                            <h3 className="text-2xl font-bold mb-6">Enterprise Ready</h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                                    <div className="text-sm text-violet-200 font-mono mb-1">Delivery Model</div>
                                    <div className="font-semibold">Milestone-based with approval gates</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                                    <div className="text-sm text-indigo-200 font-mono mb-1">Team Size</div>
                                    <div className="font-semibold">Individual to 20+ developer teams</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                                    <div className="text-sm text-pink-200 font-mono mb-1">Engagement Tiers</div>
                                    <div className="font-semibold">Basic • Standard • Premium</div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="left" className="order-1 lg:order-2">
                        <div>
                            <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-4">For Businesses</p>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                                Build With <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-600">Verified Talent</span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Access pre-vetted AI engineers ready to deliver. We handle sourcing, verification, and project orchestration so you can focus on business outcomes.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <ListItem text="Assessment-verified talent pools" />
                                <ListItem text="Industry-specific AI blueprints" />
                                <ListItem text="End-to-end delivery management" />
                                <ListItem text="Live KPI and ROI dashboards" />
                            </ul>
                            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-bold hover:shadow-lg hover:shadow-violet-500/30 transition-all hover:scale-105">
                                Request a proposal <ArrowRight size={20} />
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>

    )
}