
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export const Portal = ({ children }) => {
  const [portalElement, setPortalElement] = useState(null);

  useEffect(() => {
    const element = document.createElement('div');
    element.id = 'portal-root';
    document.body.appendChild(element);
    setPortalElement(element);

    return () => {
      if (document.body.contains(element)) {
        document.body.removeChild(element);
      }
    };
  }, []);

  if (!portalElement) return null;

  return ReactDOM.createPortal(children, portalElement);
};