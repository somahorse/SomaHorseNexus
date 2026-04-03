import Link from "next/link";
import { ScrollReveal } from "../ui/ScrollReveal";
import { ArrowRight } from "lucide-react";



export default function ServicesCTA() {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[150px]" />
            </div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <ScrollReveal className="flex flex-col items-center  mx-auto">
                    <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">
                        Ready to deliver an industry-grade solution?
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
                        We design the loop, assemble verified teams, and measure impact from day one.
                    </p>
                    <div className=" w-full justify-center flex flex-col sm:flex-row items-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:scale-105"
                        >
                            Start a project
                            <ArrowRight size={18} />
                        </Link>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                        >
                            View pricing catalogue
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}