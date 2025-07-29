import { ConfirmMessages } from "../confirmations/subsections/ConfirmMessages";
import { DirectionAnalisis } from "./subsections/DirectionAnalisis";
import { ShippingTimes } from "./subsections/ShippingTimes";
import { OrderValidations } from "./subsections/OrderValidations";

export const subsectionsData = [
  {
    id: "confirmMessages",
    label: "Mensajes de confirmación",
    component: <ConfirmMessages />,
  },
  {
    id: "shippingTimes",
    label: "Tiempos de envío",
    component: <ShippingTimes />,
  },
  {
    id: "directionAnalisis",
    label: "Análisis de dirección",
    component: <DirectionAnalisis />,
  },
  {
    id: "orderValidations",
    label: "Validaciones de la orden",
    component: <OrderValidations />,
  },
];
