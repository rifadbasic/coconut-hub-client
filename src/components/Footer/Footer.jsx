// src/components/Footer.jsx
import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-600 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold mb-3">🥥 Coconut Shop</h2>
          <p className="text-sm mb-4">123 Coconut Street, Khulna, Bangladesh</p>
          <form className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              placeholder="Send us a message..."
              className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold  hover:text-green-500 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <div className="flex flex-wrap gap-3">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/shop" className="hover:underline">
              Shop
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 md:w-1/2 lg:w-1/4 justify-end ">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white text-green-700 rounded-full hover:bg-green-100 transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white text-green-700 rounded-full hover:bg-green-100 transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white text-green-700 rounded-full hover:bg-green-100 transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white text-green-700 rounded-full hover:bg-green-100 transition"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/30 text-center py-4 text-sm">
        <p>
          © {currentYear} Coconut Shop | Created by{" "}
          <span className="font-semibold">rifadbasic</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
