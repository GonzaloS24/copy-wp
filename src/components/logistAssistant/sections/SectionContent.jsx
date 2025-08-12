import { ToastContainer } from "react-toastify";
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
            <SectionContainer
              subsectionsData={tab.subsectionsData}
              initialValues={tab.initialValues}
              sectionName={tab.sectionName}
              sectionId={tab.id}
            />
          </div>
        ))}

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          progressStyle={{
            backgroundColor: "#e5e7eb",
          }}
          closeButtonStyle={{
            color: "#6b7280",
          }}
        />
      </div>
    </div>
  );
};
