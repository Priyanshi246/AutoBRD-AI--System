import { Clock, MessageCircleWarning, FileQuestion, Timer } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GradientText } from '../ui/GradientText';

const problems = [
  {
    icon: Clock,
    title: 'Hours wasted documenting meetings',
    description: 'Manual documentation takes hours of valuable engineering time',
    gradient: 'from-red-500/20 to-orange-500/20'
  },
  {
    icon: MessageCircleWarning,
    title: 'Miscommunication between teams',
    description: 'Lost context and unclear requirements lead to rework',
    gradient: 'from-orange-500/20 to-yellow-500/20'
  },
  {
    icon: FileQuestion,
    title: 'Unstructured client requirements',
    description: 'Vague inputs result in incomplete deliverables',
    gradient: 'from-yellow-500/20 to-amber-500/20'
  },
  {
    icon: Timer,
    title: 'Delayed product planning',
    description: 'Slow documentation cycles push back entire roadmaps',
    gradient: 'from-amber-500/20 to-red-500/20'
  }
];

export function Problem() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Still Writing Requirements{' '}
            <GradientText>Manually?</GradientText>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Traditional requirement documentation is slow, error-prone, and disconnected from modern development workflows.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <GlassCard
              key={index}
              className={`p-6 group`}
              glow="purple"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${problem.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <problem.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{problem.title}</h3>
              <p className="text-gray-400 text-sm">{problem.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
