import CategorySection from "./CategoryComponents/CategorySection";
import NewlyArrived from "./NewlyArrived";
import React from "react";
import TrendingProductsSection from "./TrendingProductsComponents/TrendingProductsSection";
import { useEffect } from "react";

export default function App() {
  useEffect(() =>{
    fetch('http://localhost:8081/tbl_accounts')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  } )
  return (
    <main>
      <TrendingProductsSection />
      <CategorySection />
      <NewlyArrived />

      <div>

      </div>
    </main>

    
  );
}