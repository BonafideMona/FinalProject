import React, { useState,  } from "react";
import ProductsTable from "./ProductsTable";

function AddProductForm() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [variety, setVariety] = useState("");
  const [unitMeasure, setUnitMeasure] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [message, setMessage] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      productName,
      category,
      variety,
      unitMeasure,
      availableQuantity,
    };

    try {
      const url = editMode
        ? `http://127.0.0.1:8801/update-product/${editProductId}`
        : "http://127.0.0.1:8801/add-product";

      const method = editMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await res.json();
      setMessage(data.message || "Operation completed!");

      // Reset form
      setProductName("");
      setCategory("");
      setVariety("");
      setUnitMeasure("");
      setAvailableQuantity("");
      setEditMode(false);
      setEditProductId(null);

    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Network error.");
    }
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setEditProductId(product.product_id);
    setProductName(product.product_name);
    setCategory(product.product_category);
    setVariety(product.product_variety);
    setUnitMeasure(product.unit_measure);
    setAvailableQuantity(product.avail_qty);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
       <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        {editMode ? "Update Product" : "Add Product"}
      </h2>

      <form onSubmit={handleOnSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Variety</label>
          <input
            type="text"
            placeholder="Variety"
            value={variety}
            onChange={(e) => setVariety(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Unit of Measure</label>
          <input
            type="text"
            placeholder="e.g. kg, liters"
            value={unitMeasure}
            onChange={(e) => setUnitMeasure(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Available Quantity</label>
          <input
            type="number"
            placeholder="Available Quantity"
            value={availableQuantity}
            onChange={(e) => setAvailableQuantity(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>

        {message && (
          <div className="text-center mt-4 text-sm text-green-700 font-medium">
            {message}
          </div>
        )}
      </form>
      <div>
        <ProductsTable onEdit={handleEdit} />
      </div>
    </div>
  );
}

export default AddProductForm;
