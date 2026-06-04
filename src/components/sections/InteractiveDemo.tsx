import { useState, useRef, useCallback } from 'react';
import { Mic, Upload, Sparkles, FileText, ChevronDown, ChevronUp, Download, Share2, Calendar, Users, Layers, Zap, Check, Loader2, X, File, FileType, Image, AudioWaveform, AlertCircle, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { GradientText } from '../ui/GradientText';

interface GeneratedBRD {
  overview: {
    projectName: string;
    description: string;
    targetUsers: string;
    businessValue: string;
  };
  features: Array<{ name: string; description: string; priority: 'High' | 'Medium' | 'Low'; confidence: number; source: string }>;
  userStories: Array<{ id: string; story: string; acceptance: string[]; confidence: number }>;
  timeline: Array<{ phase: string; duration: string; tasks: string[] }>;
  techStack: { frontend: string[]; backend: string[]; database: string[]; thirdParty: string[] };
  architecture: { components: string[]; dataFlow: string };
  clarifications: Array<{ question: string; answer: string }>;
}

const sampleInput = `Mujhe ek grocery delivery app banana hai jisme live tracking aur online payment ho. User apna location set karega, nearby stores dikhenge, products add karke cart mein order place karega. Payment UPI ya card se ho sakti hai. Delivery boy ka real-time tracking bhi chahiye.`;

const clarifications = [
  { id: 1, question: 'Should users be able to schedule deliveries for a specific time?', answer: '' },
  { id: 2, question: 'Do you need an admin dashboard for store management?', answer: '' },
  { id: 3, question: 'Should the app support multiple delivery addresses per user?', answer: '' },
];

const demoResults: GeneratedBRD = {
  overview: {
    projectName: 'Grocery Delivery Platform',
    description: 'A comprehensive grocery delivery application with real-time tracking, multiple payment options, and seamless user experience for Indian market.',
    targetUsers: 'Urban households, working professionals, elderly users who prefer home delivery of groceries',
    businessValue: 'Connect local grocery stores with customers, reduce delivery time to 30 minutes, capture $2B Indian grocery delivery market'
  },
  features: [
    { name: 'User Authentication', description: 'Phone number OTP login, social login with Google', priority: 'High', confidence: 95, source: 'Directly mentioned in requirements' },
    { name: 'Location-Based Store Discovery', description: 'Auto-detect user location, show nearby stores within 5km radius', priority: 'High', confidence: 92, source: 'Inferred from "nearby stores" requirement' },
    { name: 'Product Catalog', description: 'Browse products by category with search and filters', priority: 'High', confidence: 88, source: 'Implicit from grocery delivery context' },
    { name: 'Shopping Cart', description: 'Add/remove items, quantity management, save for later', priority: 'High', confidence: 90, source: 'Mentioned "products add karke cart"' },
    { name: 'Live Order Tracking', description: 'Real-time GPS tracking of delivery partner', priority: 'High', confidence: 98, source: 'Explicitly stated: "live tracking"' },
    { name: 'Multiple Payment Options', description: 'UPI (GPay, Paytm, PhonePe), Credit/Debit Card, COD', priority: 'High', confidence: 96, source: 'Explicitly stated: "UPI ya card"' },
    { name: 'Order History', description: 'View past orders with reorder functionality', priority: 'Medium', confidence: 75, source: 'Standard e-commerce feature' },
    { name: 'Rating & Reviews', description: 'Rate products and delivery experience', priority: 'Low', confidence: 70, source: 'Common delivery app feature' },
  ],
  userStories: [
    { id: 'US-001', story: 'As a user, I want to login with my phone number via OTP so that I can access my account securely', acceptance: ['OTP sent within 10 seconds', 'Auto-verify OTP', 'Resend OTP option'], confidence: 95 },
    { id: 'US-002', story: 'As a user, I want to see stores near my location so that I can order from local grocery shops', acceptance: ['GPS permission request', 'Stores sorted by distance', 'Manual location selection'], confidence: 90 },
    { id: 'US-003', story: 'As a user, I want to track my order in real-time so that I know when my groceries will arrive', acceptance: ['Live map with delivery partner', 'ETA updates', 'Push notifications'], confidence: 98 },
    { id: 'US-004', story: 'As a user, I want to pay via UPI so that I can complete payment quickly', acceptance: ['UPI intent support', 'QR code option', 'Payment confirmation'], confidence: 96 },
  ],
  timeline: [
    { phase: 'Phase 1 - MVP', duration: '6 weeks', tasks: ['User authentication', 'Store catalog', 'Basic ordering'] },
    { phase: 'Phase 2 - Core Features', duration: '8 weeks', tasks: ['Live tracking', 'Payment integration', 'Order management'] },
    { phase: 'Phase 3 - Enhancement', duration: '4 weeks', tasks: ['Reviews system', 'Loyalty program', 'Admin dashboard'] },
    { phase: 'Phase 4 - Scale', duration: '4 weeks', tasks: ['Multi-city launch', 'Performance optimization', 'Analytics'] },
  ],
  techStack: {
    frontend: ['React Native', 'TypeScript', 'Redux', 'Google Maps SDK'],
    backend: ['Node.js', 'Express', 'GraphQL', 'Socket.io'],
    database: ['MongoDB', 'Redis (caching)', 'PostgreSQL (analytics)'],
    thirdParty: ['Razorpay API', 'Twilio SMS', 'Firebase', 'AWS S3']
  },
  architecture: {
    components: ['Mobile App (iOS/Android)', 'API Gateway', 'User Service', 'Order Service', 'Delivery Tracking Service', 'Payment Gateway', 'Notification Service'],
    dataFlow: 'User → Mobile App → API Gateway → Microservices → Database. Real-time tracking via WebSocket connection to Delivery Tracking Service.'
  },
  clarifications: []
};

const processingSteps = [
  { id: 1, text: 'Analyzing input content...', icon: '🔍', detail: 'Parsing text/voice/image content' },
  { id: 2, text: 'Detecting language and context...', icon: '🌐', detail: 'Identifying Hindi/Hinglish with business context' },
  { id: 3, text: 'Extracting key requirements...', icon: '📋', detail: 'Identifying features and constraints' },
  { id: 4, text: 'Generating user stories...', icon: '📝', detail: 'Creating acceptance criteria' },
  { id: 5, text: 'Building project timeline...', icon: '📅', detail: 'Estimating phases and milestones' },
  { id: 6, text: 'Recommending tech stack...', icon: '⚙️', detail: 'Matching requirements to technologies' },
  { id: 7, text: 'Designing system architecture...', icon: '🏗️', detail: 'Creating component diagram' },
  { id: 8, text: 'Validating business logic...', icon: '✅', detail: 'Checking consistency and completeness' },
  { id: 9, text: 'Finalizing BRD document...', icon: '✨', detail: 'Generating final output' },
];

type UploadFile = {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'audio' | 'text';
  size: string;
  preview?: string;
};

export function InteractiveDemo() {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepText, setCurrentStepText] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview']);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportType, setExportType] = useState<'pdf' | 'docx' | 'link' | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showClarifications, setShowClarifications] = useState(false);
  const [clarificationAnswers, setClarificationAnswers] = useState<Record<number, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSampleInput = () => {
    setInput(sampleInput);
  };

  const handleUpload = useCallback((files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadFile[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.name.endsWith('.pdf') ? 'pdf' :
            file.type.startsWith('image/') ? 'image' :
            file.type.startsWith('audio/') ? 'audio' : 'text',
      size: (file.size / 1024).toFixed(1) + ' KB'
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleUpload(e.dataTransfer.files);
  }, [handleUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleGenerate = async () => {
    if (!input.trim() && uploadedFiles.length === 0) {
      handleSampleInput();
      return;
    }

    setIsProcessing(true);
    setCurrentStep(0);
    setCurrentStepText('');

    // Simulate streaming AI analysis
    for (let i = 0; i < processingSteps.length; i++) {
      setCurrentStep(i + 1);
      setCurrentStepText(processingSteps[i].text);

      // Simulate typing effect
      await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300));
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setIsProcessing(false);
    setIsGenerated(true);
    setShowClarifications(true);
  };

  const handleReset = () => {
    setInput('');
    setIsGenerated(false);
    setCurrentStep(0);
    setUploadedFiles([]);
    setShowClarifications(false);
    setClarificationAnswers({});
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleExport = (type: 'pdf' | 'docx' | 'link') => {
    setExportType(type);
    setShowExportModal(true);

    // Simulate export
    setTimeout(() => {
      setExportSuccess(true);
    }, 1500);
  };

  const closeExportModal = () => {
    setShowExportModal(false);
    setExportType(null);
    setExportSuccess(false);
  };

  return (
    <section id="demo" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#4F8CFF]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-[#8B5CF6]/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#4F8CFF]/20 to-[#8B5CF6]/20 border border-[#4F8CFF]/30 mb-6">
            <Zap className="w-4 h-4 text-[#4F8CFF]" />
            <span className="text-sm text-white">Interactive Demo</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Try <GradientText>AutoBRD AI</GradientText> Now
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Upload documents, voice notes, or enter requirements in any Indian language
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <GlassCard className="p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#4F8CFF]/20 flex items-center justify-center">
                    <Mic className="w-4 h-4 text-[#4F8CFF]" />
                  </div>
                  <span className="font-semibold text-white">Input Source</span>
                </div>
                {uploadedFiles.length > 0 && (
                  <span className="text-xs text-[#4F8CFF]">{uploadedFiles.length} file(s) uploaded</span>
                )}
              </div>

              {/* Drag and Drop Upload Area */}
              <div
                className={`relative mb-4 border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  isDragging
                    ? 'border-[#4F8CFF] bg-[#4F8CFF]/10'
                    : 'border-white/20 hover:border-[#4F8CFF]/50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg,.mp3,.wav,.m4a"
                  onChange={(e) => handleUpload(e.target.files)}
                  className="hidden"
                />

                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-white font-medium mb-1">Drag & drop files here</p>
                <p className="text-gray-400 text-sm mb-3">PDF, Images, Audio, Text</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors text-sm"
                >
                  Browse Files
                </button>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mb-4 space-y-2">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        {file.type === 'pdf' && <FileType className="w-5 h-5 text-red-400" />}
                        {file.type === 'image' && <Image className="w-5 h-5 text-green-400" />}
                        {file.type === 'audio' && <AudioWaveform className="w-5 h-5 text-purple-400" />}
                        {file.type === 'text' && <File className="w-5 h-5 text-blue-400" />}
                        <div>
                          <p className="text-white text-sm truncate max-w-[200px]">{file.name}</p>
                          <p className="text-gray-400 text-xs">{file.size}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Input Textarea */}
              <div className="relative mb-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Or type your requirements in Hindi, Hinglish, Tamil, Bengali, or any Indian language..."
                  className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#4F8CFF]/50 transition-colors resize-none"
                  disabled={isProcessing || isGenerated}
                />
                {!input && !isGenerated && uploadedFiles.length === 0 && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-gray-500 text-xs mb-2">Need inspiration?</div>
                    <button
                      onClick={handleSampleInput}
                      className="text-xs text-[#4F8CFF] hover:text-[#4F8CFF]/80 transition-colors flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      Load Hindi/Hinglish Sample
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors text-sm"
                >
                  <Upload className="w-4 h-4" />
                  Upload File
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors text-sm">
                  <Mic className="w-4 h-4" />
                  Voice Input
                </button>
              </div>

              {/* Generate Button */}
              {!isGenerated ? (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  glow
                  onClick={handleGenerate}
                  disabled={isProcessing || (!input.trim() && uploadedFiles.length === 0)}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate BRD
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={handleReset}
                >
                  Try Another
                </Button>
              )}

              {/* Processing Animation */}
              {isProcessing && (
                <div className="mt-6 p-4 rounded-xl bg-black/50 border border-[#4F8CFF]/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-[#4F8CFF] animate-pulse" />
                    <span className="text-sm text-[#4F8CFF]">{currentStepText}</span>
                  </div>

                  {/* Step indicators */}
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {processingSteps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                          index < currentStep ? 'text-green-400' :
                          index === currentStep - 1 ? 'text-[#4F8CFF]' : 'text-gray-500'
                        }`}
                      >
                        <span className={index === currentStep - 1 ? 'animate-pulse' : ''}>{step.icon}</span>
                        <div className="flex-1">
                          <span className={index < currentStep ? 'line-through opacity-70' : ''}>
                            {step.text}
                          </span>
                          {index === currentStep - 1 && (
                            <span className="text-xs text-gray-400 ml-2">({step.detail})</span>
                          )}
                        </div>
                        {index < currentStep && <Check className="w-4 h-4 shrink-0" />}
                      </div>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#4F8CFF] to-[#8B5CF6] transition-all duration-300 ease-out"
                      style={{ width: `${(currentStep / processingSteps.length) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 text-right mt-1">
                    {Math.round((currentStep / processingSteps.length) * 100)}%
                  </div>
                </div>
              )}

              {/* AI Clarifications */}
              {showClarifications && isGenerated && (
                <div className="mt-6 p-4 rounded-xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/30">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageCircle className="w-4 h-4 text-[#4F8CFF]" />
                    <span className="text-sm font-medium text-white">AI Clarifications</span>
                    <span className="text-xs text-gray-400">(Optional)</span>
                  </div>
                  <div className="space-y-3">
                    {clarifications.map((c) => (
                      <div key={c.id} className="p-3 rounded-lg bg-black/30">
                        <p className="text-sm text-gray-300 mb-2">{c.question}</p>
                        <input
                          type="text"
                          placeholder="Type your answer..."
                          value={clarificationAnswers[c.id] || ''}
                          onChange={(e) => setClarificationAnswers(prev => ({ ...prev, [c.id]: e.target.value }))}
                          className="w-full bg-black/50 border border-white/10 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#4F8CFF]/50"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </GlassCard>
          </div>

          {/* Output Section */}
          <div>
            <GlassCard className={`p-6 h-full ${isGenerated ? 'border-[#4F8CFF]/30' : 'opacity-60'}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#8B5CF6]" />
                  </div>
                  <span className="font-semibold text-white">Generated BRD</span>
                </div>
                {isGenerated && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-400 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Complete
                    </span>
                  </div>
                )}
              </div>

              {!isGenerated ? (
                <div className="h-96 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Generated BRD will appear here</p>
                    <p className="text-xs mt-2">Upload files or enter requirements</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {/* Overview Section */}
                  <div className="border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection('overview')}
                      className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <span className="font-medium text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#4F8CFF]" />
                        Project Overview
                      </span>
                      {expandedSections.includes('overview') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedSections.includes('overview') && (
                      <div className="p-4 space-y-3 bg-black/30">
                        <div>
                          <span className="text-xs text-gray-400">Project Name</span>
                          <p className="text-white font-medium">{demoResults.overview.projectName}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-400">Description</span>
                          <p className="text-gray-300 text-sm">{demoResults.overview.description}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-400">Target Users</span>
                          <p className="text-gray-300 text-sm">{demoResults.overview.targetUsers}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features Section with Confidence */}
                  <div className="border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection('features')}
                      className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <span className="font-medium text-white flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#8B5CF6]" />
                        Features ({demoResults.features.length})
                      </span>
                      {expandedSections.includes('features') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedSections.includes('features') && (
                      <div className="p-4 space-y-2 bg-black/30">
                        {demoResults.features.map((feature, i) => (
                          <div key={i} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-start justify-between mb-1">
                              <span className="text-white text-sm font-medium">{feature.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                feature.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                                feature.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-green-500/20 text-green-400'
                              }`}>
                                {feature.priority}
                              </span>
                            </div>
                            <p className="text-gray-400 text-xs mb-2">{feature.description}</p>
                            <div className="flex items-center gap-2 text-xs">
                              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#4F8CFF] to-[#8B5CF6]"
                                  style={{ width: `${feature.confidence}%` }}
                                />
                              </div>
                              <span className="text-gray-400">{feature.confidence}%</span>
                              <AlertCircle className="w-3 h-3 text-gray-500" title={feature.source} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* User Stories Section */}
                  <div className="border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection('stories')}
                      className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <span className="font-medium text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#4F8CFF]" />
                        User Stories ({demoResults.userStories.length})
                      </span>
                      {expandedSections.includes('stories') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedSections.includes('stories') && (
                      <div className="p-4 space-y-3 bg-black/30">
                        {demoResults.userStories.map((story) => (
                          <div key={story.id} className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#4F8CFF]/30 transition-colors">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-[#4F8CFF] font-mono">{story.id}</span>
                              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-[#4F8CFF]" style={{ width: `${story.confidence}%` }} />
                              </div>
                              <span className="text-xs text-gray-400">{story.confidence}%</span>
                            </div>
                            <p className="text-gray-300 text-sm mt-2">{story.story}</p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {story.acceptance.map((acc, i) => (
                                <span key={i} className="text-xs px-2 py-0.5 rounded bg-[#4F8CFF]/10 text-[#4F8CFF]">{acc}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Timeline Section */}
                  <div className="border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection('timeline')}
                      className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <span className="font-medium text-white flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#8B5CF6]" />
                        Timeline ({demoResults.timeline.reduce((acc, t) => acc + parseInt(t.duration), 0)} weeks)
                      </span>
                      {expandedSections.includes('timeline') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedSections.includes('timeline') && (
                      <div className="p-4 space-y-3 bg-black/30">
                        {demoResults.timeline.map((phase, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="w-16 text-right">
                              <span className="text-xs text-gray-400">{phase.duration}</span>
                            </div>
                            <div className="flex-1 p-3 rounded-lg bg-white/5 border-l-2 border-[#4F8CFF]">
                              <span className="text-white text-sm font-medium">{phase.phase}</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {phase.tasks.map((task, j) => (
                                  <span key={j} className="text-xs text-gray-400">{task}{j < phase.tasks.length - 1 ? ',' : ''}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tech Stack Section */}
                  <div className="border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection('tech')}
                      className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <span className="font-medium text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#4F8CFF]" />
                        Tech Stack
                      </span>
                      {expandedSections.includes('tech') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedSections.includes('tech') && (
                      <div className="p-4 grid grid-cols-2 gap-3 bg-black/30">
                        <div>
                          <span className="text-xs text-gray-400 block mb-1">Frontend</span>
                          <div className="flex flex-wrap gap-1">
                            {demoResults.techStack.frontend.map((tech, i) => (
                              <span key={i} className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">{tech}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-400 block mb-1">Backend</span>
                          <div className="flex flex-wrap gap-1">
                            {demoResults.techStack.backend.map((tech, i) => (
                              <span key={i} className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">{tech}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-400 block mb-1">Database</span>
                          <div className="flex flex-wrap gap-1">
                            {demoResults.techStack.database.map((tech, i) => (
                              <span key={i} className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">{tech}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-400 block mb-1">Third Party</span>
                          <div className="flex flex-wrap gap-1">
                            {demoResults.techStack.thirdParty.map((tech, i) => (
                              <span key={i} className="text-xs px-2 py-0.5 rounded bg-orange-500/20 text-orange-400">{tech}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Export Buttons */}
                  {isGenerated && (
                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleExport('pdf')}
                      >
                        <Download className="w-4 h-4" />
                        Export PDF
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleExport('docx')}
                      >
                        <Download className="w-4 h-4" />
                        Export DOCX
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleExport('link')}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="glass rounded-2xl p-8 max-w-md w-full border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Export BRD</h3>
              <button onClick={closeExportModal} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!exportSuccess ? (
              <div className="text-center py-8">
                <Loader2 className="w-12 h-12 text-[#4F8CFF] animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Generating {exportType?.toUpperCase()} file...</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-white font-medium mb-2">Export Complete!</p>
                {exportType === 'link' ? (
                  <div className="mt-4">
                    <input
                      type="text"
                      readOnly
                      value="https://autobrd.ai/share/abc123"
                      className="w-full bg-black/50 border border-white/10 rounded-lg py-2 px-3 text-sm text-white"
                    />
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm mb-4">Your file is ready for download</p>
                )}
                <Button variant="primary" className="mt-4" onClick={closeExportModal}>
                  {exportType === 'link' ? 'Copy Link' : 'Download'}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
