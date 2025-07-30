import { tabsData } from "../tabs/tabsData";
import { SectionContainer } from "./Container";

export const SectionContent = ({ activeTab }) => {
  return (
    <div className="w-full bg-slate-50">
      <div className="bg-gray-50">
        {tabsData.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={tab.id}
            className={activeTab === tab.id ? "block" : "hidden"}
          >
            <SectionContainer subsectionsData={tab.subsectionsData} />
          </div>
        ))}
      </div>
    </div>
  );
};
