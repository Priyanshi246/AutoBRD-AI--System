import { Languages, Mic, Globe as Globe2, BarChart3, Lightbulb, BrainCircuit } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GradientText } from '../ui/GradientText';

const aiFeatures = [
  {
    icon: BrainCircuit,
    title: 'NLP Processing',
    description: 'Advanced natural language understanding for accurate requirement extraction'
  },
  {
    icon: Mic,
    title: 'Voice-to-Text AI',
    description: 'Convert spoken conversations to text with industry-leading accuracy'
  },
  {
    icon: Globe2,
    title: 'Multi-language Understanding',
    description: 'Process requirements in multiple languages with contextual awareness'
  },
  {
    icon: BarChart3,
    title: 'AI Prioritization Engine',
    description: 'Intelligent prioritization based on business impact and dependencies'
  },
  {
    icon: Lightbulb,
    title: 'Smart Business Insights',
    description: 'AI-powered suggestions for improving requirements and scope'
  },
  {
    icon: Languages,
    title: 'Context-Aware Analysis',
    description: 'Understands domain-specific terminology and business context'
  }
];

export function AIFeatures() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background with particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Floating tech dots */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 border-2 border-cyan-500/30 rounded-full animate-float"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <div className="absolute inset-1 bg-cyan-400 rounded-full animate-pulse" />
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Powered by{' '}
            <GradientText>Intelligent AI Agents</GradientText>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            State-of-the-art AI technology working behind the scenes
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFeatures.map((feature, index) => (
            <GlassCard
              key={index}
              className="p-6 group relative overflow-hidden"
              glow="cyan"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>

                {/* Neural network decoration */}
                <div className="mt-4 flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400/50"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                  <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
