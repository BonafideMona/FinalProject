import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Profile from "./Pages/Profile"; 
import AddProductForm from "./Pages/AddProductForm";
import ProductPage from "../ProductPageComponent/ProductPage";
import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import DeveloperPage from "./Pages/DeveloperPage";
import CheckoutPage from "./Pages/CheckOutPage";
import SellerOrdersTable from "./Pages/SellersOrderTable";
import OrderHistoryTable from "./Pages/OrderHistoryTable";
import { UserProvider } from "./Signup/UserContext";

export default function App() {
  return (
    <main>
      <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products/:category" element={<ProductPage />} />
          <Route path="/DeveloperPage" element={<DeveloperPage />} />

        
          {/* Checkout Page */}
          <Route path="/checkoutpage" element={<CheckoutPage/>} />


          {/* Seller side */}
          <Route path="/orderpage" element={<SellerOrdersTable/>} />
          <Route path="orderhistorypage" element={<OrderHistoryTable/>}/>

          {/* Add product form */}
          <Route path ="AddProductForm" element={<AddProductForm/>}/>

        </Routes>
        </UserProvider>
      </BrowserRouter>
    </main>
  );
}
