import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import LocationPicker from "../LocationPickerComponents/LocationPicker";

const CheckoutPage = () => {
  const { cartItems, clearCart, addToCart, decreaseQuantity } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [accID, setAccID] = useState(null);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const id = sessionStorage.getItem("accID");
    const storedAddress = sessionStorage.getItem("address");
    if (!id) return;

    setAccID(id);
    if (storedAddress) {
      setAddress(storedAddress);
    } else {
      fetch(`http://localhost:8801/api/accounts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setAddress(data.address || "");
        })
        .catch((err) => console.error("Failed to fetch address:", err));
    }
  }, []);

  // ✅ Handle placing order
  const handlePlaceOrder = () => {
    if (!address.trim()) {
      alert("Address cannot be empty.");
      return;
    }

    const orderData = {
      accID,
      address,
      total_amount: totalPrice,
      quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        seller_accID: item.accID,
      })),
    };
    setIsSubmitting(true);

    fetch("http://localhost:8801/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to place order.");
        return res.json();
      })
      .then(() => {
        setMessage("Order placed successfully!");
        clearCart();
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((err) => {
        setMessage("Failed to place order.");
        console.error(err);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <LocationPicker
        onAddressSelect={(selectedAddress) => setAddress(selectedAddress)}
      />
      {/* Address Form */}
      <div className="mb-6">
        <label htmlFor="address" className="block font-medium mb-1">
          Delivery Address
        </label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={3}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter your delivery address..."
        />
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y mb-6">
            {cartItems.map((item) => (
              <li
                key={item.product_id}
                className="py-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:8801${item.image_url}`}
                    alt={item.product_name}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <button
                        onClick={() => decreaseQuantity(item.product_id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                      >
                        −
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      ₱{item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  ₱{(item.quantity * item.price).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <div className="text-right mb-4">
            <p className="text-lg font-bold">Total: ₱{totalPrice.toFixed(2)}</p>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>

          {message && <p className="mt-4 text-green-600">{message}</p>}
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
