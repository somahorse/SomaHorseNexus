import { Sector } from "@/lib/solutions-data";
import { CreditCard, Factory, GraduationCap, HeartPulse, Leaf } from "lucide-react";



export const sectorIcons: Record<Sector, typeof CreditCard> = {
  fintech: CreditCard,
  agriculture: Leaf,
  healthcare: HeartPulse,
  education: GraduationCap,
  manufacturing: Factory,
};

export const sectorGradients: Record<Sector, string> = {
  fintech: "from-indigo-500 to-blue-600",
  agriculture: "from-emerald-500 to-teal-600",
  healthcare: "from-rose-500 to-pink-600",
  education: "from-violet-500 to-purple-600",
  manufacturing: "from-cyan-500 to-blue-600",
};