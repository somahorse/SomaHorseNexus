import { Sector } from "@/lib/solutions-data";
import { BadgeCheck, BarChart3, CreditCard, Factory, GraduationCap, HeartPulse, Layers, Leaf } from "lucide-react";



export const sectorMeta: Record<
    Sector,
    { icon: typeof CreditCard; gradient: string; accent: string; cardBg: string }
> = {
    fintech: {
        icon: CreditCard,
        gradient: "from-indigo-500 to-blue-600",
        accent: "text-indigo-600",
        cardBg: "bg-indigo-50/50",
    },
    agriculture: {
        icon: Leaf,
        gradient: "from-emerald-500 to-teal-600",
        accent: "text-emerald-600",
        cardBg: "bg-emerald-50/50",
    },
    healthcare: {
        icon: HeartPulse,
        gradient: "from-rose-500 to-pink-600",
        accent: "text-rose-600",
        cardBg: "bg-rose-50/50",
    },
    education: {
        icon: GraduationCap,
        gradient: "from-violet-500 to-purple-600",
        accent: "text-violet-600",
        cardBg: "bg-violet-50/50",
    },
    manufacturing: {
        icon: Factory,
        gradient: "from-cyan-500 to-blue-600",
        accent: "text-cyan-600",
        cardBg: "bg-cyan-50/50",
    },
};



export const pillars = [
    {
        title: "Verified delivery",
        detail: "Every industry engagement is built on assessment-gated talent and milestone verification.",
        icon: BadgeCheck,
    },
    {
        title: "Blueprint-driven",
        detail: "We start with proven AI blueprints to accelerate scoping and reduce delivery risk.",
        icon: Layers,
    },
    {
        title: "Impact visibility",
        detail: "Dashboards track ROI, earnings, completion rates, and ecosystem health signals.",
        icon: BarChart3,
    },
];
