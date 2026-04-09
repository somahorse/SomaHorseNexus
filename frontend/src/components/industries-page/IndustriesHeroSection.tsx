import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "../ui/ScrollReveal";




export default function IndustriesHeroSection() {
    return (
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 bg-slate-950">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-[15%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[120px]" />
            </div>
            <div className="container mx-auto px-6 relative z-10 flex flex-col  items-center justify-center">
                <ScrollReveal direction="up" delay={0.1} className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 mb-6">
                        <Sparkles size={14} className="text-cyan-400" />
                        Industries
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl leading-[0.95]">
                        Sector-Specific AI for
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500">
                            Africa&apos;s Key Industries
                        </span>
                    </h1>
                    <p className="mt-6 max-w-3xl text-lg text-slate-400">
                        We begin with Fintech, then expand into Agriculture, Healthcare, Education, and
                        Manufacturing. Each solution is offered in three transparent tiers — Basic, Standard,
                        and Premium.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/20 transition-transform hover:scale-105"
                        >
                            Request an industry brief
                            <ArrowRight size={18} />
                        </Link>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                        >
                            View full pricing
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </section>

    )
}