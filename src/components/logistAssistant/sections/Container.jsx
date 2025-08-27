import { useEffect, useState } from "react";
import { SectionSideBar } from "./sideBar/Container";
import { Card } from "../generalComponents/Card";
import { FloatingSaveButton } from "../generalComponents/FloatingSaveButton";
import {
  getBotFieldData,
  setBotFieldData,
} from "../../../services/logistAssistant";
import { ModalContainer } from "../../modals/Container";
import { AssistantFormModal } from "../../modals/assistantFormSave";
import { generalConfigBotFieldSchema } from "../../../schemas/logistAssistant/botFieldData/generalConfig";
import camelize from "camelize";

export const SectionContainer = ({
  subsectionsData,
  initialValues,
  sectionName,
  sectionId,
}) => {
  const [modalData, setModalData] = useState({ open: false, type: "success" });
  const [formData, setFormData] = useState({});
  const [flowsState, setFlowsState] = useState({});
  const [activeSubsection, setActiveSubsection] = useState(
    subsectionsData[0].id
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.entries(formData).length !== 0) return;

    setFormData(initialValues);

    getBotFieldData(sectionId, sectionName)
      .then((saveData) => {
        setFormData((prev) => ({
          ...prev,
          ...saveData,
        }));
      })
      .catch((error) =>
        console.error("Error al cargar los datos guardados.", error)
      );
  }, [formData]);

  const handleSave = () => {
    setIsLoading((_) => true);
    setBotFieldData(sectionId, sectionName, formData)
      .then((response) => {
        console.log(response);
        setModalData((prev) => ({
          ...prev,
          open: true,
          type: "success",
        }));
      })
      .catch((error) => {
        console.error(error);
        setModalData((prev) => ({
          ...prev,
          open: true,
          type: "error",
        }));
      })
      .finally(() => setIsLoading((_) => false));
  };

  const handleModalClose = () => {
    setModalData((prev) => ({ ...prev, open: false }));
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
                  {subsection.component(
                    formData,
                    setFormData,
                    flowsState,
                    setFlowsState
                  )}
                </div>
              ))}
            </Card>
          </div>
        </div>
      </main>
      <FloatingSaveButton onClick={handleSave} isLoading={isLoading} />
      {modalData?.open && (
        <ModalContainer onClose={handleModalClose}>
          <AssistantFormModal
            type={modalData.type}
            onClose={handleModalClose}
          />
        </ModalContainer>
      )}
    </div>
  );
};
