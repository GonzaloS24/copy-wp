import { TrackMessages } from "./subsections/TrackMessages";
import { ShippingTimes } from "./subsections/ShippingTimes";
import { SalesHooks } from "./subsections/SalesHooks";

export const subsectionsData = [
  {
    id: "trackMessages",
    label: "Mensajes de seguimiento",
    component: (formData, setFormData, flowsState, setFlowsState) => (
      <TrackMessages
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
    id: "salesHooks",
    label: "Ganchos de venta",
    component: (formData, setFormData) => (
      <SalesHooks formData={formData} setFormData={setFormData} />
    ),
  },
];
