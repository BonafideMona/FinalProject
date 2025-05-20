import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Navigator/NavigationBar";

function SellersOrderTable() {
  const [orders, setOrders] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const navigate = useNavigate();

  const accID = sessionStorage.getItem("accID");

  const fetchOrders = () => {
    if (!accID) return;

    fetch(`http://localhost:8801/get-seller-orders?accID=${accID}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        setOrders(data.orders);
        setFetchError("");
      })
      .catch((err) => {
        setFetchError(err.message);
        setOrders([]);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [accID]);

  const handleAccept = (order_id) => {
    fetch("http://localhost:8801/update-order-status", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id, status: "Accepted" }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update status");
        return res.json();
      })
      .then(() => fetchOrders())
      .catch(() => alert("Error updating order status."));
  };

  const handleReject = (order_id) => {
    fetch("http://localhost:8801/update-order-status", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id, status: "Rejected" }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update status");
        return res.json();
      })
      .then(() => fetchOrders())
      .catch(() => alert("Error updating order status."));
  };

  return (
    <div className="w-full bg-[#fefaf4] min-h-screen">
      {/* Navigation Bar */}
      <div className="w-full">
        <NavigationBar showSearch={false} showDevelopers={false} showCart={false} />
      </div>

      {/* Content */}
      <div className="p-10">
        <button
          className="mb-6 mr-4 bg-[#ede6dd] text-[#5b4e40] font-medium px-6 py-2 rounded-xl shadow-sm hover:bg-[#d8cfc3] hover:text-[#44392e] transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#b3a18b] focus:ring-offset-1"
          onClick={() => navigate("/profile")}
        >
          ← Back to Profile
        </button>

        <h2 className="text-xl font-bold text-[#5b4e40] mb-4">
          Orders for Your Products
        </h2>

        {fetchError && (
          <div className="text-sm text-red-700 mb-4">{fetchError}</div>
        )}

        <div className="overflow-x-auto border border-[#d6c9b4] rounded-xl shadow-sm">
          <table className="w-full table-auto text-sm">
            <thead className="bg-[#f4f1ee] text-[#5b4e40]">
              <tr>
                <th className="px-4 py-3 text-left">Buyer Name</th>
                <th className="px-4 py-3 text-left">Delivery Address</th>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Unit</th>
                <th className="px-4 py-3 text-center">Qty</th>
                <th className="px-4 py-3 text-right">Total Price</th>
                <th className="px-4 py-3 text-center">Date</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr
                    key={`${order.order_id}-${index}`}
                    className="even:bg-[#fbf9f6] border-t border-[#e0d7cd] text-[#5b4e40]"
                  >
                    <td className="px-4 py-3">{order.buyer_name}</td>
                    <td className="px-4 py-3">{order.delivery_address}</td>
                    <td className="px-4 py-3 text-center">
                      {order.image_url ? (
                        <img
                          src={`http://localhost:8801${order.image_url}`}
                          alt={order.product_name}
                          className="w-14 h-14 object-cover rounded-md mx-auto"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No Image</span>
                      )}
                    </td>
                    <td className="px-4 py-3">{order.product_name}</td>
                    <td className="px-4 py-3">{order.unit_measure}</td>
                    <td className="px-4 py-3 text-center">{order.quantity}</td>
                    <td className="px-4 py-3 text-right">
                      ₱{Number(order.item_price * order.quantity).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {new Date(order.order_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">{order.order_status}</td>
                    <td className="px-4 py-3 text-center space-x-2">
                      {order.order_status !== "Accepted" && order.order_status !== "Rejected" && (
                        <>
                          <button
                            onClick={() => handleAccept(order.order_id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(order.order_id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SellersOrderTable;
