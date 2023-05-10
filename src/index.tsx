import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router";
import { AuthProvider } from "modules/AuthContext";
import { ProductProvider } from "modules/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <AuthProvider>
    <ProductProvider>
      <Router />
    </ProductProvider>
  </AuthProvider>
  // <React.StrictMode>
  // </React.StrictMode>
);
