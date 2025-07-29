import { Card } from "../../generalComponents/Card";
import { tabsData } from "../tabsData";
import { Element } from "./Element";

export const TabSelector = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-12 flex justify-center">
      <Card p={4}>
        <div className="flex gap-4">
          {tabsData.map((tab) => (
            <Element
              key={`tab-${tab.id}`}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tab={tab}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};
