import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Profile from "./Pages/Profile"; 
import AddProductForm from "./Pages/AddProductForm";
import React from "react";
import { GoogleLogin } from '@react-oauth/google';
export default function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />



          {/* Seller side */}

          {/* Add product form */}
          <Route path ="AddProductForm" element={<AddProductForm/>}/>

        </Routes>
      </BrowserRouter>
    </main>
  );
}
