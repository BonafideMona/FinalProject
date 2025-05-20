import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryBox from "./CategoryBox";

function CategorySection() {
  const categories = [
    "fruit",
    "vegetable",
    "grain",
    "legume",
    "root",
    "herb",
    "nuts",
    "dairy",
    "livestock",
    "flowers",
    "beverage",
  ];

  const navigate = useNavigate();

  return (
    <section className="py-12 px-6 bg-[#fefaf4]">
      <h2 className="text-2xl font-bold mb-10 text-[#5b4e40]">Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories.map((title, index) => (
          <div
            key={index}
            onClick={() => navigate(`/products/${title}`)}
            className="cursor-pointer"
          >
            <CategoryBox title={title} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
