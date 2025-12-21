import React from "react";
import { Outlet } from "react-router";
import HeadBar from "../components/HeadBar/HeadBar";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CartSidebar from "../components/cart/CartSidebar";
import FloatingCartButton from "../../Utils/FloatingCartButton";
import { useState } from "react";

const MainLayouts = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <div>
        <HeadBar />
        <Navbar />

        <Outlet />
        {/* Floating Cart */}
        <FloatingCartButton toggleCart={() => setIsCartOpen(true)} />
        {/* Cart Sidebar */}
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
      <Footer />
    </>
  );
};

export default MainLayouts;
