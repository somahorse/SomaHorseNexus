import Link from "next/link";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Globe, Users, Zap } from "lucide-react";



export default function Hero() {
    return (
        <section className="relative px-6 pt-16 pb-28 lg:pt-28 lg:pb-40 overflow-hidden bg-slate-950">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-[10%] w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 right-[5%] w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[160px]" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto text-center relative z-10 flex flex-col  items-center justify-center ">
                <ScrollReveal direction="up" delay={0.1} className="flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg mb-8">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-xs md:text-sm font-semibold text-slate-300">Now onboarding developers across Africa</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[110%] md:leading-[0.95]">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500  ">AI Talent</span><br />
                        Operating System
                    </h1>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.3} className="flex flex-col items-center">
                    <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                        Connect with Africa&apos;s elite AI engineers. Somahorse Nexus is the platform powering the next generation of global innovation.
                    </p>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.5}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/signup" className="px-10 py-3 md:py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base md:text-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:scale-105">
                            Get Started
                        </Link>
                        <Link href="/about" className="px-10 py-3 md:py-4 rounded-full bg-white/5 backdrop-blur-md text-white font-bold text-base md:text-lg hover:bg-white/10 transition-all border border-white/10">
                            Learn More
                        </Link>
                    </div>
                </ScrollReveal>

                {/* Three value props */}
                <ScrollReveal direction="up" delay={0.7} className="w-full">
                    <div className="mt-20 grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {[
                            { icon: Users, label: "Verified Talent", sub: "Assessment-gated developers" },
                            { icon: Zap, label: "AI-Powered Matching", sub: "Right team, right project" },
                            { icon: Globe, label: "Pan-African Reach", sub: "Talent across the continent" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center shrink-0">
                                    <item.icon size={20} className="text-cyan-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-white font-semibold text-sm">{item.label}</p>
                                    <p className="text-slate-500 text-xs">{item.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}