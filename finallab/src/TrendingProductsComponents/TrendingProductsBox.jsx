import React from "react";

export default function TrendingProductsBox({
  name,
  price,
  image,
  quantity,
  onIncrement,
  onDecrement,
  onAddToCart,
}) {
  return (
    <div className="w-56 border rounded-xl bg-white shadow p-4 text-center text-gray-800">
      <div className="bg-gray-100 rounded-md flex items-center justify-center h-40 mb-4">
        {image ? (
          <img src={image} alt={name} className="h-24 object-contain" />
        ) : (
          <span className="text-sm text-gray-500">No Image</span>
        )}
      </div>

      <h3 className="text-sm font-semibold mb-1">{name}</h3>
      <p className="text-base font-bold text-gray-900 mb-3">
        ${Number(price).toFixed(2)}
      </p>

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

      <button
        className="text-xs text-blue-600 hover:underline"
        onClick={onAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
