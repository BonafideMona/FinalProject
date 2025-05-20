import React, { useEffect, useState } from "react";

function SellersOrderTable() {
  const [orders, setOrders] = useState([]);
  const [fetchError, setFetchError] = useState("");

  const fetchOrders = () => {
    const accID = sessionStorage.getItem("accID");
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
  }, []);

  const handleAccept = (order_id) => {
    fetch("http://localhost:8801/update-order-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_id, status: "Accepted" }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update status");
        return res.json();
      })
      .then(() => {
        fetchOrders(); // Refresh the table
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating order status.");
      });
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Orders for Your Products</h2>

      {fetchError && <div className="text-sm text-red-700 mb-2">{fetchError}</div>}

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Buyer Name</th>
            <th className="border px-4 py-2">Delivery Address</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Unit</th>
            <th className="border px-4 py-2">Qty</th>
            <th className="border px-4 py-2">Total Price</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={`${order.order_id}-${index}`} className="even:bg-gray-50">
                <td className="border px-4 py-2">{order.buyer_name}</td>
                <td className="border px-4 py-2">{order.delivery_address}</td>
                <td className="border px-4 py-2 text-center">
                  {order.image_url ? (
                    <img
                      src={`http://localhost:8801${order.image_url}`}
                      alt={order.product_name}
                      className="w-16 h-16 object-cover rounded mx-auto"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Image</span>
                  )}
                </td>
                <td className="border px-4 py-2">{order.product_name}</td>
                <td className="border px-4 py-2">{order.unit_measure}</td>
                <td className="border px-4 py-2 text-center">{order.quantity}</td>
                <td className="border px-4 py-2 text-right">
                  ${Number(order.item_price * order.quantity).toFixed(2)}
                </td>
                <td className="border px-4 py-2 text-center">
                  {new Date(order.order_date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 text-center">{order.order_status}</td>
                <td className="border px-4 py-2 text-center">
                  {order.order_status !== "Accepted" && (
                    <button
                      onClick={() => handleAccept(order.order_id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Accept
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4 text-gray-500 italic">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SellersOrderTable;
