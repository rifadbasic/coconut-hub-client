import { createBrowserRouter } from "react-router";
import MainLayouts from "../layoutes/MainLayouts";
import Products from "../pages/Shop/Products";
import ShopLayouts from "../layoutes/ShopLayouts";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>Error occurred!</div>,
    element: <MainLayouts />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
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
        element: <div>About</div>,
      },
      {
        path: "/review",
        element: <div>Review</div>,
      },
    ],
  },
]);

export default router;
