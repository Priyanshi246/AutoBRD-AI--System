import { Check, Zap, Building, Crown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { GradientText } from '../components/ui/GradientText';
import { GlassCard } from '../components/ui/GlassCard';

const plans = [
  {
    name: 'Free',
    icon: Zap,
    price: '$0',
    description: 'Perfect for trying out AutoBRD AI',
    features: [
      '3 documents per month',
      'Basic BRD generation',
      'Export to PDF',
      'Email support',
    ],
    buttonText: 'Start Free',
    buttonVariant: 'secondary' as const,
    popular: false
  },
  {
    name: 'Pro',
    icon: Building,
    price: '$29',
    period: '/month',
    description: 'Best for professional teams and startups',
    features: [
      'Unlimited documents',
      'Advanced AI models',
      'Architecture diagrams',
      'Export to PDF/DOCX/Notion',
      'Team collaboration',
      'Priority support',
      'API access',
    ],
    buttonText: 'Start Pro Trial',
    buttonVariant: 'primary' as const,
    popular: true
  },
  {
    name: 'Enterprise',
    icon: Crown,
    price: 'Custom',
    description: 'For large organizations with specific needs',
    features: [
      'Everything in Pro',
      'Custom AI training',
      'SSO/SAML authentication',
      'Advanced security',
      'Dedicated support',
      'SLA guarantee',
      'Custom integrations',
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'secondary' as const,
    popular: false
  }
];

export function PricingPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[130px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Simple, <GradientText>Transparent</GradientText> Pricing
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your team. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div key={index} className={`relative ${plan.popular ? 'md:-mt-4' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium">
                  Most Popular
                </div>
              )}
              <GlassCard className={`p-8 h-full flex flex-col ${plan.popular ? 'border-2 border-cyan-500/50' : ''}`} glow={plan.popular ? 'cyan' : undefined}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    plan.popular ? 'bg-gradient-to-br from-cyan-500 to-blue-500' : 'bg-white/10'
                  }`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{plan.name}</h2>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-400">{plan.period}</span>}
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{plan.description}</p>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/login?signup=true">
                  <Button variant={plan.buttonVariant} className="w-full" glow={plan.popular}>
                    {plan.buttonText}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Can I change plans later?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
              },
              {
                q: 'What AI models do you use?',
                a: 'We use state-of-the-art language models optimized for business documentation. Pro users get access to our most advanced models.'
              },
              {
                q: 'Is my data secure?',
                a: 'Absolutely. We use enterprise-grade encryption, and your documents are never used to train our models. SOC 2 Type II certified.'
              },
              {
                q: 'Do you offer refunds?',
                a: 'Yes, we offer a 14-day money-back guarantee on all paid plans. No questions asked.'
              }
            ].map((faq, index) => (
              <GlassCard key={index} className="p-6">
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
