import { TrackMessages } from "./subsections/TrackMessages";
import { ShippingTimes } from "./subsections/ShippingTimes";

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
];
