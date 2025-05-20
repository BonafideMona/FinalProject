import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import HomePage from "./Pages/HomePage";
import Profile from "./Pages/Profile";
import AddProductForm from "./Pages/AddProductForm";
import ProductPage from './ProductPageComponent/ProductPage';
import DeveloperPage from "./Pages/DeveloperPage";
import CheckoutPage from "./Pages/CheckOutPage";
import SellerOrdersTable from "./Pages/SellersOrderTable";
import OrderHistoryTable from "./Pages/OrderHistoryTable";

import { UserProvider } from "./Signup/UserContext";
import { CartProvider } from "./contexts/CartContext"; // ✅ Import CartProvider

export default function App() {
  return (
    <main>
      <BrowserRouter>
        <UserProvider>
          <CartProvider> {/* ✅ Wrap entire app with CartProvider */}
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products/:category" element={<ProductPage />} />
              <Route path="/DeveloperPage" element={<DeveloperPage />} />
              <Route path="/checkoutpage" element={<CheckoutPage />} />
              <Route path="/orderpage" element={<SellerOrdersTable />} />
              <Route path="/orderhistorypage" element={<OrderHistoryTable />} />
              <Route path="/AddProductForm" element={<AddProductForm />} />
            </Routes>
          </CartProvider>
        </UserProvider>
      </BrowserRouter>
    </main>
  );
}
