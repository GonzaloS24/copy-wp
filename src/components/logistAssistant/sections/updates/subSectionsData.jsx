import { OfferDays } from "./subsections/OfferDays";
import { SpecialActions } from "./subsections/SpecialActions";
import { UpdateMessages } from "./subsections/UpdateMessages";

export const subsectionsData = [
  {
    id: "udpateMessages",
    label: "Mensajes de novedad",
    component: <UpdateMessages />,
  },
  {
    id: "offerDays",
    label: "Días de ofrecimiento",
    component: <OfferDays />,
  },
  {
    id: "specialActions",
    label: "Acciones especiales",
    component: <SpecialActions />,
  },
];
