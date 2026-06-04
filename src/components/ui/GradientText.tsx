import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span className={`bg-gradient-to-r from-violet-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

export function GlowText({ children, className = '' }: GradientTextProps) {
  return (
    <span className={`relative ${className}`}>
      <span className="relative z-10 bg-gradient-to-r from-violet-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
        {children}
      </span>
      <span className="absolute inset-0 bg-gradient-to-r from-violet-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent blur-sm opacity-40">
        {children}
      </span>
    </span>
  );
}
