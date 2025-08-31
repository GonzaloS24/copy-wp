export const updateFormData = (prevData, newData) => {
  let finalObject = {};

  Object.entries(prevData).forEach(([sectionName, sectionData]) => {
    Object.entries(sectionData).forEach(([fieldName, fieldData]) => {
      if (!finalObject[sectionName]) finalObject[sectionName] = {};
      if (!newData[sectionName] || !newData[sectionName][fieldName])
        finalObject[sectionName][fieldName] = fieldData;
      else
        finalObject[sectionName][fieldName] = newData[sectionName][fieldName];
    });
  });

  return finalObject;
};
