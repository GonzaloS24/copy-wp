import React, { useState } from "react";

export const ProductCard = ({ product, onConfigure, onDelete }) => {
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const generatePlaceholder = (text) => {
    const encodedText = encodeURIComponent(text.substring(0, 20));
    return `data:image/svg+xml;charset=UTF-8,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial,sans-serif' font-size='16' fill='%23374151' text-anchor='middle' dy='.3em'%3E${encodedText}%3C/text%3E%3C/svg%3E`;
  };

  const handleImageError = (e) => {
    if (retryCount < 1) {
      setRetryCount((prev) => prev + 1);
      return;
    }

    setImageError(true);
    e.target.src = generatePlaceholder(product.name);
  };

  const getImageSrc = () => {
    if (imageError) {
      return generatePlaceholder(product.name);
    }

    if (!product.image || product.image.trim() === "") {
      return generatePlaceholder(product.name);
    }

    return product.image;
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm transition-all duration-200 border border-slate-200 hover:shadow-md">
      <div className="w-full aspect-square rounded-lg overflow-hidden mb-4 bg-gray-100">
        <img
          src={getImageSrc()}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
          onLoad={() => {
            setImageError(false);
            setRetryCount(0);
          }}
        />
      </div>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-2 leading-tight line-clamp-2">
          {product.name}
        </h3>
        <div className="flex justify-between items-center text-xs">
          <span
            className={`px-2 py-1 rounded-full ${
              product.status === "activo"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {product.status === "activo" ? "Activo" : "Inactivo"}
          </span>
          <span className="text-slate-500">{product.type}</span>
        </div>
        <p className="text-sm font-semibold text-slate-700 mt-2">
          {product.price}
        </p>
      </div>
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-4 rounded"
        onClick={onConfigure}
      >
        Configurar
      </button>
      <button
        className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white text-xs py-2 px-4 rounded"
        onClick={onDelete}
      >
        Eliminar
      </button>
    </div>
  );
};

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 animate-pulse">
    <div className="w-full aspect-square rounded-lg bg-gray-200 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-3 bg-gray-200 rounded mb-3 w-3/4"></div>
    <div className="flex justify-between mb-4">
      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
    </div>
    <div className="h-8 bg-gray-200 rounded"></div>
  </div>
);
