import React from "react";
import { useNavigate } from "react-router-dom";

function DeveloperPage() {
  const navigate = useNavigate();

  const developers = [
    {
      name: "Carlos Miguel M. Carla",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocKoM4yJA8blzgjCkFMWTTOv7TLWOIhnm5Z32II4qJv0WOA_Y8v7=s317-c-no",
    },
    {
      name: "Lance Joshua J. Hilario",
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjUzmVnwqUC8VodRTqaDuEpYCUYLLZ9G6JunGHuq5W9tlIwlhhY=s265-p-k-rw-no",
    },
    {
      name: "Josh Denziel S. Joves",
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjU_aHxz5dhd5DLf2IOWkfoF4y6bdKh56kOg18JidOsNyVNZQKk=s265-p-k-rw-no",
    },
    {
      name: "Adrian Dale G. Relevo",
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjXA1eRkvTj_g5j8_d7TbmX9Y1Yr7YDBUT98NClLgrJyDfqbOPM=s265-p-k-rw-no",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fefaf4] py-12 px-6">
      
      {/* Back Button */}
      <button
          className="mb-6 mr-4 bg-[#ede6dd] text-[#5b4e40] font-medium px-6 py-2 rounded-xl shadow-sm hover:bg-[#d8cfc3] hover:text-[#44392e] transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#b3a18b] focus:ring-offset-1"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#5b4e40]">Meet the Developers</h2>
        <p className="text-[#a48f75] mt-2 text-sm">The minds behind the project</p>
      </div>

      {/* Developer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {developers.map((dev, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white rounded-xl p-4 border border-[#d6c9b4] shadow-md hover:shadow-lg transition"
          >
            <img
              src={dev.image}
              alt={dev.name}
              className="w-28 h-28 object-cover rounded-full border-4 border-[#d6c9b4] mb-4"
            />
            <h3 className="text-md text-[#5b4e40] font-semibold text-center">
              {dev.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeveloperPage;
