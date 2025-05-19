import { useContext, useState, useRef, useEffect } from "react";
import React from "react";
import { RiArrowDropDownFill } from "react-icons/ri";
import { CartContext } from "../contexts/CartContext";

function Cart() {
  const { cartItems } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const toggleDropdown = () => setIsOpen(!isOpen);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
        <h1 className="mr-1">Your Cart</h1>
        <RiArrowDropDownFill />
      </div>
      <div className="text-sm text-gray-800">
        <p className="font-medium">Items: {totalQuantity}</p>
        <p className="font-bold">${totalPrice.toFixed(2)}</p>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md border z-50 p-4 max-h-96 overflow-y-auto">
          <h2 className="text-md font-semibold mb-2">Cart Items</h2>
          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <ul className="text-sm">
                {cartItems.map((item) => (
                  <li key={item.product_id} className="flex justify-between mb-2">
                    <div>
                      <p className="font-medium">{item.product_name}</p>
                      <p className="text-gray-500 text-xs">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-bold">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </li>
                ))}
                <hr className="my-2" />
                <li className="flex justify-between font-bold mb-2">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </li>
              </ul>
              <button
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-semibold transition-colors"
                onClick={() => {
                  // You can navigate to a checkout page or trigger a modal here
                  console.log("Proceeding to checkout...");
                }}
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}


export default Cart;
