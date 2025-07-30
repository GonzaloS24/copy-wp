import { subsectionsData as confirmationsData } from "../sections/confirmations/subSectionsData";
import { subsectionsData as generalConfigData } from "../sections/generalConfig/subSectionsData";
import { subsectionsData as trackingData } from "../sections/tracking/subSectionsData";
import { subsectionsData as updatesData } from "../sections/updates/subSectionsData";

export const tabsData = [
  {
    id: "generalConfig",
    emoji: "⚙️",
    label: "CONFIGURACIÓN GENERAL",
    subsectionsData: generalConfigData,
  },
  {
    id: "confirmations",
    emoji: "✅",
    label: "CONFIRMACIONES",
    subsectionsData: confirmationsData,
  },
  {
    id: "tracking",
    emoji: "📦",
    label: "SEGUIMIENTO",
    subsectionsData: trackingData,
  },
  {
    id: "updates",
    emoji: "⚠️",
    label: "NOVEDADES",
    subsectionsData: updatesData,
  },
];
