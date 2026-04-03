import { BadgeCheck, Shield } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";
import { engagementIncludes } from "@/data/Services_data";



export default function EngagementIncludesSection() {
    return (
        <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                  <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700 mb-6">
                      <Shield size={14} />
                      Included with every project
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                      Every engagement comes standard.
                    </h2>
                  </ScrollReveal>
                  <div className="max-w-3xl mx-auto">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {engagementIncludes.map((item, i) => (
                        <ScrollReveal key={item} delay={i * 0.08} className="w-full! " >
                          <div className="flex w-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                            <BadgeCheck size={20} className="mt-0.5 text-emerald-500 shrink-0" />
                            <p className="text-sm font-semibold text-slate-800">{item}</p>
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
    )
}