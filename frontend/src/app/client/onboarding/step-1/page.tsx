"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
    Building2,
    Globe,
    Users,
    MapPin,
    Mail,
    Phone,
    Link as LinkIcon,
    ArrowRight,
    Briefcase,
    CheckCircle2,
} from "lucide-react";

const industries = [
    "Fintech",
    "AgriTech",
    "HealthTech",
    "EdTech",
    "E-Commerce",
    "Logistics",
    "Manufacturing",
    "Real Estate",
    "Insurance",
    "Other",
];

const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "500+ employees",
];

const regions = [
    "South Africa",
    "Nigeria",
    "Kenya",
    "Ghana",
    "Egypt",
    "Other Africa",
    "Europe",
    "North America",
    "Asia",
    "Other",
];

export default function ClientOnboardingStep1() {
    const { user, refreshUserData } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        orgName: "",
        industry: "",
        companySize: "",
        region: "",
        contactName: "",
        contactEmail: user?.email || "",
        contactPhone: "",
        website: "",
        socialLink: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSubmitting(true);
        try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                organization: {
                    name: formData.orgName,
                    industry: formData.industry,
                    size: formData.companySize,
                    region: formData.region,
                    website: formData.website,
                    socialLink: formData.socialLink,
                },
                contact: {
                    name: formData.contactName,
                    email: formData.contactEmail,
                    phone: formData.contactPhone,
                },
                clientOnboardingStep: 2,
                updatedAt: new Date().toISOString(),
            });

            await refreshUserData();
            router.push("/client/onboarding/step-2");
        } catch (error) {
            console.error("Error saving organization info:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.orgName && formData.industry && formData.companySize && formData.region && formData.contactName && formData.contactEmail;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-violet-500/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative w-full max-w-2xl">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-cyan-400 text-sm font-medium">Step 1 of 6</span>
                        <span className="text-slate-400 text-sm">Organization Setup</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[16.66%] bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full transition-all duration-500"></div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 rounded-3xl blur-xl"></div>
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                                <Building2 size={28} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Organization Setup</h1>
                                <p className="text-slate-400">Tell us about your company</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Organization Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Organization Name *
                                </label>
                                <div className="relative">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        name="orgName"
                                        value={formData.orgName}
                                        onChange={handleChange}
                                        placeholder="Your company name"
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Industry & Company Size Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Industry *
                                    </label>
                                    <select
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" className="bg-slate-800">Select industry</option>
                                        {industries.map((ind) => (
                                            <option key={ind} value={ind} className="bg-slate-800">{ind}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Company Size *
                                    </label>
                                    <select
                                        name="companySize"
                                        value={formData.companySize}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" className="bg-slate-800">Select size</option>
                                        {companySizes.map((size) => (
                                            <option key={size} value={size} className="bg-slate-800">{size}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Region */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Region / Country *
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <select
                                        name="region"
                                        value={formData.region}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" className="bg-slate-800">Select region</option>
                                        {regions.map((reg) => (
                                            <option key={reg} value={reg} className="bg-slate-800">{reg}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-white/10 pt-6">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Users size={20} className="text-cyan-400" />
                                    Primary Contact
                                </h3>
                            </div>

                            {/* Contact Name & Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Contact Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="contactName"
                                        value={formData.contactName}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Email *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="email"
                                            name="contactEmail"
                                            value={formData.contactEmail}
                                            onChange={handleChange}
                                            placeholder="email@company.com"
                                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Phone (Optional)
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="tel"
                                        name="contactPhone"
                                        value={formData.contactPhone}
                                        onChange={handleChange}
                                        placeholder="+27 XX XXX XXXX"
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-white/10 pt-6">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Globe size={20} className="text-violet-400" />
                                    Online Presence (Optional)
                                </h3>
                            </div>

                            {/* Website & Social */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Website
                                    </label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="url"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleChange}
                                            placeholder="https://yourcompany.com"
                                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        LinkedIn / Social
                                    </label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="url"
                                            name="socialLink"
                                            value={formData.socialLink}
                                            onChange={handleChange}
                                            placeholder="https://linkedin.com/company/..."
                                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!isFormValid || isSubmitting}
                                className="w-full mt-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Continue to Select Solution
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
