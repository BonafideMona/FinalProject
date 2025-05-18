import React from "react";

function ProductsTable({ products, onEdit, onDelete, fetchError }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Existing Products</h2>

      {fetchError && (
        <div className="text-sm text-red-700 mb-2">{fetchError}</div>
      )}

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Unit</th>
            <th className="border px-4 py-2">Qty</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product) => (
              <tr key={product.product_id} className="even:bg-gray-50">
                <td className="border px-4 py-2 text-center">
                  {product.image_url ? (
                    <img
                      src={`http://localhost:8801${product.image_url}`}
                      alt={product.product_name}
                      className="w-16 h-16 object-cover rounded mx-auto"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Image</span>
                  )}
                </td>
                <td className="border px-4 py-2">{product.product_name}</td>
                <td className="border px-4 py-2">{product.product_category}</td>
                <td className="border px-4 py-2">{product.unit_measure}</td>
                <td className="border px-4 py-2 text-center">
                  {product.avail_qty}
                </td>
                <td className="border px-4 py-2 text-right">
                  ${Number(product.price).toFixed(2)}
                </td>
                <td className="border px-4 py-2 space-x-2 text-center">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => onEdit(product)}
                    aria-label={`Edit ${product.product_name}`}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline ml-2"
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
              <td colSpan="7" className="text-center py-4 text-gray-500 italic">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;
