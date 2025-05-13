// components/CategoryList.js
import React from 'react';
import CategoryBox from './CategoryBox';

function CategoryList({ music }) {
  return music.map((item) => <CategoryBox key={item.id} title={item.title} />);
}

export default CategoryList;