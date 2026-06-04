import { Hero } from '../components/sections/Hero';
import { InteractiveDemo } from '../components/sections/InteractiveDemo';
import { Problem } from '../components/sections/Problem';
import { Solution } from '../components/sections/Solution';
import { HowItWorks } from '../components/sections/HowItWorks';
import { IndianLanguages } from '../components/sections/IndianLanguages';
import { AIFeatures } from '../components/sections/AIFeatures';
import { DashboardPreview } from '../components/sections/DashboardPreview';
import { ArchitectureGenerator } from '../components/sections/ArchitectureGenerator';
import { Testimonials } from '../components/sections/Testimonials';
import { PoweredBy } from '../components/sections/PoweredBy';
import { CTA } from '../components/sections/CTA';

export function LandingPage() {
  return (
    <main>
      <Hero />
      <InteractiveDemo />
      <IndianLanguages />
      <Problem />
      <Solution />
      <HowItWorks />
      <AIFeatures />
      <ArchitectureGenerator />
      <DashboardPreview />
      <PoweredBy />
      <Testimonials />
      <CTA />
    </main>
  );
}
