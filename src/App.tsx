import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import { useEffect } from "react";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ResetPassword from "./pages/ResetPassword";
import { Categorias } from "./pages/Categorias";
import NovaSenha from "./pages/NovaSenha";
import Perguntas from "./pages/Perguntas";
import { RoadmapPython } from "./pages/Roadmap/Python";

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
    },
    {
      path: "/nova-senha",
      element: <NovaSenha />
    },
    {
      path: "/categorias",
      element: <Categorias/>
    },
    {
      path: "/perguntas",
      element: <Perguntas/>
    },
    {
      path: "/roadmap-python",
      element: <RoadmapPython/>
    },
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
