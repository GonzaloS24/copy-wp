import { useState, useRef, useEffect } from "react";
import { uploadImage } from "../../../services/uploadImageService";
import {
  allowedFileTypes,
  getMediaTypeFromFile,
  getIconForMediaType,
} from "../../../utils/ventasWp/multimediaTypes";
import { showToast } from "../../../utils/sweetAlerts/sweetAlertUtils";

export const MultimediaUploadModal = ({ isOpen, onClose }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [showFileTypesModal, setShowFileTypesModal] = useState(false);
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);
  const fileTypesModalRef = useRef(null);

  // Manejar click fuera del modal principal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen && !showFileTypesModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, showFileTypesModal, onClose]);

  // Manejar click fuera del modal de tipos de archivos
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fileTypesModalRef.current && !fileTypesModalRef.current.contains(event.target)) {
        setShowFileTypesModal(false);
      }
    };

    if (showFileTypesModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFileTypesModal]);

  if (!isOpen) return null;

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

  const handleFileUpload = async (file) => {
    const validationError = validateFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const result = await uploadImage.uploadFile(file, file.name);
      const mediaType = getMediaTypeFromFile(file);
      const icon = getIconForMediaType(mediaType);

      const newFile = {
        id: Date.now(),
        type: mediaType,
        icon: icon,
        url: result.data.url,
        fileName: result.data.originalFileName,
        fileSize: result.data.fileSize,
        contentType: result.data.contentType,
      };

      setUploadedFiles((prev) => [...prev, newFile]);
    } catch (error) {
      setUploadError(error.message || "Error al subir el archivo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
    event.target.value = "";
  };

  const removeFile = (id) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    showToast("success", "URL copiada correctamente", 2000);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const FileTypesModal = ({ show, onClose }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
        <div ref={fileTypesModalRef} className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Creador de enlaces multimedia
            </h2>
            <p className="text-slate-600 mt-1">
              Sube archivos y obtén enlaces para usar en tus prompts
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Upload Area */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <label className="text-base font-semibold text-slate-700">
                Subir archivos multimedia
              </label>
              <button
                onClick={() => setShowFileTypesModal(true)}
                className="text-sm text-sky-600 underline hover:text-sky-700 transition-colors"
              >
                Ver tipos permitidos
              </button>
            </div>

            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                isUploading
                  ? "border-slate-300 bg-slate-50 cursor-not-allowed"
                  : "border-sky-300 bg-sky-50 hover:border-sky-400 hover:bg-sky-100"
              }`}
              onClick={() => !isUploading && fileInputRef.current?.click()}
            >
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mb-4"></div>
                  <p className="text-slate-600">Subiendo archivo...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="text-6xl text-sky-500 mb-4">+</div>
                  <p className="text-slate-700 font-medium mb-2">
                    Haz clic para subir un archivo
                  </p>
                  <p className="text-sm text-slate-500">
                    O arrastra y suelta aquí
                  </p>
                </div>
              )}
            </div>

            {uploadError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">
                  <strong>Error:</strong> {uploadError}
                </p>
              </div>
            )}
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4">
                Archivos subidos ({uploadedFiles.length})
              </h3>

              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="bg-slate-50 border border-slate-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{file.icon}</div>
                        <div>
                          <p className="font-medium text-slate-700">
                            {file.fileName}
                          </p>
                          <p className="text-sm text-slate-500">
                            {file.type} • {formatFileSize(file.fileSize)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyToClipboard(file.url)}
                          className="px-3 py-1 bg-sky-500 text-white text-sm rounded hover:bg-sky-600 transition-colors"
                        >
                          Copiar URL
                        </button>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="text-xs text-slate-500 block mb-1">
                        URL del archivo:
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          value={file.url}
                          readOnly
                          className="flex-1 px-3 py-4 border border-slate-300 rounded-l text-sm bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                        />
                        <button
                          onClick={() => copyToClipboard(file.url)}
                          className="px-3 py-1 bg-slate-200 border border-l-0 border-slate-300 rounded-r text-sm hover:bg-slate-300 transition-colors"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-600">
              Copia las URLs y úsalas en tus prompts para incluir contenido
              multimedia
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
        accept={Object.keys(allowedFileTypes).join(",")}
      />

      {/* File Types Modal */}
      <FileTypesModal
        show={showFileTypesModal}
        onClose={() => setShowFileTypesModal(false)}
      />
    </div>
  );
};