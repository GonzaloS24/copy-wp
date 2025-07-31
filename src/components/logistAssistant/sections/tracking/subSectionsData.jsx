import { TrackMessages } from "./subsections/TrackMessages";
import { ShippingTimes } from "./subsections/ShippingTimes";
import { SalesHooks } from "./subsections/SalesHooks";

export const subsectionsData = [
  {
    id: "trackMessages",
    label: "Mensajes de seguimiento",
    component: <TrackMessages />,
  },
  {
    id: "shippingTimes",
    label: "Tiempos de envío",
    component: <ShippingTimes />,
  },
  {
    id: "salesHooks",
    label: "Ganchos de venta",
    component: <SalesHooks />,
  },
];
