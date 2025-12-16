import React, { useState } from "react";
import { Outlet } from "react-router";
import { Filter } from "lucide-react";

const ShopLayouts = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile header */}
      <div className="lg:hidden flex justify-between p-4 border-b sticky top-15 bg-white z-30">
        <h2 className="text-xl font-semibold text-green-600">Coconut Shop</h2>
        <button onClick={() => setIsFilterOpen(true)}>
          <Filter />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-15 w-64 bg-green-50 h-full z-40 transform transition-transform 
        ${isFilterOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 `}
      >
        <div className="p-6 space-y-6 ">
          {/* SORT */}
          <div>
            <h3 className="font-semibold mb-2">Sort by Price</h3>

            <label className="flex gap-2">
              <input
                type="radio"
                name="sort"
                value="price_asc"   
                checked={sortOption === "price_asc"}
                onChange={(e) => setSortOption(e.target.value)}
              />
              Low → High
            </label>

            <label className="flex gap-2">
              <input
                type="radio"
                name="sort"
                value="price_desc" 
                checked={sortOption === "price_desc"}
                onChange={(e) => setSortOption(e.target.value)}
              />
              High → Low
            </label>
          </div>

          {/* CATEGORY */}
          <div>
            <h3 className="font-semibold mb-2">Category</h3>

            {[
              "Fresh Coconuts",
              "Oil",
              "Dry Coconuts",
              "Cosmetics",
              "Food",
              "Other",
            ].map((cat) => (
              <label key={cat} className="flex gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Products */}
      <main className="flex-1 p-6">
        <Outlet context={{ sortOption, selectedCategories }} />
      </main>
    </div>
  );
};

export default ShopLayouts;
