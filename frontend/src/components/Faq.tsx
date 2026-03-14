"use client"

import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "./ui/ScrollReveal";
import { faqs } from "@/data/faq_data";
import { useState } from "react";



export default function FAQSection() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);



    return (
        <section className="py-24 bg-slate-50 relative">
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
                            className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm animate-fadeInUp"
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
                                    className={`text-slate-500 transition-transform duration-300 shrink-0 ml-4 ${openFaq === index ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-52 pb-6' : 'max-h-0'}`}
                            >
                                <p className="px-6 text-slate-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}