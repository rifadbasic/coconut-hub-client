import { useState } from "react";
import { NavLink, Link } from "react-router";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import "./navbar.css";
import { useCart } from "../../context/CartContext.jsx";
import SearchBox from "../SearchBox.jsx";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartCount, toggleCart } = useCart();

  // ✅ All Nav Links in one variable
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop/products" },
    { name: "About", path: "/about" },
    { name: "Our Privacy", path: "/our-policy" },
  ];

  return (
    <nav className="bg-base-300 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          {/* Logo Image */}
          <img
            src="https://i.ibb.co.com/dsWYsWZS/brand-1.png" // replace with your logo URL
            alt="Beauty Products Logo"
            className="w-10 h-10 rounded-full object-contain"
          />

          {/* Text */}
          <span className="text-[var(--secondary-color)] hidden md:block">
            Beauty{" "}
          </span>
          <span className="text-[var(--text-color)] hidden md:block">&</span>
          <span className="text-[var(--secondary-color)] hidden md:block">
            {" "}
            Care
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `duration-200 ${
                    isActive
                      ? "text-[var(--primary-color)] font-semibold"
                      : "hover:text-[var(--secondary-color)]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          {/* Search icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-full hover:bg-[var(--bg-color)] duration-200"
          >
            <Search className="w-5 h-5 text-gray-700" />
          </button>

          {/* Cart */}
          <button
            onClick={toggleCart}
            className="p-2 rounded-full hover:bg-[var(--bg-color)] duration-200 relative"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--primary-color)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="p-2 rounded-full hover:bg-[var(--bg-color)] duration-200"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white border shadow-md rounded-md w-32 text-sm animate-fadeIn">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-[var(--bg-color)]"
                  onClick={() => setProfileOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-[var(--bg-color)]"
                  onClick={() => setProfileOpen(false)}
                >
                  Login
                </Link>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-[var(--bg-color)]"
                  onClick={() => setProfileOpen(false)}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-[var(--bg-color)] duration-200"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Search bar below navbar */}
      {searchOpen && (
        <div className="bg-[var(--bg-color)] py-3 px-4 shadow-inner animate-fadeIn">
          <div className="max-w-7xl mx-auto">
            <SearchBox onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--bg-color)] border-t animate-fadeIn">
          <ul className="flex flex-col text-center py-3 space-y-2 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block py-2 ${
                      isActive
                        ? "text-[var(--primary-color)] font-semibold"
                        : "hover:text-[var(--primary-color)]"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
