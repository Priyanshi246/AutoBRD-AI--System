import { Mic, Globe, Languages, MessageSquare, AudioWaveform, Zap } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GradientText } from '../ui/GradientText';

const languages = [
  {
    name: 'Hindi',
    native: 'हिंदी',
    code: 'hi',
    sample: 'मुझे एक ई-कॉमर्स ऐप बनाना है',
    color: 'from-orange-500 to-red-500',
    speakers: '600M+'
  },
  {
    name: 'Tamil',
    native: 'தமிழ்',
    code: 'ta',
    sample: 'எனக்கு ஒரு டெலிவரி ஆப் வேண்டும்',
    color: 'from-blue-500 to-cyan-500',
    speakers: '80M+'
  },
  {
    name: 'Bengali',
    native: 'বাংলা',
    code: 'bn',
    sample: 'আমার একটি পেমেন্ট অ্যাপ দরকার',
    color: 'from-green-500 to-emerald-500',
    speakers: '230M+'
  },
  {
    name: 'Marathi',
    native: 'मराठी',
    code: 'mr',
    sample: 'मला शिक्षण अ‍ॅप हवा आहे',
    color: 'from-purple-500 to-pink-500',
    speakers: '90M+'
  },
  {
    name: 'Hinglish',
    native: 'हिंग्लिश',
    code: 'hinglish',
    sample: 'Mujhe ek delivery app banana hai',
    color: 'from-yellow-500 to-orange-500',
    speakers: '500M+'
  }
];

const features = [
  { icon: Mic, text: 'Voice input in any language', desc: 'Speak naturally in your preferred language' },
  { icon: Languages, text: 'Automatic language detection', desc: 'AI identifies language automatically' },
  { icon: MessageSquare, text: 'Context-aware understanding', desc: 'Understands Indian business context' },
  { icon: AudioWaveform, text: 'Real-time transcription', desc: 'Instant voice-to-text conversion' },
];

export function IndianLanguages() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500/10 via-white/5 to-green-500/10 rounded-full blur-[200px]" />
        {/* Indian flag colors subtle gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-white to-green-500 opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-green-500/20 border border-white/10 mb-6">
            <span className="text-xl">🇮🇳</span>
            <span className="text-sm text-white">Made for Bharat</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Built for{' '}
            <GradientText>India's Multilingual Ecosystem</GradientText>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Empowering businesses and developers across India with AI-powered multilingual documentation.
            Simply speak or type in your language — AutoBRD AI understands.
          </p>
        </div>

        {/* Language Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {languages.map((lang, index) => (
            <GlassCard
              key={index}
              className="p-4 text-center group hover:scale-105 transition-all duration-300"
              glow="cyan"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lang.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <span className="text-white font-bold text-lg">{lang.native[0]}</span>
              </div>
              <h3 className="text-white font-semibold">{lang.name}</h3>
              <p className="text-gray-400 text-xs mb-2">{lang.native}</p>
              <p className="text-gray-500 text-xs mb-3">{lang.speakers} speakers</p>
              <div className="bg-black/30 rounded-lg p-2">
                <p className="text-gray-300 text-xs italic leading-relaxed">"{lang.sample}"</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 p-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#8B5CF6]/20 flex items-center justify-center shrink-0">
                <feature.icon className="w-6 h-6 text-[#4F8CFF]" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">{feature.text}</h4>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Visualization */}
        <div className="glass rounded-3xl p-8 border border-white/10">
          <h3 className="text-xl font-semibold text-white text-center mb-8">
            How Multilingual AI Works
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Input */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-orange-400" />
              </div>
              <div className="text-white font-medium mb-2">Voice or Text Input</div>
              <div className="text-gray-400 text-sm">Speak in Hindi, Tamil, Bengali, or 10+ Indian languages</div>
            </div>

            {/* Arrow */}
            <div className="hidden md:block">
              <div className="w-20 h-0.5 bg-gradient-to-r from-orange-500 via-white to-green-500" />
            </div>

            {/* AI Processing */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-[#4F8CFF]" />
              </div>
              <div className="text-white font-medium mb-2">AI Language Processing</div>
              <div className="text-gray-400 text-sm">Powered by Sarvam AI & advanced multilingual models</div>
            </div>

            {/* Arrow */}
            <div className="hidden md:block">
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#4F8CFF] via-white to-green-500" />
            </div>

            {/* Output */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-white font-medium mb-2">Professional BRD</div>
              <div className="text-gray-400 text-sm">English BRD ready for international stakeholders</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {[
            { value: '10+', label: 'Indian Languages' },
            { value: '1.4B', label: 'Population Covered' },
            { value: '95%', label: 'Accuracy Rate' },
            { value: '<2s', label: 'Processing Time' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
