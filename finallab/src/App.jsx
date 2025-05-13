import CategorySection from "./CategoryComponents/CategorySection";
import NewlyArrived from "./NewlyArrived";
import React from "react";
import TrendingProductsSection from "./TrendingProductsComponents/TrendingProductsSection";

export default function App() {
  return (
    <main>
      <TrendingProductsSection />
      <CategorySection />
      <NewlyArrived />
    </main>
  );
}