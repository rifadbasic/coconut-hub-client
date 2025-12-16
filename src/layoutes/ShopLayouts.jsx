import React, { useState } from "react";
import { Outlet } from "react-router";
import { Filter } from "lucide-react";

const ShopLayouts = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleFilterToggle = () => setIsFilterOpen(!isFilterOpen);

  const handleSortChange = (value) => setSortOption(value);

  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-base-100 relative">
      {/* Mobile Filter Header */}
      <div className="lg:hidden flex justify-between items-center p-4 border-b shadow-sm">
        <h2 className="text-xl font-semibold text-green-600">Coconut Shop</h2>
        <button
          onClick={handleFilterToggle}
          className="btn btn-ghost btn-circle text-green-600"
        >
          <Filter className="w-6 h-6" />
        </button>
      </div>

      {/* Filter Sidebar */}
      <div
        className={`fixed lg:static top-20 left-0 h-full w-64 bg-green-50 shadow-lg z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto 
        ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-4 border-b flex justify-between items-center lg:hidden sticky top-0 bg-green-50">
          <h3 className="font-semibold text-green-700 text-lg">Filters</h3>
          <button
            onClick={handleFilterToggle}
            className="btn btn-sm btn-circle btn-outline text-green-600"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Sort */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-700">
              Sort By Price
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="priceSort"
                  value="lowToHigh"
                  checked={sortOption === "lowToHigh"}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="radio radio-sm"
                />
                <span>Low → High</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="priceSort"
                  value="highToLow"
                  checked={sortOption === "highToLow"}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="radio radio-sm"
                />
                <span>High → Low</span>
              </label>
            </div>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-700">
              Category
            </h3>

            <div className="space-y-2">
              {[
                "Fresh Coconuts",
                "Coconut Oil",
                "Dry Coconuts",
                "Cosmetics",
                "Food",
                "Other",
              ].map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="checkbox checkbox-sm"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for small screen */}
      {isFilterOpen && (
        <div
          onClick={handleFilterToggle}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
        />
      )}

      {/* Main Outlet */}
      <div className="flex-1 p-4 lg:p-8 overflow-hidden">
        <Outlet context={{ sortOption, selectedCategories }} />
      </div>
    </div>
  );
};

export default ShopLayouts;
