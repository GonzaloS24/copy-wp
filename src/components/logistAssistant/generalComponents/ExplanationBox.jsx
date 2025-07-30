export const ExplanationBox = ({ selectedValue, type }) => {
  const getExplanation = () => {
    if (type === "min") {
      return (
        <>
          Si seleccionas{" "}
          <strong className="text-sky-500">
            {selectedValue} día{selectedValue !== "1" ? "s" : ""} hábil
            {selectedValue !== "1" ? "es" : ""}
          </strong>
          , la IA le dirá al cliente que la transportadora intentará entregar su
          pedido desde el{" "}
          {selectedValue === "1"
            ? "siguiente día hábil"
            : `${selectedValue}° día hábil`}
          .
          <br />
          <br />
          <em className="text-slate-500">
            Ejemplo: Si hoy es lunes, la IA ofrecerá entrega desde el{" "}
            {selectedValue === "1"
              ? "martes"
              : selectedValue === "2"
              ? "miércoles"
              : selectedValue === "3"
              ? "jueves"
              : selectedValue === "4"
              ? "viernes"
              : "lunes siguiente"}
            .
          </em>
        </>
      );
    } else {
      return (
        <>
          Si seleccionas{" "}
          <strong className="text-sky-500">
            {selectedValue} día{selectedValue !== "1" ? "s" : ""} hábil
            {selectedValue !== "1" ? "es" : ""}
          </strong>
          , la IA definirá como fecha límite de entrega hasta el{" "}
          {selectedValue === "1"
            ? "primer día hábil"
            : `${selectedValue}° día hábil`}{" "}
          desde la novedad.
          <br />
          <br />
          <em className="text-slate-500">
            Ejemplo: Si la novedad es lunes, el rango máximo sería hasta el{" "}
            {selectedValue === "1"
              ? "martes"
              : selectedValue === "2"
              ? "miércoles"
              : selectedValue === "3"
              ? "jueves"
              : selectedValue === "4"
              ? "viernes"
              : "lunes siguiente"}
            .
          </em>
        </>
      );
    }
  };

  return (
    <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 text-sm leading-relaxed text-slate-600 mt-2">
      {getExplanation()}
    </div>
  );
};
