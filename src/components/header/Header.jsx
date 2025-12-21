import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <div
      className="relative w-full sm:h-[50vh] md:h-[80vh] bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/tMGMkkfV/Pink-and-Brown-Watercolor-Splotch-Monogram-Personal-Envelope-1.png')",
      }}
    >
      
      {/* Main content */}
      <div className=" w-full  flex flex-col md:flex-row text-left justify-around mx-auto mb-6 items-center gap-4 md:gap-8 text-white px-4">
        <div className="text-left">
          <div className="flex items-center gap-4">
            <div className="my-6">
              <h1 className="text-[var(--text-color)] text-4xl sm:text-5xl md:text-6xl font-bold">
                Luxury{" "}
                <span className="text-[var(--secondary-color)]">Care</span> for
                Everyday{" "}
                <span className="text-[var(--secondary-color)]">Beauty</span>
              </h1>
            </div>
          </div>
          <p className="text-[var(--text-color)] text-lg sm:text-xl md:text-2xl">
            Indulge in premium beauty and personal care curated for elegance and
            confidence.
          </p>

          <Link to="/shop/products">
            <button className="mt-4 bg-[var(--secondary-color)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--primary-color)] transition">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="order-first md:order-last">
          <img
            src="https://i.ibb.co.com/N5fZSd9/delilah-pack-shot-removebg-preview.png" // replace with your logo URL
            alt="Beauty products logo"
            className=" object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
