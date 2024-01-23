import { RouterProvider, createBrowserRouter } from "react-router-dom";

import WhatsAppFlux from "../pages/WhatsAppFlux";
import Home from "../pages/Home";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/WhatsAppFlux", element: <WhatsAppFlux /> },
]);

const RoutesApp: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default RoutesApp;
