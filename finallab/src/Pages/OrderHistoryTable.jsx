import React, { useEffect, useState } from "react";

function OrderHistoryTable({ accID }) {
  const [orders, setOrders] = useState([]);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
        const accID = sessionStorage.getItem("accID");
      console.log("Fetching orders for accID:", accID);

    if (!accID) return;

    fetch(`http://localhost:8801/get-order-history?accID=${accID}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch order history");
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
  }, [accID]);

  console.log(orders)
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Order History</h2>

      {fetchError && (
        <div className="text-sm text-red-700 mb-2">{fetchError}</div>
      )}

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Unit</th>
            <th className="border px-4 py-2">Qty</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={index} className="even:bg-gray-50">
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
                <td className="border px-4 py-2">{order.product_category}</td>
                <td className="border px-4 py-2">{order.unit_measure}</td>
                <td className="border px-4 py-2 text-center">{order.quantity}</td>
                <td className="border px-4 py-2 text-right">${Number(order.price).toFixed(2)}</td>
                <td className="border px-4 py-2 text-center">{new Date(order.order_date).toLocaleDateString()}</td>
                <td className="border px-4 py-2 text-center">{order.order_status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4 text-gray-500 italic">
                No order history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistoryTable;
