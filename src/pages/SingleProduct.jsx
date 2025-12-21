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
    partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
  },
};

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  // Axios
  const axios = useAxios();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // console.log(product);

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
        <div className="overflow-hidden rounded-xl shadow-lg">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-semibold text-[var(--secondary-color)]">
              ৳{" "}
              {Math.round(
                product.price - (product.price * product.discount) / 100 || []
              )}{" "}
              TK
            </span>
            <span className="text-gray-500 line-through">৳{product.price}</span>
          </div>

          {/* add country name */}
          <div className="mb-6">
            <span className="text-sm text-gray-600">
               Made in <span className="text-[var(--secondary-color)] font-medium">{product.country}</span>
            </span>
          </div>

          {/* <p
            className={`mb-4 text-sm ${
              product.stock > 0 ? "text-[var(--secondary-color)]" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? `In stock: ${product.stock}` : "Out of Stock"}
          </p> */}

          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === ""}
            className={`flex items-center gap-2 py-3 px-6 rounded-lg text-white font-medium transition ${
              product.stock === ""
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] duration-200"
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
         Product Details
        </h2>
        <p className="text-gray-600">{product.shortDesc}</p>
      </div>

      {/* ================= Similar Products ================= */}
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
