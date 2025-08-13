import { ConfirmMessages } from "./subsections/ConfirmMessages";
import { DirectionAnalisis } from "./subsections/DirectionAnalisis";
import { ShippingTimes } from "./subsections/ShippingTimes";
import { OrderValidations } from "./subsections/OrderValidations";

export const subsectionsData = [
  {
    id: "confirmMessages",
    label: "Mensajes de confirmación",
    component: (formData, setFormData, flowsState, setFlowsState) => (
      <ConfirmMessages
        formData={formData}
        setFormData={setFormData}
        flowsState={flowsState}
        setFlowsState={setFlowsState}
      />
    ),
  },
  {
    id: "shippingTimes",
    label: "Tiempos de envío",
    component: (formData, setFormData) => (
      <ShippingTimes formData={formData} setFormData={setFormData} />
    ),
  },
  {
    id: "directionAnalisis",
    label: "Análisis de dirección",
    component: (formData, setFormData) => (
      <DirectionAnalisis formData={formData} setFormData={setFormData} />
    ),
  },
  {
    id: "orderValidations",
    label: "Validaciones de la orden",
    component: (formData, setFormData) => (
      <OrderValidations formData={formData} setFormData={setFormData} />
    ),
  },
  {
    id: "prepayment",
    emoji: "🚧",
    label: "Pago Anticipado",
    comingSoon: true,
    badgeText: "Próximamente",
    component: (_, __) => <></>,
  },
];
