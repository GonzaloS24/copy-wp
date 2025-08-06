import { OfferDays } from "./subsections/OfferDays";
import { SpecialActions } from "./subsections/SpecialActions";
import { UpdateMessages } from "./subsections/UpdateMessages";

export const subsectionsData = [
  {
    id: "udpateMessages",
    label: "Mensajes de novedad",
    component: (formData, setFormData) => (
      <UpdateMessages formData={formData} setFormData={setFormData} />
    ),
  },
  {
    id: "offerDays",
    label: "Días de ofrecimiento",
    component: (formData, setFormData) => (
      <OfferDays formData={formData} setFormData={setFormData} />
    ),
  },
  {
    id: "specialActions",
    label: "Acciones especiales",
    component: (formData, setFormData) => (
      <SpecialActions formData={formData} setFormData={setFormData} />
    ),
  },
];
