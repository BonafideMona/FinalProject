import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Profile from "./Pages/Profile"; 
import AddProduct from "./Pages/AddProducts"
import React from "react";

export default function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />



          {/* Seller side */}
          <Route path ="addProduct" element={<AddProduct />} />

        </Routes>
      </BrowserRouter>
    </main>
  );
}
