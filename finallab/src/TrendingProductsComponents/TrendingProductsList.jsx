import React from 'react';
import TrendingProductsBox from './TrendingProductsBox';

export default function TrendingProductsList({ music }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {music.map((item) => (
        <TrendingProductsBox key={item.id} title={item.title} />
      ))}
    </div>
  );
}