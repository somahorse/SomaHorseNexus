"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import Footer from "@/components/Footer";

export default function TermsPage() {
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
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center">
                            <FileText size={28} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-900">Terms of Service</h1>
                            <p className="text-slate-500 mt-1">Last updated: February 2026</p>
                        </div>
                    </div>
                    <p className="text-lg text-slate-600 max-w-3xl">
                        Please read these terms carefully before using the Somahorse Nexus platform. By accessing or using our services, you agree to be bound by these terms.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="prose prose-slate prose-lg max-w-none">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-slate-600 mb-8">
                            By accessing and using Somahorse Nexus (&quot;the Platform&quot;), you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you may not use the Platform.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
                        <p className="text-slate-600 mb-8">
                            Somahorse Nexus is an AI talent operating system that connects verified developers with businesses seeking AI/software solutions. We provide talent verification, project matching, delivery orchestration, and payment processing services.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Accounts</h2>
                        <p className="text-slate-600 mb-6">
                            To use certain features of the Platform, you must register for an account. You agree to:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-8 space-y-2">
                            <li>Provide accurate and complete registration information</li>
                            <li>Maintain the security of your account credentials</li>
                            <li>Notify us immediately of any unauthorized access</li>
                            <li>Accept responsibility for all activities under your account</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Developer Terms</h2>
                        <p className="text-slate-600 mb-6">
                            If you register as a developer on the Platform, you agree to:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-8 space-y-2">
                            <li>Complete our assessment process honestly and independently</li>
                            <li>Deliver work that meets the agreed specifications and quality standards</li>
                            <li>Communicate professionally with clients and staff</li>
                            <li>Accept the 60/40 revenue split (developer/platform) for project payments</li>
                            <li>Maintain confidentiality of client information</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Client Terms</h2>
                        <p className="text-slate-600 mb-6">
                            If you register as a client on the Platform, you agree to:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-8 space-y-2">
                            <li>Provide clear project requirements and specifications</li>
                            <li>Review and approve deliverables within agreed timeframes</li>
                            <li>Make payments in accordance with the agreed milestones</li>
                            <li>Communicate professionally with developers and staff</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Payment Terms</h2>
                        <p className="text-slate-600 mb-8">
                            All payments are processed through our secure payment system. Payments are held in escrow and released to developers upon client approval of milestones. Refunds are handled on a case-by-case basis according to our dispute resolution process.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Intellectual Property</h2>
                        <p className="text-slate-600 mb-8">
                            Unless otherwise agreed in writing, all intellectual property rights in work product created through the Platform transfer to the client upon full payment. Developers retain the right to use general knowledge and skills gained during projects.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Limitation of Liability</h2>
                        <p className="text-slate-600 mb-8">
                            To the maximum extent permitted by law, Somahorse Nexus shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Platform.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Termination</h2>
                        <p className="text-slate-600 mb-8">
                            We reserve the right to suspend or terminate your account at any time for violations of these terms or for any other reason at our discretion. You may terminate your account by contacting our support team.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact Us</h2>
                        <p className="text-slate-600 mb-8">
                            For questions about these Terms of Service, please contact us:
                        </p>
                        <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                            <p className="text-slate-700 font-semibold">Somahorse Nexus</p>
                            <p className="text-slate-600">Email: legal@somahorse.ai</p>
                            <p className="text-slate-600">Address: Johannesburg, South Africa</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
