import { OfferDays } from "./OfferDays";
import { SpecialActions } from "./SpecialActions";
import { UpdateMessages } from "./UpdateMessages";

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
