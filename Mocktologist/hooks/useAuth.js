import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [vegan, setVegan] = useState(false);
  const [image, setImage] = useState("https://static.vecteezy.com/system/resources/previews/020/911/746/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png");
  const [scannedId, setScannedId] = useState(0)

  return (
    <AuthContext.Provider value={{ token, setToken, userId, setUserId, firstName, setFirstName, vegan, setVegan, image, setImage, scannedId, setScannedId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);