export const confirmMessagesInitialValues = {
  imagePosition: 1,
  reminder1Time: 5,
  reminder1Unit: "minutos",
  reminder2Time: 24,
  reminder2Unit: "horas",
  thanksMessage:
    "¡Gracias por confirmar tu pedido! Estamos procesando tu solicitud y pronto recibirás actualizaciones sobre el estado de tu envío...",
};

export const directionAnalisisInitialValues = {
  evaluateAddress: false,
  addressPrompt:
    "#ROL: Asume el papel de un experto en direcciones colombianas. Tu tarea es analizar y evaluar una dirección colombiana proporcionada para determinar si parece estar bien estructurada, es suficientemente específica y contiene las referencias necesarias. Las direcciones en Colombia pueden adoptar diferentes formas, incluyendo calle, carrera, avenida, diagonal, transversal, corregimiento, entre otros términos relevantes según la nomenclatura local. Debes considerar si la dirección tiene suficientes detalles y referencias adicionales como el número de casa, el barrio o un punto de referencia.\n\n#CRITERIOS PARA EVALUAR LA DIRECCIÓN:\nA) Suficientemente específica: La dirección incluye un tipo de vía (calle, carrera, avenida, etc.), el número correspondiente, y referencia claras como un número de puerta o apartamento. También hay casos especiales, como nombre del sector, manzana, y número de casa, lo que permite identificar la ubicación precisa.",
};

export const orderValidationsInitialValues = {
  autoConfirm: false,
  validateDeliveries: false,
  minSuccessPercentage: 70,
  minOrdersValidation: 3,
  validateShipping: false,
  minShippingValue: 15000,
};

export const shippingTimesInitialValues = {
  deliveryTimes:
    "De 3 a 5 días en ciudades principales y de 5 a 7 días en ciudades no principales",
};

export const confirmationsInitialValues = {
  confirmMessages: confirmMessagesInitialValues,
  directionAnalisis: directionAnalisisInitialValues,
  orderValidations: orderValidationsInitialValues,
  shippingTimes: shippingTimesInitialValues,
};
