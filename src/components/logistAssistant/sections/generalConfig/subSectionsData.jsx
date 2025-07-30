import { AIAudio } from "./subsections/AIAudio";
import { AIBehaviour } from "./subsections/AIBehaviour";
import { StoreData } from "./subsections/StoreData";

export const subsectionsData = [
  {
    id: "storeData",
    label: "Datos de la tienda",
    component: <StoreData />,
  },
  {
    id: "AIBehaviour",
    label: "Comportamiento de la IA",
    component: <AIBehaviour />,
  },
  {
    id: "AIAudio",
    label: "Audios con IA",
    component: <AIAudio />,
  },
];
