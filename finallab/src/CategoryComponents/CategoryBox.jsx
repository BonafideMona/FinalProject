import React from "react";
import fruitImg from "../assets/fruit.jpg";
import vegetableImg from "../assets/vegetable.jpg";
import grainImg from "../assets/grain.jpg";
import legumeImg from "../assets/legume.jpg";
import rootImg from "../assets/root.jpg";
import herbImg from "../assets/herb.jpg";
import nutsImg from "../assets/nuts.webp";
import dairyImg from "../assets/dairy.jpg";
import livestockImg from "../assets/livestock.jpg";
import flowersImg from "../assets/flowers.jpg";
import beverageImg from "../assets/beverage.png";

const categoryImages = {
  fruit: fruitImg,
  vegetable: vegetableImg,
  grain: grainImg,
  legume: legumeImg,
  root: rootImg,
  herb: herbImg,
  nuts: nutsImg,
  dairy: dairyImg,
  livestock: livestockImg,
  flowers: flowersImg,
  beverage: beverageImg,
};

function CategoryBox({ title }) {
  // Lowercase to match the keys in categoryImages
  const imgSrc = categoryImages[title.toLowerCase()];

  return (
    <div className="flex flex-col items-center justify-between h-full p-4 rounded-2xl border border-[#d6c9b4] bg-[#fefaf4] shadow-md hover:shadow-lg transition">
      <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-lg bg-[#e0d2ba] text-[#6b4f37] text-xs font-semibold">
        {imgSrc ? (
          <img src={imgSrc} alt={title} className="w-20 h-20 object-contain" />
        ) : (
          "No Image"
        )}
      </div>
      <p className="text-sm font-medium text-[#5b4e40] text-center truncate">{title}</p>
    </div>
  );
}

export default CategoryBox;