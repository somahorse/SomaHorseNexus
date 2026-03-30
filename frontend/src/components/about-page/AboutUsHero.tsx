import Image from "next/image";
import { ScrollReveal } from "../ui/ScrollReveal";
import { ArrowRight, Award, Cpu, Globe, TrendingUp } from "lucide-react";
import Link from "next/link";


export default function AboutUsHero() {
    return (
        <section className="relative overflow-hidden bg-slate-950 pt-20 pb-28 lg:pt-28 lg:pb-36">
            {/* Ambient glow orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-indigo-600/25 via-violet-500/15 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-500/15 via-blue-500/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-r from-fuchsia-500/10 to-transparent rounded-full blur-3xl" />
                {/* Dot grid */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGN4PSIyMCIgY3k9IjIwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-60" />
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col  items-center justify-center">
                <ScrollReveal direction="up" delay={0.1} className="flex flex-col items-center text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-2.5 mb-8">
                        <Image src="/south-africa.svg" alt="South Africa" width={18} height={18} />
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">About Somahorse Nexus</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95]">
                        Africa&apos;s greatest asset
                        <br className="hidden sm:block" />
                        is its{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400">
                            people.
                        </span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed mx-auto">
                        Somahorse Nexus delivers tailored AI solutions designed for Africa&apos;s key industries — building the operating system for Africa&apos;s AI economy.
                    </p>

                    {/* Stats row */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
                        {[
                            { value: "60/40", label: "Revenue Split", icon: TrendingUp },
                            { value: "5+", label: "Industries", icon: Globe },
                            { value: "15", label: "AI Solutions", icon: Cpu },
                            { value: "100%", label: "South African", icon: Award },
                        ].map((stat) => (
                            <div key={stat.label} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <stat.icon size={18} className="text-indigo-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-white font-black text-lg">{stat.value}</p>
                                    <p className="text-slate-500 text-xs">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center">
                        <Link
                            href="/signup"
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:scale-105"
                        >
                            Join as Talent
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                        >
                            Request a Proposal
                        </Link>
                    </div>
                </ScrollReveal>
            </div>

            {/* Bottom fade to white */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>
    )
}