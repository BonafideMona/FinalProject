import CategorySection from "../CategoryComponents/CategorySection";
import NewlyArrived from "../NewlyArrived";
import React from "react";
import TrendingProductsSection from "../TrendingProductsComponents/TrendingProductsSection";
import { useEffect } from "react";
import Signup from "../Signup/Signup";
import NavigationBar from "../Navigator/NavigationBar";
import Modal from "../Signup/Modal";
import { CartProvider } from "../contexts/CartContext";
import ImageSlider from "../ImageSliderComponent/ImageSlider";


function HomePage() {
  useEffect(() => {
    fetch("http://localhost:8801/tbl_accounts")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <main>
        <CartProvider>
          <NavigationBar />
          <ImageSlider />
          <TrendingProductsSection />
          <CategorySection />
          <NewlyArrived />
          <Modal />
        </CartProvider>
      </main>
    </div>
  );
}

export default HomePage;
