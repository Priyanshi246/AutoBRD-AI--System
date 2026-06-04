import { ArrowRight, Play, FileText, Sparkles, Zap, Mic, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { GradientText, GlowText } from '../ui/GradientText';

export function Hero() {
  const [activeStep, setActiveStep] = useState(0);

  // Cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: 'Input', icon: Mic, desc: 'Voice, text, or transcript' },
    { label: 'AI Process', icon: Sparkles, desc: 'Intelligent analysis' },
    { label: 'Output', icon: FileText, desc: 'Professional BRD' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(79,140,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,140,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/15 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-400/8 rounded-full blur-[120px]" />

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-2xl bg-gradient-to-br from-violet-500/15 to-cyan-500/15 blur-xl animate-float opacity-60" />
        <div className="absolute bottom-40 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400/20 to-violet-400/20 blur-lg animate-float-delayed opacity-50" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-violet-400/30 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${20 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-shimmer">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-gray-300">Multilingual AI-Powered Platform for India</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Convert Conversations into{' '}
          <br />
          <GlowText>Professional BRDs</GlowText>
          {' '}with AI
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          AutoBRD AI transforms{' '}
          <span className="text-[#8B87F0]">multilingual meetings</span>,{' '}
          voice notes, and raw ideas into structured Business Requirement Documents,{' '}
          <GradientText>user stories</GradientText>, timelines, and architecture blueprints instantly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/dashboard">
            <Button variant="primary" size="lg" glow>
              Generate BRD
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <a href="#demo">
            <Button variant="secondary" size="lg">
              <Play className="w-5 h-5" />
              Try Demo
            </Button>
          </a>
        </div>

        {/* Workflow Visualization */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="glass rounded-3xl p-8 border border-white/10">
            {/* Steps */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={index} className="flex-1 relative">
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-6 left-[60%] right-0 h-0.5 bg-gradient-to-r from-violet-500 via-blue-400 to-cyan-400/20" />
                  )}

                  <div className={`flex flex-col items-center transition-all duration-500 ${
                    index <= activeStep ? 'opacity-100' : 'opacity-40'
                  }`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-500 ${
                      index === activeStep
                        ? 'bg-gradient-to-br from-violet-500 to-cyan-500 scale-110 shadow-lg shadow-violet-500/25'
                        : index < activeStep
                        ? 'bg-green-500/20 border border-green-500/50'
                        : 'bg-white/5 border border-white/10'
                    }`}>
                      <step.icon className={`w-6 h-6 ${
                        index === activeStep ? 'text-white' : index < activeStep ? 'text-green-400' : 'text-gray-400'
                      }`} />
                    </div>
                    <span className={`font-semibold mb-1 ${
                      index === activeStep ? 'text-white' : 'text-gray-400'
                    }`}>{step.label}</span>
                    <span className="text-xs text-gray-500">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Demo */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Input */}
              <div className="glass rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-violet-400" />
                  <span className="text-sm text-gray-400">Input</span>
                </div>
                <div className="bg-black/50 rounded-xl p-4 text-left h-32 overflow-hidden">
                  <p className="text-gray-300 text-sm">
                    <span className="text-violet-400">"</span>
                    Mujhe ek grocery delivery app banana hai jisme live tracking aur online payment ho.
                    <span className="text-violet-400">"</span>
                  </p>
                  <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                    <Mic className="w-3 h-3" />
                    Hindi/Hinglish Input
                  </div>
                </div>
              </div>

              {/* Output */}
              <div className="glass rounded-2xl p-4 border border-violet-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-gray-400">Generated BRD</span>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-green-400">Ready</span>
                  </div>
                </div>
                <div className="bg-black/50 rounded-xl p-4 text-left h-32 space-y-2">
                  <div className="text-sm text-white font-medium">Grocery Delivery App</div>
                  <div className="text-xs text-gray-400">12 Requirements Extracted</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {['User Auth', 'Live Tracking', 'Payments', 'Cart'].map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded bg-violet-500/20 text-violet-300">{tag}</span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Tech: React Native, Node.js, MongoDB</div>
                </div>
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/10 via-blue-400/10 to-cyan-400/10 rounded-3xl blur-2xl -z-10" />
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-violet-400" />
            <span>2.3s avg generation</span>
          </div>
          <span className="hidden sm:block">|</span>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>50,000+ documents generated</span>
          </div>
          <span className="hidden sm:block">|</span>
          <div className="flex items-center gap-2">
            <span>5 Indian Languages</span>
          </div>
        </div>
      </div>
    </section>
  );
}
