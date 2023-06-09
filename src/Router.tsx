import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Index from "pages/Index";
import Home from "pages/Home";
import { useAuth } from "modules/AuthContext";
import Seller from "pages/Seller";
import Product from "pages/Product";
function Router() {
  const { dbUser } = useAuth();

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Index />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            element: dbUser.seller ? <Seller /> : <Navigate to="/" />,
            path: "seller/:number",
          },
          {
            element: <Product />,
            path: "product/:key",
          },
        ],
      },
    ],
    { basename: process.env.PUBLIC_URL }
  );

  return <RouterProvider router={router} />;
}

export default Router;
