import { useState } from "react";
import { SectionSideBar } from "./sideBar/Container";

export const SectionContainer = ({ subsectionsData }) => {
  const [activeSubsection, setActiveSubsection] = useState(
    subsectionsData[0].id
  );

  return (
    <div className="flex gap-10">
      <div className="h-full">
        <div className="flex flex-col w-64">
          <SectionSideBar
            activeSection={activeSubsection}
            setActiveSection={setActiveSubsection}
            items={subsectionsData}
          />
        </div>
      </div>

      <main className="flex-1">
        <div className="h-full">
          <div className="flex flex-col mb-12 flex justify-center">
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
          </div>
        </div>
      </main>
    </div>
  );
};
