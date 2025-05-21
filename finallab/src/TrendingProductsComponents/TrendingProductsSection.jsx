import { useState, useEffect } from "react";
import React from "react";
import TrendingProductsBox from "./TrendingProductsBox";
import { useCart } from "../contexts/CartContext"; 

export default function TrendingProductsSection() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const { addToCart } = useCart(); 

  useEffect(() => {
    fetch("http://localhost:8801/get-trending-products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched trending products:", data);
        const fetchedProducts = data.products || [];
        setProducts(fetchedProducts);
        setQuantities(Array(fetchedProducts.length).fill(1));
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);


  const increment = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
  };

  const decrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index]--;
      setQuantities(newQuantities);
    }
  };

  return (
    <section className="py-8 px-20 bg-[#fefaf4] ">
      <h2 className="text-xl font-bold text-[#5b4e40] mb-4">Best Deals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {products.map((product, index) => (
          <TrendingProductsBox
            key={product.product_id}
            availableQuantity={product.avail_qty} 
            name={product.product_name}
            price={product.price}
            image={`http://localhost:8801${product.image_url}`}
            quantity={quantities[index]}
            
            onIncrement={() => increment(index)}
            onDecrement={() => decrement(index)}
            onAddToCart={() => addToCart(product, quantities[index])}
          />

        ))}
      </div>

    </section>
  );
}
