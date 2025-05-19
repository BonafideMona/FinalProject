import React from 'react';
import TrendingProductsBox from './TrendingProductsBox';

export default function TrendingProductsList({ products, onIncrement, onDecrement, onAddToCart }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {products.map((product, index) => (
        <TrendingProductsBox
          key={product.product_id}
          name={product.product_name}
          price={product.price}
          image={`http://localhost:8801${product.image_url}`}
          quantity={product.quantity || 1}
          onIncrement={() => onIncrement(index)}
          onDecrement={() => onDecrement(index)}
          onAddToCart={() => onAddToCart(product, product.quantity || 1)}
        />
      ))}
    </div>
  );
}
