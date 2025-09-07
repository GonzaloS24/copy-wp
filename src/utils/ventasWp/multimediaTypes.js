export const allowedFileTypes = {
  'image/jpeg': { extensions: ['.jpg', '.jpeg'], icon: '📷', label: 'JPEG' },
  'image/png': { extensions: ['.png'], icon: '🖼️', label: 'PNG' },
  'video/mp4': { extensions: ['.mp4'], icon: '🎬', label: 'MP4' },
  'application/pdf': { extensions: ['.pdf'], icon: '📄', label: 'PDF' },
  'audio/mp3': { extensions: ['.mp3'], icon: '🎵', label: 'MP3' },
  'audio/wav': { extensions: ['.wav'], icon: '🎤', label: 'WAV' },
  'audio/ogg': { extensions: ['.ogg'], icon: '🔊', label: 'OGG' },
  'audio/mpeg': { extensions: ['.mp3'], icon: '🎵', label: 'MP3' },
};

export const getMediaTypeFromFile = (file) => {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('video/')) return 'video';
  if (file.type.startsWith('audio/')) return 'audio';
  return 'document';
};

export const getIconForMediaType = (type) => {
  if (type === 'image') return '🖼️';
  if (type === 'video') return '🎥';
  if (type === 'audio') return '🎵';
  if (type === 'document') return '📄';
  return '';
};


export const ALLOWED_EXTENSIONS = [
  '.jpg', '.jpeg', '.png', '.mp4', '.pdf', '.mp3', '.wav', '.ogg', '.mpeg'
];

