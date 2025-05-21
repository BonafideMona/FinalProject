import React, { useState, useEffect } from "react";
import ProductsTable from "./ProductsTable";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Navigator/NavigationBar";

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

      // Reset form
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

  const navigate = useNavigate();

  return (
  <div className="w-full bg-[#fefaf4] min-h-screen">
    {/* Navbar with no spacing */}
    <div className="w-full">
      <NavigationBar showSearch={false} showDevelopers={false} showCart={false} />
    </div>

    {/* Content with padding */}
    <div className="p-10">
      <button
        className="mb-6 mr-4 bg-gray-300 text-[#5b4e40] px-6 py-2 rounded-xl shadow hover:bg-gray-400 transition"
        onClick={() => navigate("/profile")}
      >
        ← Back to Profile
      </button>

      <button
        className="mb-6 bg-[#5b4e40] text-white px-6 py-2 rounded-xl shadow hover:bg-[#4a3e34] transition"
        onClick={() => setShowModal(true)}
      >
        + Add Product
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl border border-[#5b4e40]">
            <h2 className="text-2xl font-bold text-[#5b4e40] mb-6">
              {editMode ? "Update Product" : "Add Product"}
            </h2>

            <form onSubmit={handleOnSubmit} className="space-y-4" encType="multipart/form-data">
              {[
                {
                  label: "Product Name",
                  value: productName,
                  onChange: setProductName,
                  type: "text",
                },
                {
                  label: "Available Quantity",
                  value: availableQuantity,
                  onChange: setAvailableQuantity,
                  type: "number",
                },
                {
                  label: "Price",
                  value: price,
                  onChange: setPrice,
                  type: "number",
                  step: "0.01",
                },
              ].map(({ label, value, onChange, type, step }) => (
                <div key={label}>
                  <label className="text-[#5b4e40]">{label}</label>
                  <input
                    type={type}
                    value={value}
                    step={step}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border border-[#b3a18b] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b4e40]"
                  />
                </div>
              ))}

              <div>
                <label className="text-[#5b4e40]">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-[#d6c9b4] px-3 py-2 rounded-md"
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
                <label className="text-[#5b4e40]">Unit of Measure</label>
                <select
                  value={unitMeasure}
                  onChange={(e) => setUnitMeasure(e.target.value)}
                  className="w-full border border-[#d6c9b4] px-3 py-2 rounded-md"
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
                <label className="text-[#5b4e40]">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border border-[#d6c9b4] px-3 py-2 rounded-md"
                />
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  type="submit"
                  className="bg-[#5b4e40] text-white px-6 py-2 rounded-lg hover:bg-[#4a3e34] transition"
                >
                  {editMode ? "Update" : "Submit"}
                </button>
                <button
                  type="button"
                  className="text-[#b85c5c] hover:text-red-700"
                  onClick={() => {
                    setShowModal(false);
                    setEditMode(false);
                    setMessage("");
                  }}
                >
                  Cancel
                </button>
              </div>

              {message && (
                <div className="text-center text-green-700 font-medium mt-4">{message}</div>
              )}
            </form>
          </div>
        </div>
      )}

      <ProductsTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        fetchError={fetchError}
      />
    </div>
    </div>
  );
}

export default AddProductForm;
