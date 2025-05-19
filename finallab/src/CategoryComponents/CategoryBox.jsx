import React from 'react';

function CategoryBox({ title }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-[#d6c9b4] bg-[#fefaf4] shadow-sm hover:shadow-md transition">
      <div className="w-16 h-16 mb-3 flex items-center justify-center rounded-lg bg-[#e0d2ba] text-[#6b4f37] text-xs font-semibold">
        {/* You can replace this text with an icon or image */}
        Icon
      </div>
      <p className="text-sm font-medium text-[#5b4e40] truncate text-center">{title}</p>
    </div>
  );
}

export default CategoryBox;
