"use client";

import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <main className="flex min-h-screen flex-col bg-white">
            {/* Hero */}
            <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors">
                        <ArrowLeft size={18} />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                            <Shield size={28} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-900">Privacy Policy</h1>
                            <p className="text-slate-500 mt-1">Last updated: February 2026</p>
                        </div>
                    </div>
                    <p className="text-lg text-slate-600 max-w-3xl">
                        At Somahorse Nexus, we take your privacy seriously. This policy explains how we collect, use, store, and protect your personal information.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="prose prose-slate prose-lg max-w-none">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
                        <p className="text-slate-600 mb-6">
                            We collect information you provide directly to us, including:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-8 space-y-2">
                            <li>Name, email address, and contact information when you create an account</li>
                            <li>Professional information such as skills, experience, and portfolio links</li>
                            <li>Payment and billing information for processing transactions</li>
                            <li>Communications you send to us or through our platform</li>
                            <li>Assessment results and project deliverables</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
                        <p className="text-slate-600 mb-6">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-8 space-y-2">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Match talent with appropriate project opportunities</li>
                            <li>Process payments and maintain transaction records</li>
                            <li>Send you technical notices, updates, and support messages</li>
                            <li>Respond to your comments, questions, and requests</li>
                            <li>Monitor and analyze trends, usage, and activities</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Information Sharing</h2>
                        <p className="text-slate-600 mb-8">
                            We do not sell your personal information. We may share your information only in the following circumstances:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-8 space-y-2">
                            <li>With clients or developers as necessary to facilitate project collaboration</li>
                            <li>With service providers who assist in our operations</li>
                            <li>When required by law or to protect our rights</li>
                            <li>In connection with a merger, acquisition, or sale of assets</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Security</h2>
                        <p className="text-slate-600 mb-8">
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption of data in transit and at rest, regular security audits, and access controls.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Your Rights</h2>
                        <p className="text-slate-600 mb-6">
                            Depending on your location, you may have the following rights:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-8 space-y-2">
                            <li>Access and receive a copy of your personal data</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to or restrict processing of your data</li>
                            <li>Data portability</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Contact Us</h2>
                        <p className="text-slate-600 mb-8">
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                            <p className="text-slate-700 font-semibold">Somahorse Nexus</p>
                            <p className="text-slate-600">Email: privacy@somahorse.ai</p>
                            <p className="text-slate-600">Address: Johannesburg, South Africa</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
