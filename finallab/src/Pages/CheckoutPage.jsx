import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import LocationPicker from "../LocationPickerComponents/LocationPicker";
import NavigationBar from "../Navigator/NavigationBar";

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
      headers: { "Content-Type": "application/json" },
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
    <div className="bg-[#fefaf4] min-h-screen">
      <NavigationBar showCart={true} />

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-[#5b4e40] hover:underline mb-6 text-sm flex items-center gap-2"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-semibold text-[#5b4e40] mb-12 border-b pb-4">
          Checkout
        </h1>

        {/* Location Picker */}
        <div className="mb-10">
          <LocationPicker
            onAddressSelect={(selectedAddress) => setAddress(selectedAddress)}
          />
        </div>

        {/* Address Input */}
        <div className="mb-12">
          <label htmlFor="address" className="block text-[#5b4e40] font-medium mb-2 text-lg">
            Delivery Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={4}
            className="w-full border border-[#d6c2ae] rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b08558] bg-white text-base"
            placeholder="Enter your delivery address..."
          />
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="text-[#b85c5c] italic text-lg">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-[#e0d7cd] mb-12">
              {cartItems.map((item) => (
                <li
                  key={item.product_id}
                  className="py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  <div className="flex gap-6 w-full md:w-auto">
                    <img
                      src={`http://localhost:8801${item.image_url}`}
                      alt={item.product_name}
                      className="w-24 h-24 object-cover rounded border border-[#d6c2ae]"
                    />
                    <div>
                      <p className="font-medium text-[#5b4e40] text-lg">
                        {item.product_name}
                      </p>
                      <div className="flex items-center mt-3 space-x-2">
                        <button
                          onClick={() => decreaseQuantity(item.product_id)}
                          className="px-3 py-1 bg-[#eee6dd] rounded hover:bg-[#e0d7cd] text-sm"
                        >
                          −
                        </button>
                        <span className="text-base">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="px-3 py-1 bg-[#eee6dd] rounded hover:bg-[#e0d7cd] text-sm"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm text-[#9c8b7b] mt-2">
                        ₱{item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                  <div className="text-right font-semibold text-[#5b4e40] text-lg w-full md:w-auto">
                    ₱{(item.quantity * item.price).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>

            {/* Total and Place Order */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
              <p className="text-3xl font-bold text-[#5b4e40]">
                Total: ₱{totalPrice.toFixed(2)}
              </p>
              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="bg-[#6b8e23] text-white px-8 py-3 rounded hover:bg-[#5f7e1c] transition-colors text-base"
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </div>

            {/* Confirmation Message */}
            {message && (
              <p className="text-center text-green-600 font-medium text-lg mt-6">
                {message}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
