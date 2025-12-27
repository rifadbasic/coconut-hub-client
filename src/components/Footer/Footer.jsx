// src/components/Footer.jsx
import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--secondary-color)] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div>
              <img
                src={`${import.meta.env.VITE_Logo_URL}`}
                alt="logo"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                Beauty <span className="text-[var(--text-color)]">&</span> Care
              </h1>
            </div>
          </div>
          <p className="text-sm mb-4">123 Coconut Street, Khulna, Bangladesh</p>
          <form className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              placeholder="Send us a message..."
              className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold  hover:text-[var(--secondary-color)] transition"
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
            <Link to="/shop/products" className="hover:underline">
              Shop
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
            
            <Link to="/our-policy" className="hover:underline">
              Privacy Policy
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
              className="p-2 bg-white text-[var(--secondary-color)] rounded-full hover:bg-[var(--bg-color)] transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white text-[var(--secondary-color)] rounded-full hover:bg-[var(--bg-color)] transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white text-[var(--secondary-color)] rounded-full hover:bg-[var(--bg-color)] transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white text-[var(--secondary-color)] rounded-full hover:bg-green-100 transition"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/30 text-center py-4 text-sm">
        <p>
          © {currentYear} Beauty & Care | Created by{" "}
          <span className="font-semibold">rifadbasic</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
