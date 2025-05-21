import React, { useState, useEffect } from "react";

const images = [
  {
    id: 1,
    url: "https://www.pixelstalk.net/wp-content/uploads/images6/Farm-Wallpaper-HD-Free-download.jpg",
  },
  { id: 2, url: "/assets/slide2.jpg" },
  { id: 3, url: "/assets/slide3.jpg" },
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex justify-center items-center py-8 bg-[#fefaf4]">
      <div className="w-[90%] max-w-7xl border-4 border-[#d6c9b4] rounded-2xl overflow-hidden shadow-lg">
        <img
          src={images[currentIndex].url}
          alt={`slide-${currentIndex}`}
          className="w-full h-[500px] object-cover object-bottom transition duration-1000 ease-in-out"
        />
      </div>

      <div className="absolute bottom-4 flex gap-3">
        {images.map((image, index) => (
          <div
              key={image.id}
            onClick={() => setCurrentIndex(index)}
            className={`h-4 w-4 rounded-full cursor-pointer transition ${
              currentIndex === index
                ? "bg-[#7c5f41]"
                : "bg-[#d6c9b4]"
            }`} 
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
