import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import { useEffect } from "react";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ResetPassword from "./pages/ResetPassword";

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/cadastro",
      element: <Cadastro />
    },
    {
      path: "/resetpassword",
      element: <ResetPassword />
    }
  ]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//code.tidio.co/${import.meta.env.VITE_TIDIO_SCRIPT}.js`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
