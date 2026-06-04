import { Link } from 'react-router-dom';
import { Sparkles, Target, Heart, Shield, Rocket, Users, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GradientText } from '../components/ui/GradientText';
import { GlassCard } from '../components/ui/GlassCard';

const values = [
  {
    icon: Target,
    title: 'Precision',
    description: 'We believe documentation should be accurate, complete, and actionable.'
  },
  {
    icon: Heart,
    title: 'User-First',
    description: 'Every feature is designed with the end-user experience in mind.'
  },
  {
    icon: Shield,
    title: 'Trust',
    description: 'Security and privacy are foundational to everything we build.'
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'We push boundaries to deliver cutting-edge AI capabilities.'
  }
];

const milestones = [
  { year: '2023', event: 'AutoBRD AI founded', description: 'Started with a vision to automate documentation' },
  { year: '2023', event: 'First MVP launched', description: 'Released initial beta to early adopters' },
  { year: '2024', event: '100+ paying customers', description: 'Rapid growth and market validation' },
  { year: '2024', event: 'Architecture generator', description: 'Added AI-powered diagram generation' },
  { year: '2025', event: 'Enterprise launch', description: 'Expanded to serve large organizations' },
];

export function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">About AutoBRD AI</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            We're on a mission to{' '}
            <GradientText>transform documentation</GradientText>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            AutoBRD AI was born from the frustration of spending countless hours on manual documentation.
            We believe AI can unlock human potential by automating the tedious parts of product development.
          </p>
        </div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-400">
              <p>
                In early 2023, our founders were working on a complex enterprise project. They found themselves spending more time documenting requirements than actually building the product.
              </p>
              <p>
                "There has to be a better way," they thought. And so AutoBRD AI was born - an AI-powered platform that transforms conversations, meeting notes, and raw ideas into professional documentation in seconds.
              </p>
              <p>
                Today, we serve thousands of product teams worldwide, helping them save hundreds of hours and ship better products faster.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="glass rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '500+', label: 'Teams' },
                  { value: '50K+', label: 'Documents' },
                  { value: '10K+', label: 'Hours Saved' },
                  { value: '4.9', label: 'Avg Rating' }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl -z-10" />
          </div>
        </div>

        {/* Values */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These principles guide everything we do at AutoBRD AI
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <GlassCard key={index} className="p-6 text-center" glow="cyan">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Journey</h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 border-4 border-black" />

                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'sm:text-right' : ''} ml-12 sm:ml-0`}>
                    <GlassCard className="p-6 inline-block">
                      <div className="text-cyan-400 text-sm font-medium mb-1">{milestone.year}</div>
                      <h3 className="text-lg font-semibold text-white mb-1">{milestone.event}</h3>
                      <p className="text-gray-400 text-sm">{milestone.description}</p>
                    </GlassCard>
                  </div>

                  <div className="flex-1 hidden sm:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Leadership Team</h2>
            <p className="text-gray-400">The people driving our mission forward</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Sarah Chen', role: 'CEO & Co-founder', linkedin: '#' },
              { name: 'Marcus Rodriguez', role: 'CTO & Co-founder', linkedin: '#' },
              { name: 'Emily Watson', role: 'VP of Product', linkedin: '#' },
              { name: 'David Kim', role: 'VP of Engineering', linkedin: '#' }
            ].map((member, index) => (
              <GlassCard key={index} className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold text-white">{member.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{member.role}</p>
                <a href={member.linkedin} className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
                  LinkedIn
                </a>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Documentation?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join thousands of teams already using AutoBRD AI to ship faster and build better products.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login?signup=true">
              <Button variant="primary" size="lg" glow>
                Start Free Trial
              </Button>
            </Link>
            <Link to="/login?signup=true">
              <Button variant="secondary" size="lg">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
