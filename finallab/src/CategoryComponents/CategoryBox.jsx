import React from 'react';

function CategoryBox({ title }) {
    return (
      <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md">
        <div className="w-16 h-16 bg-gray-200 mb-2">aaa</div>
        <p className="text-sm font-medium text-gray-700">{title}</p>
      </div>
    );
  }

  export default CategoryBox;