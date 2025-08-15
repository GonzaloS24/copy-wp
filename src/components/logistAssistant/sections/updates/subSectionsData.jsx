import { OfferDays } from "./subsections/OfferDays";
import { SpecialActions } from "./subsections/SpecialActions";
import { UpdateMessages } from "./subsections/UpdateMessages";

export const subsectionsData = [
  {
    id: "udpateMessages",
    label: "Mensajes de novedad",
    component: (formData, setFormData, flowsState, setFlowsState) => (
      <UpdateMessages
        formData={formData}
        setFormData={setFormData}
        flowsState={flowsState}
        setFlowsState={setFlowsState}
      />
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
