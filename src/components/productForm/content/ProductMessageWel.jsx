import React, { useState, useRef } from 'react';
import { useProduct } from '../../../context/ProductContext';
import { uploadImage } from '../../../services/uploadImageService';

export const ProductMessageWel = () => {
  const { productData, updateProductData, validationState, updateValidationState } = useProduct();
  const [showFileTypesModal, setShowFileTypesModal] = useState(false);
  const [uploadingItems, setUploadingItems] = useState({});
  const [uploadErrors, setUploadErrors] = useState({});
  const fileInputRef = useRef(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const initialMediaItems = [
    { id: 1, type: 'image', icon: '🖼️', filled: false },
    { id: 2, type: 'video', icon: '🎥', filled: false },
    { id: 3, type: 'audio', icon: '🎵', filled: false },
  ];

  const messageWelData = productData.messageWel || {
    formData: {
      initialMessage: '',
      entryQuestion: ''
    },
    // Initialize with the pre-filled slots, and other mediaItems that might exist
    mediaItems: productData.messageWel?.mediaItems || initialMediaItems
  };

  const allowedFileTypes = {
    'image/jpeg': { extensions: ['.jpg', '.jpeg'], icon: '', label: 'JPEG' },
    'image/png': { extensions: ['.png'], icon: '', label: 'PNG' },
    'image/webp': { extensions: ['.webp'], icon: '', label: 'WebP' },
    'video/mp4': { extensions: ['.mp4'], icon: '', label: 'MP4' },
    'application/pdf': { extensions: ['.pdf'], icon: '', label: 'PDF' },
    'audio/mp3': { extensions: ['.mp3'], icon: '', label: 'MP3' },
    'audio/wav': { extensions: ['.wav'], icon: '', label: 'WAV' },
    'audio/ogg': { extensions: ['.ogg'], icon: '', label: 'OGG' }
  };

  const requiredFields = ['initialMessage', 'entryQuestion'];

  const isFieldValid = (field) => {
    if (!requiredFields.includes(field)) return true;
    if (!validationState.messageWel.touchedFields?.[field]) return true;
    
    return !!messageWelData.formData?.[field];
  };

  const handleInputChange = (field, value) => {
    if (!validationState.messageWel.touchedFields?.[field]) {
      updateValidationState('messageWel', {
        touchedFields: {
          ...validationState.messageWel.touchedFields,
          [field]: true
        }
      });
    }
    updateProductData('messageWel', {
      formData: {
        ...messageWelData.formData,
        [field]: value
      }
    });
  };

  const handleBlur = (field) => {
    if (!validationState.messageWel.touchedFields?.[field]) {
      updateValidationState('messageWel', {
        touchedFields: {
          ...validationState.messageWel.touchedFields,
          [field]: true
        }
      });
    }
  };

  const validateFile = (file) => {
    // Validar tipo de archivo
    if (!allowedFileTypes[file.type]) {
      return `Tipo de archivo no permitido: ${file.type}`;
    }

    // Validar tamaño (100MB)
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      return `Archivo demasiado grande. Tamaño máximo: 100MB`;
    }

    return null;
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
      
      // La lógica del problema está aquí: se debe encontrar el elemento 
      // y actualizar sus propiedades en el array de mediaItems
      const updatedMediaItems = messageWelData.mediaItems.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            filled: true,
            type: mediaType,
            icon: icon,
            url: result.data.url, // Asegurarse de que la URL se guarde
            fileName: result.data.originalFileName,
            fileSize: result.data.fileSize,
            contentType: result.data.contentType
          };
        }
        return item;
      });

      updateProductData('messageWel', {
        ...messageWelData,
        mediaItems: updatedMediaItems
      });

      console.log('✅ Archivo subido exitosamente:', result);
      
    } catch (error) {
      console.error('Error al subir archivo:', error);
      setUploadErrors(prev => ({ 
        ...prev, 
        [itemId]: error.message || 'Error al subir el archivo'
      }));
    } finally {
      setUploadingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  // Single click handler for all slots
  const handleMediaSlotClick = (id) => {
    setSelectedItemId(id);
    fileInputRef.current?.click();
  };

  const addMediaSlotAndUpload = () => {
    const newId = messageWelData.mediaItems.length > 0 
      ? Math.max(...messageWelData.mediaItems.map(item => item.id)) + 1 
      : 1;
    
    const newMediaItem = { id: newId, type: '', icon: '', filled: false };

    // Update state to add the new slot
    updateProductData('messageWel', {
      ...messageWelData,
      mediaItems: [
        ...messageWelData.mediaItems,
        newMediaItem
      ]
    });
    
    // Set the new item ID and trigger file dialog in a single action
    setSelectedItemId(newId);
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file && selectedItemId) {
      handleFileUpload(file, selectedItemId);
    }
    // Limpiar el input
    event.target.value = '';
    setSelectedItemId(null);
  };

  const removeMediaItem = (id) => {
    const updatedMediaItems = messageWelData.mediaItems.filter(item => item.id !== id);

    updateProductData('messageWel', {
      ...messageWelData,
      mediaItems: updatedMediaItems
    });

    setUploadErrors(prev => ({ ...prev, [id]: null }));
  };

  const renderMediaSlots = () => {
    const slots = [];
    
    // Render filled slots
    messageWelData.mediaItems?.forEach((item) => {
      const isUploading = uploadingItems[item.id];
      const hasError = uploadErrors[item.id];

      slots.push(
        <div key={item.id} className="relative">
          <div
            className={`
              aspect-square border-2 rounded-xl flex items-center justify-center cursor-pointer 
              min-h-20 relative
              ${item.filled 
                ? 'bg-white border-slate-200 border-solid' 
                : hasError
                ? 'bg-red-50 border-red-300 border-dashed'
                : 'bg-white border-slate-200 border-dashed'
              }
              ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onClick={() => !isUploading && handleMediaSlotClick(item.id)}
          >
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="text-xs text-slate-500">Subiendo...</div>
              </div>
            ) : item.filled ? (
              <div className="flex flex-col items-center text-center p-2">
                <div className="text-lg mb-1">
                  {item.icon}
                </div>
                <div className="text-xs text-slate-600 truncate w-full">
                  {item.fileName}
                </div>
              </div>
            ) : (
              <div className="text-3xl text-slate-400 font-light">
                +
              </div>
            )}
          </div>
          
          {/* Only show the X if the item is filled and not being uploaded */}
          {item.filled && !isUploading && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeMediaItem(item.id);
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          )}
          
          {hasError && (
            <div className="absolute -bottom-2 left-0 right-0 bg-red-500 text-white text-xs p-1 rounded text-center">
              Error
            </div>
          )}
        </div>
      );
    });

    // Fill with empty slots up to 7
    while (slots.length < 7) {
      slots.push(
        <div
          key={`empty-${slots.length}`}
          className="
            aspect-square border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center 
            cursor-pointer min-h-20 bg-slate-50 hover:bg-slate-100 transition-colors
          "
          onClick={addMediaSlotAndUpload}
        >
          <div className="text-4xl text-slate-400 font-light">
            +
          </div>
        </div>
      );
    }
    
    return slots;
  };

  const FileTypesModal = () => {
    if (!showFileTypesModal) return null;

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
              <strong>Tamaño máximo:</strong> 100MB por archivo
            </p>
          </div>
          
          <button
            onClick={() => setShowFileTypesModal(false)}
            className="w-full bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="block">
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Mensajes de bienvenida
        </h1>
        
        {/* Mensaje inicial */}
        <div className="mb-6 flex flex-col">
          <label className={`text-base font-semibold mb-2 ${
            !isFieldValid('initialMessage') ? 'text-red-500' : 'text-slate-700'
          }`}>
            Mensaje inicial<span className="text-red-500">*</span>
          </label>
          <textarea
            className={`p-4 border-2 rounded-xl text-base bg-white text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all resize-vertical ${
              !isFieldValid('initialMessage') 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-slate-200 focus:border-sky-500'
            }`}
            rows="3"
            placeholder="¡Hola! Soy Laura, bienvenida a Master Shop."
            value={messageWelData.formData?.initialMessage || ''}
            onChange={(e) => handleInputChange('initialMessage', e.target.value)}
            onBlur={() => handleBlur('initialMessage')}
          />
          {!isFieldValid('initialMessage') && (
            <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>
          )}
        </div>

        <div className="mb-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-base font-semibold text-slate-700">
              Contenido multimedia inicial
            </label>
            <button
              onClick={() => setShowFileTypesModal(true)}
              className="text-sm text-sky-600 underline"
            >
              Ver tipos permitidos
            </button>
          </div>
          <div className="grid grid-cols-7 gap-4 mt-3">
            {renderMediaSlots()}
          </div>
          
          {/* Mostrar errores de upload */}
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
        </div>

        <div className="mb-6 flex flex-col">
          <label className={`text-base font-semibold mb-2 ${
            !isFieldValid('entryQuestion') ? 'text-red-500' : 'text-slate-700'
          }`}>
            Pregunta de entrada<span className="text-red-500">*</span>
          </label>
          <textarea
            className={`p-4 border-2 rounded-xl text-base bg-white text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all resize-vertical ${
              !isFieldValid('entryQuestion') 
                ? 'border-red-500 focus:border-red-500' 
                : 'border-slate-200 focus:border-sky-500'
            }`}
            rows="3"
            placeholder="Gracias por interesarte en nuestro producto. Cuéntanos, ¿desde qué ciudad nos escribes?"
            value={messageWelData.formData?.entryQuestion || ''}
            onChange={(e) => handleInputChange('entryQuestion', e.target.value)}
            onBlur={() => handleBlur('entryQuestion')}
          />
          {!isFieldValid('entryQuestion') && (
            <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>
          )}
          <div className="text-xs text-slate-400 mt-2 leading-relaxed flex items-start gap-1.5">
            <span>¿Sabías que? Los enlaces de audio se convierten automáticamente en notas de voz</span>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
        accept={Object.keys(allowedFileTypes).join(',')}
      />

      <FileTypesModal />
    </div>
  );
};