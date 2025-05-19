import CategoryBox from './CategoryBox';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CategorySection() {
  const categories = [
    'fruit',
    'vegetable',
    'grain',
    'legume',
    'root',
    'herb',
    'nuts',
    'dairy',
    'livestock',
    'flowers',
    'beverage',
  ];

  const navigate = useNavigate();

  return (
    <section className="py-8 px-4">
      <h2 className="text-xl font-semibold mb-6">Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((title, index) => (
          <div key={index} onClick={() => navigate(`/products/${title}`)} style={{ cursor: 'pointer' }}>
            <CategoryBox title={title} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;