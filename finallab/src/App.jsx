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


<<<<<<< HEAD
=======
      <div>
>>>>>>> e2533919f7d73f64c5c99cd77d3be326bd7cc312

          {/* Seller side */}
          <Route path ="AddProduct" element={<AddProduct />} />

        </Routes>
      </BrowserRouter>
    </main>
  );
}
