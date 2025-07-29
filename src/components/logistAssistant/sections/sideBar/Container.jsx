import { Element } from "./Element";

export const SectionSideBar = ({ activeSection, setActiveSection, items }) => {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <Element
            key={`sidebar-item-${item.id}`}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};
