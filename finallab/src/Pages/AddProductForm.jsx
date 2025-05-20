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
        className="mb-6 mr-4 bg-[#ede6dd] text-[#5b4e40] font-medium px-6 py-2 rounded-xl shadow-sm hover:bg-[#d8cfc3] hover:text-[#44392e] transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#b3a18b] focus:ring-offset-1"
        onClick={() => navigate("/profile")}
      >
        ← Back to Profile
      </button>


      <ProductsTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        fetchError={fetchError}
        showModal={showModal}
        setShowModal={setShowModal}
        editMode={editMode}
        setEditMode={setEditMode}
        productName={productName}
        setProductName={setProductName}
        category={category}
        setCategory={setCategory}
        unitMeasure={unitMeasure}
        setUnitMeasure={setUnitMeasure}
        availableQuantity={availableQuantity}
        setAvailableQuantity={setAvailableQuantity}
        price={price}
        setPrice={setPrice}
        image_url={image_url}
        setImageFile={setImageFile}
        handleOnSubmit={handleOnSubmit}
        message={message}
        setMessage={setMessage}
      />

    </div>
    </div>
  );
}

export default AddProductForm;
