import { ArrowRight, Factory } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";
import Link from "next/link";



export default function IndustriesCTA() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 text-center">
                <ScrollReveal className="flex flex-col items-center mx-auto ">
                    <Factory size={24} className="text-cyan-500 mb-4 mx-auto" />
                    <h2 className="text-3xl font-bold text-slate-900 md:text-4xl mb-4">
                        Ready to deploy AI in your sector?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                        We build verified teams, align on measurable outcomes, and deliver solutions that
                        scale.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center ">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:scale-105"
                        >
                            Talk to our team
                            <ArrowRight size={18} />
                        </Link>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
                        >
                            View pricing catalogue
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}