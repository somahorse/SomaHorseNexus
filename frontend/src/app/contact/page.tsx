"use client";

import Link from "next/link";
import { useState } from "react";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  ArrowLeft,
  Send,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  Globe,
  Building2,
  Zap,
  Users,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Footer from "@/components/Footer";

const focusAreas = [
  {
    icon: Zap,
    title: "AI Solution Request",
    type: "ai-solution",
    description: "Get a custom AI solution built by our verified talent pool.",
  },
  {
    icon: Users,
    title: "Talent Partnership",
    type: "talent-partnership",
    description: "Explore our developer network for your team's needs.",
  },
  {
    icon: Building2,
    title: "Enterprise Inquiry",
    type: "enterprise",
    description: "Discuss large-scale AI integration for your organization.",
  },
  {
    icon: Globe,
    title: "General Inquiry",
    type: "general",
    description: "Have a question? We'd love to hear from you.",
  },
];

const engagementSteps = [
  { step: "01", title: "Submit Request", description: "Fill out the form with your project details." },
  { step: "02", title: "Consultation", description: "Our team reviews and schedules a discovery call." },
  { step: "03", title: "Proposal", description: "Receive a tailored proposal with timeline and pricing." },
  { step: "04", title: "Launch", description: "We match talent and kick off your project." },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    type: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save message to Firestore
      const msgRef = await addDoc(collection(db, "contact_messages"), {
        ...formData,
        read: false,
        createdAt: new Date().toISOString(),
      });

      // Create a notification for admin
      await addDoc(collection(db, "notifications"), {
        type: "contact_message",
        title: "New Contact Message",
        message: `${formData.name} sent a message: "${formData.subject}"`,
        read: false,
        createdAt: new Date().toISOString(),
        link: "/admin/messages",
        senderEmail: formData.email,
        senderName: formData.name,
        messageId: msgRef.id,
      });

      setIsSubmitted(true);
      setFormData({ name: "", email: "", company: "", subject: "", message: "", type: "general" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <MessageSquare size={16} className="text-cyan-400" />
              <span className="text-sm font-semibold text-slate-300">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Let&apos;s Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Together</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl">
              Whether you need AI talent, want to explore our solutions, or have a partnership idea — we&apos;re here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-4">
            {focusAreas.map((area) => (
              <button
                key={area.type}
                onClick={() => setFormData({ ...formData, type: area.type })}
                className={`text-left p-5 rounded-2xl border transition-all hover:-translate-y-1 duration-300 ${
                  formData.type === area.type
                    ? "bg-cyan-50 border-cyan-200 shadow-lg shadow-cyan-100"
                    : "bg-white border-slate-200 hover:border-cyan-200 hover:shadow-lg"
                }`}
              >
                <area.icon size={24} className={`mb-3 ${
                  formData.type === area.type ? "text-cyan-600" : "text-slate-400"
                }`} />
                <h3 className="text-sm font-bold text-slate-900 mb-1">{area.title}</h3>
                <p className="text-xs text-slate-500">{area.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Contact Details */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              {isSubmitted ? (
                <div className="bg-white rounded-3xl shadow-xl p-12 border border-slate-100 text-center">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-emerald-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Message Sent!</h2>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-slate-900"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-slate-900"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-slate-900"
                        placeholder="Company Inc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Subject *</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-slate-900"
                        placeholder="Project inquiry"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all resize-none text-slate-900"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Details</h3>
                <div className="space-y-5">
                  <ContactItem icon={Mail} label="Email" value="info@somahorse.ai" href="mailto:info@somahorse.ai" />
                  <ContactItem icon={MapPin} label="Headquarters" value="Johannesburg, South Africa" />
                  <ContactItem icon={Clock} label="Response Time" value="Within 24 hours" />
                  <ContactItem icon={Globe} label="Coverage" value="Pan-African, Global Reach" />
                </div>
              </div>

              {/* Engagement Process */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">How We Engage</h3>
                <div className="space-y-5">
                  {engagementSteps.map((step) => (
                    <div key={step.step} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                        <p className="text-sm text-slate-400">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ContactItem({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
        <Icon size={22} className="text-cyan-600" />
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        {href ? (
          <a href={href} className="text-slate-900 font-semibold hover:text-cyan-600 transition-colors">{value}</a>
        ) : (
          <p className="text-slate-900 font-semibold">{value}</p>
        )}
      </div>
    </div>
  );
}
