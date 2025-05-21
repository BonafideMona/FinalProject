import React, { useState, useEffect } from "react";
import TrendingProductsBox from "./TrendingProductsBox";
import { useCart } from "../contexts/CartContext";

function NewlyArrived() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:8801/get-newly-arrived-products")
      .then((res) => res.json())
      .then((data) => {
        // Sort by created_At descending (most recent first)
        const sorted = (data.products || []).sort(
          (a, b) => new Date(b.created_At) - new Date(a.created_At)
        );
        setProducts(sorted);
        setQuantities(Array(sorted.length).fill(1));
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
      <h2 className="text-xl font-bold text-[#5b4e40] mb-4">Newly Arrived Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {products.map((product, index) => (
          <TrendingProductsBox
            key={product.product_id}
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

export default NewlyArrived;