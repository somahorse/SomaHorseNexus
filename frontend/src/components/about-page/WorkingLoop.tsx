import { Activity, Rocket } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";


const workingLoop = [
    "Talent signs up and completes a streamlined assessment.",
    "Client selects a solution from our catalog (Fintech, Agriculture, Healthcare, Education, or Manufacturing) and submits a request.",
    "Admin matches verified talent to the project.",
    "Talent submits a delivery artifact; client reviews and approves.",
    "Payment is recorded with a 60/40 split and dashboards update in real time.",
];


export default function WorkingLoop() {
    return (
        <section className="relative py-28 bg-slate-950 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-b from-indigo-600/15 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-t from-violet-600/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGN4PSIyMCIgY3k9IjIwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-indigo-300 mb-6">
                        <Rocket size={14} />
                        How It Works
                    </div>
                    <h2 className="text-3xl font-black text-white md:text-5xl tracking-tight">
                        One delivery cycle.{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                            Proven model.
                        </span>
                    </h2>
                    <p className="mt-6 text-lg text-slate-400">
                        From talent onboarding to approved delivery — every step is tracked, verified, and transparent.
                    </p>
                </ScrollReveal>

                <div className="max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-center">
                        {/* Left: Revenue Split Card */}
                        <ScrollReveal direction="right">
                            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                                        <Activity size={18} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Revenue Economics</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-emerald-400 font-bold">Developer Share</span>
                                            <span className="text-2xl font-black text-white">R60,000</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full w-[60%] bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" />
                                        </div>
                                        <p className="mt-2 text-xs text-slate-500">Split per team agreement</p>
                                    </div>
                                    <div className="rounded-2xl bg-indigo-500/10 border border-indigo-500/20 p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-indigo-400 font-bold">Platform Share</span>
                                            <span className="text-2xl font-black text-white">R40,000</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full w-[40%] bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full" />
                                        </div>
                                        <p className="mt-2 text-xs text-slate-500">Fuels growth and support services</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-xs text-slate-500">Example: Standard Tier Fraud Detection at R100,000</p>
                            </div>
                        </ScrollReveal>

                        {/* Right: Steps */}
                        <ScrollReveal direction="left" delay={0.15}>
                            <div className="space-y-3">
                                {workingLoop.map((step, index) => {
                                    const stepColors = [
                                        "from-cyan-500 to-blue-600",
                                        "from-indigo-500 to-violet-600",
                                        "from-violet-500 to-purple-600",
                                        "from-fuchsia-500 to-pink-600",
                                        "from-emerald-500 to-teal-600",
                                    ];
                                    return (
                                        <div key={step} className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.08] transition-all duration-300">
                                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${stepColors[index]} text-white text-sm font-black shadow-lg`}>
                                                {index + 1}
                                            </div>
                                            <p className="text-sm text-slate-300 leading-relaxed pt-2">{step}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            {/* Top fade from white */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent" />
        </section>

    )
}