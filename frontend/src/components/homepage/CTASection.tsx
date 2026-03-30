import Link from "next/link";
import { ScrollReveal } from "../ui/ScrollReveal";



export default function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[150px]" />
            </div>
            <div className=" w-full flex items-center justify-center mx-auto px-6 text-center relative z-10">
                <ScrollReveal className="flex flex-col items-center justify-center w-full  ">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to build the future?</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                        Whether you&apos;re a developer looking to grow or a business seeking AI talent — Somahorse Nexus is where it starts.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-center ">
                        <Link href="/signup" className="px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all hover:scale-105">
                            Get Started Now
                        </Link>
                        <Link href="/contact" className="px-10 py-5 rounded-full bg-white/5 backdrop-blur-md text-white font-bold text-lg border border-white/10 hover:bg-white/10 transition-all">
                            Talk to Our Team
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}