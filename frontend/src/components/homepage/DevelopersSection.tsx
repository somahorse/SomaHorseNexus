import Link from "next/link";
import { ListItem } from "../ui/ListItem";
import { ScrollReveal } from "../ui/ScrollReveal";
import { ArrowRight, Code } from "lucide-react";



export default function DevelopersSection() {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-400/15 rounded-full blur-[100px]" />
            </div>
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <ScrollReveal direction="right">
                        <div>
                            <p className="text-sm font-semibold text-cyan-600 uppercase tracking-widest mb-4">For Developers</p>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                                Launch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-600">Global Career</span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Join an elite network of African AI talent. Access global projects, receive mentorship, and get paid securely.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <ListItem text="Access to high-value international projects" />
                                <ListItem text="Guaranteed secure payments (60% developer share)" />
                                <ListItem text="Professional growth and mentorship" />
                                <ListItem text="Verification badge for your portfolio" />
                            </ul>
                            <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105">
                                Join the network <ArrowRight size={20} />
                            </Link>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="left" delay={0.3} className="w-full">
                        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl text-white overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Code size={120} />
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />
                            <h3 className="text-2xl font-bold mb-6">Ready to code?</h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                                    <div className="text-sm text-cyan-300 font-mono mb-1">Current Status</div>
                                    <div className="font-semibold">Open for new talent onboarding</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                                    <div className="text-sm text-violet-300 font-mono mb-1">Technologies</div>
                                    <div className="font-semibold">Python, TensorFlow, PyTorch, React</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                                    <div className="text-sm text-emerald-300 font-mono mb-1">Avg. Earnings</div>
                                    <div className="font-semibold">$2,500 - $8,000 /month</div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}