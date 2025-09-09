import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ProductService } from "../services/productService";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import { EmptyState } from "./states/EmptyStatet";
import { ErrorState } from "./states/ErrorState";
import { showDeleteConfirm } from "../utils/sweetAlerts/sweetAlertUtils";
import { showPromiseToast } from "../utils/toastNotifications";
import { ToastContainer } from "react-toastify";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const productsData = await ProductService.getProducts();
      setProducts(productsData || []);
    } catch (err) {
      console.error("Error loading products:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddNewProduct = () => navigate("/agregando");

  const handleConfigureProduct = (productId) =>
    navigate(`/producto/${productId}`);

  const handleDeleteProduct = async (productId) => {
    const confirmation = await showDeleteConfirm(
      "¿Deseas eliminar este producto?",
      "No podrás recuperarlo después de eliminarlo."
    );

    if (confirmation.isConfirmed) {
      try {
        showPromiseToast(ProductService.deleteProduct(productId), {
          pending: "Eliminando producto...",
          success: "Producto eliminado exitosamente.",
          error:
            "Error al eliminar el producto. Por favor, inténtalo de nuevo.",
        });

        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      } catch (err) {
        console.error("Error deleting product:", err);
        alert(
          "Hubo un error al eliminar el producto. Por favor, inténtalo de nuevo."
        );
      }
    }
  };

  const handleRetry = () => {
    fetchProducts();
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-8">
        {[...Array(6)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRetry} />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No hay productos"
        description="Aún no has creado ningún producto para tu tienda."
        actionText="Agregar primer producto"
        onAction={handleAddNewProduct}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-8">
      <AddProductCard onClick={handleAddNewProduct} />

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onConfigure={() => handleConfigureProduct(product.id)}
          onDelete={() => handleDeleteProduct(product.id)}
        />
      ))}
    </div>
  );
};

const AddProductCard = ({ onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl p-4 shadow-sm transition-all duration-200 
               border-2 border-dashed border-blue-300 cursor-pointer hover:border-blue-400 
               hover:bg-blue-50/30 flex flex-col items-center justify-center min-h-[300px] group"
  >
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200">
        <svg
          className="w-8 h-8 text-blue-500 group-hover:text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
      <p className="text-blue-500 font-medium text-sm group-hover:text-blue-600">
        Agregar nuevo producto
      </p>
    </div>

    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      progressStyle={{
        backgroundColor: "#e5e7eb",
      }}
      closeButtonStyle={{
        color: "#6b7280",
      }}
    />
  </div>
);
