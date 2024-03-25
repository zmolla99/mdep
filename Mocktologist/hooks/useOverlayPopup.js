import React, { createContext, useState, useContext } from 'react';

const OverlayPopupContext = createContext();

export const OverlayPopupProvider = ({ children }) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    return (
        <OverlayPopupContext.Provider value={{ showOverlay, setShowOverlay, showPopup, setShowPopup }}>
            {children}
        </OverlayPopupContext.Provider>
    );
};

export const useOverlayPopup = () => useContext(OverlayPopupContext);
