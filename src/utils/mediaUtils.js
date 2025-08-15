
export const MAX_FILE_SIZE_MB = 100;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const allowedFileTypes = {
  'image/jpeg': { extensions: ['.jpg', '.jpeg'] },
  'image/png': { extensions: ['.png'] },
  'image/webp': { extensions: ['.webp'] },
  'video/mp4': { extensions: ['.mp4'] },
  'application/pdf': { extensions: ['.pdf'] },
  'audio/mp3': { extensions: ['.mp3'] },
  'audio/wav': { extensions: ['.wav'] },
  'audio/ogg': { extensions: ['.ogg'] }
};

export const validateFile = (file) => {
  if (!allowedFileTypes[file.type]) {
    return `Tipo de archivo no permitido: ${file.type}`;
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `Archivo demasiado grande. Máximo: ${MAX_FILE_SIZE_MB}MB`;
  }
  return null;
};

export const getMediaTypeFromFile = (file) => {
  const type = file.type;
  if (type.startsWith('image/')) return 'image';
  if (type.startsWith('video/')) return 'video';
  if (type.startsWith('audio/')) return 'audio';
  if (type === 'application/pdf') return 'document';
  return 'default';
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};