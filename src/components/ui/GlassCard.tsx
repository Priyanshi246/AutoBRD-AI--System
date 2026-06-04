import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'cyan' | 'purple' | 'blue';
}

export function GlassCard({ children, className = '', hover = true, glow }: GlassCardProps) {
  const glowStyles = {
    cyan: 'hover:shadow-cyan-500/20 hover:border-cyan-500/30',
    purple: 'hover:shadow-purple-500/20 hover:border-purple-500/30',
    blue: 'hover:shadow-blue-500/20 hover:border-blue-500/30'
  };

  return (
    <div
      className={`
        relative bg-white/5 backdrop-blur-md
        border border-white/10
        rounded-2xl
        shadow-xl
        ${hover ? 'transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1' : ''}
        ${glow ? glowStyles[glow] : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
