import React from 'react';
import { Outlet } from 'react-router';
import HeadBar from '../components/HeadBar/HeadBar';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import CartSidebar from '../components/cart/CartSidebar';

const MainLayouts = () => {
  return (
    <>

    <div>
      <HeadBar />
      <Navbar />

      <Outlet />
      <CartSidebar />
    </div>
    <Footer />
      
    </>
  );
};

export default MainLayouts;