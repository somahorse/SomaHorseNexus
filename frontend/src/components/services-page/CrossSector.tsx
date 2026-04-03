import { sectorCatalog } from "@/lib/solutions-data";
import { ScrollReveal } from "../ui/ScrollReveal";
import { sectorGradients, sectorIcons } from "@/data/sector-data";
import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpen } from "lucide-react";



export default function CrossSector() {
    return (
        <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <ScrollReveal direction="right">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600">
                  Solutions across 5 sectors
                </p>
                <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  15 AI solutions tailored for Africa&apos;s key industries.
                </h2>
                <p className="mt-4 text-base text-slate-600">
                  Each solution is offered in three transparent tiers so you can select the level
                  that aligns with your operational needs and strategic goals.
                </p>
                <div className="mt-8 space-y-3">
                  {sectorCatalog.map((sector) => {
                    const Icon = sectorIcons[sector.id];
                    const gradient = sectorGradients[sector.id];
                    return (
                      <div
                        key={sector.id}
                        className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-cyan-200 hover:shadow-md transition-all flex items-center gap-4"
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-slate-900">{sector.name}</h3>
                          <p className="text-sm text-slate-500 truncate">{sector.description}</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 shrink-0">
                          {sector.solutions.length}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <Link
                  href="/pricing"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
                >
                  View full pricing catalogue
                  <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.2}>
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-xl">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                  <BookOpen size={18} />
                  What you get
                </div>
                <h3 className="mt-4 text-2xl font-bold">Blueprint-driven delivery</h3>
                <div className="mt-6 space-y-4 text-sm text-slate-200">
                  {[
                    "Business requirements + data intake checklist",
                    "Milestone plan with measurable success metrics",
                    "Delivery artifact templates and demo assets",
                    "Compliance and security review pathway",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <BadgeCheck size={18} className="mt-1 text-cyan-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    )
}