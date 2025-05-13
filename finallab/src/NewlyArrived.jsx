import React from 'react';
function NewlyArrived() {
    return (
      <section className="py-8 px-4">
        <h2 className="text-xl font-semibold mb-6">Newly Arrived Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[...Array(6)].map((title, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md"
            >
              <div className="w-16 h-16 bg-gray-200 mb-2"></div>
              <p className="text-sm text-gray-700 text-center">
                Amber Jar<br />Honey best nectar<br />you wish to get
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default NewlyArrived;