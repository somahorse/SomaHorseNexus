"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { X, Plus, Save, Info, CheckCircle2, Briefcase, Clock, Zap } from "lucide-react";

export default function OnboardingStep1() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    // Strict Step Guard
    useEffect(() => {
        const checkStep = async () => {
            if (!user) return;
            const docRef = doc(db, "users", user.uid);
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                const data = snapshot.data();
                if (data.onboardingStep && data.onboardingStep > 1) {
                    router.replace('/assessments/aptitude');
                } else {
                    setPageLoading(false);
                }
            }
        };
        checkStep();
    }, [user, router]);

    // Form State
    const [bio, setBio] = useState("");
    const [experience, setExperience] = useState("");
    const [role, setRole] = useState("");
    const [availability, setAvailability] = useState("");
    const [projectPreference, setProjectPreference] = useState<string[]>([]);

    const [linkedin, setLinkedin] = useState("");
    const [portfolio, setPortfolio] = useState("");

    // Skills State
    const [currentSkill, setCurrentSkill] = useState("");
    const [skills, setSkills] = useState<string[]>([]);

    const addSkill = () => {
        if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
            setSkills([...skills, currentSkill.trim()]);
            setCurrentSkill("");
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const toggleProjectPref = (pref: string) => {
        if (projectPreference.includes(pref)) {
            setProjectPreference(projectPreference.filter(p => p !== pref));
        } else {
            setProjectPreference([...projectPreference, pref]);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                bio,
                experience,
                role,
                availability,
                projectPreference,
                links: { linkedin, portfolio },
                skills,
                onboardingStep: 2,
                updatedAt: new Date().toISOString()
            });
            router.replace('/assessments/aptitude');
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to save profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) return null; // Or a specific spinner for this page check

    return (
        <div className="min-h-screen bg-white text-slate-900">
            {/* Split Layout: Left Content, Right Form */}
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* Left Side: Context & Branding */}
                <div className="w-full lg:w-1/3 bg-slate-50 border-r border-slate-200 p-8 lg:p-12 lg:fixed lg:h-full lg:overflow-y-auto">
                    <div className="max-w-md mx-auto lg:max-w-none">
                        <div className="mb-12">
                            <div className="h-2 w-20 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-full mb-6"></div>
                            <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-6">
                                Let's Define Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">
                                    Professional DNA.
                                </span>
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                To match you with elite projects, we need to understand not just what you do, but how you think, work, and thrive.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="mt-1 bg-cyan-100 p-2 rounded-lg h-fit text-cyan-700">
                                    <Briefcase size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Curated Matching</h3>
                                    <p className="text-sm text-slate-500 mt-1">We use this data to calculate your fit score for high-stakes enterprise contracts.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 bg-violet-100 p-2 rounded-lg h-fit text-violet-700">
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Zero Fluff</h3>
                                    <p className="text-sm text-slate-500 mt-1">Clients see your raw capabilities and verified metrics, not just a resume.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-sm text-slate-500 italic">
                                "The detail you provide here directly influences your initial tier ranking. Be thorough, be specific, be bold."
                            </p>
                            <div className="flex items-center gap-2 mt-4">
                                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                                <span className="text-xs font-semibold text-slate-900">Head of Talent Ops</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: The Long Form */}
                <div className="w-full lg:w-2/3 lg:ml-[33.333%] p-6 lg:p-24 bg-white">
                    <div className="max-w-3xl mx-auto">
                        <form onSubmit={handleSubmit} className="space-y-12">

                            {/* Section 1: Core Identity */}
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-sm">1</span>
                                    Core Identity
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                            Professional Headline
                                            <div className="group relative">
                                                <Info size={14} className="text-slate-400 cursor-help" />
                                                <span className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity w-48 text-center pointer-events-none">
                                                    Your 'elevator pitch'. Keep it under 100 characters.
                                                </span>
                                            </div>
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none font-medium"
                                            placeholder="e.g. Senior Full Stack Engineer specializing in FinTech"
                                            value={bio} // Using bio as headline for now, or add new field
                                            onChange={(e) => setBio(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Role</label>
                                        <select
                                            required
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                                        >
                                            <option value="" disabled>Select your main focus...</option>
                                            <option value="frontend">Frontend Engineer</option>
                                            <option value="backend">Backend Engineer</option>
                                            <option value="fullstack">Full Stack Engineer</option>
                                            <option value="mobile">Mobile Developer (iOS/Android)</option>
                                            <option value="devops">DevOps / SRE</option>
                                            <option value="ml">AI / ML Engineer</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Availability</label>
                                        <select
                                            required
                                            value={availability}
                                            onChange={(e) => setAvailability(e.target.value)}
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-50 outline-none"
                                        >
                                            <option value="" disabled>Select availability...</option>
                                            <option value="immediate">Immediate Start</option>
                                            <option value="2weeks">2 Weeks Notice</option>
                                            <option value="month">1 Month+</option>
                                            <option value="passive">Passively Looking</option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            <hr className="border-slate-100" />

                            {/* Section 2: Deep Dive */}
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-sm">2</span>
                                    Experience & Skills
                                </h2>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                        Technical Deep Dive
                                        <span className="text-slate-400 font-normal text-xs">(Markdown Supported)</span>
                                    </label>
                                    <textarea
                                        required
                                        rows={6}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none resize-y"
                                        placeholder="Describe your most complex project. What was the architecture? What hard problems did you solve? Don't hold back on technical jargon."
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-3">Tech Stack (Press Enter to add)</label>
                                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-transparent transition-all">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {skills.map(skill => (
                                                <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 text-sm font-medium shadow-sm">
                                                    {skill}
                                                    <button type="button" onClick={() => removeSkill(skill)} className="text-slate-400 hover:text-red-500 transition-colors">
                                                        <X size={14} />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                className="flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                                                placeholder="e.g. Next.js, PostgreSQL, Kubernetes..."
                                                value={currentSkill}
                                                onChange={(e) => setCurrentSkill(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                            />
                                            <button type="button" onClick={addSkill} className="p-1 text-slate-400 hover:text-cyan-600">
                                                <Plus size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <hr className="border-slate-100" />

                            {/* Section 3: Preferences */}
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-sm">3</span>
                                    Work Preferences
                                </h2>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-4">What kind of engagements excite you?</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            { id: 'greenfield', label: 'Greenfield Building', desc: 'Starting from scratch' },
                                            { id: 'scaling', label: 'High Scale Systems', desc: 'Optimizing for millions' },
                                            { id: 'rescue', label: 'Legacy Rescue', desc: 'Refactoring & Modernizing' },
                                            { id: 'rnd', label: 'R&D / Prototyping', desc: 'Cutting edge experimentation' }
                                        ].map(pref => (
                                            <div
                                                key={pref.id}
                                                onClick={() => toggleProjectPref(pref.id)}
                                                className={`cursor-pointer p-4 rounded-xl border transition-all ${projectPreference.includes(pref.id)
                                                        ? 'border-cyan-500 bg-cyan-50 ring-1 ring-cyan-500'
                                                        : 'border-slate-200 hover:border-slate-300 bg-white'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className={`block font-semibold ${projectPreference.includes(pref.id) ? 'text-cyan-900' : 'text-slate-900'}`}>
                                                            {pref.label}
                                                        </span>
                                                        <span className="text-xs text-slate-500">{pref.desc}</span>
                                                    </div>
                                                    {projectPreference.includes(pref.id) && <CheckCircle2 size={18} className="text-cyan-600" />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            <hr className="border-slate-100" />

                            {/* Section 4: Digital Footprint */}
                            <section className="space-y-6">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-sm">4</span>
                                    Digital Footprint
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">LinkedIn Profile</label>
                                        <input
                                            type="url"
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                                            placeholder="https://linkedin.com/in/..."
                                            value={linkedin}
                                            onChange={(e) => setLinkedin(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Portfolio / GitHub</label>
                                        <input
                                            type="url"
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                                            placeholder="https://..."
                                            value={portfolio}
                                            onChange={(e) => setPortfolio(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="pt-8 pb-20">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-5 rounded-xl bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 hover:shadow-2xl transition-all flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-wait' : ''}`}
                                >
                                    {loading ? 'Analyzing Profile...' : (
                                        <>
                                            Save & Initialize Step 2 <Briefcase size={20} />
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-slate-400 text-sm mt-6">
                                    By clicking continue, you agree to our Talent Terms of Service.
                                    <br /> This step cannot be undone.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
