import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router";
import { AuthProvider } from "modules/AuthContext";
import { ProductProvider } from "modules/ProductContext";
import CartProvider from "modules/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <AuthProvider>
    <ProductProvider>
      <CartProvider>
        <Router />
      </CartProvider>
    </ProductProvider>
  </AuthProvider>
  // <React.StrictMode>
  // </React.StrictMode>
);
