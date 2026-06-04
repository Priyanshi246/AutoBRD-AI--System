import { FileText, LayoutGrid as Layout, GitBranch, Users, BarChart3, Download, Sparkles, Zap, Settings, Bell } from 'lucide-react';
import { GradientText } from '../ui/GradientText';

export function DashboardPreview() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Built for{' '}
            <GradientText>Modern Teams</GradientText>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A powerful dashboard designed for productivity and collaboration
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative">
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-white">AutoBRD AI</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400" />
                </div>
                <Settings className="w-5 h-5 text-gray-400" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                  JD
                </div>
              </div>
            </div>

            <div className="flex h-[500px]">
              {/* Sidebar */}
              <div className="w-64 bg-white/5 border-r border-white/10 p-4">
                <div className="space-y-2">
                  {[
                    { icon: Layout, label: 'Dashboard', active: true },
                    { icon: FileText, label: 'Documents', active: false },
                    { icon: GitBranch, label: 'Architecture', active: false },
                    { icon: Users, label: 'Team', active: false },
                    { icon: BarChart3, label: 'Analytics', active: false },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                        item.active
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="px-4 py-3">
                    <div className="text-xs text-gray-400 mb-2">Recent Projects</div>
                    <div className="space-y-2">
                      {['E-commerce Platform', 'Mobile App v2', 'API Gateway'].map((project, i) => (
                        <div key={i} className="text-sm text-gray-300 truncate hover:text-white cursor-pointer transition-colors">
                          {project}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 overflow-auto">
                <div className="grid grid-cols-3 gap-6 mb-6">
                  {/* Stats Cards */}
                  {[
                    { label: 'Documents Generated', value: '127', change: '+12%' },
                    { label: 'Hours Saved', value: '340', change: '+8%' },
                    { label: 'Team Members', value: '24', change: '+3' },
                  ].map((stat, i) => (
                    <div key={i} className="glass rounded-2xl p-4">
                      <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
                      <div className="flex items-end gap-2">
                        <div className="text-3xl font-bold text-white">{stat.value}</div>
                        <div className="text-green-400 text-sm mb-1">{stat.change}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Document Editor */}
                <div className="glass rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">E-commerce Platform BRD</div>
                        <div className="text-sm text-gray-400">Last edited 2 hours ago</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium">
                        Generate
                      </button>
                    </div>
                  </div>

                  {/* Document content preview */}
                  <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-white/10 rounded w-1/3" />
                      <div className="h-3 bg-white/5 rounded w-full" />
                      <div className="h-3 bg-white/5 rounded w-5/6" />
                      <div className="h-3 bg-white/5 rounded w-4/5" />
                      <div className="mt-4 h-4 bg-white/10 rounded w-1/4" />
                      <div className="h-3 bg-white/5 rounded w-full" />
                      <div className="h-3 bg-white/5 rounded w-3/4" />
                    </div>
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="font-semibold text-white">AI Suggestions</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: 'Add User Authentication', priority: 'High' },
                      { title: 'Implement Search', priority: 'Medium' },
                      { title: 'Payment Integration', priority: 'High' },
                      { title: 'Admin Dashboard', priority: 'Low' },
                    ].map((suggestion, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                        <span className="text-gray-300 text-sm">{suggestion.title}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          suggestion.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                          suggestion.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {suggestion.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel - AI Assistant */}
              <div className="w-72 bg-white/5 border-l border-white/10 p-4 hidden xl:block">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-white">AI Assistant</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-white/5 text-sm text-gray-300">
                    I've analyzed your transcript and found 12 key requirements. Would you like me to generate user stories?
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 text-sm font-medium hover:bg-cyan-500/30 transition-colors">
                      Yes, generate
                    </button>
                    <button className="px-3 py-2 rounded-lg bg-white/5 text-gray-400 text-sm hover:bg-white/10 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="text-xs text-gray-400 mb-3">Quick Actions</div>
                  <div className="space-y-2">
                    {['Generate Timeline', 'Create Architecture', 'Export to JIRA'].map((action, i) => (
                      <button key={i} className="w-full py-2 px-3 rounded-lg bg-white/5 text-left text-sm text-gray-300 hover:bg-white/10 transition-colors">
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl -z-10" />
        </div>
      </div>
    </section>
  );
}
