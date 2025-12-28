import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useOutletContext, useSearchParams } from "react-router";
import { ShoppingCart } from "lucide-react";
import useAxios from "../hooks/useAxios";
import { useCart } from "../context/CartContext";

const Combos = () => {
  const axiosPublic = useAxios();
  const { addToCart } = useCart();

  const {
    sortOption = "",
    selectedCategories = [],
    productsRefreshFlag,
  } = useOutletContext() || {};

  const [params] = useSearchParams();
  const query = params.get("q");

  const isSearching = Boolean(query);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  console.log(products);

  const observer = useRef(null);
  const isFetching = useRef(false);

  // 🔥 MAIN FETCH FUNCTION (NORMAL PRODUCTS ONLY)
  const loadProducts = useCallback(
    async (reset = false) => {
      if (isSearching) return;
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
          `/products?page=${currentPage}&limit=10&status=combo${categoryQuery}${sortQuery}`
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
    [page, sortOption, selectedCategories, hasMore, isSearching, axiosPublic]
  );

  // 🔍 SEARCH RESULTS (RESET EVERYTHING)
  useEffect(() => {
    if (!query) return;

    const fetchSearch = async () => {
      try {
        setLoading(true);
        setHasMore(false);
        setPage(1);

        const res = await axiosPublic.get(
          `/products?search=${query}&status=combo`
        );

        console.log("API products:", res.data.products);


        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // ✅ CORRECT PLACE
      }
    };

    fetchSearch();
  }, [query, axiosPublic]);

  // 📌 PAGE CHANGE → LOAD MORE (ONLY WHEN NOT SEARCHING)
  useEffect(() => {
    if (isSearching) return;
    loadProducts();
  }, [page]);

  // 🔁 FILTER / SORT CHANGE
  useEffect(() => {
    if (isSearching) return;

    setPage(1);
    setHasMore(true);
    loadProducts(true);
  }, [sortOption, selectedCategories, productsRefreshFlag]);

  // 👀 INTERSECTION OBSERVER
  const lastElementRef = useCallback(
    (node) => {
      if (loading || isSearching) return;
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
              All Combo Products
            </h1>
          </>
        )}
      </h1>

      {products.length === 0 && !loading ? (
        // 🔹 Show message when no new products
        <p className="text-center text-gray-500 py-6 text-lg">
          No New Arrival Products
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => {
            const isLast = index === products.length - 1;

            return (
              <div
                key={product._id}
                ref={!isSearching && isLast ? lastElementRef : null}
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
                      ৳{" "}
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

                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className={`mt-auto flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white font-medium transition ${
                      product.stock === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[var(--secondary-color)] hover:bg-[var(--primary-color)]"
                    }`}
                  >
                    <ShoppingCart className="inline w-4 h-4 mr-1" />
                    {product.stock === 0 ? "Unavailable" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {loading && (
        <p className="text-center py-6 text-green-700">Loading products...</p>
      )}

      {!isSearching && !hasMore && products.length > 0 && (
        <p className="text-center py-6 text-gray-500">No more products 😌</p>
      )}
    </div>
  );
};

export default Combos;
