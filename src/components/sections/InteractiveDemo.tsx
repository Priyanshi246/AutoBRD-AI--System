import { useState, useRef, useCallback } from 'react';
import { Mic, Upload, Sparkles, FileText, ChevronDown, ChevronUp, Download, Share2, Calendar, Users, Layers, Zap, Check, Loader2, X, File, FileType, Image, AudioWaveform, AlertCircle, MessageCircle, Shield, Target, BarChart3 } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { generateBRD, saveProject, type BRDResult } from '../../lib/generate';
import { uploadFile } from '../../lib/uploads';
import { useVoiceInput } from '../../lib/useVoiceInput';
import { downloadPDF, downloadDOCX, downloadMarkdown } from '../../lib/export';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { GradientText } from '../ui/GradientText';

const sampleInput = `Mujhe ek grocery delivery app banana hai jisme live tracking aur online payment ho. User apna location set karega, nearby stores dikhenge, products add karke cart mein order place karega. Payment UPI ya card se ho sakti hai. Delivery boy ka real-time tracking bhi chahiye.`;

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
  file?: File;
};

export function InteractiveDemo() {
  const { user } = useAuth();
  const { isListening, transcript, startListening, stopListening, isSupported: voiceSupported } = useVoiceInput();
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepText, setCurrentStepText] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedBRD, setGeneratedBRD] = useState<BRDResult | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview']);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync voice transcript to input
  useState(() => {
    if (transcript) {
      setInput(prev => prev ? prev + ' ' + transcript : transcript);
    }
  });

  const handleSampleInput = () => setInput(sampleInput);

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files) return;
    const newFiles: UploadFile[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.name.endsWith('.pdf') ? 'pdf' as const :
            file.type.startsWith('image/') ? 'image' as const :
            file.type.startsWith('audio/') ? 'audio' as const : 'text' as const,
      size: (file.size / 1024).toFixed(1) + ' KB',
      file,
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); }, []);

  const removeFile = (id: string) => setUploadedFiles(prev => prev.filter(f => f.id !== id));

  const handleGenerate = async () => {
    if (!input.trim() && uploadedFiles.length === 0) {
      handleSampleInput();
      return;
    }

    setIsProcessing(true);
    setCurrentStep(0);
    setGeneratedBRD(null);

    // Animate progress steps
    for (let i = 0; i < processingSteps.length; i++) {
      setCurrentStep(i + 1);
      setCurrentStepText(processingSteps[i].text);
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));
    }

    try {
      const brd = await generateBRD({
        inputText: input,
        language: 'auto',
      });

      setGeneratedBRD(brd);
      setIsGenerated(true);

      // Save to database if user is logged in
      if (user && brd) {
        try {
          const project = await saveProject(user.id, brd.overview.projectName, input, brd);
          setProjectId(project.id);

          // Upload files if any
          if (project && uploadedFiles.length > 0) {
            for (const f of uploadedFiles) {
              if (f.file) {
                try {
                  await uploadFile(user.id, project.id, f.file);
                } catch (e) {
                  console.error('File upload failed:', e);
                }
              }
            }
          }
        } catch (e) {
          console.error('Save project failed:', e);
        }
      }
    } catch (error: any) {
      console.error('Generation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setInput('');
    setIsGenerated(false);
    setGeneratedBRD(null);
    setCurrentStep(0);
    setUploadedFiles([]);
    setProjectId(null);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]);
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening('hi-IN');
    }
  };

  return (
    <section id="demo" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border border-violet-500/30 mb-6">
            <Zap className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-white">Interactive Demo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Try <GradientText>AutoBRD AI</GradientText> Now
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Upload documents, use voice input, or enter requirements in any Indian language
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Input */}
          <GlassCard className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <Mic className="w-4 h-4 text-violet-400" />
                </div>
                <span className="font-semibold text-white text-sm md:text-base">Input Source</span>
              </div>
              {uploadedFiles.length > 0 && (
                <span className="text-xs text-violet-400">{uploadedFiles.length} file(s)</span>
              )}
            </div>

            {/* Drag & Drop */}
            <div
              className={`relative mb-4 border-2 border-dashed rounded-xl p-4 md:p-6 text-center transition-all ${isDragging ? 'border-violet-500 bg-violet-500/10' : 'border-white/20 hover:border-violet-500/50'}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input ref={fileInputRef} type="file" multiple accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg,.mp3,.wav,.m4a" onChange={(e) => handleFileUpload(e.target.files)} className="hidden" />
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-white font-medium text-sm mb-1">Drag & drop files</p>
              <p className="text-gray-400 text-xs mb-2">PDF, Images, Audio, Text</p>
              <button onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors text-xs">
                Browse Files
              </button>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mb-4 space-y-2">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2">
                      {file.type === 'pdf' && <FileType className="w-4 h-4 text-red-400" />}
                      {file.type === 'image' && <Image className="w-4 h-4 text-green-400" />}
                      {file.type === 'audio' && <AudioWaveform className="w-4 h-4 text-purple-400" />}
                      {file.type === 'text' && <File className="w-4 h-4 text-blue-400" />}
                      <div>
                        <p className="text-white text-xs truncate max-w-[150px]">{file.name}</p>
                        <p className="text-gray-400 text-[10px]">{file.size}</p>
                      </div>
                    </div>
                    <button onClick={() => removeFile(file.id)} className="p-1 rounded hover:bg-white/10 text-gray-400"><X className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            )}

            {/* Textarea */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Or type your requirements in Hindi, Hinglish, Tamil, Bengali..."
              className="w-full h-28 md:h-32 bg-black/50 border border-white/10 rounded-xl p-3 md:p-4 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 transition-colors resize-none text-sm"
              disabled={isProcessing || isGenerated}
            />

            {/* Actions */}
            <div className="flex gap-2 mb-3">
              <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors text-xs">
                <Upload className="w-3.5 h-3.5" /> Upload
              </button>
              <button onClick={handleVoiceToggle} disabled={!voiceSupported} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-colors text-xs ${isListening ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}>
                <Mic className={`w-3.5 h-3.5 ${isListening ? 'animate-pulse' : ''}`} />
                {isListening ? 'Stop' : 'Voice'}
              </button>
              {voiceSupported && isListening && (
                <span className="text-xs text-red-400 flex items-center gap-1 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-red-400" /> Recording...
                </span>
              )}
            </div>

            {!isGenerated ? (
              <Button variant="primary" size="lg" className="w-full" glow onClick={handleGenerate} disabled={isProcessing || (!input.trim() && uploadedFiles.length === 0)}>
                {isProcessing ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : <><Sparkles className="w-5 h-5" /> Generate BRD</>}
              </Button>
            ) : (
              <Button variant="secondary" size="lg" className="w-full" onClick={handleReset}>Try Another</Button>
            )}

            {/* Processing Animation */}
            {isProcessing && (
              <div className="mt-4 p-3 rounded-xl bg-black/50 border border-violet-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
                  <span className="text-xs text-violet-400">{currentStepText}</span>
                </div>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {processingSteps.map((step, index) => (
                    <div key={step.id} className={`flex items-center gap-2 text-xs transition-all ${index < currentStep ? 'text-green-400' : index === currentStep - 1 ? 'text-violet-400' : 'text-gray-600'}`}>
                      <span>{step.icon}</span>
                      <span className={index < currentStep ? 'line-through opacity-60' : ''}>{step.text}</span>
                      {index < currentStep && <Check className="w-3 h-3 ml-auto shrink-0" />}
                    </div>
                  ))}
                </div>
                <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 transition-all duration-300" style={{ width: `${(currentStep / processingSteps.length) * 100}%` }} />
                </div>
              </div>
            )}
          </GlassCard>

          {/* Output */}
          <GlassCard className={`p-4 md:p-6 ${isGenerated ? 'border-violet-500/30' : 'opacity-60'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="font-semibold text-white text-sm md:text-base">Generated BRD</span>
              </div>
              {isGenerated && <span className="text-xs text-green-400 flex items-center gap-1"><Check className="w-3 h-3" />Complete</span>}
            </div>

            {!isGenerated || !generatedBRD ? (
              <div className="h-64 md:h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Generated BRD will appear here</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {/* Overview */}
                <CollapsibleSection id="overview" icon={Layers} label="Project Overview" expanded={expandedSections} onToggle={toggleSection} color="violet">
                  <div className="space-y-2">
                    <div><span className="text-[10px] text-gray-400">Project</span><p className="text-white font-medium text-sm">{generatedBRD.overview.projectName}</p></div>
                    <div><span className="text-[10px] text-gray-400">Description</span><p className="text-gray-300 text-xs">{generatedBRD.overview.description}</p></div>
                    <div><span className="text-[10px] text-gray-400">Target Users</span><p className="text-gray-300 text-xs">{generatedBRD.overview.targetUsers}</p></div>
                  </div>
                </CollapsibleSection>

                {/* Objectives */}
                {generatedBRD.objectives?.length > 0 && (
                  <CollapsibleSection id="objectives" icon={Target} label={`Objectives (${generatedBRD.objectives.length})`} expanded={expandedSections} onToggle={toggleSection} color="cyan">
                    <ul className="space-y-1">{generatedBRD.objectives.map((o, i) => <li key={i} className="text-gray-300 text-xs flex items-start gap-2"><Check className="w-3 h-3 text-green-400 mt-0.5 shrink-0" />{o}</li>)}</ul>
                  </CollapsibleSection>
                )}

                {/* Functional Requirements */}
                <CollapsibleSection id="features" icon={Zap} label={`Functional Requirements (${generatedBRD.functionalRequirements?.length || 0})`} expanded={expandedSections} onToggle={toggleSection} color="violet">
                  <div className="space-y-2">
                    {generatedBRD.functionalRequirements?.map((f, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-white text-xs font-medium">{f.name}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${f.priority === 'High' ? 'bg-red-500/20 text-red-400' : f.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>{f.priority}</span>
                        </div>
                        <p className="text-gray-400 text-[11px]">{f.description}</p>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>

                {/* Non-Functional Requirements */}
                {generatedBRD.nonFunctionalRequirements?.length > 0 && (
                  <CollapsibleSection id="nfr" icon={Shield} label={`Non-Functional (${generatedBRD.nonFunctionalRequirements.length})`} expanded={expandedSections} onToggle={toggleSection} color="cyan">
                    <div className="space-y-1.5">
                      {generatedBRD.nonFunctionalRequirements.map((r, i) => (
                        <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white/5">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 shrink-0">{r.category}</span>
                          <div><span className="text-white text-xs">{r.name}</span><p className="text-gray-400 text-[11px]">{r.description}</p></div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>
                )}

                {/* User Stories */}
                <CollapsibleSection id="stories" icon={Users} label={`User Stories (${generatedBRD.userStories?.length || 0})`} expanded={expandedSections} onToggle={toggleSection} color="violet">
                  <div className="space-y-2">
                    {generatedBRD.userStories?.map((s) => (
                      <div key={s.id} className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/30 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] text-violet-400 font-mono">{s.id}</span>
                          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-violet-500" style={{ width: `${s.confidence}%` }} /></div>
                          <span className="text-[10px] text-gray-400">{s.confidence}%</span>
                        </div>
                        <p className="text-gray-300 text-xs">{s.story}</p>
                        <div className="mt-1.5 flex flex-wrap gap-1">{s.acceptance?.map((a, i) => <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300">{a}</span>)}</div>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>

                {/* User Roles */}
                {generatedBRD.userRoles?.length > 0 && (
                  <CollapsibleSection id="roles" icon={Users} label={`User Roles (${generatedBRD.userRoles.length})`} expanded={expandedSections} onToggle={toggleSection} color="cyan">
                    <div className="space-y-1.5">
                      {generatedBRD.userRoles.map((r, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-white/5">
                          <span className="text-white text-xs font-medium">{r.role}</span>
                          <p className="text-gray-400 text-[11px]">{r.description}</p>
                          <div className="flex flex-wrap gap-1 mt-1">{r.permissions?.map((p, j) => <span key={j} className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300">{p}</span>)}</div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>
                )}

                {/* Timeline */}
                <CollapsibleSection id="timeline" icon={Calendar} label="Timeline" expanded={expandedSections} onToggle={toggleSection} color="violet">
                  <div className="space-y-2">
                    {generatedBRD.timeline?.map((p, i) => (
                      <div key={i} className="flex gap-2">
                        <div className="w-14 text-right shrink-0"><span className="text-[10px] text-gray-400">{p.duration}</span></div>
                        <div className="flex-1 p-2 rounded-lg bg-white/5 border-l-2 border-violet-500">
                          <span className="text-white text-xs font-medium">{p.phase}</span>
                          <div className="flex flex-wrap gap-1 mt-1">{p.tasks?.map((t, j) => <span key={j} className="text-[10px] text-gray-400">{t}{j < p.tasks.length - 1 ? ',' : ''}</span>)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>

                {/* Tech Stack */}
                <CollapsibleSection id="tech" icon={Layers} label="Tech Stack" expanded={expandedSections} onToggle={toggleSection} color="cyan">
                  <div className="grid grid-cols-2 gap-2">
                    <div><span className="text-[10px] text-gray-400 block mb-1">Frontend</span><div className="flex flex-wrap gap-1">{generatedBRD.techStack?.frontend?.map((t, i) => <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">{t}</span>)}</div></div>
                    <div><span className="text-[10px] text-gray-400 block mb-1">Backend</span><div className="flex flex-wrap gap-1">{generatedBRD.techStack?.backend?.map((t, i) => <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-300">{t}</span>)}</div></div>
                    <div><span className="text-[10px] text-gray-400 block mb-1">Database</span><div className="flex flex-wrap gap-1">{generatedBRD.techStack?.database?.map((t, i) => <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">{t}</span>)}</div></div>
                    <div><span className="text-[10px] text-gray-400 block mb-1">Third Party</span><div className="flex flex-wrap gap-1">{generatedBRD.techStack?.thirdParty?.map((t, i) => <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300">{t}</span>)}</div></div>
                  </div>
                </CollapsibleSection>

                {/* Risk Analysis */}
                {generatedBRD.riskAnalysis?.length > 0 && (
                  <CollapsibleSection id="risks" icon={AlertCircle} label="Risk Analysis" expanded={expandedSections} onToggle={toggleSection} color="violet">
                    <div className="space-y-1.5">
                      {generatedBRD.riskAnalysis.map((r, i) => (
                        <div key={i} className="p-2 rounded-lg bg-white/5">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-white text-xs">{r.risk}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${r.impact === 'High' ? 'bg-red-500/20 text-red-400' : r.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>{r.impact}</span>
                          </div>
                          <p className="text-gray-400 text-[11px]">{r.mitigation}</p>
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>
                )}

                {/* Success Metrics */}
                {generatedBRD.successMetrics?.length > 0 && (
                  <CollapsibleSection id="metrics" icon={BarChart3} label="Success Metrics" expanded={expandedSections} onToggle={toggleSection} color="cyan">
                    <div className="space-y-1.5">
                      {generatedBRD.successMetrics.map((m, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                          <span className="text-gray-300 text-xs">{m.metric}</span>
                          <span className="text-cyan-400 text-xs font-medium">{m.target}</span>
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>
                )}

                {/* Export */}
                {isGenerated && (
                  <div className="flex gap-2 pt-3">
                    <Button variant="primary" size="sm" className="flex-1 text-xs" onClick={() => downloadPDF(generatedBRD)}>
                      <Download className="w-3 h-3" /> PDF
                    </Button>
                    <Button variant="secondary" size="sm" className="flex-1 text-xs" onClick={() => downloadDOCX(generatedBRD)}>
                      <Download className="w-3 h-3" /> DOCX
                    </Button>
                    <Button variant="secondary" size="sm" className="flex-1 text-xs" onClick={() => downloadMarkdown(generatedBRD)}>
                      <Download className="w-3 h-3" /> MD
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(window.location.origin + '/dashboard'); setExportSuccess(true); setTimeout(() => setExportSuccess(false), 2000); }}>
                      {exportSuccess ? <Check className="w-3 h-3 text-green-400" /> : <Share2 className="w-3 h-3" />}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function CollapsibleSection({ id, icon: Icon, label, expanded, onToggle, color, children }: {
  id: string; icon: any; label: string; expanded: string[]; onToggle: (s: string) => void; color: string; children: React.ReactNode;
}) {
  const isOpen = expanded.includes(id);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button onClick={() => onToggle(id)} className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors">
        <span className="font-medium text-white flex items-center gap-2 text-sm">
          <Icon className={`w-4 h-4 ${color === 'violet' ? 'text-violet-400' : 'text-cyan-400'}`} />
          {label}
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {isOpen && <div className="p-3 bg-black/30">{children}</div>}
    </div>
  );
}
