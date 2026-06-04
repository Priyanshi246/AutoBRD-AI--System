import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { GradientText } from '../ui/GradientText';

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F8CFF]/10 via-[#8B5CF6]/5 to-[#4F8CFF]/10 animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0B0F19_70%)]" />

        {/* Floating elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-24 sm:w-32 h-24 sm:h-32 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(79, 140, 255, 0.1)' : 'rgba(139, 92, 246, 0.1)'} 0%, transparent 70%)`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8">
          <Zap className="w-4 h-4 text-[#4F8CFF]" />
          <span className="text-xs sm:text-sm text-gray-300">Start free, no credit card required</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 px-4">
          Stop Documenting.
          <br />
          <GradientText>Start Building.</GradientText>
        </h2>

        <p className="text-base sm:text-xl text-gray-400 mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-4">
          Let AI handle requirements while your team focuses on innovation.
          Transform hours of documentation into minutes of intelligent automation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
          <Link to="/dashboard">
            <Button variant="primary" size="lg" glow>
              Start Generating BRDs
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="secondary" size="lg">
              Try Free Trial
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-gray-400 text-xs sm:text-sm px-4">
          <span>No credit card required</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-400" />
          <span>Free plan available</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-400" />
          <span>Cancel anytime</span>
        </div>
      </div>
    </section>
  );
}
