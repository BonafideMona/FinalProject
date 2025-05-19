import React from "react";
import { useNavigate } from "react-router-dom";

function DeveloperPage() {
  const navigate = useNavigate();

  const developers = [
    {
      name: "Carlos Miguel M. Carla",
      image: "https://lh3.googleusercontent.com/a/ACg8ocKoM4yJA8blzgjCkFMWTTOv7TLWOIhnm5Z32II4qJv0WOA_Y8v7=s317-c-no",
    },
    {
      name: "Lance Joshua J. Hilario",
      image: "https://lh3.googleusercontent.com/a-/ALV-UjUzmVnwqUC8VodRTqaDuEpYCUYLLZ9G6JunGHuq5W9tlIwlhhY=s265-p-k-rw-no",
    },
    {
      name: "Josh Denziel S. Joves",
      image: "https://lh3.googleusercontent.com/a-/ALV-UjU_aHxz5dhd5DLf2IOWkfoF4y6bdKh56kOg18JidOsNyVNZQKk=s265-p-k-rw-no",
    },
    {
      name: "Adrian Dale G. Relevo",
      image: "https://lh3.googleusercontent.com/a-/ALV-UjXA1eRkvTj_g5j8_d7TbmX9Y1Yr7YDBUT98NClLgrJyDfqbOPM=s265-p-k-rw-no",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-8 text-sm text-blue-600 hover:underline"
      >
        ← Back to Home
      </button>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-800">Meet the Developers</h2>
        <p className="text-gray-500 mt-1 text-sm">The minds behind the project</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {developers.map((dev, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={dev.image}
              alt={dev.name}
              className="w-24 h-24 object-cover rounded-full mb-2"
            />
            <h3 className="text-base text-gray-700 font-medium text-center">{dev.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeveloperPage;
