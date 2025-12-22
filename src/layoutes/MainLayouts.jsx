import React from "react";
import { Outlet } from "react-router";
import HeadBar from "../components/HeadBar/HeadBar";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CartSidebar from "../components/cart/CartSidebar";
import FloatingCartButton from "../../Utils/FloatingCartButton";
import { useState } from "react";
import { ToastContainer, Bounce } from "react-toastify";

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
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        {/* Cart Sidebar */}
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
      <Footer />
    </>
  );
};

export default MainLayouts;
