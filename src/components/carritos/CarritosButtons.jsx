import { useState } from "react";
import { useCarritos } from "../../context/CarritosContext";
import { CarritoService } from "../../services/carritos";
import { mapCarritoDataToApiFormat } from "../../utils/carritos/carritoDataMapper";
import { SaveButton } from "../buttons/SaveButton";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/toastNotifications";

export const CarritosButtons = () => {
  const { carritoData } = useCarritos();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);

    try {
      const mappedData = mapCarritoDataToApiFormat(carritoData);
      await CarritoService.saveConfiguration(mappedData);

      showSuccessToast("¡Configuración de carritos guardada exitosamente!");
    } catch (error) {
      console.error("Error al guardar configuración:", error);
      showErrorToast(`Error al guardar: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SaveButton
      isLoading={isLoading}
      onClick={handleSave}
      defaultText="Guardar configuración"
      loadingText="Guardando..."
      className="fixed bottom-8 left-80"
    />
  );
};
