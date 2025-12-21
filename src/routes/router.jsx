import { createBrowserRouter } from "react-router";
import MainLayouts from "../layoutes/MainLayouts";
import Products from "../pages/Shop/Products";
import ShopLayouts from "../layoutes/ShopLayouts";
import Home from "../pages/Home";
import OurPolicy from "../pages/OurPolicy";
import About from "../pages/About";
import SingleProduct from "../pages/SingleProduct";
import Checkout from "../pages/checkout/Checkout";
import FinalCheckout from "../pages/checkout/FinalCheckout";
import LogIn from "../pages/signup/LogIn";
import Register from "../pages/signup/Register";
import NewArivle from "../pages/NewArivle";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>Error occurred!</div>,
    element: <MainLayouts />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <ShopLayouts />,
        children: [
          {
            path: "/shop/products",
            element: <Products />,
          },
          {
            path: "/shop/new-arivle",
            element: <NewArivle />,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/our-policy",
        element: <OurPolicy />,
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/final-checkout",
        element: <FinalCheckout />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "register",
        element: <Register />,
      }
    ],
  },
]);

export default router;
