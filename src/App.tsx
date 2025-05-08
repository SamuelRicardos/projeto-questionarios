import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
