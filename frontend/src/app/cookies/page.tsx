"use client";

import Link from "next/link";
import { ArrowLeft, Cookie } from "lucide-react";
import Footer from "@/components/Footer";

export default function CookiesPage() {
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
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                            <Cookie size={28} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-900">Cookie Policy</h1>
                            <p className="text-slate-500 mt-1">Last updated: February 2026</p>
                        </div>
                    </div>
                    <p className="text-lg text-slate-600 max-w-3xl">
                        This Cookie Policy explains how Somahorse Nexus uses cookies and similar technologies when you visit our website and use our services.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="prose prose-slate prose-lg max-w-none">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. What Are Cookies?</h2>
                        <p className="text-slate-600 mb-8">
                            Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Cookies</h2>
                        <p className="text-slate-600 mb-6">
                            We use cookies and similar technologies for the following purposes:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-8 space-y-2">
                            <li><strong>Essential Cookies:</strong> Required for the website to function properly, including authentication and security</li>
                            <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                            <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                            <li><strong>Analytics Cookies:</strong> Collect anonymous information about website usage</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Types of Cookies We Use</h2>
                        <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="pb-3 text-slate-900 font-semibold">Cookie Type</th>
                                        <th className="pb-3 text-slate-900 font-semibold">Purpose</th>
                                        <th className="pb-3 text-slate-900 font-semibold">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-600">
                                    <tr className="border-b border-slate-100">
                                        <td className="py-3">Session Cookie</td>
                                        <td className="py-3">Authentication</td>
                                        <td className="py-3">Session</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-3">Preferences</td>
                                        <td className="py-3">Store settings</td>
                                        <td className="py-3">1 year</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-3">Analytics</td>
                                        <td className="py-3">Usage tracking</td>
                                        <td className="py-3">2 years</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3">Security</td>
                                        <td className="py-3">CSRF protection</td>
                                        <td className="py-3">Session</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Third-Party Cookies</h2>
                        <p className="text-slate-600 mb-8">
                            We may use third-party services that set their own cookies, including analytics providers (like Google Analytics) and payment processors. These third parties have their own privacy policies governing the use of cookies.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Managing Cookies</h2>
                        <p className="text-slate-600 mb-6">
                            You can control and manage cookies in several ways:
                        </p>
                        <ul className="list-disc list-inside text-slate-600 mb-8 space-y-2">
                            <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies through settings</li>
                            <li><strong>Cookie Preferences:</strong> Use our cookie consent banner to manage your preferences</li>
                            <li><strong>Opt-Out Tools:</strong> Use industry opt-out tools for advertising cookies</li>
                        </ul>
                        <p className="text-slate-600 mb-8">
                            Note that blocking certain cookies may affect your ability to use some features of our website.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Updates to This Policy</h2>
                        <p className="text-slate-600 mb-8">
                            We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the new policy on this page.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Contact Us</h2>
                        <p className="text-slate-600 mb-8">
                            If you have questions about our use of cookies, please contact us:
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
