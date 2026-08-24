import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  trendPositive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendPositive = true,
  onClick,
  className = ''
}: StatCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl p-5 border border-slate-200/80 shadow-subtle hover:shadow-elevated transition-all duration-200 ${onClick ? 'cursor-pointer hover:border-brand-300' : ''} ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</span>
        <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-slate-600">
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900">{value}</span>
        {trend && (
          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${trendPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
            {trend}
          </span>
        )}
      </div>
      {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
    </div>
  );
}
