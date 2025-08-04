import { confirmationsInitialValues } from "../../../utils/logistAssistant/initialValues/confirmations";
import { generalConfigInitialValues } from "../../../utils/logistAssistant/initialValues/generalConfig";
import { trackingInitialValues } from "../../../utils/logistAssistant/initialValues/tracking";
import { updatesInitialValues } from "../../../utils/logistAssistant/initialValues/updates";
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
    sectionName: "[Logistico] Configuracion General",
    initialValues: generalConfigInitialValues,
  },
  {
    id: "confirmations",
    emoji: "✅",
    label: "CONFIRMACIONES",
    subsectionsData: confirmationsData,
    sectionName: "[Logistico] Confirmaciones",
    initialValues: confirmationsInitialValues,
  },
  {
    id: "tracking",
    emoji: "📦",
    label: "SEGUIMIENTO",
    subsectionsData: trackingData,
    sectionName: "[Logistico] Seguimiento",
    initialValues: trackingInitialValues,
  },
  {
    id: "updates",
    emoji: "⚠️",
    label: "NOVEDADES",
    subsectionsData: updatesData,
    sectionName: "[Logistico] Novedad",
    initialValues: updatesInitialValues,
  },
];
