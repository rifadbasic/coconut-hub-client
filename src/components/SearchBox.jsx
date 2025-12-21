import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";

const SearchBox = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const axios = useAxios();
  const navigate = useNavigate();

  // 🔍 Live Search (debounced)
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/search?q=${encodeURIComponent(query)}`
        );

        if (res.data?.success) {
          setResults(res.data.products.slice(0, 5));
        }
      } catch (err) {
        console.error("Search failed:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchResults, 400);
    return () => clearTimeout(timer);
  }, [query, axios]);

  // 🔁 Submit → full search page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/shop/products?q=${query}`);
    onClose?.();
  };

  return (
    <div className=" sticky top-16 bg-[var(--bg-color)] z-50">
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
        />
        <button
          type="submit"
          className="bg-[var(--primary-color)] text-white px-4 rounded-md hover:bg-[var(--secondary-color)]"
        >
          Search
        </button>
      </form>

      {/* 🔽 Live Results */}
      {query.trim() && (
        <div className="absolute left-0 right-0 mt-2 bg-white border shadow-md rounded-md z-50">
          {loading && <p className="p-3 text-sm text-gray-500">Searching…</p>}

          {!loading && results.length === 0 && (
            <p className="p-3 text-sm text-gray-500">No results found</p>
          )}

          {!loading &&
            results.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  navigate(`/products/${item._id}`);
                  onClose?.();
                }}
                className="px-4 py-2 cursor-pointer hover:bg-[var(--bg-color)]"
              >
                {item.name}
              </div>
            ))}

          {results.length > 0 && (
            <button
              onClick={handleSubmit}
              className="w-full text-center py-2 text-sm text-[var(--primary-color)] hover:underline"
            >
              View all results →
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
