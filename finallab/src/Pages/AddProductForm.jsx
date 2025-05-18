import React, { useState, useEffect } from "react";
import ProductsTable from "./ProductsTable";

function AddProductForm() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [unitMeasure, setUnitMeasure] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image_url, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [fetchError, setFetchError] = useState("");

  const accID = sessionStorage.getItem("accID");

  const fetchProducts = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8801/get-products?accID=${accID}`);
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
        setFetchError("");
      } else {
        setFetchError("No products found.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setFetchError("Network error while fetching products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!accID) {
      setMessage("Account ID missing."); 
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("category", category);
    formData.append("unitMeasure", unitMeasure);
    formData.append("availableQuantity", availableQuantity);
    formData.append("price", price);
    formData.append("accID", accID);
    if (image_url) formData.append("image", image_url);

    try {
      const url = editMode
        ? `http://127.0.0.1:8801/update-product/${editProductId}`
        : `http://127.0.0.1:8801/add-product`;

      const method = editMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();
      setMessage(data.message || "Operation completed!");
      fetchProducts();

      // Reset
      setProductName("");
      setCategory("");
      setUnitMeasure("");
      setAvailableQuantity("");
      setPrice("");
      setImageFile(null);
      setEditMode(false);
      setEditProductId(null);
      setShowModal(false);
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
    setUnitMeasure(product.unit_measure);
    setAvailableQuantity(product.avail_qty);
    setPrice(product.price);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8801/delete-product/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);
      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Network error while deleting product.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <button
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => setShowModal(true)}
      >
        Add Product
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Update Product" : "Add Product"}
            </h2>
            <form onSubmit={handleOnSubmit} className="space-y-4" encType="multipart/form-data">
              <div>
                <label>Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select</option>
                  <option value="Fruit">Fruit</option>
                  <option value="Vegetable">Vegetable</option>
                  <option value="Grain">Grains & Cereals</option>
                  <option value="Legume">Legumes & Pulses</option>
                  <option value="Root">Root Crops</option>
                  <option value="Herb">Herbs & Spices</option>
                  <option value="Nuts">Nuts & Seeds</option>
                  <option value="Dairy">Dairy Products</option>
                  <option value="Livestock">Livestock Products</option>
                  <option value="Flowers">Flowers & Ornamentals</option>
                  <option value="Beverage">Beverage Crops</option>
                </select>
              </div>

              <div>
                <label>Unit of Measure</label>
                <select
                  value={unitMeasure}
                  onChange={(e) => setUnitMeasure(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select</option>
                  <option value="kg">Kilogram</option>
                  <option value="g">Gram</option>
                  <option value="L">Litre</option>
                  <option value="mL">Millilitre</option>
                  <option value="pcs">Piece</option>
                  <option value="dozen">Dozen</option>
                  <option value="bundle">Bundle</option>
                  <option value="bag">Bag</option>
                  <option value="crate">Crate</option>
                  <option value="tray">Tray</option>
                  <option value="tonne">Tonne</option>
                </select>
              </div>

              <div>
                <label>Available Quantity</label>
                <input
                  type="number"
                  value={availableQuantity}
                  onChange={(e) => setAvailableQuantity(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label>Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label>Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="flex justify-between">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
                  Submit
                </button>
                <button
                  className="text-gray-600 hover:text-red-600"
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditMode(false);
                    setMessage("");
                  }}
                >
                  Cancel
                </button>
              </div>

              {message && <div className="text-green-700 text-center">{message}</div>}
            </form>
          </div>
        </div>
      )}

      <ProductsTable products={products} onEdit={handleEdit} onDelete={handleDelete} fetchError={fetchError} />
    </div>
  );
}

export default AddProductForm;
