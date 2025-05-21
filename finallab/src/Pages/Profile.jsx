import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../Navigator/NavigationBar";
import { GoPerson } from "react-icons/go";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const name = sessionStorage.getItem("accName");
    const email = sessionStorage.getItem("email");
    const accID = sessionStorage.getItem("accID");

    if (name && email && accID) {
      setUser({
        name: name,
        email: email,
        joined: "2025",
        role: "User",
        avatar: "",
      });
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fefaf4] flex justify-center items-center text-[#5b4e40]">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fefaf4]">
      <NavigationBar showSearch={false} showDevelopers={false} showCart={false} />

      <div className="max-w-6xl mx-auto p-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <button
              className="mb-6 mr-4 bg-[#ede6dd] text-[#5b4e40] font-medium px-6 py-2 rounded-xl shadow-sm hover:bg-[#d8cfc3] hover:text-[#44392e] transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#b3a18b] focus:ring-offset-1"
            >
              ← Back to Home
            </button>
          </Link>
        </div>
    
        {/* Profile Card */}
        <div className="bg-white border border-[#d6c9b4] rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6 mb-8">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-28 h-28 rounded-full border-4 border-[#e0d2ba] object-cover"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center rounded-full border-4 border-[#e0d2ba] bg-[#e0d2ba] text-[#5b4e40] text-6xl">
              <GoPerson />
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-[#5b4e40]">{user.name}</h2>
            <p className="text-[#7c5f41]">{user.email}</p>
            <p className="text-sm text-[#9e8c6c] mt-1">{user.role}</p>
            <p className="text-sm text-[#b3a18b]">Member since {user.joined}</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Manage Products */}
          <div className="p-5 bg-[#fefaf4] border border-[#d6c9b4] rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-[#5b4e40] mb-2">
              Manage Products
            </h3>
            <p className="text-sm text-[#7c5f41] mb-3">
              Add or manage your agricultural products.
            </p>
            <Link
              to="/AddProductForm"
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-[#5b4e40] rounded-md hover:bg-[#4a3f35] transition"
            >
              Go to Product Management
            </Link>
          </div>

          {/* Order History */}
          <div className="p-5 bg-[#fefaf4] border border-[#d6c9b4] rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-[#5b4e40] mb-2">
              Order History
            </h3>
            <p className="text-sm text-[#7c5f41] mb-3">
              View your past orders and transactions.
            </p>
            <Link
              to="/orderhistorypage"
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-[#5b4e40] rounded-md hover:bg-[#4a3f35] transition"
            >
              View Order History
            </Link>
          </div>

          {/* Manage Orders */}
          <div className="p-5 bg-[#fefaf4] border border-[#d6c9b4] rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-[#5b4e40] mb-2">
              Manage Orders
            </h3>
            <p className="text-sm text-[#7c5f41] mb-3">Manage order products.</p>
            <Link
              to="/orderpage"
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-[#5b4e40] rounded-md hover:bg-[#4a3f35] transition"
            >
              Go to Order Management
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
