import { useParams, Link } from "react-router";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import useAxios from "../hooks/useAxios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const axios = useAxios();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch single product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        if (res.data.success) {
          setProduct(res.data.product);
        } else {
          setError(res.data.message || "Product not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Fetch similar products by category
  useEffect(() => {
    if (!product) return;

    const fetchSimilar = async () => {
      try {
        const res = await axios.get(`/products?category=${product.category}`);
        if (res.data.success) {
          setSimilarProducts(
            res.data.products.filter(
              (p) =>
                p._id !== product._id &&
                p.category === product.category &&
                p.stock > 0
            )
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSimilar();
  }, [product]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Product Image */}
        {product.img && (
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        )}

        {/* Product Info */}
        <div className="flex flex-col">
          {product.name && (
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
          )}

          {product.price && (
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-semibold text-[var(--secondary-color)]">
                ৳{" "}
                {Math.round(
                  product.price - (product.price * product.discount) / 100 || 0
                )}{" "}
                TK
              </span>
              {product.discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  ৳ {product.price} TK
                </span>
              )}
            </div>
          )}

          {product.country && (
            <div className="mb-6">
              <span className="text-sm text-gray-600">
                Made in{" "}
                <span className="text-[var(--secondary-color)] font-medium">
                  {product.country}
                </span>
              </span>
            </div>
          )}

          {product.stock !== undefined && (
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="text-sm text-green-600 font-medium">
                  In Stock: {product.stock} items
                </span>
              ) : (
                <span className="text-sm text-red-600 font-medium">
                  Out of Stock
                </span>
              )}
            </div>
          )}

          {product.discount > 0 && (
            <div className="mb-6">
              <span className="text-sm text-green-600 font-medium">
                Discount: {product.discount}% off
              </span>
            </div>
          )}

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className={`flex justify-center items-center gap-2 py-3 px-6 rounded-lg text-white font-medium transition ${
              product.stock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] duration-200"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            {product.stock === 0 ? "Unavailable" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Product Description Section */}
      {product.shortDesc && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {product.shortDesc}
          </p>
        </div>
      )}

      {/* Detailed Description Section */}
      {product.description && product.description.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {product.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-14">
          <h2 className="text-2xl font-semibold mb-6">Similar Products</h2>

          <Carousel
            responsive={responsive}
            partialVisible
            arrows
            containerClass="pb-6"
            itemClass="px-3"
          >
            {similarProducts.map((item) => (
              <div
                key={item._id}
                className="h-full bg-white border rounded-xl shadow hover:shadow-lg transition flex flex-col"
              >
                <Link to={`/products/${item._id}`}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                </Link>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold mb-1">{item.name}</h3>

                  <span className="text-[var(--secondary-color)] font-bold mb-3">
                    ৳{" "}
                    {Math.round(
                      item.price - (item.price * item.discount) / 100
                    )}{" "}
                    TK
                  </span>

                  <Link
                    to={`/products/${item._id}`}
                    className="mt-auto text-center bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white py-2 rounded-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
