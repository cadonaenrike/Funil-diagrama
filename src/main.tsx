// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
// import Home from "./pages/Home";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
