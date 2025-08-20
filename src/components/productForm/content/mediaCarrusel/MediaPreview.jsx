// src/components/ProductMessageWel/MediaPreview.jsx
import React from 'react';

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const baseStyles = "w-full h-full object-cover rounded-lg";

export const MediaPreview = ({ item }) => {
  const { type, url, fileName, fileSize } = item;

  switch (type) {
    case 'image':
      return (
        <div className="w-full h-full relative group">
          <img
            src={url}
            alt={fileName}
            className={`${baseStyles} group-hover:opacity-90 transition-opacity`}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMyIgeT0iMyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiIgc3Ryb2tlPSIjOTY5Njk2IiBzdHJva2Utd2lkdGg9IjIiLz4KPGNpcmNsZSBjeD0iOC41IiBjeT0iOC41IiByPSIxLjUiIGZpbGw9IiM5Njk2OTYiLz4KPHBhdGggZD0ibTIxIDEyLTMuMy0zLjMtMy03IDMuMyAzLjMgMy43IDNjLjEuMS4xLjMuMC40TDIxIDEyWk0zIDIxbDIuMS0uOC0xLjEtMS4xYy0uMS0uMS0uMS0uMyAwLS40bC43LS43IDIuMS4uOCIgc3Ryb2tlPSIjOTY5Njk2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-800 max-w-full truncate">
                {fileName}
              </div>
            </div>
          </div>
        </div>
      );
    case 'video':
      return (
        <div className="w-full h-full relative bg-gray-900 rounded-lg overflow-hidden group">
          <video
            src={url}
            className={baseStyles}
            preload="metadata"
            muted
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 rounded-full p-3 group-hover:bg-opacity-70 transition-all">
              <div className="w-6 h-6 text-white flex items-center justify-center">
                ▶️
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2">
            <div className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded truncate">
              🎬 {fileName}
            </div>
            {fileSize && (
              <div className="text-white text-xs mt-1 opacity-75">
                {formatFileSize(fileSize)}
              </div>
            )}
          </div>
        </div>
      );
    case 'audio':
      return (
        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-3 flex flex-col items-center justify-center relative group">
          <div className="text-3xl mb-2">🎵</div>
          <div className="text-center">
            <div className="text-xs font-semibold text-gray-800 truncate max-w-full mb-1">
              {fileName}
            </div>
            {fileSize && (
              <div className="text-xs text-gray-600">
                {formatFileSize(fileSize)}
              </div>
            )}
          </div>
          {url && (
            <audio
              src={url}
              controls
              className="w-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ height: '30px' }}
            />
          )}
          <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1">
            <div className="w-4 h-4 flex items-center justify-center text-xs">
              🔊
            </div>
          </div>
        </div>
      );
    case 'document':
      return (
        <div className="w-full h-full bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-3 flex flex-col items-center justify-center relative group border border-red-100">
          <div className="text-3xl mb-2">📄</div>
          <div className="text-center">
            <div className="text-xs font-semibold text-gray-800 truncate max-w-full mb-1">
              {fileName}
            </div>
            {fileSize && (
              <div className="text-xs text-gray-600">
                {formatFileSize(fileSize)}
              </div>
            )}
            <div className="text-xs text-red-600 font-medium mt-1">
              PDF
            </div>
          </div>
          <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1">
            <div className="w-4 h-4 flex items-center justify-center text-xs">
              📋
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full h-full bg-gray-100 rounded-lg flex flex-col items-center justify-center p-2">
          <div className="text-2xl mb-1">📎</div>
          <div className="text-xs text-gray-600 truncate max-w-full text-center">
            {fileName}
          </div>
          {fileSize && (
            <div className="text-xs text-gray-500 mt-1">
              {formatFileSize(fileSize)}
            </div>
          )}
        </div>
      );
  }
};