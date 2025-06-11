import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ResetPassword from "./pages/ResetPassword";
import { Categorias } from "./pages/Categorias";
import NovaSenha from "./pages/NovaSenha";
import Perguntas from "./pages/Perguntas";
import { RoadmapPython } from "./pages/Roadmap/Python";
import { RoadmapJava } from "./pages/Roadmap/Java";
import { RoadmapCsharp } from "./pages/Roadmap/Csharp";
import { Dashboard } from "./pages/Dashboard";
import { Ranking } from "./pages/Ranking";
import { ConfigUser } from "./pages/ConfigUser";
import { RoadmapJS } from "./pages/Roadmap/JS";
import { RoadmapPHP } from "./pages/Roadmap/php";

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
      element: <Categorias />
    },
    {
      path: "/perguntas/:linguagem/:topico",
      element: <Perguntas />
    },
    {
      path: "/roadmap-python",
      element: <RoadmapPython />
    },
    {
      path: "/roadmap-java",
      element: <RoadmapJava />
    },
    {
      path: "/roadmap-csharp",
      element: <RoadmapCsharp />
    },
    {
      path: "/roadmap-javascript",
      element: <RoadmapJS />
    },
    {
      path: "/roadmap-php",
      element: <RoadmapPHP />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path: "/ranking",
      element: <Ranking />
    },
    {
      path: "/configuracoes",
      element: <ConfigUser />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
