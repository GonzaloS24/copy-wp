import { useState } from "react";
import { SectionSideBar } from "./sideBar/Container";
import { Card } from "../generalComponents/Card";
import { FloatingSaveButton } from "../generalComponents/FloatingSaveButton";
import { setBotFieldData } from "../../../services/logistAssistant";
import { toast } from "react-toastify";

export const SectionContainer = ({
  subsectionsData,
  initialValues,
  sectionName,
  sectionId,
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [activeSubsection, setActiveSubsection] = useState(
    subsectionsData[0].id
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = () => {
    setIsLoading((_) => true);
    toast.promise(
      setBotFieldData(sectionId, sectionName, formData)
        .then((response) => {
          console.log(response);
        })
        .finally(() => setIsLoading((_) => false)),
      {
        success: `Se guardaron los datos de ${sectionName} exitosamente.`,
        error: "Ocurrió un error al intentar guardar los datos.",
      }
    );
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
                  {subsection.component(formData, setFormData)}
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
