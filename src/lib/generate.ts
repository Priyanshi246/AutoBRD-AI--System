import { supabase } from './supabase';

interface GenerateBRDOptions {
  inputText: string;
  language?: string;
  onProgress?: (step: string, progress: number) => void;
}

export async function generateBRD({ inputText, language = 'en', onProgress }: GenerateBRDOptions) {
  const steps = [
    { text: 'Analyzing input...', progress: 10 },
    { text: 'Detecting language...', progress: 20 },
    { text: 'Extracting requirements...', progress: 35 },
    { text: 'Generating user stories...', progress: 50 },
    { text: 'Building timeline...', progress: 65 },
    { text: 'Recommending tech stack...', progress: 75 },
    { text: 'Designing architecture...', progress: 85 },
    { text: 'Validating logic...', progress: 92 },
    { text: 'Finalizing BRD...', progress: 100 },
  ];

  onProgress?.(steps[0].text, steps[0].progress);

  const { data, error } = await supabase.functions.invoke('generate-brd', {
    body: { input_text: inputText, language },
  });

  if (error) {
    throw new Error(error.message || 'Failed to generate BRD');
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data?.brd as BRDResult;
}

export interface BRDResult {
  overview: {
    projectName: string;
    description: string;
    targetUsers: string;
    businessValue: string;
  };
  objectives: string[];
  functionalRequirements: Array<{
    name: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
  }>;
  nonFunctionalRequirements: Array<{
    name: string;
    description: string;
    category: string;
  }>;
  userStories: Array<{
    id: string;
    story: string;
    acceptance: string[];
    confidence: number;
  }>;
  userRoles: Array<{
    role: string;
    description: string;
    permissions: string[];
  }>;
  architecture: {
    components: string[];
    dataFlow: string;
    diagramDescription: string;
  };
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    thirdParty: string[];
  };
  timeline: Array<{
    phase: string;
    duration: string;
    tasks: string[];
  }>;
  riskAnalysis: Array<{
    risk: string;
    impact: string;
    mitigation: string;
  }>;
  successMetrics: Array<{
    metric: string;
    target: string;
  }>;
}

export async function saveProject(userId: string, projectName: string, inputText: string, brd: BRDResult) {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      user_id: userId,
      project_name: projectName || brd.overview.projectName,
      input_text: inputText,
      generated_brd: brd as any,
      status: 'completed',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserProjects(userId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteProject(projectId: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId);

  if (error) throw error;
}

export async function updateProject(projectId: string, updates: { project_name?: string; generated_brd?: any; status?: string }) {
  const { error } = await supabase
    .from('projects')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', projectId);

  if (error) throw error;
}
