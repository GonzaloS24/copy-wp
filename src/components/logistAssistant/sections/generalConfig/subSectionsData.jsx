import { AIAudio } from "./subsections/AIAudio";
import { AIBehaviour } from "./subsections/AIBehaviour";
import { StoreData } from "./subsections/StoreData";

export const subsectionsData = [
  {
    id: "storeData",
    label: "Datos de la tienda",
    component: (formData, setFormData) => (
      <StoreData formData={formData} setFormData={setFormData} />
    ),
  },
  {
    id: "AIBehaviour",
    label: "Comportamiento de la IA",
    component: (formData, setFormData) => (
      <AIBehaviour formData={formData} setFormData={setFormData} />
    ),
  },
  {
    id: "AIAudio",
    label: "Audios con IA",
    component: (formData, setFormData) => (
      <AIAudio formData={formData} setFormData={setFormData} />
    ),
  },
];
