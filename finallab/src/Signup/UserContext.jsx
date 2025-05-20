import {  createContext, useState, useEffect } from "react";
import React from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accID = sessionStorage.getItem("accID");
    const email = sessionStorage.getItem("email");
    const accName = sessionStorage.getItem("accName");
    const address = sessionStorage.getItem("address");
    if (accID && email && accName && address) {
      setUser({accID, email, accName, address});
    }
  }, []);

  const login = (userData) => {
    sessionStorage.setItem("email", userData.email);
    sessionStorage.setItem("accName", userData.accName);
    sessionStorage.setItem("accID", userData.accID);
    sessionStorage.setItem("address", userData.address);
    setUser(userData);
  };

  const logout = () => {
    // baguhin to if may ibang ipapasok sa sessionStorage gawing manually clear yung 3
    sessionStorage.clear();
    setUser(null);
    window.location.reload();
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
