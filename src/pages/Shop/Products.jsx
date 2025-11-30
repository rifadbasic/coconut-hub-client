import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useOutletContext } from "react-router";
import { ShoppingCart } from "lucide-react";
import useAxios from "../../hooks/useAxios";
import { useCart } from "../../context/CartContext";

const Products = () => {
  const axiosPublic = useAxios();
  const { addToCart } = useCart();

  const { sortOption, selectedCategories, productsRefreshFlag } =
    useOutletContext() || {};

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // console.log(products);

  const observer = useRef();
  const isFetching = useRef(false);

  const loadProducts = async () => {
    if (!hasMore || isFetching.current) return;

    try {
      isFetching.current = true;
      setLoading(true);

      const categoryQuery =
        selectedCategories.length > 0
          ? `&category=${selectedCategories.join(",")}`
          : "";
      const sortQuery = sortOption ? `&sort=${sortOption}` : "";

      const res = await axiosPublic.get(
        `/products?page=${page}&limit=10${categoryQuery}${sortQuery}`
      );

      setProducts((prev) => [...prev, ...res.data.products]);
      setHasMore(res.data.hasMore);
    } catch (err) {
      console.log(err);
    } finally {
      isFetching.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page]);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [sortOption, selectedCategories, productsRefreshFlag]);

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching.current) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-green-700 bg-amber-300 p-4 mb-10 rounded-xl">
        🥥 Our Coconut Products
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => {
          const isLast = index === products.length - 1;

          return (
            <div
              key={product._id}
              ref={isLast ? lastElementRef : null}
              className="bg-white shadow-md rounded-2xl overflow-hidden border hover:shadow-lg transition-all duration-300 flex flex-col relative"
            >
              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}%
                </div>
              )}

              {/* Product Image */}
              <Link to={`/products/${product._id}`} className="overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-56 object-cover hover:scale-105 duration-300"
                />
              </Link>

              <div className="p-4 flex flex-col flex-grow">
                <p className="text-xs font-semibold text-green-600 mb-1">
                  {product.category}
                </p>

                <Link to={`/products/${product._id}`}>
                  <h2 className="text-lg font-semibold text-gray-800 hover:text-green-600 duration-200">
                    {product.name}
                  </h2>
                </Link>

                {/* Price & Original Price */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-green-700 font-bold text-lg">
                    ৳{(product.finalPrice === 0 ? (Math.round(product.price)) : (Math.round(product.finalPrice )) || [])}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-gray-500 line-through text-sm">{`৳${(Math.round(product.price))}`}</span>
                  )}
                </div>

                {/* Stock */}

                {/* Weight & Quantity (side by side) */}
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Weight: {product.weight > 0 && (product.weight / 1000).toFixed(2)} kg</span>
                  <span>
                    <p
                      className={`mt-1 text-sm ${
                        product.stock > 0 ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {product.stock > 0
                        ? `In stock: ${product.stock}`
                        : "Out of Stock"}
                    </p>
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className={`mt-auto flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-white font-medium duration-300 ${
                    product.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.stock === 0 ? "Unavailable" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {loading && (
        <p className="text-center py-6 text-green-700 font-medium">
          Loading more products...
        </p>
      )}

      {!hasMore && products.length > 0 && (
        <p className="text-center py-6 text-gray-500">No more products 😌</p>
      )}
    </div>
  );
};

export default Products;
