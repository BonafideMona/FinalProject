import React from "react";

function ProductsTable({
  products,
  onEdit,
  onDelete,
  fetchError,
  showModal,
  setShowModal,
  editMode,
  setEditMode,
  productName,
  setProductName,
  category,
  setCategory,
  unitMeasure,
  setUnitMeasure,
  availableQuantity,
  setAvailableQuantity,
  price,
  setPrice,
  setImageFile,
  handleOnSubmit,
  message,
  setMessage,
}) {
  return (
    <div className="mt-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#5b4e40]">Existing Products</h2>
        <button
          className="bg-[#5b4e40] text-white px-5 py-2 rounded-md shadow hover:bg-[#4a3e34] transition  rounded-xl"
          onClick={() => {
            setEditMode(false);
            setMessage("");
            setProductName("");
            setCategory("");
            setUnitMeasure("");
            setAvailableQuantity("");
            setPrice("");
            setImageFile(null);
            setShowModal(true);
          }}
        >
          + Add Product
        </button>
      </div>

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
                  className="even:bg-[#fbf9f6] border-t border-[#e0d7cd]"
                >
                  <td className="px-4 py-3">
                    {product.image_url ? (
                      <img
                        src={`http://localhost:8801${product.image_url}`}
                        alt={product.product_name}
                        className="w-14 h-14 object-cover rounded-md"
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
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => onDelete(product.product_id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-xl border border-[#5b4e40]">
            <h2 className="text-2xl font-bold text-[#5b4e40] mb-6">
              {editMode ? "Update Product" : "Add Product"}
            </h2>

            <form onSubmit={handleOnSubmit} className="space-y-5" encType="multipart/form-data">
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
                  <label className="block mb-1 font-medium text-[#5b4e40]">{label}</label>
                  <input
                    type={type}
                    value={value}
                    step={step}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border border-[#b3a18b] px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5b4e40]"
                  />
                </div>
              ))}

              <div>
                <label className="block mb-1 font-medium text-[#5b4e40]">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-[#d6c9b4] px-4 py-2 rounded-md"
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
                <label className="block mb-1 font-medium text-[#5b4e40]">Unit of Measure</label>
                <select
                  value={unitMeasure}
                  onChange={(e) => setUnitMeasure(e.target.value)}
                  className="w-full border border-[#d6c9b4] px-4 py-2 rounded-md"
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
                <label className="block mb-1 font-medium text-[#5b4e40]">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border border-[#d6c9b4] px-4 py-2 rounded-md"
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
                <div className="text-center text-green-700 font-medium mt-4">
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsTable;
