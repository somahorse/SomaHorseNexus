import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "../ui/ScrollReveal";




export default function CTA_Section() {
    return (

        <section className="py-28 bg-slate-50 relative overflow-hidden  ">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-indigo-100/60 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10  ">
                <ScrollReveal className=" mx-auto " >
                    <div className="relative rounded-3xl overflow-hidden max-w-4xl mx-auto  ">
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950" />
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGN4PSIyMCIgY3k9IjIwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
                        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-indigo-500/30 to-transparent rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-violet-500/20 to-transparent rounded-full blur-3xl" />

                        {/* Content */}
                        <div className="relative p-10 lg:p-16 text-center">
                            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-2.5 mb-8">
                                <Image src="/south-africa.svg" alt="South Africa" width={16} height={16} />
                                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">Build with us</span>
                            </div>

                            <h2 className="text-3xl font-black text-white md:text-5xl tracking-tight mb-6">
                                Let&apos;s turn Africa&apos;s talent into
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400">
                                    global solutions.
                                </span>
                            </h2>

                            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">
                                Whether you&apos;re a developer ready to prove your skills or a business seeking an AI partner — let&apos;s build together.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/signup"
                                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:scale-105"
                                >
                                    Start the Journey
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                                >
                                    Explore Industries
                                </Link>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}