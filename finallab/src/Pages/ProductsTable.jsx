// ProductsTable.js
import React, { useState, useEffect } from "react";
function ProductsTable({ onEdit }) {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8801/get-products");
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      } else {
        setMessage("No products found.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setMessage("Network error while fetching products.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8801/delete-product/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.message) {
        alert(data.message);
        fetchProducts(); // Refresh list after delete
      } else {
        alert("Error deleting product.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Network error while deleting product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Existing Products</h2>

      {message && <div className="text-sm text-red-700 mb-2">{message}</div>}

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Variety</th>
            <th className="border px-4 py-2">Unit</th>
            <th className="border px-4 py-2">Qty</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.product_id}>
                <td className="border px-4 py-2">{product.product_name}</td>
                <td className="border px-4 py-2">{product.product_category}</td>
                <td className="border px-4 py-2">{product.product_variety}</td>
                <td className="border px-4 py-2">{product.unit_measure}</td>
                <td className="border px-4 py-2">{product.avail_qty}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => onEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(product.product_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-2">
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
