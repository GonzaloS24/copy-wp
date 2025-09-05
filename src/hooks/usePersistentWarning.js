import { useEffect } from 'react';

export const usePersistentWarning = (shouldBlock, modifiedFieldsCount) => {
  useEffect(() => {
    const showPersistentWarning = () => {
      const existingWarning = document.querySelector('.unsaved-changes-warning');
      if (existingWarning) existingWarning.remove();
      
      if (shouldBlock) {
        const warning = document.createElement('div');
        warning.className = 'unsaved-changes-warning';
        warning.innerHTML = `
          <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: #92400e;
            padding: 10px;
            text-align: center;
            font-size: 14px;
            font-weight: 600;
            z-index: 9999;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            border-bottom: 2px solid #d97706;
          ">
            ⚠️ ${modifiedFieldsCount} cambio${modifiedFieldsCount > 1 ? 's' : ''} sin guardar  
          </div>
        `;
        document.body.appendChild(warning);
      }
    };

    showPersistentWarning();
    
    return () => {
      const warning = document.querySelector('.unsaved-changes-warning');
      if (warning) warning.remove();
    };
  }, [shouldBlock, modifiedFieldsCount]);
};