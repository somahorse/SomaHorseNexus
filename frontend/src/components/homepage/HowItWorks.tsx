import { Globe, Users, Zap } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";



export default function HowItWorks() {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-[120px]" />
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal className="flex flex-col items-center w-full">
                    <div className="text-start mb-16">
                        <p className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-4">The Process</p>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">How It Works</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">From signup to delivery — three simple steps.</p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 place-items-center justify-center justify-items-center gap-6 relative z-10">
                    {[
                        { icon: Users, num: "01", title: "Create Profile", desc: "Sign up and showcase your expertise or business needs. Our AI matching engine begins working immediately." },
                        { icon: Zap, num: "02", title: "AI Matching", desc: "We connect the right talent with the right opportunities using advanced compatibility algorithms." },
                        { icon: Globe, num: "03", title: "Collaborate & Deliver", desc: "Manage projects, payments, and deliverables all in one secure, streamlined dashboard." },
                    ].map((step, i) => (
                        <ScrollReveal key={i} delay={0.2 + i * 0.2} width="100%" className="h-full relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all  group hover:-translate-y-1 duration-300 ">
                            <div className="text-6xl font-black text-white/5 absolute top-4 right-6">{step.num}</div>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                                <step.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}