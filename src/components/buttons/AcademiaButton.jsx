import { FaGraduationCap } from "react-icons/fa";

const AcademiaButton = () => {
  return (
    <a
      href="https://academia.chateapro.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-0 top-1/2 -translate-y-1/2 
                 bg-gradient-to-br from-sky-500 to-sky-600 hover:bg-sky-600 active:bg-sky-700
                 text-white font-semibold py-4 px-3 rounded-l-lg
                 shadow-lg hover:shadow-xl transition-all duration-300
                 transform hover:scale-105 hover:-translate-x-1 z-[9999]
                 border-r-4 border-sky-700 cursor-pointer
                 no-underline flex flex-col items-center gap-2"
      style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
    >
      <span className="flex gap-2">
        ¡CAPACÍTATE! <FaGraduationCap className="text-xl mb-1 rotate-90" />
      </span>
    </a>
  );
};

export default AcademiaButton;
