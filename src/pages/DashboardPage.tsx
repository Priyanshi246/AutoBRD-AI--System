import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid as Layout, FileText, GitBranch, Users, BarChart3, Settings, Bell, Sparkles, Upload, Plus, Download, MessageSquare, Calendar, ListChecks as Checklist, Layers, ChevronRight, Clock, TrendingUp, Zap, Activity, Archive, MoreVertical, Search, Filter, Trash2, CreditCard as Edit, Eye } from 'lucide-react';
import { GradientText } from '../components/ui/GradientText';
import { Button } from '../components/ui/Button';

type Tab = 'overview' | 'documents' | 'generate' | 'ai' | 'activity';

interface Document {
  id: string;
  name: string;
  date: string;
  status: 'completed' | 'in-progress' | 'review' | 'archived';
  timestamp: Date;
  type: string;
}

interface Activity {
  id: string;
  action: string;
  document?: string;
  timestamp: Date;
  icon: typeof FileText;
}

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const sidebarItems = [
    { icon: Layout, label: 'Overview', tab: 'overview' as Tab },
    { icon: FileText, label: 'Documents', tab: 'documents' as Tab },
    { icon: Zap, label: 'Generate BRD', tab: 'generate' as Tab },
    { icon: Sparkles, label: 'AI Assistant', tab: 'ai' as Tab },
    { icon: Activity, label: 'Activity', tab: 'activity' as Tab },
    { icon: GitBranch, label: 'Architecture', tab: 'architecture' as Tab },
    { icon: Users, label: 'Team', tab: 'team' as Tab },
    { icon: BarChart3, label: 'Analytics', tab: 'analytics' as Tab },
  ];

  const documents: Document[] = [
    { id: '1', name: 'E-commerce Platform BRD', date: '2 hours ago', status: 'completed', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), type: 'BRD' },
    { id: '2', name: 'Mobile App Requirements', date: '5 hours ago', status: 'in-progress', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), type: 'Requirements' },
    { id: '3', name: 'API Gateway Specs', date: 'Yesterday', status: 'completed', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), type: 'Specs' },
    { id: '4', name: 'CRM System v2', date: '2 days ago', status: 'review', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), type: 'BRD' },
    { id: '5', name: 'Healthcare Portal', date: '3 days ago', status: 'archived', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), type: 'BRD' },
    { id: '6', name: 'Banking App Architecture', date: '4 days ago', status: 'completed', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), type: 'Architecture' },
    { id: '7', name: 'EdTech Platform', date: '5 days ago', status: 'completed', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), type: 'BRD' },
    { id: '8', name: 'Fintech Dashboard', date: '1 week ago', status: 'archived', timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), type: 'Requirements' },
  ];

  const activities: Activity[] = [
    { id: '1', action: 'Generated BRD for E-commerce Platform', document: 'E-commerce Platform BRD', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), icon: FileText },
    { id: '2', action: 'AI extracted 12 requirements from transcript', document: 'Mobile App Requirements', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), icon: Sparkles },
    { id: '3', action: 'Exported PDF for API Gateway Specs', document: 'API Gateway Specs', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), icon: Download },
    { id: '4', action: 'Uploaded voice recording (3.2 min)', document: 'CRM System v2', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), icon: Upload },
    { id: '5', action: 'Generated architecture diagram', document: 'Banking App Architecture', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), icon: GitBranch },
    { id: '6', action: 'Shared document with team', document: 'Healthcare Portal', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), icon: Users },
  ];

  const stats = [
    { label: 'Documents Generated', value: '127', change: '+12%', icon: FileText, trend: 'up' },
    { label: 'Hours Saved', value: '340', change: '+8%', icon: Clock, trend: 'up' },
    { label: 'Team Members', value: '24', change: '+3', icon: Users, trend: 'up' },
    { label: 'Active Projects', value: '8', change: '+2', icon: TrendingUp, trend: 'up' },
  ];

  const recentActivity = activities.slice(0, 4);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400';
      case 'review': return 'bg-blue-500/20 text-blue-400';
      case 'archived': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0B0F19' }}>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-gray-950/80 backdrop-blur-xl border-r border-white/10 flex flex-col transition-all duration-300 z-30 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        {/* Logo */}
        <div className="flex items-center justify-between h-20 px-4 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#8B5CF6] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-bold text-white">
                Auto<GradientText>BRD</GradientText>
              </span>
            )}
          </Link>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronRight className={`w-5 h-5 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.tab
                  ? 'bg-gradient-to-r from-[#4F8CFF]/20 to-[#8B5CF6]/20 text-white border border-[#4F8CFF]/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <Settings className="w-5 h-5 shrink-0" />
            {!sidebarCollapsed && <span className="font-medium">Settings</span>}
          </button>
          <Link to="/login" className="flex items-center gap-3 mt-4 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F8CFF] to-[#8B5CF6] flex items-center justify-center text-white font-bold shrink-0">
              JD
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate">John Doe</div>
                <div className="text-xs text-gray-400 truncate">john@example.com</div>
              </div>
            )}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between h-20 px-8 bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-white">
              {activeTab === 'overview' && 'Dashboard'}
              {activeTab === 'documents' && 'Documents'}
              {activeTab === 'generate' && 'Generate BRD'}
              {activeTab === 'ai' && 'AI Assistant'}
              {activeTab === 'activity' && 'Activity'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#4F8CFF]/50 w-64"
              />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#4F8CFF]" />
            </button>
            <a href="#demo">
              <Button variant="primary" size="sm">
                <Plus className="w-4 h-4" />
                New Project
              </Button>
            </a>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="glass rounded-2xl p-6 hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#8B5CF6]/20 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-[#4F8CFF]" />
                      </div>
                      <span className="text-sm text-green-400 bg-green-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick Actions & Recent */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <a href="#demo" className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[#4F8CFF]/20 to-[#8B5CF6]/20 border border-[#4F8CFF]/30 hover:border-[#4F8CFF]/50 transition-colors block">
                      <Upload className="w-5 h-5 text-[#4F8CFF]" />
                      <span className="text-white">Upload Transcript</span>
                    </a>
                    <a href="#demo" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors block">
                      <Zap className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-300">Generate BRD</span>
                    </a>
                    <a href="#demo" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors block">
                      <GitBranch className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-300">Create Architecture</span>
                    </a>
                  </div>
                </div>

                {/* Recent Documents */}
                <div className="lg:col-span-2 glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Recent Documents</h2>
                    <button onClick={() => setActiveTab('documents')} className="text-sm text-[#4F8CFF] hover:text-[#4F8CFF]/80 transition-colors">View All</button>
                  </div>
                  <div className="space-y-3">
                    {documents.slice(0, 4).map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4F8CFF]/20 to-[#8B5CF6]/20 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-[#4F8CFF]" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{doc.name}</div>
                            <div className="text-sm text-gray-400">{doc.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </span>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                  <button onClick={() => setActiveTab('activity')} className="text-sm text-[#4F8CFF] hover:text-[#4F8CFF]/80 transition-colors">View All</button>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10" />
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 ml-1">
                        <div className="w-7 h-7 rounded-full bg-[#4F8CFF]/20 flex items-center justify-center shrink-0 z-10 border-2 border-[#0B0F19]">
                          <activity.icon className="w-3.5 h-3.5 text-[#4F8CFF]" />
                        </div>
                        <div className="flex-1 p-3 rounded-lg bg-white/5">
                          <p className="text-white text-sm">{activity.action}</p>
                          {activity.document && (
                            <p className="text-gray-400 text-xs mt-1">{activity.document}</p>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 shrink-0">{formatTimestamp(activity.timestamp)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Projects */}
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Active Projects</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'E-commerce Platform', progress: 75, members: 5, type: 'BRD' },
                    { name: 'Mobile App v2.0', progress: 45, members: 3, type: 'Requirements' },
                    { name: 'API Gateway', progress: 90, members: 2, type: 'Architecture' },
                  ].map((project, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs px-2 py-0.5 rounded bg-[#4F8CFF]/20 text-[#4F8CFF]">{project.type}</span>
                        <span className="text-xs text-gray-400">{project.progress}%</span>
                      </div>
                      <h3 className="font-medium text-white mb-3">{project.name}</h3>
                      <div className="relative h-2 rounded-full bg-white/10 overflow-hidden mb-3">
                        <div
                          className="absolute h-full bg-gradient-to-r from-[#4F8CFF] to-[#8B5CF6] rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {[...Array(project.members)].map((_, j) => (
                            <div key={j} className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4F8CFF] to-[#8B5CF6] border-2 border-[#0B0F19]" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">{project.members} members</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#4F8CFF]/50 w-64"
                    />
                  </div>
                  <select className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white text-sm">
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>In Progress</option>
                    <option>Review</option>
                    <option>Archived</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm">
                    <Archive className="w-4 h-4" />
                    Archived ({documents.filter(d => d.status === 'archived').length})
                  </Button>
                </div>
              </div>

              {/* Documents Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="glass rounded-xl p-4 hover:border-white/20 transition-all cursor-pointer group"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4F8CFF]/20 to-[#8B5CF6]/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#4F8CFF]" />
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                    <h3 className="font-medium text-white mb-1 truncate">{doc.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{doc.date}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400">{doc.type}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="flex-1 py-1.5 rounded bg-white/5 text-gray-300 text-sm hover:bg-white/10 transition-colors">
                        <Eye className="w-3 h-3 inline mr-1" />
                        View
                      </button>
                      <button className="flex-1 py-1.5 rounded bg-white/5 text-gray-300 text-sm hover:bg-white/10 transition-colors">
                        <Download className="w-3 h-3 inline mr-1" />
                        Export
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'generate' && (
            <div className="max-w-4xl mx-auto text-center py-16">
              <div className="glass rounded-3xl p-12">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F8CFF] to-[#8B5CF6] flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Generate New BRD</h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Upload your content and let AI create professional documentation in seconds
                </p>
                <a href="#demo">
                  <Button variant="primary" size="lg" glow>
                    <Upload className="w-5 h-5" />
                    Start Generating
                  </Button>
                </a>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="max-w-4xl mx-auto">
              <div className="glass rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#8B5CF6] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">AI Assistant</h2>
                    <p className="text-gray-400 text-sm">Ask questions or get help with your documents</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F8CFF] to-[#8B5CF6] flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 p-4 rounded-xl bg-white/5">
                      <p className="text-gray-300">
                        Hello! I'm your AI assistant. I can help you analyze requirements, generate user stories, create architecture diagrams, or answer questions about your documents. What would you like to do?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Ask AI anything..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#4F8CFF]/50"
                  />
                  <Button variant="primary" glow>
                    Send
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Activity Timeline</h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10" />
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 ml-1 hover:bg-white/5 rounded-lg p-2 -ml-1 transition-colors">
                      <div className="w-7 h-7 rounded-full bg-[#4F8CFF]/20 flex items-center justify-center shrink-0 z-10 border-2 border-[#0B0F19]">
                        <activity.icon className="w-3.5 h-3.5 text-[#4F8CFF]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.action}</p>
                        {activity.document && (
                          <p className="text-gray-400 text-xs mt-1">{activity.document}</p>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 shrink-0">{formatTimestamp(activity.timestamp)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
