import { CheckCircle2, Cpu, Lightbulb, Rocket, Users } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";
import { systemPillars } from "@/data/system_pillars_data";



export default function MissionSection() {
    return (
        <section className="py-28 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-100/60 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-violet-100/50 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 mb-6">
                        <Lightbulb size={14} />
                        What We Are
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 md:text-5xl tracking-tight">
                        An AI Talent{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Operating System</span>
                        {" "}for Africa.
                    </h2>
                    <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
                        Not a job board. Not freelance. Not traditional recruitment. We transform raw talent into verified, deployable skill,  and deliver complete AI solutions end-to-end.
                    </p>
                </ScrollReveal>

                <div className="grid gap-5 md:grid-cols-3 max-w-5xl mx-auto place-items-center justify-center justify-items-center mb-16">
                    {[
                        { icon: CheckCircle2, title: "Verify", desc: "Transforms potential into verified skill with real project deliverables.", color: "indigo" },
                        { icon: Users, title: "Match", desc: "Matches verified teams to industry-grade problems using intelligent algorithms.", color: "violet" },
                        { icon: Rocket, title: "Deliver", desc: "Delivers complete solutions with measurable impact and transparent economics.", color: "cyan" },
                    ].map((item, i) => (
                        <ScrollReveal key={item.title} delay={i * 0.1} className="group h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500  " >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${item.color === "indigo" ? "bg-indigo-100 text-indigo-600" :
                                item.color === "violet" ? "bg-violet-100 text-violet-600" :
                                    "bg-cyan-100 text-cyan-600"
                                }`}>
                                <item.icon size={22} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </ScrollReveal>
                    ))}
                </div>

                {/* System Pillars */}
                <ScrollReveal delay={0.15} className=" mx-auto" >
                    <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 lg:p-10 shadow-sm max-w-5xl mx-auto">
                        <div className="flex items-center gap-3 mb-10  w-fit md:mx-auto ">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                                <Cpu size={18} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">The Three Pillars</h3>
                                <p className="text-sm text-slate-500">How the system works under the hood</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {systemPillars.map((pillar, i) => (
                                <div key={pillar.title} className="relative">
                                    {i < systemPillars.length - 1 && (
                                        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-3/4 bg-slate-200" />
                                    )}
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white">
                                            <pillar.icon size={16} />
                                        </div>
                                        <h4 className="font-bold text-slate-900">{pillar.title}</h4>
                                    </div>
                                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{pillar.description}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {pillar.highlights.map((h) => (
                                            <span key={h} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{h}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}