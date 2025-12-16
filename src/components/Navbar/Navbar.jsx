import { useState } from "react";
import { NavLink, Link } from "react-router";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import "./navbar.css";
import { useCart } from "../../context/CartContext.jsx";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartCount, toggleCart } = useCart();

  // ✅ All Nav Links in one variable
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Review", path: "/review" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          {/* Logo Image */}
          <img
            src="https://i.ibb.co.com/XZCMDGB5/logo.jpg" // replace with your logo URL
            alt="CoconutBD Logo"
            className="w-10 h-10 object-contain"
          />

          {/* Text */}
          <span className="text-green-600 hidden md:block">Coconut</span>
          <span className="text-gray-700 hidden md:block">BD</span>
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
                      ? "text-green-600 font-semibold"
                      : "hover:text-green-600"
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
            className="p-2 rounded-full hover:bg-green-100 duration-200"
          >
            <Search className="w-5 h-5 text-gray-700" />
          </button>

          {/* Cart */}
          <button
            onClick={toggleCart}
            className="p-2 rounded-full hover:bg-green-100 duration-200 relative"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="p-2 rounded-full hover:bg-green-100 duration-200"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white border shadow-md rounded-md w-32 text-sm animate-fadeIn">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-green-50"
                  onClick={() => setProfileOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-green-50"
                  onClick={() => setProfileOpen(false)}
                >
                  Login
                </Link>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-green-50"
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
            className="md:hidden p-2 rounded-md hover:bg-green-100 duration-200"
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
        <div className="bg-green-50 py-3 px-4 shadow-inner animate-fadeIn">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Search
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-green-50 border-t animate-fadeIn">
          <ul className="flex flex-col text-center py-3 space-y-2 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block py-2 ${
                      isActive
                        ? "text-green-600 font-semibold"
                        : "hover:text-green-600"
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
