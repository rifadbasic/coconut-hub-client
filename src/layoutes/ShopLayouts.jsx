import React, { useState } from "react";
import { Outlet, NavLink } from "react-router";
import { Filter, Menu, X } from "lucide-react";

const ShopLayouts = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  /* ✅ ACTIVE LINK STYLE */
  const navLinkClass = ({ isActive }) =>
    `transition-colors ${
      isActive
        ? "text-[var(--secondary-color)] font-semibold border-b-2 border-[var(--secondary-color)]"
        : "hover:text-[var(--secondary-color)]"
    }`;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 w-64 bg-[var(--bg-color)] h-full z-60 transform transition-transform 
          ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center text-[var(--secondary-color)] mt-4">
              Filter Products
            </h1>
            <button
              className="lg:hidden absolute top-4 right-4"
              onClick={() => setIsFilterOpen(false)}
            >
              <X />
            </button>

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
                "hair care",
                "skin care",
                "body care",
                "face care",
                "eyes care",
                "oral care",
                "cosmetics",
                "accessories",
                "wearables",
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

        {/* Filter Overlay */}
        {isFilterOpen && (
          <div
            className="fixed inset-0 bg-black/40 lg:hidden z-30"
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        {/* Products */}
        <main className="flex-1">
          {/* NAVBAR */}
          <nav className="sticky top-16 z-40 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 lg:py-6 flex items-center justify-end">
              {/* Desktop Nav */}
              <div className="hidden lg:flex gap-6 font-medium">
                <NavLink to="/shop/products" className={navLinkClass}>
                  All Products
                </NavLink>
                <NavLink to="/shop/new-arivle" className={navLinkClass}>
                  New Arrivals
                </NavLink>
                <NavLink to="/shop/combo" className={navLinkClass}>
                  Combos
                </NavLink>
              </div>
            </div>

            {/* Mobile Icons */}
            <div className="lg:hidden flex justify-between mx-4 py-3">
              <button onClick={() => setIsNavOpen(true)}>
                <Menu />
              </button>
              <button onClick={() => setIsFilterOpen(true)}>
                <Filter />
              </button>
            </div>

            {/* Mobile Nav Drawer */}
            {isNavOpen && (
              <div className="lg:hidden fixed inset-0 z-50 flex">
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={() => setIsNavOpen(false)}
                />
                <div className="absolute top-0 right-0 w-64 h-full bg-white p-6 space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">Navigate</h2>
                    <button onClick={() => setIsNavOpen(false)}>
                      <X />
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                    <NavLink
                      to="/shop/products"
                      onClick={() => setIsNavOpen(false)}
                      className={navLinkClass}
                    >
                      All Products
                    </NavLink>
                    <NavLink
                      to="/shop/new-arivle"
                      onClick={() => setIsNavOpen(false)}
                      className={navLinkClass}
                    >
                      New Arrivals
                    </NavLink>
                    <NavLink
                      to="/shop/combo"
                      onClick={() => setIsNavOpen(false)}
                      className={navLinkClass}
                    >
                      Combos
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
          </nav>

          <div className="p-6">
            <Outlet context={{ sortOption, selectedCategories }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopLayouts;
