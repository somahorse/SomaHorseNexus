"use client";

import Link from "next/link";
import { ArrowRight, Code, Globe, Zap, CheckCircle, Users } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <ScrollReveal direction="up" delay={0.1} className="flex flex-col items-center">
            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 mb-6 drop-shadow-sm">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-600">AI Talent</span><br />
              Operating System
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3} className="flex flex-col items-center">
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Connect with Africa&apos;s elite AI engineers. Somahorse Nexus is the platform powering the next generation of global innovation.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105">
                Get Started
              </Link>
              <Link href="/about" className="px-8 py-4 rounded-full bg-slate-100 text-slate-900 font-bold text-lg hover:bg-slate-200 transition-all border border-slate-200">
                Learn More
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-12 border-y border-slate-100 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholders for Client Logos - refined typograhy for now */}
            <h3 className="text-xl font-bold text-slate-400">TechCorp</h3>
            <h3 className="text-xl font-bold text-slate-400">InnovateAI</h3>
            <h3 className="text-xl font-bold text-slate-400">FutureSoft</h3>
            <h3 className="text-xl font-bold text-slate-400">DataFlow</h3>
            <h3 className="text-xl font-bold text-slate-400">NexusSystems</h3>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal className="flex flex-col items-center w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-600">How It Works</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">Seamlessly connect, collaborate, and build. Our platform handles the complexity so you can focus on innovation.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            <FeatureCard
              icon={<Users size={32} />}
              title="1. Create Profile"
              description="Sign up and showcase your expertise or business needs. Our AI matching engine begins working immediately."
              delay={0.2}
            />
            <FeatureCard
              icon={<Zap size={32} />}
              title="2. AI Matching"
              description="We connect the right talent with the right opportunities using advanced compatibility algorithms."
              delay={0.4}
            />
            <FeatureCard
              icon={<Globe size={32} />}
              title="3. Collaborate Globally"
              description="Manage projects, payments, and deliverables all in one secure, streamlined dashboard."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* For Developers Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="right">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-600">
                  For Developers
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Join an elite network of African AI talent. Access global projects, receive mentorship, and get paid securely. We provide the tools you need to accelerate your career.
                </p>
                <ul className="space-y-4 mb-8">
                  <ListItem text="Access to high-value international projects" />
                  <ListItem text="Guaranteed secure payments" />
                  <ListItem text="Professional growth and mentorship" />
                </ul>
                <Link href="/signup" className="inline-flex items-center gap-2 text-cyan-600 font-bold hover:text-cyan-700 transition-colors text-lg group">
                  Join the network <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.3} className="w-full">
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl text-white w-full">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Code size={120} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Ready to code?</h3>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                    <div className="text-sm text-cyan-300 font-mono mb-1">Current Status</div>
                    <div className="font-semibold">Open for new talent onboarding</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                    <div className="text-sm text-violet-300 font-mono mb-1">Technologies</div>
                    <div className="font-semibold">Python, TensorFlow, PyTorch, React</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
        <div className="container mx-auto px-6 text-center relative z-10 w-full flex flex-col items-center">
          <ScrollReveal className="flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Ready to transform your future?</h2>
            <Link href="/signup" className="inline-block px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105">
              Get Started Now
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
  return (
    <ScrollReveal delay={delay} width="100%" className="h-full">
      <div className="bg-white p-8 rounded-xl border border-slate-200 hover:border-cyan-200 transition-colors h-full flex flex-col items-start group">
        <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:text-cyan-600 group-hover:bg-cyan-50 transition-colors mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-700 transition-colors">{title}</h3>
        <p className="text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
    </ScrollReveal>
  )
}

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-slate-700">
      <CheckCircle size={20} className="text-cyan-500 flex-shrink-0" />
      <span>{text}</span>
    </li>
  )
}
