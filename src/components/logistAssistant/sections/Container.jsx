import { useState } from "react";
import { SectionSideBar } from "./sideBar/Container";
import { Card } from "../generalComponents/Card";
import { FloatingSaveButton } from "../generalComponents/FloatingSaveButton";

export const SectionContainer = ({ subsectionsData }) => {
  const [activeSubsection, setActiveSubsection] = useState(
    subsectionsData[0].id
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = () => {
    setIsLoading((_) => true);
    alert("Guardando configuración... " + activeSubsection);
    setIsLoading((_) => false);
  };

  return (
    <div className="flex gap-10">
      <div className="h-full">
        <div className="flex flex-col w-70">
          <Card p="8">
            <SectionSideBar
              activeSection={activeSubsection}
              setActiveSection={setActiveSubsection}
              items={subsectionsData}
            />
          </Card>
        </div>
      </div>

      <main className="flex-1">
        <div className="h-full">
          <div className="flex flex-col mb-12 flex justify-center">
            <Card p="8">
              {subsectionsData.map((subsection) => (
                <div
                  key={subsection.id}
                  id={`subsection-${subsection.id}`}
                  aria-labelledby={subsection.id}
                  className={
                    activeSubsection === subsection.id ? "block" : "hidden"
                  }
                >
                  {subsection.component}
                </div>
              ))}
            </Card>
          </div>
        </div>
      </main>
      <FloatingSaveButton onClick={handleSave} isLoading={isLoading} />
    </div>
  );
};
