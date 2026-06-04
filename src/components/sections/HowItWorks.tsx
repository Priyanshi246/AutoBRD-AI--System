import { Upload, Brain, FileText, Share2 } from 'lucide-react';
import { GradientText } from '../ui/GradientText';

const steps = [
  {
    icon: Upload,
    title: 'Upload Input',
    description: 'Upload transcript, notes, or voice recording',
    color: 'cyan'
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'AI analyzes requirements and context',
    color: 'blue'
  },
  {
    icon: FileText,
    title: 'Generate Documents',
    description: 'Generate BRD + project blueprint',
    color: 'indigo'
  },
  {
    icon: Share2,
    title: 'Export & Collaborate',
    description: 'Export & collaborate instantly',
    color: 'purple'
  }
];

export function HowItWorks() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            How <GradientText>AutoBRD AI</GradientText> Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Four simple steps from conversation to documentation
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transform -translate-y-1/2 hidden lg:block" />
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transform -translate-y-1/2 blur-lg opacity-50 hidden lg:block" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                    step.color === 'cyan' ? 'from-cyan-500 to-cyan-600' :
                    step.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    step.color === 'indigo' ? 'from-indigo-500 to-indigo-600' :
                    'from-purple-500 to-purple-600'
                  } flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {index + 1}
                  </div>
                </div>

                {/* Card */}
                <div className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-500 group-hover:-translate-y-2">
                  {/* Icon container */}
                  <div className={`relative w-20 h-20 mx-auto mb-6`}>
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                      step.color === 'cyan' ? 'from-cyan-500/20 to-cyan-600/20' :
                      step.color === 'blue' ? 'from-blue-500/20 to-blue-600/20' :
                      step.color === 'indigo' ? 'from-indigo-500/20 to-indigo-600/20' :
                      'from-purple-500/20 to-purple-600/20'
                    } group-hover:scale-110 transition-transform duration-300`} />
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                      step.color === 'cyan' ? 'from-cyan-500/20 to-cyan-600/20' :
                      step.color === 'blue' ? 'from-blue-500/20 to-blue-600/20' :
                      step.color === 'indigo' ? 'from-indigo-500/20 to-indigo-600/20' :
                      'from-purple-500/20 to-purple-600/20'
                    } blur-xl group-hover:opacity-100 opacity-50 transition-opacity duration-300`} />
                    <div className="relative flex items-center justify-center h-full">
                      <step.icon className={`w-10 h-10 ${
                        step.color === 'cyan' ? 'text-cyan-400' :
                        step.color === 'blue' ? 'text-blue-400' :
                        step.color === 'indigo' ? 'text-indigo-400' :
                        'text-purple-400'
                      }`} />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>

                {/* Arrow (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-20">
                    <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                      <div className={`w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-${
                        step.color === 'cyan' ? 'cyan' : step.color === 'blue' ? 'blue' : 'indigo'
                      }-400 transform rotate-0`} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
