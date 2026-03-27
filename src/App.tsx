import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Network } from "./pages/network";
import { Admin } from "./pages/admin";
import { Login } from "./pages/login";
import { Private } from "./routes/private";
import { NotFound } from "./components/notfound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin/social",
    element: (
      <Private>
        <Network />
      </Private>
    ),
  },
  {
    path: "/admin",
    element: (
      <Private>
        <Admin />
      </Private>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export { router };
