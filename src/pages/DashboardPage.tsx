import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid as Layout, FileText, GitBranch, Users, BarChart3, Settings, Bell, Sparkles, Upload, Plus, Download, Activity, Archive, Search, Trash2, Eye, ChevronRight, Clock, TrendingUp, Zap, X, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { getUserProjects, deleteProject, type BRDResult } from '../lib/generate';
import { downloadPDF, downloadDOCX, downloadMarkdown } from '../lib/export';
import { GradientText } from '../components/ui/GradientText';
import { Button } from '../components/ui/Button';

type Tab = 'overview' | 'documents' | 'generate' | 'ai' | 'activity';

interface Project {
  id: string;
  user_id: string;
  project_name: string;
  input_text: string;
  generated_brd: BRDResult | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export function DashboardPage() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportProject, setExportProject] = useState<Project | null>(null);
  const [profileName, setProfileName] = useState('');

  useEffect(() => {
    if (user) {
      loadProjects();
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', user.id)
      .maybeSingle();

    if (data?.name) {
      setProfileName(data.name);
    } else {
      setProfileName(user.email?.split('@')[0] || 'User');
    }
  };

  const loadProjects = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getUserProjects(user.id);
      setProjects(data || []);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    setDeletingId(projectId);
    try {
      await deleteProject(projectId);
      setProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (err) {
      console.error('Failed to delete project:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleExport = (project: Project, format: 'pdf' | 'docx' | 'md') => {
    if (!project.generated_brd) return;
    if (format === 'pdf') downloadPDF(project.generated_brd);
    else if (format === 'docx') downloadDOCX(project.generated_brd);
    else downloadMarkdown(project.generated_brd);
    setShowExportModal(false);
    setExportProject(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'generating': return 'bg-yellow-500/20 text-yellow-400';
      case 'draft': return 'bg-blue-500/20 text-blue-400';
      case 'archived': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatTimestamp = (date: string) => {
    const now = new Date();
    const d = new Date(date);
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  };

  const stats = [
    { label: 'Documents Generated', value: projects.filter(p => p.status === 'completed').length.toString(), icon: FileText },
    { label: 'Active Projects', value: projects.filter(p => p.status !== 'archived').length.toString(), icon: TrendingUp },
    { label: 'This Week', value: projects.filter(p => {
      const d = new Date(p.created_at);
      const now = new Date();
      return now.getTime() - d.getTime() < 7 * 86400000;
    }).length.toString(), icon: Clock },
  ];

  const initials = profileName ? profileName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';

  const filteredProjects = projects.filter(p =>
    p.project_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarItems = [
    { icon: Layout, label: 'Overview', tab: 'overview' as Tab },
    { icon: FileText, label: 'Documents', tab: 'documents' as Tab },
    { icon: Zap, label: 'Generate BRD', tab: 'generate' as Tab },
    { icon: Sparkles, label: 'AI Assistant', tab: 'ai' as Tab },
    { icon: Activity, label: 'Activity', tab: 'activity' as Tab },
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0B0F19' }}>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-gray-950/80 backdrop-blur-xl border-r border-white/10 flex flex-col transition-all duration-300 z-30 ${sidebarCollapsed ? 'w-16 md:w-20' : 'w-56 md:w-64'}`}>
        <div className="flex items-center justify-between h-16 md:h-20 px-3 md:px-4 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-bold text-white text-sm md:text-base">
                Auto<GradientText>BRD</GradientText>
              </span>
            )}
          </Link>
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden md:block p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <ChevronRight className={`w-4 h-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="flex-1 p-2 md:p-4 space-y-1 md:space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-all text-sm ${
                activeTab === item.tab
                  ? 'bg-gradient-to-r from-violet-600/20 to-cyan-500/20 text-white border border-violet-500/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-2 md:p-4 border-t border-white/10">
          <button onClick={signOut} className="w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm">
            <Settings className="w-5 h-5 shrink-0" />
            {!sidebarCollapsed && <span className="font-medium">Sign Out</span>}
          </button>
          <div className={`flex items-center gap-2 md:gap-3 mt-3 px-3 md:px-4 py-2.5 md:py-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold shrink-0 text-xs md:text-sm">
              {initials}
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate text-sm">{profileName}</div>
                <div className="text-xs text-gray-400 truncate">{user?.email}</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16 md:ml-20' : 'ml-56 md:ml-64'}`}>
        <header className="sticky top-0 z-20 flex items-center justify-between h-16 md:h-20 px-4 md:px-8 bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/10">
          <h1 className="text-lg md:text-xl font-semibold text-white">
            {activeTab === 'overview' && 'Dashboard'}
            {activeTab === 'documents' && 'Documents'}
            {activeTab === 'generate' && 'Generate BRD'}
            {activeTab === 'ai' && 'AI Assistant'}
            {activeTab === 'activity' && 'Activity'}
          </h1>
          <div className="flex items-center gap-3 md:gap-4">
            <button className="relative p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <a href="#demo">
              <Button variant="primary" size="sm" className="text-xs md:text-sm">
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
                New Project
              </Button>
            </a>
          </div>
        </header>

        <div className="p-4 md:p-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
            </div>
          ) : activeTab === 'overview' ? (
            <div className="space-y-6 md:space-y-8">
              {/* Welcome */}
              <div className="glass rounded-2xl p-6">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Welcome back, {profileName}!</h2>
                <p className="text-gray-400">Ready to generate your next BRD? Upload a transcript or start typing.</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="glass rounded-2xl p-5 md:p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-500/20 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-violet-400" />
                      </div>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  <a href="#demo" className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border border-violet-500/30 hover:border-violet-500/50 transition-colors">
                    <Upload className="w-5 h-5 text-violet-400" />
                    <span className="text-white text-sm">Upload Transcript</span>
                  </a>
                  <a href="#demo" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                    <Zap className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300 text-sm">Generate BRD</span>
                  </a>
                  <a href="#demo" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                    <GitBranch className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300 text-sm">Architecture</span>
                  </a>
                </div>
              </div>

              {/* Recent Projects */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
                  <button onClick={() => setActiveTab('documents')} className="text-sm text-violet-400 hover:text-violet-300 transition-colors">View All</button>
                </div>
                {projects.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 mb-4">No projects yet</p>
                    <a href="#demo">
                      <Button variant="primary" size="sm">Generate First BRD</Button>
                    </a>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {projects.slice(0, 5).map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-violet-400" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-white truncate">{project.project_name}</div>
                            <div className="text-sm text-gray-400">{formatTimestamp(project.created_at)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`hidden sm:inline px-2 py-1 rounded text-xs ${getStatusColor(project.status)}`}>{project.status}</span>
                          {project.status === 'completed' && (
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setExportProject(project); setShowExportModal(true); }} className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'documents' ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500/50 text-sm"
                  />
                </div>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="text-center py-16">
                  <Archive className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">No projects found</p>
                  <p className="text-gray-500 text-sm">Create your first BRD to get started</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProjects.map((project) => (
                    <div key={project.id} className="glass rounded-xl p-4 hover:border-white/20 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600/20 to-cyan-500/20 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-violet-400" />
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(project.status)}`}>{project.status}</span>
                      </div>
                      <h3 className="font-medium text-white mb-1 truncate">{project.project_name}</h3>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-gray-400">{formatTimestamp(project.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                        {project.status === 'completed' && (
                          <>
                            <button onClick={() => { setExportProject(project); setShowExportModal(true); }} className="flex-1 py-1.5 rounded bg-white/5 text-gray-300 text-xs hover:bg-white/10 transition-colors">
                              <Download className="w-3 h-3 inline mr-1" />Export
                            </button>
                            <button onClick={() => downloadPDF(project.generated_brd as BRDResult)} className="flex-1 py-1.5 rounded bg-white/5 text-gray-300 text-xs hover:bg-white/10 transition-colors">
                              <Eye className="w-3 h-3 inline mr-1" />View
                            </button>
                          </>
                        )}
                        <button onClick={() => handleDeleteProject(project.id)} disabled={deletingId === project.id} className="py-1.5 px-3 rounded bg-white/5 text-red-400 text-xs hover:bg-red-500/10 transition-colors disabled:opacity-50">
                          {deletingId === project.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : activeTab === 'generate' ? (
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="glass rounded-3xl p-12">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Generate New BRD</h2>
                <p className="text-gray-400 mb-8">Scroll down to the demo section to start generating</p>
                <a href="#demo">
                  <Button variant="primary" size="lg" glow>
                    <Upload className="w-5 h-5" />
                    Go to Generator
                  </Button>
                </a>
              </div>
            </div>
          ) : activeTab === 'ai' ? (
            <div className="max-w-4xl mx-auto">
              <div className="glass rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">AI Assistant</h2>
                    <p className="text-gray-400 text-sm">Ask questions or get help with documents</p>
                  </div>
                </div>
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 p-4 rounded-xl bg-white/5">
                      <p className="text-gray-300">Hello! I'm your AI assistant. I can help you refine requirements, answer questions about your generated BRDs, or assist with project planning. What would you like to do?</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <input type="text" placeholder="Ask AI anything..." className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500/50 text-sm" />
                  <Button variant="primary" glow>Send</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Activity</h2>
              {projects.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No activity yet</p>
              ) : (
                <div className="space-y-3">
                  {projects.slice(0, 10).map((project) => (
                    <div key={project.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-violet-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">
                          {project.status === 'completed' ? 'Generated BRD' : project.status === 'generating' ? 'Generating' : 'Created'}: {project.project_name}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 shrink-0">{formatTimestamp(project.created_at)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Export Modal */}
      {showExportModal && exportProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass rounded-2xl p-6 max-w-sm w-full border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Export BRD</h3>
              <button onClick={() => { setShowExportModal(false); setExportProject(null); }} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-4">{exportProject.project_name}</p>
            <div className="space-y-3">
              <button onClick={() => handleExport(exportProject, 'pdf')} className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-colors text-left">
                <Download className="w-5 h-5 text-red-400" />
                <div>
                  <div className="text-white font-medium text-sm">Export as PDF</div>
                  <div className="text-gray-400 text-xs">Print-ready document</div>
                </div>
              </button>
              <button onClick={() => handleExport(exportProject, 'docx')} className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-colors text-left">
                <Download className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-white font-medium text-sm">Export as DOCX</div>
                  <div className="text-gray-400 text-xs">Microsoft Word format</div>
                </div>
              </button>
              <button onClick={() => handleExport(exportProject, 'md')} className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-colors text-left">
                <Download className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-white font-medium text-sm">Export as Markdown</div>
                  <div className="text-gray-400 text-xs">For GitHub and wikis</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
