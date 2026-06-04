import { supabase } from './supabase';

export interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export async function uploadFile(userId: string, projectId: string, file: File): Promise<UploadedFile> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${file.name}`;
  const filePath = `${userId}/${projectId}/${fileName}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('uploads')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('uploads')
    .getPublicUrl(filePath);

  // Determine file type
  const fileType = file.type.startsWith('image/') ? 'image'
    : file.type.startsWith('audio/') ? 'audio'
    : file.type === 'application/pdf' ? 'pdf'
    : 'text';

  // Save file metadata to database
  const { data, error: dbError } = await supabase
    .from('files')
    .insert({
      project_id: projectId,
      user_id: userId,
      file_url: publicUrl,
      file_type: fileType,
      file_name: file.name,
      file_size: file.size,
    })
    .select()
    .single();

  if (dbError) throw dbError;

  return {
    id: data.id,
    name: file.name,
    url: publicUrl,
    type: fileType,
    size: file.size,
  };
}

export async function getProjectFiles(projectId: string): Promise<UploadedFile[]> {
  const { data, error } = await supabase
    .from('files')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data || []).map(f => ({
    id: f.id,
    name: f.file_name,
    url: f.file_url,
    type: f.file_type,
    size: f.file_size,
  }));
}

export async function deleteFile(fileId: string): Promise<void> {
  const { error } = await supabase
    .from('files')
    .delete()
    .eq('id', fileId);

  if (error) throw error;
}
