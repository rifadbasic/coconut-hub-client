import { useParams, Link } from "react-router";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  // You can fetch this data from your backend later. For now it's static 👇
  const [products] = useState([
    {
      id: 1,
      name: "Fresh Green Coconut",
      image: "https://i.ibb.co.com/JMwH4wp/download-1.jpg",
      mainPrice: 150,
      discountPrice: 120,
      quantity: 10,
      category: "Fresh Coconuts",
      description:
        "Naturally sweet green coconuts harvested fresh daily. Perfect for refreshing drinks.",
    },
    {
      id: 2,
      name: "Mature Brown Coconut",
      image: "https://i.ibb.co/3RccQMn/brown-coconut.jpg",
      mainPrice: 180,
      discountPrice: 150,
      quantity: 0,
      category: "Fresh Coconuts",
      description:
        "Rich and mature brown coconuts, perfect for cooking or extracting oil.",
    },
    {
      id: 3,
      name: "Coconut Oil Bottle",
      image: "https://i.ibb.co/ChTn9pQ/coconut-oil.jpg",
      mainPrice: 350,
      discountPrice: 299,
      quantity: 8,
      category: "Coconut Oil",
      description: "Pure cold-pressed coconut oil, ideal for skin, hair, and cooking.",
    },
    {
      id: 4,
      name: "Dry Coconut Pack",
      image: "https://i.ibb.co/Q8rG4k7/dry-coconut.jpg",
      mainPrice: 250,
      discountPrice: 220,
      quantity: 5,
      category: "Dry Coconuts",
      description: "High-quality dried coconuts for long shelf life and rich taste.",
    },
  ]);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <p className="text-center text-gray-600 mt-10">Product not found.</p>;
  }

  // Get similar products
  const similarProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image with zoom effect */}
        <div className="overflow-hidden rounded-xl shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-semibold text-green-700">
              ৳{product.discountPrice}
            </span>
            <span className="text-gray-500 line-through">
              ৳{product.mainPrice}
            </span>
          </div>
          <p
            className={`mb-4 text-sm ${
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
            className={`flex items-center gap-2 py-3 px-6 rounded-lg text-white font-medium transition ${
              product.quantity === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            {product.quantity === 0 ? "Unavailable" : "Add to Cart"}
          </button>

          <p className="mt-6 text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          📝 Product Details
        </h2>
        <p className="text-gray-600">{product.description}</p>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            🥥 Similar Products
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similarProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <Link to={`/products/${item.id}`} className="overflow-hidden rounded-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover hover:scale-105 duration-300"
                  />
                </Link>
                <h3 className="mt-3 text-lg font-semibold">{item.name}</h3>
                <span className="text-green-700 font-bold">
                  ৳{item.discountPrice}
                </span>
                <Link
                  to={`/products/${item.id}`}
                  className="mt-auto inline-block bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg mt-3 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
