import { Link, useOutletContext } from "react-router";
import { useMemo, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

const Products = () => {
  const { sortOption, selectedCategories } = useOutletContext();
  const { addToCart } = useCart();

  const [products] = useState([
    {
      id: 1,
      name: "Fresh Green Coconut",
      image: "https://i.ibb.co.com/JMwH4wp/download-1.jpg",
      mainPrice: 150,
      discountPrice: 120,
      quantity: 10,
      rating: 4.5,
      category: "Fresh Coconuts",
    },
    {
      id: 2,
      name: "Mature Brown Coconut",
      image: "https://i.ibb.co/3RccQMn/brown-coconut.jpg",
      mainPrice: 180,
      discountPrice: 150,
      quantity: 0,
      rating: 4,
      category: "Fresh Coconuts",
    },
    {
      id: 3,
      name: "Coconut Oil Bottle",
      image: "https://i.ibb.co/ChTn9pQ/coconut-oil.jpg",
      mainPrice: 350,
      discountPrice: 299,
      quantity: 8,
      rating: 3.5,
      category: "Coconut Oil",
    },
    {
      id: 4,
      name: "Dry Coconut Pack",
      image: "https://i.ibb.co/Q8rG4k7/dry-coconut.jpg",
      mainPrice: 250,
      discountPrice: 220,
      quantity: 5,
      rating: 4.2,
      category: "Dry Coconuts",
    },
    {
      id: 5,
      name: "Coconut Cream",
      image: "https://i.ibb.co/PMBbTTF/coconut-cream.jpg",
      mainPrice: 300,
      discountPrice: 270,
      quantity: 12,
      rating: 4.6,
      category: "Cosmetics",
    },
  ]);

  // Sort + Filter Logic
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Sort by price
    if (sortOption === "lowToHigh") {
      filtered.sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (sortOption === "highToLow") {
      filtered.sort((a, b) => b.discountPrice - a.discountPrice);
    }

    return filtered;
  }, [products, sortOption, selectedCategories]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-green-700 bg-amber-400 p-4 mb-10">
        🥥 Our Coconut Products
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600">
          No products match your filter.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden border hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <Link to={`/product/${product.id}`} className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover hover:scale-105 duration-300"
                />
              </Link>

              <div className="p-4 flex flex-col flex-grow">
                <Link to={`/product/${product.id}`}>
                  <h2 className="text-lg font-semibold text-gray-800 hover:text-green-600 duration-200">
                    {product.name}
                  </h2>
                </Link>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-green-700 font-bold text-lg">
                    ৳{product.discountPrice}
                  </span>
                  <span className="text-gray-500 line-through text-sm">
                    ৳{product.mainPrice}
                  </span>
                </div>

                <p
                  className={`mt-1 text-sm ${
                    product.quantity > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {product.quantity > 0
                    ? `In stock: ${product.quantity}`
                    : "Out of Stock"}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  disabled={product.quantity === 0}
                  className={`mt-auto flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-white font-medium duration-300 ${
                    product.quantity === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.quantity === 0 ? "Unavailable" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
