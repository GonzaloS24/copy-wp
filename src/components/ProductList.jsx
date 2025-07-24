import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductService } from '../services/productService';
import { ProductUtils } from '../utils/productUtils';

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const wpProducts = await ProductService.getWpSalesProducts();
        
        setProducts(wpProducts.map((product, index) => ({
          id: product.var_ns || index,
          title: extractProductName(product.value) || `Producto ${index}`,
          name: product.name?.replace('[Producto Ventas Wp] ', '') || `producto-${index}`,
          type: "Producto WP",
          price: extractPrice(product.value) || "$0.00",
          image: generateProductImage(index),
          alt: extractProductName(product.value) || `Producto ${index}`,
          rawData: product
        })));
      } catch (err) {
        console.error('Error loading products:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const extractProductName = (productValue) => {
    try {
      const parsed = JSON.parse(productValue);
      if (parsed.informacion_de_producto?.nombre) {
        return parsed.informacion_de_producto.nombre;
      }
    } catch (e) {
      console.error('Error parsing product value:', e);
    }
    return null;
  };

  const extractPrice = (productValue) => {
    try {
      const parsed = JSON.parse(productValue);
      if (parsed.informacion_de_producto?.precio_del_producto) {
        return `$${parsed.informacion_de_producto.precio_del_producto}`;
      }
    } catch (e) {
      console.error('Error parsing product value:', e);
    }
    return null;
  };

  const generateProductImage = (index) => {
    const colors = ['334155', 'd4af37', '059669', 'dc2626', '7c3aed'];
    const color = colors[index % colors.length];
    return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='%23${color}'/><rect x='50' y='50' width='100' height='100' rx='12' fill='%23fff'/></svg>`;
  };

  const getExampleProducts = () => {
    const mockData = ProductUtils.getMockProducts();
    return mockData.data.map((product, index) => ({
      id: product.var_ns || index,
      title: extractProductName(product.value) || `Producto ${index}`,
      name: product.name.replace('[Producto Ventas Wp] ', ''),
      type: "Producto WP",
      price: extractPrice(product.value) || "$0.00",
      image: generateProductImage(index),
      alt: extractProductName(product.value) || `Producto ${index}`,
      rawData: product
    }));
  };

  const handleAddNewProduct = () => {
    navigate('/agregando');
  };

  const handleConfigureProduct = (productName) => {
    const formattedName = productName
      .toLowerCase()
      .replace(/\s+/g, '-') 
      .replace(/[^a-z0-9-]/g, ''); 
    
    navigate(`/${formattedName}`);
  };

  if (isLoading) {
    return (
      <div className="w-full p-8 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-8 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
          <h3 className="text-lg font-semibold text-red-500 mb-2">Error al cargar productos</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Mostrando productos de ejemplo</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 bg-white p-8 rounded-xl shadow-md">
      <div
        onClick={handleAddNewProduct}
        className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]
                   transition-all duration-200 border-2 border-dashed border-blue-300 cursor-pointer
                   hover:transform hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]
                   hover:border-blue-400 hover:bg-blue-50/30 flex flex-col items-center justify-center
                   min-h-[300px] group"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center
                         group-hover:bg-blue-200 transition-colors duration-200">
            <svg 
              className="w-8 h-8 text-blue-500 group-hover:text-blue-600 transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="text-blue-500 font-medium text-sm group-hover:text-blue-600 transition-colors duration-200">
            Agregar nuevo producto
          </p>
        </div>
      </div>

      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]
                     transition-all duration-200 border border-slate-200 cursor-pointer
                     hover:transform hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
        >
          <div className="w-full h-[150px] rounded-lg overflow-hidden mb-4 bg-gray-100
                          flex items-center justify-center">
            <img
              src={product.image}
              alt={product.alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-2 leading-tight
                          h-[2.6rem] overflow-hidden line-clamp-2">
              {product.title}
            </h3>
            <p className="text-xs text-slate-500 mb-1">
              {product.type}
            </p>
            <p className="text-sm font-semibold text-slate-700">
              Precio: {product.price}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-3 rounded"
              onClick={() => handleConfigureProduct(product.name)}
            >
              Configurar
            </button>
            <button className="bg-none border-none text-xl text-slate-300 cursor-pointer
                              transition-all duration-200 hover:text-red-500 hover:scale-110">
              ♡
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};