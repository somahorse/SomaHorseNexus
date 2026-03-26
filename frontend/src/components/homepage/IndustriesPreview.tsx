import Link from "next/link";
import { ScrollReveal } from "../ui/ScrollReveal";
import IndustriesPage from "@/app/industries/page";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { industries } from "@/data/industries_data";




export default function IndustriesPreview() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/8 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-400/8 rounded-full blur-[100px]" />
            </div>
            <div className="container mx-auto px-6 relative z-10  ">
                <ScrollReveal className="text-start mb-12  ">
                    <p className="text-sm font-semibold text-cyan-600 uppercase tracking-widest mb-4">Industries We Serve</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                        AI Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-600">Every Sector</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Industry-grade AI solutions built by verified talent, tailored for Africa&apos;s most critical sectors.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {industries.map((industry, index) => (
                        <Link
                            key={industry.title}
                            href="/industries"
                            className="group relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fadeInUp"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <Image
                                src={industry.image}
                                alt={industry.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-4">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${industry.color} flex items-center justify-center mb-2`}>
                                    <industry.icon size={20} className="text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-white">{industry.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link href="/industries" className="inline-flex items-center gap-2 text-cyan-600 font-bold hover:text-cyan-700 transition-colors group">
                        Explore all industries <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    )
}