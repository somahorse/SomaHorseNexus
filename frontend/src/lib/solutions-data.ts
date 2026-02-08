// ─────────────────────────────────────────────────────────────
// Somahorse Nexus — Official Solutions & Pricing Catalog
// Source: CEO pricing document (Feb 2026)
// ─────────────────────────────────────────────────────────────

export type Sector = "fintech" | "agriculture" | "healthcare" | "education" | "manufacturing";

export interface TierPricing {
    price: string;
    description: string;
    features: string[];
    ideal: string;
}

export interface Solution {
    id: string;
    sector: Sector;
    name: string;
    tagline: string;
    description: string;
    tiers: {
        basic: TierPricing;
        standard: TierPricing;
        premium: TierPricing;
    };
}

export interface SectorInfo {
    id: Sector;
    name: string;
    description: string;
}

// ── Sectors ──────────────────────────────────────────────────

export const sectors: SectorInfo[] = [
    { id: "fintech", name: "Fintech", description: "Credit scoring, fraud detection, and payments infrastructure." },
    { id: "agriculture", name: "Agriculture", description: "Crop intelligence, marketplace platforms, and precision farming." },
    { id: "healthcare", name: "Healthcare", description: "Telemedicine, diagnostic AI, and drug inventory management." },
    { id: "education", name: "Education", description: "Adaptive learning, skills training, and school management." },
    { id: "manufacturing", name: "Manufacturing", description: "Production monitoring, predictive maintenance, and supply chain tracking." },
];

// ── All Solutions ────────────────────────────────────────────

export const solutions: Solution[] = [
    // ── FINTECH ──────────────────────────────────────────────
    {
        id: "credit-scoring",
        sector: "fintech",
        name: "Credit Scoring Using Mobile Money Data",
        tagline: "Assesses creditworthiness using transaction history",
        description:
            "An AI-driven system that assesses borrower creditworthiness using real transaction behaviour rather than traditional credit histories. By analysing mobile money data in real time or batch form, it enables lenders to make faster, more accurate, and more inclusive lending decisions.",
        tiers: {
            basic: {
                price: "R25,000",
                description: "A prototype scoring engine for validation.",
                features: [
                    "Analyses historical CSV transaction data",
                    "Outputs risk scores via command line or simple web interface",
                    "No live data integration (demo/validation only)",
                    "Ideal for early-stage lenders testing scoring logic before integration",
                ],
                ideal: "Early-stage lenders testing scoring logic",
            },
            standard: {
                price: "R80,000",
                description: "An operational lender decision support tool.",
                features: [
                    "Live API integration (M-Pesa, Flutterwave, etc.)",
                    "Dashboard with applicant risk profiles and scores",
                    "Model accuracy >95% with explainability features",
                    "Enables faster, data-driven lending decisions",
                ],
                ideal: "Growing fintechs and digital lenders",
            },
            premium: {
                price: "R250,000",
                description: "A real-time adaptive enterprise scoring system.",
                features: [
                    "Continuous model learning with fraud detection overlay",
                    "Compliance logging and audit trails",
                    "Seamless integration into core banking or loan origination systems",
                    "Built for high-volume lenders requiring regulatory readiness",
                ],
                ideal: "High-volume regulated lenders",
            },
        },
    },
    {
        id: "fraud-detection",
        sector: "fintech",
        name: "Real-Time Fraud Detection for Digital Payments",
        tagline: "Identifies and flags suspicious transactions instantly",
        description:
            "An AI-powered monitoring system that identifies and flags suspicious transaction behaviour as it happens. It reduces fraud losses by analysing patterns, anomalies, and user behaviour across payment flows, enabling immediate alerts and intervention.",
        tiers: {
            basic: {
                price: "R30,000",
                description: "A rule-based monitoring script for initial oversight.",
                features: [
                    "Flags unusual transaction patterns (large amounts, foreign locations)",
                    "Alerts via email or log files",
                    "No machine learning or live dashboard",
                    "Ideal for establishing basic fraud oversight",
                ],
                ideal: "Startups establishing basic fraud oversight",
            },
            standard: {
                price: "R100,000",
                description: "A machine learning-based detection system.",
                features: [
                    "Adaptive anomaly detection using Scikit-learn or equivalent",
                    "Real-time API and dashboard for fraud analysts",
                    "Detection rate >95% with one payment gateway integration",
                    "Significantly reduces fraud losses for scaling fintechs",
                ],
                ideal: "Scaling fintechs reducing fraud losses",
            },
            premium: {
                price: "R300,000",
                description: "An enterprise fraud prevention suite.",
                features: [
                    "Behavioral biometrics layer for user verification",
                    "Multi-gateway and bank support",
                    "SOC2-aligned audit trails and 24/7 monitoring dashboard",
                    "Built for large processors and banks requiring maximum security",
                ],
                ideal: "Large processors and banks",
            },
        },
    },
    {
        id: "payment-gateway",
        sector: "fintech",
        name: "Unified Payment Gateway",
        tagline: "Accept multiple payment methods through one integration",
        description:
            "A payment aggregation platform that allows businesses to accept card, mobile money, and bank transfer payments through a single integration point, with intelligent routing and reconciliation.",
        tiers: {
            basic: {
                price: "R20,000",
                description: "A sandbox demonstration of payment aggregation.",
                features: [
                    "Simulates card, mobile money and bank transfer payments using test APIs",
                    "Basic frontend for demonstration and client testing",
                    "Ideal for validating technical approach before live deployment",
                ],
                ideal: "Businesses validating technical approach",
            },
            standard: {
                price: "R70,000",
                description: "A live merchant-ready payment solution.",
                features: [
                    "Live integration with 2–3 payment methods + failover logic",
                    "Merchant admin panel for tracking and reporting",
                    "Ideal for SMEs needing to accept diverse payment options",
                ],
                ideal: "SMEs needing diverse payment options",
            },
            premium: {
                price: "R200,000",
                description: "An intelligent payment orchestration platform.",
                features: [
                    "AI-driven routing to optimise cost or speed per transaction",
                    "Automated reconciliations and subscription billing support",
                    "Advanced fraud screening + multi-currency settlement",
                    "Designed for high-volume merchants and financial institutions",
                ],
                ideal: "High-volume merchants and financial institutions",
            },
        },
    },

    // ── AGRICULTURE ──────────────────────────────────────────
    {
        id: "crop-disease-scanner",
        sector: "agriculture",
        name: "Crop Disease Scanner Mobile App",
        tagline: "Helps farmers identify diseases using smartphone cameras",
        description:
            "A mobile application that uses AI image recognition to help farmers quickly identify crop diseases and receive treatment recommendations, from proof-of-concept to enterprise disease intelligence.",
        tiers: {
            basic: {
                price: "R15,000",
                description: "A proof-of-concept mobile app.",
                features: [
                    "Pre-trained TensorFlow Lite model identifies 3–5 common crop diseases",
                    "Local photo analysis with basic treatment tips",
                    "No cloud storage or sync",
                ],
                ideal: "Small-scale validation and pilot testing",
            },
            standard: {
                price: "R60,000",
                description: "A ready-to-deploy field tool with insights and alerts.",
                features: [
                    "Custom-trained model on local crop varieties",
                    "Cloud sync for disease mapping and outbreak tracking",
                    "Regional alert system + user history logs",
                ],
                ideal: "Cooperatives and medium-sized farms",
            },
            premium: {
                price: "R150,000",
                description: "An enterprise disease intelligence system.",
                features: [
                    "Detects multiple diseases + nutrient deficiencies",
                    "Integration with agronomist networks for expert consultations",
                    "API for AgriTech platforms + historical analytics dashboard",
                ],
                ideal: "Large farming operations and agricultural agencies",
            },
        },
    },
    {
        id: "farmer-marketplace",
        sector: "agriculture",
        name: "Farmer-to-Buyer Marketplace App",
        tagline: "Connects farmers directly with buyers",
        description:
            "A platform that connects farmers directly with buyers, reducing middlemen and improving prices through AI-powered matching, logistics, and financial tools.",
        tiers: {
            basic: {
                price: "R20,000",
                description: "A functional listing and communication platform.",
                features: [
                    "Farmers list produce, buyers browse and message",
                    "Basic search and filter options",
                    "No in-app payments or logistics",
                ],
                ideal: "Local informal trading networks",
            },
            standard: {
                price: "R70,000",
                description: "A transactional platform with pricing and logistics.",
                features: [
                    "Price forecasting + demand spike notifications",
                    "In-app payments and order tracking",
                    "Logistics coordination with delivery estimates",
                ],
                ideal: "Scaling beyond local markets",
            },
            premium: {
                price: "R180,000",
                description: "A full supply chain and finance platform.",
                features: [
                    "AI-powered matching of farmers to bulk buyers",
                    "Quality assurance modules + certification tracking",
                    "Automated financial settlements + invoice generation",
                ],
                ideal: "Exporters, processors and large retailers",
            },
        },
    },
    {
        id: "precision-farming",
        sector: "agriculture",
        name: "Precision Farming Platform (Satellite & IoT)",
        tagline: "Uses data to optimise water, fertiliser, and crop planning",
        description:
            "A data-driven platform that combines satellite imagery and IoT sensor data to optimise irrigation, fertilisation, and crop planning for improved yields and reduced resource waste.",
        tiers: {
            basic: {
                price: "R25,000",
                description: "Visualisation and basic advisory tool.",
                features: [
                    "Displays satellite NDVI crop health maps via web app",
                    "Generic irrigation and fertiliser recommendations",
                    "No real-time sensor input",
                ],
                ideal: "Farmers beginning data-informed practices",
            },
            standard: {
                price: "R80,000",
                description: "An integrated farm management dashboard.",
                features: [
                    "Live soil moisture, temperature, and nutrient sensor integration",
                    "Automated irrigation and fertiliser scheduling",
                    "Mobile alerts for anomalies (dry zones, pest risks)",
                ],
                ideal: "Reducing resource waste and improving yields",
            },
            premium: {
                price: "R220,000",
                description: "A multi-farm intelligence and prediction system.",
                features: [
                    "Drone imagery integration for detailed field analysis",
                    "Predictive yield modelling + weather risk analytics",
                    "Carbon footprint tracking + sustainability reporting",
                ],
                ideal: "Commercial farms, agri-investors, sustainability programmes",
            },
        },
    },

    // ── HEALTHCARE ───────────────────────────────────────────
    {
        id: "telemedicine",
        sector: "healthcare",
        name: "Telemedicine Platform for Remote Consultations",
        tagline: "Enables secure video consultations between patients and providers",
        description:
            "A secure telemedicine platform enabling video consultations between patients and healthcare providers, from basic scheduling to full clinic management with diagnostic support.",
        tiers: {
            basic: {
                price: "R25,000",
                description: "A video calling MVP with scheduling and basic patient profiles.",
                features: [
                    "Secure video consultations",
                    "Basic scheduling functionality",
                    "Simple patient profiles",
                ],
                ideal: "Clinics testing remote consultations",
            },
            standard: {
                price: "R90,000",
                description: "A comprehensive telemedicine system with diagnostic support.",
                features: [
                    "EHR integration",
                    "AI symptom checker + prescription modules",
                    "Secure payment processing",
                ],
                ideal: "Full remote care delivery",
            },
            premium: {
                price: "R250,000",
                description: "A full clinic management and diagnostic system.",
                features: [
                    "Complete clinic management system with diagnostic support API",
                    "HIPAA/GDPR compliance",
                    "Multi-language support + offline capabilities",
                ],
                ideal: "Hospitals and healthcare networks",
            },
        },
    },
    {
        id: "diagnostic-assistant",
        sector: "healthcare",
        name: "AI Diagnostic Assistant for Medical Images",
        tagline: "Analyses medical images to assist with diagnoses",
        description:
            "An AI system that analyses medical images (X-rays, CT scans) to assist healthcare professionals with diagnoses, from basic anomaly detection to enterprise diagnostic collaboration.",
        tiers: {
            basic: {
                price: "R30,000",
                description: "A web portal for basic image analysis.",
                features: [
                    "Upload X-rays and CT scans",
                    "Pre-trained CNN model for basic anomaly detection",
                    "No hospital system integration",
                ],
                ideal: "Clinics exploring AI-assisted diagnostics",
            },
            standard: {
                price: "R100,000",
                description: "A comprehensive diagnostic support tool.",
                features: [
                    "Supports multiple imaging modalities",
                    "Generates structured reports",
                    "Integration with hospital viewer systems (>90% accuracy)",
                ],
                ideal: "Reducing diagnosis time and improving accuracy",
            },
            premium: {
                price: "R300,000",
                description: "An enterprise diagnostic and collaboration platform.",
                features: [
                    "Custom model training per hospital dataset",
                    "Integration with PACS systems",
                    "Collaboration tools for radiologists + ongoing validation",
                ],
                ideal: "Large hospitals and diagnostic centres",
            },
        },
    },
    {
        id: "drug-inventory",
        sector: "healthcare",
        name: "Drug Inventory Tracking System",
        tagline: "Manages medication stock levels and prevents shortages",
        description:
            "An intelligent inventory management system for medication tracking, from barcode scanning to blockchain-based supply chain verification and counterfeit detection.",
        tiers: {
            basic: {
                price: "R20,000",
                description: "A barcode scanning app with basic inventory tracking.",
                features: [
                    "Barcode scanning for medication tracking",
                    "Stock level dashboard with low stock alerts",
                ],
                ideal: "Small clinics digitising inventory management",
            },
            standard: {
                price: "R80,000",
                description: "An intelligent inventory management system.",
                features: [
                    "Predictive restocking AI + expiry date tracking",
                    "Supplier portal + basic reporting",
                ],
                ideal: "Preventing shortages and reducing waste",
            },
            premium: {
                price: "R220,000",
                description: "An advanced supply chain and compliance system.",
                features: [
                    "Blockchain-based supply chain tracking + counterfeit detection",
                    "AI temperature monitoring for vaccines",
                    "Regulatory audit reports",
                ],
                ideal: "Hospitals and pharmaceutical distributors",
            },
        },
    },

    // ── EDUCATION ────────────────────────────────────────────
    {
        id: "adaptive-learning",
        sector: "education",
        name: "Adaptive Learning Platform",
        tagline: "Adjusts educational content to each student's pace and style",
        description:
            "An AI-powered learning platform that adapts educational content and difficulty to each student's learning pace and style, from adaptive quizzes to full multi-subject AI tutoring.",
        tiers: {
            basic: {
                price: "R15,000",
                description: "A quiz engine that adapts difficulty based on performance.",
                features: [
                    "Adaptive quizzes adjusting difficulty",
                    "No personalised learning paths",
                ],
                ideal: "Testing adaptive learning concepts",
            },
            standard: {
                price: "R50,000",
                description: "A full adaptive learning platform with personalised paths.",
                features: [
                    "Personalised learning paths + progress dashboards",
                    "Content recommendations based on performance",
                ],
                ideal: "Schools and learning centres",
            },
            premium: {
                price: "R150,000",
                description: "A comprehensive educational intelligence system.",
                features: [
                    "Multi-subject AI tutors + LMS integration",
                    "Predictive dropout alerts + parent/teacher portals",
                ],
                ideal: "School districts with advanced analytics needs",
            },
        },
    },
    {
        id: "skills-training",
        sector: "education",
        name: "Mobile-First App for Practical Skills Training",
        tagline: "Provides hands-on training through mobile devices",
        description:
            "A mobile-first training platform providing hands-on practical skills development through video lessons, quizzes, certification, and AI mentorship.",
        tiers: {
            basic: {
                price: "R10,000",
                description: "A simple app with video lessons and quizzes for one skill.",
                features: [
                    "Video lessons and quizzes for one practical skill",
                    "No certification or collaboration features",
                ],
                ideal: "Individuals learning specific skills",
            },
            standard: {
                price: "R40,000",
                description: "A multi-skill training platform with certification.",
                features: [
                    "Multiple skill pathways + progress certification",
                    "Peer collaboration features + offline mode",
                ],
                ideal: "Vocational training programmes",
            },
            premium: {
                price: "R120,000",
                description: "An enterprise skills development and analytics platform.",
                features: [
                    "AI mentor chatbot + corporate training modules",
                    "Skills gap analytics + HR system API integration",
                ],
                ideal: "Large organisations and workforce development",
            },
        },
    },
    {
        id: "school-management",
        sector: "education",
        name: "School Management System",
        tagline: "Handles administrative tasks for educational institutions",
        description:
            "A school management system that digitises and streamlines administrative tasks, from attendance tracking to AI-powered scheduling and predictive analytics.",
        tiers: {
            basic: {
                price: "R12,000",
                description: "A digital attendance and gradebook system.",
                features: [
                    "Digital attendance tracking + teacher gradebook",
                    "No comprehensive admin features",
                ],
                ideal: "Schools beginning digitisation",
            },
            standard: {
                price: "R45,000",
                description: "A full administrative suite for schools.",
                features: [
                    "Fee management + timetable creation + report generation",
                    "Communication portal for parents and teachers",
                ],
                ideal: "Streamlining major administrative processes",
            },
            premium: {
                price: "R130,000",
                description: "An intelligent school management and analytics platform.",
                features: [
                    "AI-powered scheduling + predictive student performance analytics",
                    "Integration with government education platforms",
                ],
                ideal: "Data-driven decision making at district level",
            },
        },
    },

    // ── MANUFACTURING ────────────────────────────────────────
    {
        id: "production-monitoring",
        sector: "manufacturing",
        name: "Production Monitoring System Using IoT Sensors",
        tagline: "Tracks factory production in real time using connected sensors",
        description:
            "A real-time production monitoring system using IoT sensors, from basic output dashboards to predictive downtime AI and smart factory transformation.",
        tiers: {
            basic: {
                price: "R25,000",
                description: "A dashboard showing real-time machine output.",
                features: [
                    "Displays real-time machine output from connected sensors",
                    "No alerting or analysis features",
                ],
                ideal: "Factories beginning digital monitoring",
            },
            standard: {
                price: "R80,000",
                description: "A comprehensive production monitoring and alerting system.",
                features: [
                    "Alerting for downtime + OEE calculations",
                    "Maintenance logs + basic trend analysis",
                ],
                ideal: "Improving efficiency and reducing downtime",
            },
            premium: {
                price: "R250,000",
                description: "An advanced production intelligence and optimisation platform.",
                features: [
                    "Predictive downtime AI + energy consumption optimisation",
                    "Integration with ERP systems + shift performance analytics",
                ],
                ideal: "Smart factory transformation",
            },
        },
    },
    {
        id: "predictive-maintenance",
        sector: "manufacturing",
        name: "Predictive Maintenance Tool for Factory Equipment",
        tagline: "Predicts equipment failures before they occur",
        description:
            "A predictive maintenance system that uses historical data and machine learning to predict equipment failures before they occur, reducing unplanned downtime and maintenance costs.",
        tiers: {
            basic: {
                price: "R30,000",
                description: "A rule-based failure prediction system.",
                features: [
                    "Uses historical maintenance logs for rule-based failure prediction",
                    "No machine learning or integration features",
                ],
                ideal: "Early predictive maintenance strategies",
            },
            standard: {
                price: "R90,000",
                description: "A machine learning-based predictive maintenance system.",
                features: [
                    "ML model predicting failures with ≥85% accuracy",
                    "Spare parts inventory linking + technician alerts",
                ],
                ideal: "Reducing unplanned downtime and maintenance costs",
            },
            premium: {
                price: "R280,000",
                description: "An enterprise predictive maintenance and compliance platform.",
                features: [
                    "Real-time vibration/acoustic analysis + digital twin integration",
                    "Warranty and compliance tracking",
                ],
                ideal: "Large manufacturing operations",
            },
        },
    },
    {
        id: "supply-chain-tracking",
        sector: "manufacturing",
        name: "Supply Chain Tracking Platform",
        tagline: "Tracks products from factory to customer",
        description:
            "An end-to-end supply chain tracking platform, from GPS shipment tracking to blockchain-based visibility and demand forecasting AI.",
        tiers: {
            basic: {
                price: "R20,000",
                description: "A GPS tracking app for shipments.",
                features: [
                    "GPS tracking with estimated arrival times",
                    "No advanced analytics or monitoring",
                ],
                ideal: "Businesses beginning shipment tracking",
            },
            standard: {
                price: "R70,000",
                description: "A comprehensive supply chain tracking system.",
                features: [
                    "Multi-modal tracking + delay prediction",
                    "Temperature/humidity monitoring + basic analytics",
                ],
                ideal: "Improving supply chain visibility",
            },
            premium: {
                price: "R220,000",
                description: "An end-to-end supply chain intelligence platform.",
                features: [
                    "Blockchain-based visibility + demand forecasting AI",
                    "Carbon footprint tracking + supplier performance scoring",
                ],
                ideal: "Sustainable and efficient supply chain management",
            },
        },
    },
];

// ── Helper functions ─────────────────────────────────────────

export function getSolutionById(id: string): Solution | undefined {
    return solutions.find((s) => s.id === id);
}

export function getSolutionsBySector(sector: Sector): Solution[] {
    return solutions.filter((s) => s.sector === sector);
}

export function getSolutionTierPrice(solutionId: string, tier: "basic" | "standard" | "premium"): string {
    const solution = getSolutionById(solutionId);
    if (!solution) return "TBD";
    return solution.tiers[tier].price;
}

/** Readable labels for solution IDs (for admin pages, etc.) */
export const solutionLabels: Record<string, string> = Object.fromEntries(
    solutions.map((s) => [s.id, s.name])
);

/** Currently available solutions for client selection (Fintech first) */
export const availableSolutions = solutions.filter((s) => s.sector === "fintech");

/** All sectors with their solutions grouped */
export const sectorCatalog = sectors.map((sector) => ({
    ...sector,
    solutions: getSolutionsBySector(sector.id),
}));
