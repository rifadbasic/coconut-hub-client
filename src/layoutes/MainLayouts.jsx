import React from 'react';
import { Outlet } from 'react-router';
import HeadBar from '../components/HeadBar/HeadBar';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const MainLayouts = () => {
  return (
    <>

    <div>
      <HeadBar />
      <Navbar />

      <Outlet />
    </div>
    <Footer />
      
    </>
  );
};

export default MainLayouts;