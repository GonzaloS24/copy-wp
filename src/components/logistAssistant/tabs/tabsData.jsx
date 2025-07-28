import { Confirmations } from "../sections/confirmations";
import { GeneralConfig } from "../sections/generalConfig";
import { Tracking } from "../sections/tracking";
import { Updates } from "../sections/updates";

export const tabsData = [
  {
    id: "generalConfig",
    emoji: "⚙️",
    label: "CONFIGURACIÓN GENERAL",
    component: <GeneralConfig />,
  },
  {
    id: "confirmations",
    emoji: "✅",
    label: "CONFIRMACIONES",
    component: <Confirmations />,
  },
  {
    id: "tracking",
    emoji: "📦",
    label: "SEGUIMIENTO",
    component: <Tracking />,
  },
  {
    id: "updates",
    emoji: "⚠️",
    label: "NOVEDADES",
    component: <Updates />,
  },
];
