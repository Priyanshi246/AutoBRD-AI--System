import { GitBranch, Database, Globe, Layers, Server, Smartphone, Cloud, ArrowRightLeft, Box, Cpu } from 'lucide-react';
import { GradientText } from '../ui/GradientText';

const diagramElements = {
  clients: [
    { icon: Smartphone, label: 'Mobile App', color: 'from-cyan-500 to-blue-500' },
    { icon: Globe, label: 'Web App', color: 'from-cyan-500 to-blue-500' },
    { icon: Box, label: 'Admin Panel', color: 'from-cyan-500 to-blue-500' },
  ],
  gateway: { icon: ArrowRightLeft, label: 'API Gateway', color: 'from-purple-500 to-pink-500' },
  services: [
    { icon: Server, label: 'Auth Service', color: 'from-green-500 to-emerald-500' },
    { icon: Server, label: 'User Service', color: 'from-green-500 to-emerald-500' },
    { icon: Server, label: 'Order Service', color: 'from-green-500 to-emerald-500' },
    { icon: Server, label: 'Payment Service', color: 'from-green-500 to-emerald-500' },
  ],
  data: [
    { icon: Database, label: 'PostgreSQL', color: 'from-blue-500 to-indigo-500' },
    { icon: Database, label: 'Redis Cache', color: 'from-red-500 to-orange-500' },
    { icon: Cloud, label: 'S3 Storage', color: 'from-yellow-500 to-amber-500' },
  ],
};

export function ArchitectureGenerator() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[180px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#4F8CFF]/10 rounded-full blur-[150px] -translate-y-1/2" />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(79,140,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(79,140,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-white">Architecture Blueprint</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Generate System Blueprints{' '}
            <GradientText>Automatically</GradientText>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            AI analyzes your requirements and creates professional architecture diagrams,
            API flows, and database schemas instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Features */}
          <div className="space-y-6">
            {[
              {
                icon: GitBranch,
                title: 'User Flow Diagrams',
                description: 'Visualize user journeys, authentication flows, and interaction paths with detailed state transitions.',
                features: ['Login/Signup flows', 'User onboarding', 'Feature access paths']
              },
              {
                icon: Layers,
                title: 'System Architecture',
                description: 'Auto-generate comprehensive microservices or monolithic architecture based on project scale.',
                features: ['Microservices design', 'Service boundaries', 'Communication patterns']
              },
              {
                icon: Globe,
                title: 'API Flow Charts',
                description: 'Map all API endpoints, request/response schemas, and authentication requirements automatically.',
                features: ['REST/GraphQL schemas', 'Authentication flows', 'Rate limiting']
              },
              {
                icon: Database,
                title: 'Database Schema',
                description: 'Generate optimized database models with relationships, indexes, and migration scripts.',
                features: ['Entity relationships', 'Index optimization', 'Migration files']
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#4F8CFF]/30 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#8B5CF6]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-[#4F8CFF]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feat, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-[#4F8CFF]/10 text-[#4F8CFF]">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Interactive Architecture Diagram */}
          <div className="relative">
            <div className="glass rounded-3xl p-8 border border-[#4F8CFF]/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Live Architecture Preview</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-400">AI-generated</span>
                </div>
              </div>

              {/* Architecture Visualization */}
              <div className="space-y-6">
                {/* Client Layer */}
                <div>
                  <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    CLIENT LAYER
                  </div>
                  <div className="flex gap-3 justify-center">
                    {diagramElements.clients.map((client, i) => (
                      <div
                        key={i}
                        className={`w-20 h-16 rounded-xl bg-gradient-to-br ${client.color}/20 border border-cyan-500/30 flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform`}
                      >
                        <client.icon className="w-5 h-5 text-cyan-400" />
                        <span className="text-xs text-gray-300">{client.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connection Arrow Down */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-cyan-500 to-purple-500" />
                </div>

                {/* API Gateway */}
                <div className="flex justify-center">
                  <div className={`w-40 h-14 rounded-xl bg-gradient-to-br ${diagramElements.gateway.color}/30 border border-purple-500/50 flex items-center justify-center gap-2`}>
                    <diagramElements.gateway.icon className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-medium text-white">{diagramElements.gateway.label}</span>
                  </div>
                </div>

                {/* Connection Arrow Down */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-green-500" />
                </div>

                {/* Services Layer */}
                <div>
                  <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    MICROSERVICES
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {diagramElements.services.map((service, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl bg-gradient-to-br ${service.color}/20 border border-green-500/30 flex items-center gap-2 hover:scale-105 transition-transform`}
                      >
                        <service.icon className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-gray-300">{service.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connection Arrow Down */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-green-500 to-blue-500" />
                </div>

                {/* Data Layer */}
                <div>
                  <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    DATA LAYER
                  </div>
                  <div className="flex gap-3 justify-center">
                    {diagramElements.data.map((db, i) => (
                      <div
                        key={i}
                        className={`px-4 py-2 rounded-xl bg-gradient-to-br ${db.color}/20 border border-blue-500/30 flex items-center gap-2 hover:scale-105 transition-transform`}
                      >
                        <db.icon className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-gray-300">{db.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Export Options */}
              <div className="mt-6 flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 transition-colors">
                  Export PNG
                </button>
                <button className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 transition-colors">
                  Export SVG
                </button>
                <button className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 transition-colors">
                  Mermaid
                </button>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#4F8CFF]/10 to-purple-500/10 rounded-3xl blur-2xl -z-10" />

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 glass rounded-lg px-3 py-1 text-xs text-[#4F8CFF] flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              Auto-generated
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
