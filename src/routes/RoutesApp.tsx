import { RouterProvider, createBrowserRouter } from "react-router-dom";

import WhatsAppFlux from "../pages/WhatsAppFlux";
import Home from "../pages/Home";
import SMSFlux from "../pages/SMSFlux";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/WhatsAppFlux", element: <WhatsAppFlux /> },
  { path: "/SMSFlux", element: <SMSFlux /> },
]);

const RoutesApp: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default RoutesApp;
