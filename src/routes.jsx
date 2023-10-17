import { createBrowserRouter } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Room from "./pages/Room";
import Home from "./pages/Home";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/login",
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "/register",
    children: [{ index: true, element: <Register /> }],
  },
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "room/:id", element: <Room /> },
    ],
  },
]);

export default router;
