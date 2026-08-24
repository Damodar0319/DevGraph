import React from 'react';
import { EntityType } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'error' | 'purple' | 'blue' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'sm', 
  className = '', 
  onClick 
}: BadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3 py-1.5 font-semibold',
  }[size];

  const variantClasses = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    outline: 'bg-transparent text-slate-600 border border-slate-300',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    error: 'bg-rose-50 text-rose-700 border border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200',
    blue: 'bg-brand-50 text-brand-700 border border-brand-200',
    amber: 'bg-amber-50 text-amber-800 border border-amber-200',
  }[variant];

  const clickableClasses = onClick 
    ? 'cursor-pointer hover:opacity-80 transition-opacity' 
    : '';

  return (
    <span 
      className={`inline-flex items-center gap-1 rounded-md transition-colors ${sizeClasses} ${variantClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}

export function EntityBadge({ 
  name, 
  type, 
  onClick 
}: { 
  name: string; 
  type?: EntityType; 
  onClick?: () => void; 
}) {
  const getBadgeStyle = (entityType?: EntityType) => {
    switch (entityType) {
      case 'service':
        return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
      case 'person':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100';
      case 'repo':
        return 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200';
      case 'document':
      case 'decision':
        return 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100';
      case 'pr':
        return 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100';
      case 'incident':
      case 'issue':
        return 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100';
      case 'tech':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium border transition-all duration-150 ${getBadgeStyle(type)}`}
    >
      <span>{name}</span>
    </button>
  );
}

export function HealthBadge({ status }: { status: 'healthy' | 'warning' | 'degraded' }) {
  if (status === 'healthy') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        Healthy
      </span>
    );
  }
  if (status === 'warning') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
        Warning
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
      Degraded
    </span>
  );
}
