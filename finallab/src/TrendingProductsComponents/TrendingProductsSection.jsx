import React, { useState } from "react";
import TrendingProductsBox from "./TrendingProductsBox";

export default function TrendingProductsSection() {
  const products = [
    {
      id: 1,
      name: "Veggies",
      price: "18.00",
      discount: "30%",
      image:
        "https://sunstarjuice.ir/wp-content/uploads/2018/08/For-web03-750x750.jpg",
    },
    {
      id: 2,
      name: "Fruits",
      price: "18.00",
      discount: "30%",
    },
    {
      id: 3,
      name: "Drinks",
      price: "18.00",
      discount: "30%",
    },
    {
      id: 4,
      name: "Snacks",
      price: "10.00",
      discount: "50%",
    },
  ];

  const [quantities, setQuantities] = useState(Array(products.length).fill(1));

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
    <section className="py-8 px-4">
      <h2 className="text-xl font-semibold mb-6 text-black">Trending Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {products.map((product, index) => (
          <TrendingProductsBox
            key={product.id}
            name={product.name}
            price={product.price}
            discount={product.discount}
            image={product.image}
            quantity={quantities[index]}
            onIncrement={() => increment(index)}
            onDecrement={() => decrement(index)}
          />
        ))}
      </div>
    </section>
  );
}
