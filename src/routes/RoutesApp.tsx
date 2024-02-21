import { RouterProvider, createBrowserRouter } from "react-router-dom";

import WhatsAppFlux from "../pages/WhatsAppFlux";
import Home from "../pages/Home";
import SMSFlux from "../pages/SMSFlux";
import SequenciaMista from "../pages/SequenciaMista";
import EmailFlux from "../pages/EmailFlux";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/WhatsAppFlux", element: <WhatsAppFlux /> },
  { path: "/SMSFlux", element: <SMSFlux /> },
  { path: "/SequenciaMista", element: <SequenciaMista /> },
  { path: "/EmailFlux", element: <EmailFlux /> },
]);

const RoutesApp: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default RoutesApp;
