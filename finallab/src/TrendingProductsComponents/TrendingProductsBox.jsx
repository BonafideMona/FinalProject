import React from "react";

export default function TrendingProductsBox({
  name,
  price,
  discount,
  image,
  quantity,
  onIncrement,
  onDecrement,
}) {
  return (
    <div className="border rounded-md p-3 text-center bg-olive text-gray-800">
      <div className="relative">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-24 h-24 object-cover mb-3 rounded transition-transform duration-200 hover:scale-105 mx-auto"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 flex items-center justify-center mb-3 rounded mx-auto">
            No Image
          </div>
        )}

        {discount && (
          <span className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
            -{discount}
          </span>
        )}
      </div>

      <h3 className="text-sm font-semibold truncate mb-2">{name}</h3>

      <p className="text-sm font-bold text-gray-900 mb-3">{price}</p>

      <div className="flex items-center justify-center gap-3 mb-3">
        <button
          onClick={onDecrement}
          className="px-3 py-1 bg-gray-200 rounded transition-colors duration-150 hover:bg-gray-300"
        >
          −
        </button>
        <span className="text-sm">{quantity}</span>
        <button
          onClick={onIncrement}
          className="px-3 py-1 bg-gray-200 rounded transition-colors duration-150 hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <button className="px-4 py-1 bg-green-500 text-white rounded-md text-xs transition-colors duration-150 hover:bg-green-600">
        Add to Cart
      </button>
    </div>
  );
}
