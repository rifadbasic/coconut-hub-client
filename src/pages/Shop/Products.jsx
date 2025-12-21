import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useOutletContext, useSearchParams } from "react-router";
import { ShoppingCart } from "lucide-react";
import useAxios from "../../hooks/useAxios";
import { useCart } from "../../context/CartContext";

const Products = () => {
  const axiosPublic = useAxios();
  const { addToCart } = useCart();

  const {
    sortOption = "",
    selectedCategories = [],
    productsRefreshFlag,
  } = useOutletContext() || {};

  const [params] = useSearchParams();
  const query = params.get("q");

  const isSearching = Boolean(query); // ✅ FIX: search mode flag

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef(null);
  const isFetching = useRef(false);

  // 🔥 MAIN FETCH FUNCTION (NORMAL PRODUCTS ONLY)
  const loadProducts = useCallback(
    async (reset = false) => {
      if (isSearching) return; // ✅ FIX: stop during search
      if (isFetching.current || (!hasMore && !reset)) return;

      try {
        isFetching.current = true;
        setLoading(true);

        const categoryQuery =
          selectedCategories.length > 0
            ? `&category=${selectedCategories.join(",")}`
            : "";

        const sortQuery = sortOption ? `&sort=${sortOption}` : "";

        const currentPage = reset ? 1 : page;

        const res = await axiosPublic.get(
          `/products?page=${currentPage}&limit=10${categoryQuery}${sortQuery}`
        );

        setProducts((prev) =>
          reset ? res.data.products : [...prev, ...res.data.products]
        );

        setHasMore(res.data.hasMore);
      } catch (err) {
        console.error(err);
      } finally {
        isFetching.current = false;
        setLoading(false);
      }
    },
    [page, sortOption, selectedCategories, hasMore, isSearching]
  );

  // 🔍 SEARCH RESULTS (RESET EVERYTHING)
  useEffect(() => {
    if (!query) return;

    setLoading(true); // ✅ FIX
    setHasMore(false); // ✅ FIX: disable pagination
    setPage(1); // ✅ FIX

    axiosPublic.get(`/search?q=${query}`).then((res) => {
      if (res.data.success) {
        setProducts(res.data.products);
      }
      setLoading(false);
    });
  }, [query]);

  // 📌 PAGE CHANGE → LOAD MORE (ONLY WHEN NOT SEARCHING)
  useEffect(() => {
    if (isSearching) return; // ✅ FIX
    loadProducts();
  }, [page]);

  // 🔁 FILTER / SORT CHANGE
  useEffect(() => {
    if (isSearching) return; // ✅ FIX

    setPage(1);
    setHasMore(true);
    loadProducts(true);
  }, [sortOption, selectedCategories, productsRefreshFlag]);

  // 👀 INTERSECTION OBSERVER
  const lastElementRef = useCallback(
    (node) => {
      if (loading || isSearching) return; // ✅ FIX
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching.current) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, isSearching]
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-xl text-center text-[var(--text-color)] p-4 mb-10 rounded-xl">
        {isSearching ? (
          <>
            Search Results for{" "}
            <span className="font-bold text-[var(--secondary-color)]">
              "{query}"
            </span>
          </>
        ) : (
          <>
          <h1 className="text-3xl font-bold text-center mb-6 text-[var(--secondary-color)]">
            All Products
          </h1>
          </>
        )}
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => {
          const isLast = index === products.length - 1;

          return (
            <div
              key={product._id}
              ref={!isSearching && isLast ? lastElementRef : null} // ✅ FIX
              className="bg-white shadow-md rounded-2xl overflow-hidden border flex flex-col relative"
            >
              {product.discount > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}%
                </div>
              )}

              <Link to={`/products/${product._id}`}>
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-56 object-cover hover:scale-105 duration-300"
                />
              </Link>

              <div className="p-4 flex flex-col flex-grow">
                <p className="text-xs font-semibold text-[var(--primary-color)] mb-1">
                  {product.category}
                </p>

                <Link to={`/products/${product._id}`}>
                  <h2 className="text-lg font-semibold hover:text-[var(--secondary-color)]">
                    {product.name}
                  </h2>
                </Link>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[var(--secondary-color)] font-bold text-lg">
                    ৳ 
                     {Math.round(
                      product.price - (product.price * product.discount) / 100
                    )}
                  </span>

                  {product.discount > 0 && (
                    <span className="line-through text-sm text-gray-500">
                      ৳ {product.price}
                    </span>
                  )}
                </div>

                {/* <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Weight: {(product.weight / 1000).toFixed(2)} kg</span>
                  <span
                    className={
                      product.stock > 0 ? "text-green-600" : "text-red-500"
                    }
                  >
                    {product.stock > 0
                      ? `In stock: ${product.stock}`
                      : "Out of stock"}
                  </span>
                </div> */}

                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock === ""}
                  className={`mt-auto py-2 rounded-lg text-white ${
                    product.stock === ""
                      ? "bg-gray-400 "
                      : "bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] duration-200"
                  }`}
                >
                  <ShoppingCart className="inline w-4 h-4 mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {loading && (
        <p className="text-center py-6 text-green-700">Loading products...</p>
      )}

      {!isSearching && !hasMore && products.length > 0 && (
        <p className="text-center py-6 text-gray-500">No more products 😌</p>
      )}
    </div>
  );
};

export default Products;
