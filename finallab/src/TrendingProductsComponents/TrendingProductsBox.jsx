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
    <div className="w-56 border rounded-xl bg-white shadow p-4 text-center text-gray-800">
      <div className="relative bg-gray-100 rounded-md flex items-center justify-center h-40 mb-4">
        {discount && (
          <span className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">
            -{discount}
          </span>
        )}
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-24 object-contain"
          />
        ) : (
          <span className="text-sm text-gray-500">No Image</span>
        )}
      </div>

      <h3 className="text-sm font-semibold mb-1">{name}</h3>
      <p className="text-base font-bold text-gray-900 mb-3">${price}</p>

      <div className="flex items-center justify-center gap-2 mb-3">
        <button
          onClick={onDecrement}
          className="px-2 py-1 border rounded text-sm"
        >
          −
        </button>
        <span className="text-sm">{quantity}</span>
        <button
          onClick={onIncrement}
          className="px-2 py-1 border rounded text-sm"
        >
          +
        </button>
      </div>

      <button className="text-xs text-blue-600 hover:underline">Add to Cart</button>
    </div>
  );
}
