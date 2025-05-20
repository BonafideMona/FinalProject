import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TrendingProductsBox from "../TrendingProductsComponents/TrendingProductsBox"; // Adjust the path as needed

function ProductPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8801/products-by-category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        const fetchedProducts = data.products || [];
        setProducts(fetchedProducts);

        // Initialize quantities per product
        const initialQuantities = {};
        fetchedProducts.forEach((product) => {
          initialQuantities[product.product_id] = 1;
        });
        setQuantities(initialQuantities);

        setLoading(false);
      });
  }, [category]);

  const increment = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const addToCart = (product, quantity) => {
    console.log("Add to cart:", product, "Quantity:", quantity);
    // Replace with your cart logic or context
  };

  // Group products by product_category
  const grouped = products.reduce((acc, product) => {
    const group = product.product_category || "Other";
    if (!acc[group]) acc[group] = [];
    acc[group].push(product);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 capitalize">{category} Products</h2>
      {loading ? (
        <div>Loading...</div>
      ) : products.length === 0 ? (
        <div>No products found in this category.</div>
      ) : (
        Object.entries(grouped).map(([groupName, groupProducts]) => (
          <section key={groupName} className="mb-10">
            <h3 className="text-lg font-semibold mb-4 text-[#5b4e40] capitalize">
              {groupName}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {groupProducts.map((product) => (
                <TrendingProductsBox
                  key={product.product_id}
                  name={product.product_name}
                  price={product.price}
                  image={`http://localhost:8801${product.image_url}`}
                  quantity={quantities[product.product_id]}
                  onIncrement={() => increment(product.product_id)}
                  onDecrement={() => decrement(product.product_id)}
                  onAddToCart={() =>
                    addToCart(product, quantities[product.product_id])
                  }
                />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

export default ProductPage;
