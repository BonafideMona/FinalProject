import CategoryBox from './CategoryBox';
import React from 'react';
function CategorySection() {
  const categories = [
    'Fruits & Veges',
    'Breads & Sweets',
    'Fruits & Veges',
    'Fruits & Veges',
    'Fruits & Veges',
    'Fruits & Veges',
  ];

  return (
    <section className="py-8 px-4">
      <h2 className="text-xl font-semibold mb-6">Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((title, index) => (
          <CategoryBox key={index} title={title} />
        ))}
      </div>
    </section>
  );
}

export default CategorySection;