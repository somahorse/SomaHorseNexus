import { MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "../ui/ScrollReveal";
import { teamMembers } from "@/data/team_members";



export default function TeamMemberSection() {
    return (
        <section className="relative py-28 bg-slate-950 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-500/15 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-violet-600/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiIGN4PSIyMCIgY3k9IjIwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-2.5 mb-6">
                        <Image src="/south-africa.svg" alt="South Africa" width={20} height={20} />
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">Proudly South African</span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
                        Meet the team behind
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">
                            the Nexus.
                        </span>
                    </h2>
                    <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
                        A passionate South African team united by the mission to unlock Africa&apos;s AI potential and build the infrastructure for the future of work.
                    </p>
                </ScrollReveal>

                {/* Founder Spotlight */}
                <ScrollReveal delay={0.1} className="mb-12 mx-auto ">
                    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-1 max-w-4xl mx-auto overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative rounded-[1.25rem] bg-slate-950/80 p-8 lg:p-10">
                            <div className="flex flex-col lg:flex-row items-center gap-8">
                                <div className="relative">
                                    <div className="w-32 h-32 lg:w-40 lg:h-40 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-5xl lg:text-6xl font-black shadow-2xl shadow-indigo-500/25">
                                        <Image src={"/team/uche-sn.jpeg"} alt="founder" fill className="object-center object-cover" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center border border-white/10">
                                        <Image src="/south-africa.svg" alt="ZA" width={22} height={22} />
                                    </div>
                                </div>
                                <div className="flex-1 text-center lg:text-left">
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-3">
                                        <h3 className="text-2xl lg:text-3xl font-black text-white">Uchenna Ngubane</h3>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 w-fit mx-auto lg:mx-0">
                                            <Sparkles size={12} />
                                            Founder & CEO
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-base leading-relaxed max-w-xl">
                                        Visionary leader driving Africa&apos;s AI talent revolution and building the bridge between potential and opportunity. Uchenna founded Somahorse Nexus with the belief that Africa&apos;s greatest untapped resource is its people.
                                    </p>
                                    <div className="mt-4 flex items-center gap-2 justify-center lg:justify-start">
                                        <MapPin size={14} className="text-indigo-400" />
                                        <span className="text-sm text-slate-500">South Africa</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Team Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
                    {teamMembers.slice(1).map((member, index) => {
                        const gradients: Record<string, string> = {
                            cyan: "from-cyan-500 to-blue-600",
                            amber: "from-amber-500 to-orange-600",
                            emerald: "from-emerald-500 to-teal-600",
                            rose: "from-rose-500 to-pink-600",
                            brown: "from-amber-700 to-orange-900",
                        };
                        const glows: Record<string, string> = {
                            cyan: "shadow-cyan-500/20",
                            amber: "shadow-amber-500/20",
                            emerald: "shadow-emerald-500/20",
                            rose: "shadow-rose-500/20",
                            brown: "shadow-amber-900/30",
                        };
                        const accents: Record<string, string> = {
                            cyan: "text-cyan-300 bg-cyan-500/20 border-cyan-500/30",
                            amber: "text-amber-300 bg-amber-500/20 border-amber-500/30",
                            emerald: "text-emerald-300 bg-emerald-500/20 border-emerald-500/30",
                            rose: "text-rose-300 bg-rose-500/20 border-rose-500/30",
                            brown: "text-amber-300 bg-amber-500/20 border-amber-500/30",
                        };
                        const gradient = gradients[member.accent] || gradients.cyan;
                        const glow = glows[member.accent] || glows.cyan;
                        const accent = accents[member.accent] || accents.cyan;

                        return (
                            <ScrollReveal key={member.name} delay={0.1 + index * 0.1} className="h-full flex items-stretch " >
                                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500">
                                    <div className="flex flex-col items-center text-center">
                                        {/* Avatar */}
                                        <div className={`w-20 h-20 relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl font-black shadow-xl ${glow} group-hover:scale-110 transition-transform duration-500`}>
                                            <Image src={member.image} alt="founder" fill className="object-center object-cover" />
                                        </div>

                                        {/* Flag */}
                                        <div className="mt-3 flex items-center gap-1.5">
                                            <Image src={member.flag} alt="ZA" width={14} height={14} />
                                            <span className="text-[11px] text-slate-500 font-medium">{member.country}</span>
                                        </div>

                                        {/* Info */}
                                        <h3 className="mt-3 text-lg font-bold text-white">{member.name}</h3>
                                        <span className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${accent}`}>
                                            {member.role}
                                        </span>

                                        {/* Bio */}
                                        <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                                            {member.bio}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>

                {/* Bottom Tagline */}
                <ScrollReveal delay={0.3} className="mt-14 mx-auto ">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center -space-x-3">
                            {teamMembers.map((member) => {
                                const gradients: Record<string, string> = {
                                    indigo: "from-indigo-500 to-violet-600",
                                    cyan: "from-cyan-500 to-blue-600",
                                    amber: "from-amber-500 to-orange-600",
                                    emerald: "from-emerald-500 to-teal-600",
                                    rose: "from-rose-500 to-pink-600",
                                    brown: "from-amber-700 to-orange-900",
                                };
                                const gradient = gradients[member.accent] || gradients.indigo;
                                return (
                                    <div
                                        key={member.name}
                                        className={`w-10 h-10 relative overflow-hidden rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold ring-2 ring-slate-950`}
                                    >
                                        <Image src={member.image} alt={member.name.charAt(0)} fill className="object-center object-cover" />
                                    </div>
                                );
                            })}
                        </div>
                        <p className="text-sm text-slate-500 text-center">
                            5 passionate individuals.&nbsp; 1 mission.&nbsp; Infinite potential.
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>



    )
}