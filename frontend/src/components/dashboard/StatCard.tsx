interface StatCardProps {
    label: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon: React.ReactNode;
    variant?: 'default' | 'primary';
}

export default function StatCard({ label, value, trend, trendUp = true, icon, variant = 'default' }: StatCardProps) {
    const isPrimary = variant === 'primary';

    return (
        <div className={`relative overflow-hidden p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${isPrimary
                ? 'bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-white border border-slate-100 shadow-sm'
            }`}>
            {/* Arrow Icon - Top Right */}
            <button className={`absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isPrimary
                    ? 'bg-white/20 hover:bg-white/30 text-white'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-400'
                }`}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 13L13 1M13 1H5M13 1V9" />
                </svg>
            </button>

            <div className="mb-4">
                <h3 className={`text-sm font-medium mb-2 ${isPrimary ? 'text-cyan-100' : 'text-slate-500'}`}>
                    {label}
                </h3>
                <div className={`text-4xl font-black tracking-tight ${isPrimary ? 'text-white' : 'text-slate-900'}`}>
                    {value}
                </div>
            </div>

            {trend && (
                <div className="flex items-center gap-2 text-xs font-medium">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${isPrimary
                            ? 'bg-white/20 text-white'
                            : trendUp
                                ? 'bg-cyan-50 text-cyan-600'
                                : 'bg-amber-50 text-amber-600'
                        }`}>
                        {trendUp ? '↗' : '•'} {trend}
                    </span>
                    <span className={isPrimary ? 'text-cyan-200' : 'text-slate-400'}>
                        {trendUp ? 'Increased from last month' : ''}
                    </span>
                </div>
            )}
        </div>
    );
}
