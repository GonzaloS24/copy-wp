import React, { useState, useEffect } from 'react';
import { useProduct } from '../../../context/ProductContext';
import { GenerateLink } from './dialog/GenerateLink';
import botKeyandIdAdService from '../../../services/formVentasWp/botKeyandIdAdService'; 

export const ProductActivators = () => {
  const { productData, updateProductData } = useProduct();
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [activatorsData, setActivatorsData] = useState({
    keywords: ['', '', '', '', '', '', ''],
    adIds: ['', '', '', '', '', '', '']
  });
  const [editingKeyword, setEditingKeyword] = useState(null);
  const [tempKeywordValue, setTempKeywordValue] = useState('');
  const [editingAdId, setEditingAdId] = useState(null);
  const [tempAdIdValue, setTempAdIdValue] = useState('');
  const [existingValues, setExistingValues] = useState({
    keywords: new Set(),
    adIds: new Set()
  });
  
  useEffect(() => {
    if (productData.activators) {
      setActivatorsData({
        keywords: [...productData.activators.keywords],
        adIds: [...productData.activators.adIds]
      });
      
      const firstKeyword = productData.activators.keywords.find(k => k.trim()) || '';
      setSelectedKeyword(firstKeyword);
    }
  }, [productData.activators]);

  const loadExistingValues = async () => {
    try {
      const response = await botKeyandIdAdService.getTriggerField();
      if (response.success && response.data && Array.isArray(response.data.value)) {
        const keywordsSet = new Set();
        const adIdsSet = new Set();

        response.data.value.forEach(item => {
          if (item.keyW && item.keyW !== '-') {
            const keywords = item.keyW.split(',').filter(k => k.trim() !== '');
            keywords.forEach(keyword => keywordsSet.add(keyword.trim()));
          }

          if (item.idAd && item.idAd !== '-') {
            const adIds = item.idAd.split(',').filter(id => id.trim() !== '');
            adIds.forEach(adId => adIdsSet.add(adId.trim()));
          }
        });

        setExistingValues({
          keywords: keywordsSet,
          adIds: adIdsSet
        });
      }
    } catch (error) {
      console.error('Error loading existing values:', error);
      setExistingValues({
        keywords: new Set(),
        adIds: new Set()
      });
    }
  };

  useEffect(() => {
    loadExistingValues();
  }, []);

  const validateUniqueValue = (value, fieldType, currentIndex) => {
    if (!value.trim()) return { isValid: true, message: '' };

    const existingSet = fieldType === 'keyword' ? existingValues.keywords : existingValues.adIds;
    const currentValues = fieldType === 'keyword' ? activatorsData.keywords : activatorsData.adIds;

    if (existingSet.has(value.trim())) {
      return {
        isValid: false,
        message: `El ${fieldType === 'keyword' ? 'keyword' : 'ID de anuncio'} "${value}" ya existe en otro registro.`
      };
    }

    const isDuplicateLocally = currentValues.some((existingValue, index) => 
      index !== currentIndex && existingValue.trim() === value.trim() && existingValue.trim() !== ''
    );

    if (isDuplicateLocally) {
      return {
        isValid: false,
        message: `El ${fieldType === 'keyword' ? 'keyword' : 'ID de anuncio'} "${value}" ya existe en otro campo.`
      };
    }

    return { isValid: true, message: '' };
  };

  const handleKeywordFocus = async (index) => {
    await loadExistingValues();
    setEditingKeyword(index);
    setTempKeywordValue(activatorsData.keywords[index]);
  };

  const handleKeywordBlur = (index) => {
    const valueToUpdate = tempKeywordValue.trim();

    if (valueToUpdate.includes(',')) {
      alert("No pueden existir , dentro de la palabra clave");
      setTempKeywordValue('');
      setEditingKeyword(null); 
      return;
    }

    const validation = validateUniqueValue(valueToUpdate, 'keyword', index);
    if (!validation.isValid) {
      alert(validation.message);
      setTempKeywordValue('');
      setEditingKeyword(null);
      return;
    }

    const newKeywords = [...activatorsData.keywords];
    newKeywords[index] = valueToUpdate;
    
    setActivatorsData(prev => ({
      ...prev,
      keywords: newKeywords
    }));
    
    setEditingKeyword(null);
    setTempKeywordValue('');
    
    setTimeout(() => {
      updateProductData('activators', {
        keywords: newKeywords
      });
    }, 300);
  };

  const handleAdIdFocus = async (index) => {
    await loadExistingValues();
    setEditingAdId(index);
    setTempAdIdValue(activatorsData.adIds[index]);
  };

  const handleAdIdBlur = (index) => {
    const valueToUpdate = tempAdIdValue.trim();

    const validation = validateUniqueValue(valueToUpdate, 'adId', index);
    if (!validation.isValid) {
      alert(validation.message);
      setTempAdIdValue('');
      setEditingAdId(null);
      return;
    }

    const newAdIds = [...activatorsData.adIds];
    newAdIds[index] = valueToUpdate;
    
    setActivatorsData(prev => ({
      ...prev,
      adIds: newAdIds
    }));
    
    setEditingAdId(null);
    setTempAdIdValue('');
    
    setTimeout(() => {
      updateProductData('activators', {
        adIds: newAdIds
      });
    }, 300);
  };

  const handleKeywordChange = (value) => {
    setTempKeywordValue(value);
  };

  const handleKeywordKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const handleEditKeyword = async (index) => {
    await loadExistingValues();
    setEditingKeyword(index);
    setTempKeywordValue(activatorsData.keywords[index]);
  };

  const handleAdIdChange = (value) => {
    setTempAdIdValue(value);
  };

  const handleAdIdKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const handleEditAdId = async (index) => {
    await loadExistingValues();
    setEditingAdId(index);
    setTempAdIdValue(activatorsData.adIds[index]);
  };

  const openLinkGeneratorModal = () => {
    setIsLinkDialogOpen(true);
  };

  const closeLinkDialog = () => {
    setIsLinkDialogOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-blue-600 text-center mb-6">
            Palabras clave
            <span className="text-red-500 ml-1">*</span>
          </h3>
          <div className="flex flex-col space-y-3">
            {activatorsData.keywords.map((keyword, index) => (
              <div
                key={`keyword-${index}`}
                className="min-h-[45px] border-2 border-slate-300 rounded-lg bg-white p-2 flex items-center transition-all duration-200 hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10"
              >
                {editingKeyword === index ? (
                  <input
                    type="text"
                    className="w-full outline-none bg-transparent text-sm"
                    placeholder={index === 0 ? "Palabra clave principal..." : "Palabra clave adicional..."}
                    value={tempKeywordValue}
                    onChange={(e) => handleKeywordChange(e.target.value)}
                    onBlur={() => handleKeywordBlur(index)}
                    onKeyDown={(e) => handleKeywordKeyDown(e, index)}
                    autoFocus
                  />
                ) : (
                  <>
                    {keyword ? (
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => handleEditKeyword(index)}
                      >
                        <span className="bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm font-medium inline-block hover:bg-blue-600 transition-colors">
                          {keyword.length > 25 ? `${keyword.substring(0, 25)}...` : keyword}
                        </span>
                      </div>
                    ) : (
                      <div 
                        className="flex-1 cursor-text text-slate-400 text-sm"
                        onClick={() => handleKeywordFocus(index)}
                      >
                        {index === 0 ? "Palabra clave principal..." : "Palabra clave adicional..."}
                      </div>
                    )}
                    {keyword && (
                      <button
                        onClick={() => handleEditKeyword(index)}
                        className="ml-2 text-slate-400 hover:text-blue-500 text-sm"
                        title="Editar"
                      >
                        ✏️
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-600 text-center mb-6">
            IDs de anuncio
          </h3>
          <div className="flex flex-col space-y-3">
            {activatorsData.adIds.map((id, index) => (
              <div
                key={`adid-${index}`}
                className="min-h-[45px] border-2 border-slate-300 rounded-lg bg-white p-2 flex items-center transition-all duration-200 hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10"
              >
                {editingAdId === index ? (
                  <input
                    type="text"
                    className="w-full outline-none bg-transparent text-sm"
                    placeholder={index === 0 ? "ID de anuncio principal..." : "ID de anuncio adicional..."}
                    value={tempAdIdValue}
                    onChange={(e) => handleAdIdChange(e.target.value)}
                    onBlur={() => handleAdIdBlur(index)}
                    onKeyDown={(e) => handleAdIdKeyDown(e, index)}
                    autoFocus
                  />
                ) : (
                  <>
                    {id ? (
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => handleEditAdId(index)}
                      >
                        <span className="bg-slate-500 text-white px-3 py-1.5 rounded-md text-sm font-medium inline-block hover:bg-slate-600 transition-colors">
                          {id.length > 25 ? `${id.substring(0, 25)}...` : id}
                        </span>
                      </div>
                    ) : (
                      <div 
                        className="flex-1 cursor-text text-slate-400 text-sm"
                        onClick={() => handleAdIdFocus(index)}
                      >
                        {index === 0 ? "ID de anuncio principal..." : "ID de anuncio adicional..."}
                      </div>
                    )}
                    {id && (
                      <button
                        onClick={() => handleEditAdId(index)}
                        className="ml-2 text-slate-400 hover:text-slate-600 text-sm"
                        title="Editar"
                      >
                        ✏️
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8 pt-6">
        <button
          onClick={openLinkGeneratorModal}
          disabled={!selectedKeyword}
          className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none rounded-xl px-8 py-4 text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out flex items-center gap-3 shadow-lg ${
            !selectedKeyword ? 'opacity-50 cursor-not-allowed' : 'shadow-blue-500/25 hover:from-blue-600 hover:to-blue-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/35'
          }`}
        >
          <span className="text-base">🔗</span>
          <span>Generar enlace</span>
        </button>
      </div>

      {isLinkDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="relative">
            <GenerateLink 
              initialMessage={selectedKeyword}
              onClose={closeLinkDialog}
            />
          </div>
        </div>
      )}

    </div>
  );
}