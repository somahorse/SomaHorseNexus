"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Footer from "@/components/Footer";

const focusAreas = [
  "Fintech infrastructure",
  "AgriTech intelligence",
  "HealthTech operations",
  "Education analytics",
  "Manufacturing automation",
];

const engagementSteps = [
  {
    title: "Share your goal",
    detail: "Tell us the industry, challenge, and desired outcome.",
  },
  {
    title: "Select a tier",
    detail: "Choose Basic, Standard, or Premium delivery.",
  },
  {
    title: "Get a roadmap",
    detail: "We respond with a verified team and milestone plan.",
  },
];

export default function ContactPage() {
  return (
    <main
      className="flex min-h-screen flex-col bg-white text-slate-900"
      style={
        {
          "--nexus-primary": "#4f46e5",
          "--nexus-secondary": "#7c3aed",
          "--nexus-ink": "#0b1020",
        } as CSSProperties
      }
    >
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(79,70,229,0.28)_0%,_rgba(79,70,229,0)_68%)] blur-2xl" />
          <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(124,58,237,0.25)_0%,_rgba(124,58,237,0)_70%)] blur-2xl" />
          <div className="absolute left-10 top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(15,23,42,0.18)_0%,_rgba(15,23,42,0)_70%)] blur-2xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal direction="up" delay={0.1} className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">
              <Sparkles size={14} className="text-[var(--nexus-primary)]" />
              Contact
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              Let&apos;s build the delivery loop for your industry.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--nexus-primary)] via-indigo-500 to-[var(--nexus-secondary)]">
                Start a conversation with Somahorse Nexus.
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-slate-600">
              Tell us what you&apos;re aiming to deliver. We&apos;ll align on scope, match verified talent, and share a
              milestone-driven roadmap.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--nexus-ink)] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/20 transition-transform hover:scale-105"
              >
                View services
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/industries"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
              >
                Explore industries
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <ScrollReveal direction="right">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900">Request a proposal</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share a few details and we&apos;ll follow up with a tailored plan.
                </p>
                <form className="mt-8 grid gap-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Full name
                      <input
                        type="text"
                        placeholder="Your name"
                        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      />
                    </label>
                    <label className="text-sm font-semibold text-slate-700">
                      Work email
                      <input
                        type="email"
                        placeholder="you@company.com"
                        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      />
                    </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Organization
                      <input
                        type="text"
                        placeholder="Company name"
                        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                      />
                    </label>
                    <label className="text-sm font-semibold text-slate-700">
                      Industry
                      <select className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                        <option>Fintech</option>
                        <option>AgriTech</option>
                        <option>HealthTech</option>
                        <option>Education</option>
                        <option>Manufacturing</option>
                        <option>Other</option>
                      </select>
                    </label>
                  </div>
                  <label className="text-sm font-semibold text-slate-700">
                    Project goal
                    <textarea
                      rows={5}
                      placeholder="Describe the challenge you want to solve and the outcome you need."
                      className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                  </label>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--nexus-ink)] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/25 transition-transform hover:scale-105"
                  >
                    Submit request
                    <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.15}>
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Focus industries</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {focusAreas.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-slate-600">
                    We start with a blueprint and customize delivery to your region, market, and data readiness.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-950 p-7 text-white shadow-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-300">
                    <BadgeCheck size={16} />
                    Engagement flow
                  </div>
                  <div className="mt-5 space-y-4">
                    {engagementSteps.map((step, index) => (
                      <div key={step.title} className="flex items-start gap-3 text-sm text-slate-200">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{step.title}</p>
                          <p className="text-xs text-slate-300">{step.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Contact details</p>
                  <div className="mt-4 space-y-4 text-sm text-slate-700">
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-indigo-600" />
                      hello@somahorse.ai
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-indigo-600" />
                      +27 (0) 10 123 4567
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-indigo-600" />
                      Johannesburg, South Africa
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal className="rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.2),_rgba(255,255,255,0.9))] p-10 text-center shadow-sm">
            <div className="mx-auto flex max-w-3xl flex-col items-center">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                <BadgeCheck size={16} />
                Verified delivery
              </div>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Let&apos;s align on a delivery timeline that works.
              </h2>
              <p className="mt-4 text-base text-slate-600">
                We respond quickly with a tailored plan, scope, and delivery team options.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--nexus-ink)] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/25 transition-transform hover:scale-105"
                >
                  View service tiers
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
                >
                  Join as talent
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
