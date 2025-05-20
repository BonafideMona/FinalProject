import {  createContext, useState, useEffect } from "react";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";




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

 const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    navigate("/");  // redirect to home page on logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
