import { GradientText } from '../ui/GradientText';
import { Sparkles, Cpu, Zap, Code2 } from 'lucide-react';

const partners = [
  {
    name: 'Sarvam AI',
    description: 'Indian AI language models for multilingual understanding',
    icon: Sparkles,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Google Gemini',
    description: 'Advanced reasoning and code generation',
    icon: Cpu,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'OpenAI',
    description: 'GPT models for intelligent analysis',
    icon: Zap,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Bolt.new',
    description: 'Rapid development platform',
    icon: Code2,
    gradient: 'from-orange-500 to-red-500'
  }
];

export function PoweredBy() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Powered by <GradientText>Advanced AI Infrastructure</GradientText>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Built on state-of-the-art AI platforms for unparalleled accuracy and speed
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${partner.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <partner.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-1">{partner.name}</h3>
              <p className="text-gray-400 text-xs">{partner.description}</p>
            </div>
          ))}
        </div>

        {/* Tech Tags */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'Kubernetes'].map((tech, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm hover:border-[#4F8CFF]/50 hover:text-white transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
