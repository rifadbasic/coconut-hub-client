import { createBrowserRouter } from "react-router";
import MainLayouts from "../layoutes/MainLayouts";
import Products from "../pages/Shop/Products";
import ShopLayouts from "../layoutes/ShopLayouts";
import Home from "../pages/Home";
import Review from "../pages/Review";
import About from "../pages/About";

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
            path: "/shop",
            element: <Products />,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/review",
        element: <Review/>,
      },
    ],
  },
]);

export default router;
