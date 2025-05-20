import React, { useState, useEffect } from "react";

const images = [
  {
    id: 1,
    url: "https://www.pixelstalk.net/wp-content/uploads/images6/Farm-Wallpaper-HD-Free-download.jpg",
  },
  { id: 2, url: "https://www.pixelstalk.net/wp-content/uploads/images6/Asian-Farm-Wallpaper-HD.jpg" },
  { id: 3, url: "https://www.pixelstalk.net/wp-content/uploads/images6/Farm-Desktop-Wallpaper.jpg" },
];

function ImageSlider() {
  const [image, setImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImage((prevImage) => (prevImage + 1) % images.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex justify-center items-center py-10 bg-[#fefaf4]">
      <div className="w-[92%] max-w-6xl h-[600px] border-4 border-[#d6c9b4] rounded-xl overflow-hidden shadow-lg bg-white">
        <img
          src={images[image].url}
          alt={`slide-${image}`}
          className="w-full h-full object-cover transition duration-1000 ease-in-out"
        />
      </div>

      {/* Dot indicators */}
      <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 flex gap-3">
        {images.map((img, index) => (
          <div
            key={img.id}
            onClick={() => setImage(index)}
            className={`h-3 w-3 rounded-full cursor-pointer transition ${
              image === index ? "bg-[#7c5f41]" : "bg-[#d6c9b4]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
