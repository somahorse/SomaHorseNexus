import { Service } from "@/lib/types";
import { BadgeCheck, BarChart3, CreditCard, Factory, GraduationCap, HeartPulse, Layers, Leaf, Sparkles, Target } from "lucide-react";
import { type Sector } from "@/lib/solutions-data";

export const services: Service[] = [
    {
        id: "talent-foundry",
        title: "Talent Foundry",
        summary:
            "Transform potential into verified, deployable skill through real deliverables and rigorous assessment gates.",
        outcomes: [
            "Assessment-gated talent readiness",
            "Verified portfolios built on live deliverables",
            "Continuous feedback loops for growth",
        ],
        icon: Sparkles,
    },
    {
        id: "solutions-hub",
        title: "Industrial Solutions Hub",
        summary:
            "Select an AI blueprint, choose a tier, and let Somahorse Nexus orchestrate delivery from kickoff to approval.",
        outcomes: ["Blueprint-led project scoping", "Milestone-driven execution", "Client approval workflow"],
        icon: Layers,
    },
    {
        id: "impact-dashboard",
        title: "Capital & Impact Dashboard",
        summary:
            "Live KPIs track developer earnings, client efficiency gains, completion rates, and ecosystem health.",
        outcomes: ["Economic impact visibility", "Performance and retention metrics", "Ecosystem health signals"],
        icon: BarChart3,
    },
];



export const tiers = [
    {
        title: "Basic",
        price: "From R10,000",
        detail:
            "Rapid prototype for validation. Essential features, demo-ready outputs, and a clear delivery roadmap. Ideal for testing your concept before full integration.",
    },
    {
        title: "Standard",
        price: "From R40,000",
        detail:
            "Production-ready solution with live integrations, dashboards, and stakeholder reporting. Built for growing businesses needing real operational tools.",
        featured: true,
    },
    {
        title: "Premium",
        price: "From R120,000",
        detail:
            "Enterprise-grade deployment with advanced integrations, compliance support, continuous optimisation, and dedicated project management.",
    },
];


export const engagementIncludes = [
    "A dedicated project lead",
    "A verified AI delivery team",
    "Deployment into a secure, production-ready environment",
    "Post-deployment performance audit",
    "Platform support during the warranty period",
];


export const processSteps = [
    { title: "Discovery", detail: "Align on scope, success metrics, and tier selection.", icon: Target },
    { title: "Match", detail: "Verified teams are assigned based on skills and delivery fit.", icon: BadgeCheck },
    { title: "Delivery", detail: "Milestones, reviews, and handover with clear accountability.", icon: Factory },
    { title: "Impact", detail: "Dashboards track ROI, earnings, and ecosystem health.", icon: BarChart3 },
];



const sectorIcons: Record<Sector, typeof CreditCard> = {
    fintech: CreditCard,
    agriculture: Leaf,
    healthcare: HeartPulse,
    education: GraduationCap,
    manufacturing: Factory,
};

const sectorGradients: Record<Sector, string> = {
    fintech: "from-indigo-500 to-blue-600",
    agriculture: "from-emerald-500 to-teal-600",
    healthcare: "from-rose-500 to-pink-600",
    education: "from-violet-500 to-purple-600",
    manufacturing: "from-cyan-500 to-blue-600",
};