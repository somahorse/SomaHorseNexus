"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Code,
  Globe,
  Zap,
  CheckCircle,
  Users,
  Building2,
  Sparkles,
  BarChart3,
  Factory,
  GraduationCap,
  Heart,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Footer from "@/components/Footer";
import FAQSection from "@/components/Faq";

const industries = [
  { title: "Fintech", icon: BarChart3, color: "from-cyan-500 to-blue-600", image: "/industries/fintech.png" },
  { title: "AgriTech", icon: Sparkles, color: "from-green-500 to-emerald-600", image: "/industries/agritech.png" },
  { title: "HealthTech", icon: Heart, color: "from-rose-500 to-pink-600", image: "/industries/healthtech.png" },
  { title: "Education", icon: GraduationCap, color: "from-orange-500 to-amber-600", image: "/industries/education.png" },
  { title: "Manufacturing", icon: Factory, color: "from-violet-500 to-purple-600", image: "/industries/manufacturing.png" },
];



export default function Home() {

  return (
    <main className="flex min-h-screen flex-col bg-white overflow-hidden">
      {/* Hero Section — Dark immersive */}
      <section className="relative px-6 pt-16 pb-28 lg:pt-28 lg:pb-40 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[10%] w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-[5%] w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[160px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto text-center relative z-10 flex flex-col  items-center justify-center ">
          <ScrollReveal direction="up" delay={0.1} className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs md:text-sm font-semibold text-slate-300">Now onboarding developers across Africa</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[110%] md:leading-[0.95]">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500  ">AI Talent</span><br />
              Operating System
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3} className="flex flex-col items-center">
            <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Connect with Africa&apos;s elite AI engineers. Somahorse Nexus is the platform powering the next generation of global innovation.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="px-10 py-3 md:py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base md:text-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:scale-105">
                Get Started
              </Link>
              <Link href="/about" className="px-10 py-3 md:py-4 rounded-full bg-white/5 backdrop-blur-md text-white font-bold text-base md:text-lg hover:bg-white/10 transition-all border border-white/10">
                Learn More
              </Link>
            </div>
          </ScrollReveal>

          {/* Three value props */}
          <ScrollReveal direction="up" delay={0.7} className="w-full">
            <div className="mt-20 grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { icon: Users, label: "Verified Talent", sub: "Assessment-gated developers" },
                { icon: Zap, label: "AI-Powered Matching", sub: "Right team, right project" },
                { icon: Globe, label: "Pan-African Reach", sub: "Talent across the continent" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{item.label}</p>
                    <p className="text-slate-500 text-xs">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Industries Preview */}
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

      {/* How It Works Section — Dark */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="flex flex-col items-center w-full">
            <div className="text-start mb-16">
              <p className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-4">The Process</p>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">How It Works</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">From signup to delivery — three simple steps.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 place-items-center justify-center justify-items-center gap-6 relative z-10">
            {[
              { icon: Users, num: "01", title: "Create Profile", desc: "Sign up and showcase your expertise or business needs. Our AI matching engine begins working immediately." },
              { icon: Zap, num: "02", title: "AI Matching", desc: "We connect the right talent with the right opportunities using advanced compatibility algorithms." },
              { icon: Globe, num: "03", title: "Collaborate & Deliver", desc: "Manage projects, payments, and deliverables all in one secure, streamlined dashboard." },
            ].map((step, i) => (
              <ScrollReveal key={i} delay={0.2 + i * 0.2} width="100%" className="h-full relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all  group hover:-translate-y-1 duration-300 ">
                  <div className="text-6xl font-black text-white/5 absolute top-4 right-6">{step.num}</div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                    <step.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* For Developers Section */}
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

      {/* For Businesses Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-violet-400/15 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="right" delay={0.3} className="w-full order-2 lg:order-1">
              <div className="relative rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-8 shadow-2xl text-white overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Building2 size={120} />
                </div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <h3 className="text-2xl font-bold mb-6">Enterprise Ready</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <div className="text-sm text-violet-200 font-mono mb-1">Delivery Model</div>
                    <div className="font-semibold">Milestone-based with approval gates</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <div className="text-sm text-indigo-200 font-mono mb-1">Team Size</div>
                    <div className="font-semibold">Individual to 20+ developer teams</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <div className="text-sm text-pink-200 font-mono mb-1">Engagement Tiers</div>
                    <div className="font-semibold">Basic • Standard • Premium</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" className="order-1 lg:order-2">
              <div>
                <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-4">For Businesses</p>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                  Build With <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-600">Verified Talent</span>
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Access pre-vetted AI engineers ready to deliver. We handle sourcing, verification, and project orchestration so you can focus on business outcomes.
                </p>
                <ul className="space-y-4 mb-8">
                  <ListItem text="Assessment-verified talent pools" />
                  <ListItem text="Industry-specific AI blueprints" />
                  <ListItem text="End-to-end delivery management" />
                  <ListItem text="Live KPI and ROI dashboards" />
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-bold hover:shadow-lg hover:shadow-violet-500/30 transition-all hover:scale-105">
                  Request a proposal <ArrowRight size={20} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
     <FAQSection/>

      {/* CTA Section */}
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

      <Footer />
    </main>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-slate-700">
      <CheckCircle size={20} className="text-cyan-500 flex-shrink-0" />
      <span>{text}</span>
    </li>
  )
}
