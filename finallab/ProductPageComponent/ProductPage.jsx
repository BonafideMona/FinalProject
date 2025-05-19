import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8801/products-by-category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 capitalize">{category} Products</h2>
      {loading ? (
        <div>Loading...</div>
      ) : products.length === 0 ? (
        <div>No products found in this category.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.product_id} className="border rounded p-4">
              <img
                src={product.image_url}
                alt={product.product_name}
                className="w-full h-32 object-cover mb-2"
              />
              <h3 className="font-semibold">{product.product_name}</h3>
              <p>₱{product.price}</p>
              <p>Available: {product.avail_qty}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default 