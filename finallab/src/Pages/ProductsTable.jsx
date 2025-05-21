import React from "react";

function ProductsTable({ products, onEdit, onDelete, fetchError }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-[#5b4e40] mb-4">Existing Products</h2>

      {fetchError && (
        <div className="text-sm text-red-700 mb-4">{fetchError}</div>
      )}

      <div className="overflow-x-auto border border-[#d6c9b4] rounded-xl shadow-sm">
        <table className="w-full table-auto text-sm">
          <thead className="bg-[#f4f1ee] text-[#5b4e40]">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Product Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Unit</th>
              <th className="px-4 py-3 text-center">Qty</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product.product_id}
                  className="even:bg-[#fbf9f6] border-t border-[#e0d7cd] text-[#5b4e40]"
                >
                  <td className="px-4 py-3 text-center">
                    {product.image_url ? (
                      <img
                        src={`http://localhost:8801${product.image_url}`}
                        alt={product.product_name}
                        className="w-14 h-14 object-cover rounded-md mx-auto"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{product.product_name}</td>
                  <td className="px-4 py-3">{product.product_category}</td>
                  <td className="px-4 py-3">{product.unit_measure}</td>
                  <td className="px-4 py-3 text-center">{product.avail_qty}</td>
                  <td className="px-4 py-3 text-right">
                    ₱{Number(product.price).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => onEdit(product)}
                      aria-label={`Edit ${product.product_name}`}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => onDelete(product.product_id)}
                      aria-label={`Delete ${product.product_name}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500 italic">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsTable;
