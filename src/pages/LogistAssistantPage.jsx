import { useLocation } from "react-router-dom";
import { MainLayout } from "../components/MainLayout";
import { useState } from "react";
import { TabSelector } from "../components/logistAssistant/tabs/tabSelector/Container";
import { SectionContent } from "../components/logistAssistant/sections/SectionContent";

export const LogistAssistantPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "generalConfig"
  );

  return (
    <MainLayout>
      <div className="w-full p-8 bg-slate-50 min-h-screen">
        <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        <SectionContent activeTab={activeTab} />
      </div>
    </MainLayout>
  );
};
