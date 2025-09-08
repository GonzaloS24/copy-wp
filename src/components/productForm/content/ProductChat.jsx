import { useParams } from "react-router-dom";
import { ApiChatProvider } from "../../apichat/ApiChatContext";
import ApiChat from "../../apichat/ApiChat";
import { ASSISTANT_TEMPLATE_NS } from "../../../utils/constants/assistants";
import { NavigationBlockProvider } from "../../../context/NavigationBlockContext";
import { useVerificationExit } from "../../../hooks/useVerificationExit";

export const ProductChat = () => {
  const { productName } = useParams();
  const WHATSAPP_SALES = ASSISTANT_TEMPLATE_NS.WHATSAPP_SALES;

  const isCreatingProduct = !productName;

  // Extraer productId
  const extractProductId = (productName) => {
    if (!productName) return null;
    if (/^\d+$/.test(productName)) return productName;
    const match = productName.match(/\d+/);
    return match ? match[0] : null;
  };

  const productId = extractProductId(productName);

  if (isCreatingProduct) {
    return (
      <div className="relative">
        {/* Mensaje explicativo */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-amber-600 mr-3 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <h3 className="text-amber-800 font-semibold mb-1">
                Chat de prueba no disponible
              </h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                Debes <strong>crear</strong> un producto primero o{" "}
                <strong>editar</strong> uno existente para poder probar tu
                asistente. Guarda tu producto y luego podrás probarlo aquí.
              </p>
            </div>
          </div>
        </div>

        {/* Chat deshabilitado */}
        <div className="opacity-50 pointer-events-none">
          <ApiChatProvider>
            <ApiChat title="Prueba tu asistente" />
          </ApiChatProvider>
        </div>
      </div>
    );
  }

  // Si estamos editando un producto existente, mostrar chat normal con productId
  return (
    <NavigationBlockWrapper>
      <ApiChatProvider
        ASSISTANT_TEMPLATE_NS={WHATSAPP_SALES}
        productId={productId}
      >
        <ApiChatWithProductId productId={productId} />
      </ApiChatProvider>
    </NavigationBlockWrapper>
  );
};

// Wrapper para proveer contexto de navegación
const NavigationBlockWrapper = ({ children }) => {
  const { blockProgrammaticNavigation } = useVerificationExit();
  
  return (
    <NavigationBlockProvider blockProgrammaticNavigation={blockProgrammaticNavigation}>
      {children}
    </NavigationBlockProvider>
  );
};

// Componente separado para manejar el chat habilitado con productId
const ApiChatWithProductId = ({ productId }) => {
  return <ApiChat title="Prueba tu asistente" productId={productId} />;
};