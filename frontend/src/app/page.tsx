"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  Code,
  Globe,
  Zap,
  CheckCircle,
  Users,
  Building2,
  TrendingUp,
  Shield,
  ChevronDown,
  Sparkles,
  BarChart3,
  Factory,
  GraduationCap,
  Heart,
  Quote,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Footer from "@/components/Footer";

const stats = [
  { value: "500+", label: "Active Projects", icon: TrendingUp },
  { value: "2,500+", label: "Verified Developers", icon: Users },
  { value: "15+", label: "African Countries", icon: Globe },
  { value: "98%", label: "Client Satisfaction", icon: Shield },
];

const industries = [
  { title: "Fintech", icon: BarChart3, color: "from-cyan-500 to-blue-600", image: "/industries/fintech.png" },
  { title: "AgriTech", icon: Sparkles, color: "from-green-500 to-emerald-600", image: "/industries/agritech.png" },
  { title: "HealthTech", icon: Heart, color: "from-rose-500 to-pink-600", image: "/industries/healthtech.png" },
  { title: "Education", icon: GraduationCap, color: "from-orange-500 to-amber-600", image: "/industries/education.png" },
  { title: "Manufacturing", icon: Factory, color: "from-violet-500 to-purple-600", image: "/industries/manufacturing.png" },
];

const testimonials = [
  {
    quote: "Somahorse Nexus transformed how we build AI products. The talent quality is exceptional, and the delivery process is seamless.",
    author: "Sarah Chen",
    role: "CTO, TechVentures",
    company: "TechVentures Inc.",
  },
  {
    quote: "We've completed 12 projects through Nexus with a 100% success rate. The platform's matching algorithm is incredibly accurate.",
    author: "Michael Adeyemi",
    role: "VP Engineering",
    company: "AfriPay Solutions",
  },
  {
    quote: "As a developer, this platform changed my career. I've worked on projects I never imagined possible from Nigeria.",
    author: "Fatima Okonkwo",
    role: "AI Engineer",
    company: "Nexus Verified",
  },
];

const faqs = [
  {
    question: "How does Somahorse Nexus verify talent?",
    answer: "We use a rigorous assessment process including technical coding challenges, aptitude tests, and real project deliverables. Only developers who pass all gates gain verified status on our platform.",
  },
  {
    question: "What industries do you serve?",
    answer: "We specialize in Fintech, AgriTech, HealthTech, Education, and Manufacturing. Our AI blueprints are customized for each industry's unique challenges and compliance requirements.",
  },
  {
    question: "How are payments handled?",
    answer: "All payments are processed securely through our platform with a transparent 60/40 split (developer/platform). Developers receive guaranteed payments upon milestone approval.",
  },
  {
    question: "Can I hire a dedicated team?",
    answer: "Yes! We offer flexible engagement models from single project deliveries to dedicated teams. Our Premium tier includes ongoing optimization and support.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="flex min-h-screen flex-col bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/30 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/20 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <ScrollReveal direction="up" delay={0.1} className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-sm mb-8">
              <Sparkles size={16} className="text-violet-600" />
              <span className="text-sm font-semibold text-slate-700">Now onboarding developers across Africa</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 mb-6">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600">AI Talent</span><br />
              Operating System
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3} className="flex flex-col items-center">
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Connect with Africa&apos;s elite AI engineers. Somahorse Nexus is the platform powering the next generation of global innovation.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:scale-105">
                Get Started
              </Link>
              <Link href="/about" className="px-8 py-4 rounded-full bg-white/70 backdrop-blur-md text-slate-900 font-bold text-lg hover:bg-white transition-all border border-slate-200/50 shadow-lg">
                Learn More
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section with Glassmorphism */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="relative p-6 md:p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl overflow-hidden group hover:bg-white/15 transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                <stat.icon size={28} className="text-cyan-400 mb-3" />
                <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-b border-slate-100 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-all duration-500">
            <h3 className="text-xl font-bold text-slate-400">TechCorp</h3>
            <h3 className="text-xl font-bold text-slate-400">InnovateAI</h3>
            <h3 className="text-xl font-bold text-slate-400">FutureSoft</h3>
            <h3 className="text-xl font-bold text-slate-400">DataFlow</h3>
            <h3 className="text-xl font-bold text-slate-400">NexusSystems</h3>
          </div>
        </div>
      </section>

      {/* Industries Preview */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-400/10 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">Industries We Serve</p>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              AI Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-600">Every Sector</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We build verified talent pipelines and deliver industry-grade solutions across Africa&apos;s most critical sectors.
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

      {/* How It Works Section */}
      <section className="py-24 bg-white relative">
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
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-[100px]" />
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
                  Join an elite network of African AI talent. Access global projects, receive mentorship, and get paid securely. We provide the tools you need to accelerate your career.
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
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-violet-400/20 rounded-full blur-[100px]" />
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

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-4">Testimonials</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Trusted by Teams Worldwide
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.author}
                className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Quote size={32} className="text-cyan-500/50 mb-4" />
                <p className="text-slate-300 leading-relaxed mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  <p className="text-cyan-400 text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-slate-900">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-slate-500 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-6' : 'max-h-0'}`}
                >
                  <p className="px-6 text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJWMGgydjM0em0tNCAwVjBoLTJ2MzRoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <ScrollReveal className="flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to transform your future?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Join thousands of developers and businesses building the future of AI in Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup" className="px-10 py-5 rounded-full bg-white text-slate-900 font-bold text-lg hover:shadow-xl transition-all hover:scale-105">
                Get Started Now
              </Link>
              <Link href="/contact" className="px-10 py-5 rounded-full bg-white/10 backdrop-blur-md text-white font-bold text-lg border border-white/30 hover:bg-white/20 transition-all">
                Talk to Sales
              </Link>
            </div>
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
      <div className="relative bg-white p-8 rounded-2xl border border-slate-200 hover:border-cyan-200 transition-all h-full flex flex-col items-start group hover:shadow-xl hover:-translate-y-1 duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
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
