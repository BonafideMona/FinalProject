import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrendingProductsBox from "../TrendingProductsComponents/TrendingProductsBox";
import NavigationBar from "../Navigator/NavigationBar";
import { CartContext } from "../contexts/CartContext";

function ProductPage() {
  const { category } = useParams();
  const navigate = useNavigate(); // 🔁 for navigation
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8801/products-by-category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        const fetchedProducts = data.products || [];
        setProducts(fetchedProducts);

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

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
  };

  const grouped = products.reduce((acc, product) => {
    const group = product.product_category || "Other";
    if (!acc[group]) acc[group] = [];
    acc[group].push(product);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#fefaf4]">
      <NavigationBar showCart={true} />
      <div className="max-w-screen-2xl mx-auto px-8 py-10">
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 px-5 py-2 bg-[#5b4e40] text-white rounded hover:bg-[#4a3e33] transition-colors duration-200"
        >
          ← Back to Home
        </button>

        <h2 className="text-3xl font-semibold text-[#5b4e40] mb-8 capitalize border-b pb-2">
          {category} Products
        </h2>

        {loading ? (
          <div className="text-center text-[#5b4e40]">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-[#b85c5c] italic">
            No products found in this category.
          </div>
        ) : (
          Object.entries(grouped).map(([groupName, groupProducts]) => (
            <section key={groupName} className="mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {groupProducts.map((product) => (
                  <TrendingProductsBox
                    key={product.product_id}
                    name={product.product_name}
                    price={product.price}
                    availableQuantity={product.avail_qty}
                    image={`http://localhost:8801${product.image_url}`}
                    quantity={quantities[product.product_id]}
                    onIncrement={() => increment(product.product_id)}
                    onDecrement={() => decrement(product.product_id)}
                    onAddToCart={() =>
                      handleAddToCart(product, quantities[product.product_id])
                    }
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductPage;
