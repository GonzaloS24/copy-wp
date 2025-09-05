
import React, { useState, useRef } from 'react';
//import { useProduct } from '../../../context/ProductContext';
import { uploadImage } from '../../../../services/uploadImageService';
import { MediaPreview } from './MediaPreview';

const allowedFileTypes = {
  'image/jpeg': { extensions: ['.jpg', '.jpeg'], icon: '📷', label: 'JPEG' },
  'image/png': { extensions: ['.png'], icon: '🖼️', label: 'PNG' },
  'video/mp4': { extensions: ['.mp4'], icon: '🎬', label: 'MP4' },
  'application/pdf': { extensions: ['.pdf'], icon: '📄', label: 'PDF' },
  'audio/mp3': { extensions: ['.mp3'], icon: '🎵', label: 'MP3' },
  'audio/wav': { extensions: ['.wav'], icon: '🎤', label: 'WAV' },
  'audio/ogg': { extensions: ['.ogg'], icon: '🔊', label: 'OGG' },
  'audio/mpeg': { extensions: ['.mp3'], icon: '🎵', label: 'MP3' },
};

const getMediaTypeFromFile = (file) => {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('video/')) return 'video';
  if (file.type.startsWith('audio/')) return 'audio';
  return 'document';
};

const getIconForMediaType = (type) => {
  if (type === 'image') return '🖼️';
  if (type === 'video') return '🎥';
  if (type === 'audio') return '🎵';
  if (type === 'document') return '📄';
  return '';
};

export const MediaManager = ({ mediaItems, updateProductData, parentData, showFileTypesModal, setShowFileTypesModal }) => {
  const [uploadingItems, setUploadingItems] = useState({});
  const [uploadErrors, setUploadErrors] = useState({});
  const fileInputRef = useRef(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const validateFile = (file) => {
    if (!allowedFileTypes[file.type]) {
      return `Tipo de archivo no permitido: ${file.type}`;
    }
    const maxSize = 15 * 1024 * 1024; 
    if (file.size > maxSize) {
      return `Archivo demasiado grande. Tamaño máximo: 15MB`;
    }
    return null;
  };

  const handleFileUpload = async (file, itemId) => {
    const validationError = validateFile(file);
    if (validationError) {
      setUploadErrors(prev => ({ ...prev, [itemId]: validationError }));
      return;
    }

    setUploadingItems(prev => ({ ...prev, [itemId]: true }));
    setUploadErrors(prev => ({ ...prev, [itemId]: null }));

    try {
      const result = await uploadImage.uploadFile(file, file.name);
      const mediaType = getMediaTypeFromFile(file);
      const icon = getIconForMediaType(mediaType);

      const updatedMediaItems = mediaItems.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            filled: true,
            type: mediaType,
            icon: icon,
            url: result.data.url,
            fileName: result.data.originalFileName,
            fileSize: result.data.fileSize,
            contentType: result.data.contentType
          };
        }
        return item;
      });

      updateProductData('messageWel', {
        ...parentData,
        mediaItems: updatedMediaItems
      });

    } catch (error) {
      setUploadErrors(prev => ({
        ...prev,
        [itemId]: error.message || 'Error al subir el archivo'
      }));
    } finally {
      setUploadingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleMediaSlotClick = (id) => {
    setSelectedItemId(id);
    fileInputRef.current?.click();
  };

  const addMediaSlotAndUpload = () => {
    const newId = mediaItems.length > 0
      ? Math.max(...mediaItems.map(item => item.id)) + 1
      : 1;

    const newMediaItem = { id: newId, type: '', icon: '', filled: false };

    updateProductData('messageWel', {
      ...parentData,
      mediaItems: [
        ...mediaItems,
        newMediaItem
      ]
    });
    setSelectedItemId(newId);
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file && selectedItemId) {
      handleFileUpload(file, selectedItemId);
    }
    event.target.value = '';
    setSelectedItemId(null);
  };

  const removeMediaItem = (id) => {
    const updatedMediaItems = mediaItems.filter(item => item.id !== id);
    updateProductData('messageWel', {
      ...parentData,
      mediaItems: updatedMediaItems
    });
    setUploadErrors(prev => ({ ...prev, [id]: null }));
  };

  const renderMediaSlots = () => {
    const slots = [];
    mediaItems?.forEach((item) => {
      const isUploading = uploadingItems[item.id];
      const hasError = uploadErrors[item.id];
      slots.push(
        <div key={item.id} className="relative group">
          <div
            className={`
              aspect-square border-2 rounded-xl flex items-center justify-center cursor-pointer
              min-h-20 relative overflow-hidden transition-all duration-200
              ${item.filled
                ? 'bg-white border-slate-200 border-solid hover:border-sky-300'
                : hasError
                ? 'bg-red-50 border-red-300 border-dashed hover:border-red-400'
                : 'bg-white border-slate-200 border-dashed hover:border-sky-300 hover:bg-sky-50'
              }
              ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onClick={() => !isUploading && handleMediaSlotClick(item.id)}
          >
            {isUploading ? (
              <div className="flex flex-col items-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mb-2"></div>
                <div className="text-xs text-slate-500 text-center">
                  Subiendo...
                </div>
              </div>
            ) : item.filled ? (
              <MediaPreview item={item} />
            ) : (
              <div className="text-3xl text-slate-400 font-light group-hover:text-sky-400 transition-colors">
                +
              </div>
            )}
          </div>
          {item.filled && !isUploading && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeMediaItem(item.id);
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100 z-10"
            >
              ×
            </button>
          )}
          {hasError && (
            <div className="absolute -bottom-2 left-0 right-0 bg-red-500 text-white text-xs p-1 rounded text-center z-10">
              Error
            </div>
          )}
        </div>
      );
    });

    while (slots.length < 7) {
      slots.push(
        <div
          key={`empty-${slots.length}`}
          className="
            aspect-square border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center
            cursor-pointer min-h-20 bg-slate-50 hover:bg-slate-100 hover:border-sky-300 transition-all duration-200 group
          "
          onClick={addMediaSlotAndUpload}
        >
          <div className="text-4xl text-slate-400 font-light group-hover:text-sky-400 transition-colors">
            +
          </div>
        </div>
      );
    }
    return slots;
  };

  const FileTypesModal = ({ show, onClose }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Tipos de archivos permitidos
          </h3>
          <div className="space-y-3 mb-6">
            <div>
              <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                🖼️ Imágenes
              </h4>
              <div className="text-sm text-slate-600 space-y-1 ml-6">
                <p>• JPEG (.jpg, .jpeg)</p>
                <p>• PNG (.png)</p>
                <p>• WebP (.webp)</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                🎥 Videos
              </h4>
              <div className="text-sm text-slate-600 ml-6">
                <p>• MP4 (.mp4)</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                🎵 Audio
              </h4>
              <div className="text-sm text-slate-600 space-y-1 ml-6">
                <p>• MP3 (.mp3)</p>
                <p>• WAV (.wav)</p>
                <p>• OGG (.ogg)</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                📄 Documentos
              </h4>
              <div className="text-sm text-slate-600 ml-6">
                <p>• PDF (.pdf)</p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-amber-800">
              <strong>Tamaño máximo:</strong> 15MB por archivo
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    );
  };

 return (
    <div className="mb-6 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <label className="text-base font-semibold text-slate-700">
          Contenido multimedia inicial
        </label>
        <button
          onClick={() => setShowFileTypesModal(true)}
          className="text-sm text-sky-600 underline hover:text-sky-700 transition-colors"
        >
          Ver tipos permitidos
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4 mt-3">
        {renderMediaSlots()}
      </div>
      {Object.entries(uploadErrors).some(([_, error]) => error) && (
        <div className="mt-4 space-y-2">
          {Object.entries(uploadErrors).map(([itemId, error]) =>
            error && (
              <div key={itemId} className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">
                  <strong>Error en archivo {itemId}:</strong> {error}
                </p>
              </div>
            )
          )}
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
        accept={Object.keys(allowedFileTypes).join(',')}
      />
      <FileTypesModal show={showFileTypesModal} onClose={() => setShowFileTypesModal(false)} />
    </div>
  );
};