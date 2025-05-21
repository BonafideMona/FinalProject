import React from "react";

export default function TrendingProductsBox({
  name,
  availableQuantity ,
  price,
  image,
  quantity,
  onIncrement,
  onDecrement,
  onAddToCart,
}) {
  return (
    <div className="w-56 rounded-2xl border border-[#d6c9b4] bg-[#fefaf4] shadow-sm p-3 text-center text-[#5b4e40] hover:shadow-md transition-shadow">
      <div className="bg-[#e0d2ba] rounded-lg overflow-hidden flex items-center justify-center h-28 mb-2">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm text-[#8c7c65]">No Image</span>
        )}
      </div>

      <h3 className="text-sm font-medium truncate mb-1">{name}</h3>
      <p className="text-sm font-semibold text-[#3d2f24] mb-2">
        ₱{Number(price).toFixed(2)}
      </p>

      <p className="text-xs text-[#7c5f41] mb-2">Available: {availableQuantity}</p>

      <div className="flex items-center justify-center gap-2 mb-3">
        <button
          onClick={onDecrement}
          className="w-7 h-7 border border-[#cbb89f] rounded-lg text-[#5b4e40] hover:bg-[#ede5d9] transition"
        >
          −
        </button>
        <span className="text-sm">{quantity}</span>
        <button
          onClick={onIncrement}
          className="w-7 h-7 border border-[#cbb89f] rounded-lg text-[#5b4e40] hover:bg-[#ede5d9] transition"
        >
          +
        </button>
      </div>

      <button
        onClick={onAddToCart}
        className="w-full text-sm text-white bg-[#8b5e3c] hover:bg-[#714b30] rounded-md py-1.5 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
