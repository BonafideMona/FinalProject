import React from "react";

function CategoryBox({ title }) {
  return (
    <div className="flex flex-col items-center justify-between h-full p-4 rounded-2xl border border-[#d6c9b4] bg-[#fefaf4] shadow-md hover:shadow-lg transition">
      <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-lg bg-[#e0d2ba] text-[#6b4f37] text-xs font-semibold">
        {/* Replace with actual icon/image */}
        Icon
      </div>
      <p className="text-sm font-medium text-[#5b4e40] text-center truncate">{title}</p>
    </div>
  );
}

export default CategoryBox;
