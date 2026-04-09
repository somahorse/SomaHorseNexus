

import { ArrowRight, ChevronDown } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";
import Link from "next/link";
import { Sector, sectorCatalog } from "@/lib/solutions-data";
import { sectorMeta } from "@/data/industries_page_data";
import { useState } from "react";




export default function SectorSolutions() {
  const [expandedSector, setExpandedSector] = useState<Sector | null>(null);

    return (
        <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
              5 sectors · 15 AI solutions
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Each sector gets a dedicated solution catalogue.
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {sectorCatalog.map((sector, index) => {
              const meta = sectorMeta[sector.id];
              const Icon = meta.icon;
              const isExpanded = expandedSector === sector.id;

              return (
                <ScrollReveal key={sector.id} delay={index * 0.08} >
                  <div
                    onClick={() => setExpandedSector(isExpanded ? null : sector.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setExpandedSector(isExpanded ? null : sector.id);
                      }
                    }}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${meta.gradient} text-white shadow-md mb-4`}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{sector.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      {sector.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                        {sector.solutions.length} solutions
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                          }`}
                      />
                    </div>

                    {/* Expanded solution list */}
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-80 opacity-100 mt-4 pt-4 border-t border-slate-100" : "max-h-0 opacity-0"
                        }`}
                    >
                      <div className="space-y-3">
                        {sector.solutions.map((sol) => (
                          <div key={sol.id} className={`rounded-xl ${meta.cardBg} p-3`}>
                            <p className="text-sm font-semibold text-slate-800">{sol.name}</p>
                            <p className="text-xs text-slate-500 mt-1">
                              {sol.tiers.basic.price} – {sol.tiers.premium.price}
                            </p>
                          </div>
                        ))}
                      </div>
                      <Link
                        href="/pricing"
                        className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${meta.accent} hover:underline`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        View full pricing
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    )
}