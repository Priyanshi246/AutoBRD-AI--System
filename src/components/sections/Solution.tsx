import { FileText, ListTodo, CalendarDays, Cpu, GitBranch, Download, Users, Layers } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GradientText } from '../ui/GradientText';

const features = [
  {
    icon: FileText,
    title: 'AI Requirement Extraction',
    description: 'Automatically identify and extract key requirements from conversations',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    icon: ListTodo,
    title: 'BRD Auto Generation',
    description: 'Generate comprehensive Business Requirement Documents instantly',
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    icon: GitBranch,
    title: 'Smart User Stories',
    description: 'Convert requirements into structured user stories with acceptance criteria',
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    icon: CalendarDays,
    title: 'Timeline & Milestone Planning',
    description: 'AI-generated project timelines with realistic milestones',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Cpu,
    title: 'Tech Stack Recommendation',
    description: 'Intelligent technology recommendations based on requirements',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: Layers,
    title: 'AI Architecture Diagrams',
    description: 'Automatically generate system architecture visualizations',
    gradient: 'from-rose-500 to-orange-500'
  },
  {
    icon: Download,
    title: 'Export to PDF/DOCX',
    description: 'One-click export in professional document formats',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Real-time collaborative editing and review workflows',
    gradient: 'from-amber-500 to-yellow-500'
  }
];

export function Solution() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            One AI Agent for{' '}
            <GradientText>Complete Product Documentation</GradientText>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From raw conversations to production-ready documents — AutoBRD AI handles it all.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <GlassCard
              key={index}
              className="p-6 group"
              glow="cyan"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>

              {/* Animated gradient line */}
              <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
