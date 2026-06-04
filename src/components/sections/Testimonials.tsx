import { Star, Quote } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GradientText } from '../ui/GradientText';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Startup Founder',
    company: 'TechFlow Inc.',
    content: 'AutoBRD AI cut our documentation time by 80%. We went from spending days on requirements to minutes. Game changer for our team.',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Product Manager',
    company: 'ScaleUp Solutions',
    content: 'Finally, a tool that understands what product teams need. The AI-generated user stories are incredibly accurate and well-structured.',
    rating: 5
  },
  {
    name: 'Emily Watson',
    role: 'Freelance Consultant',
    company: 'Independent',
    content: 'As a consultant, I work with many clients. AutoBRD AI helps me deliver professional BRDs faster, impressing clients every time.',
    rating: 5
  },
  {
    name: 'David Kim',
    role: 'CTO',
    company: 'DevAgency Pro',
    content: 'We\'ve integrated AutoBRD AI into our entire workflow. The architecture diagrams alone have saved us hundreds of hours.',
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Trusted by{' '}
            <GradientText>Builders & Product Teams</GradientText>
          </h2>
          <p className="text-gray-400 text-lg">
            Join hundreds of teams already transforming their documentation workflow
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <GlassCard key={index} className="p-6 relative group">
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-cyan-500/20 group-hover:text-cyan-500/40 transition-colors" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                  <div className="text-gray-400 text-xs">{testimonial.role}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Social proof */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {[
              { value: '500+', label: 'Teams' },
              { value: '50K+', label: 'Documents' },
              { value: '10K+', label: 'Hours Saved' },
              { value: '4.9/5', label: 'Rating' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
