import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import SMSFlux from "../pages/SMSFlux";
import SequenciaMista from "../pages/SequenciaMista";
import EmailFlux from "../pages/EmailFlux";
import FluxoPage from "../pages/EditFluxo";
import WhatsAppFlux from "../pages/WhatsAppFlux";
import EditFluxo from "../pages/EditFluxo";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/WhatsAppFlux/:userId", element: <WhatsAppFlux /> },
  { path: "/SMSFlux", element: <SMSFlux /> },
  { path: "/SequenciaMista", element: <SequenciaMista /> },
  { path: "/fluxo", element: <FluxoPage /> },
  { path: "/editfluxo", element: <EditFluxo /> },
  { path: "/EmailFlux", element: <EmailFlux /> },
]);

const RoutesApp: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default RoutesApp;
