import React, { useState } from "react";
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
  const itemsPerPage = 6;
  const [page, setPage] = useState(0);

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCategories = categories.slice(startIndex, endIndex);

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <section className="py-8 px-20 bg-[#fefaf4]">
      {/* Header row: title on the left, buttons on the right */}
      <div className="flex items-center justify-between mb-6">
        {/* Heading */}
        <h2 className="text-xl font-bold text-[#5b4e40] mb-4">Categories</h2>

        {/* Pagination Buttons */}
        {totalPages > 1 && (
          <div className="flex gap-3">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className="px-4 py-2 rounded-md text-sm bg-[#ccc2b4] text-[#5b4e40] hover:bg-[#bfb3a0] disabled:opacity-50"
            >
              ←
            </button>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
              disabled={page >= totalPages - 1}
              className="px-4 py-2 rounded-md text-sm bg-[#5b4e40] text-white hover:bg-[#4a3e34] disabled:opacity-50"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {paginatedCategories.map((title, index) => (
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
