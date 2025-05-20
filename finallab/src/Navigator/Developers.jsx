import React from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Navigator/NavigationBar"; // Adjust path as needed

function Developers() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fefaf4]">
      <NavigationBar showCart={false} />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-[#d6c9b4] text-[#5b4e40] rounded hover:bg-[#c3b49f] transition"
        >
          ← Back
        </button>

        <p className="text-gray-500 text-lg mb-2">Team Developers</p>
        <h1 className="font-medium text-2xl text-[#5b4e40] hover:underline cursor-pointer">
          Click here!
        </h1>
      </div>
    </div>
  );
}

export default Developers;
