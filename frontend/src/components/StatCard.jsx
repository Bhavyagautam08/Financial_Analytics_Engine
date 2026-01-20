import React from 'react';

const StatCard = ({ title, value, subValue, status, icon: Icon, trend }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Danger': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
            case 'On Track': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            case 'Warning': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
        }
    };

    return (
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all duration-500" />

            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-slate-400 text-sm font-medium tracking-wide">{title}</h3>
                    {status && (
                        <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                            {status}
                        </span>
                    )}
                </div>
                {Icon && (
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-white/5 text-violet-400">
                        <Icon size={20} />
                    </div>
                )}
            </div>

            <div className="relative">
                <h2 className="text-3xl font-bold text-white tracking-tight">
                    {value}
                </h2>
                {subValue && (
                    <p className="mt-1 text-sm text-slate-500 font-medium">
                        {subValue}
                    </p>
                )}
            </div>

            {trend && (
                <div className="mt-4 flex items-center gap-2 text-sm">
                    <span className={trend > 0 ? 'text-rose-400' : 'text-emerald-400'}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                    <span className="text-slate-500">vs last month</span>
                </div>
            )}
        </div>
    );
};

export default StatCard;
