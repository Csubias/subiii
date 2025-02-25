// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MenuSelection from "./components/MenuSelection";
import ProductSelection from "./components/ProductSelection";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Cashier from "./components/Cashier"; // Importa el componente Cashier
import { CartProvider } from "./contexts/CartContext";
import { BarProvider } from "./contexts/BarContext"; // Importa el BarProvider

function App() {
  return (
    <CartProvider>
      <BarProvider>
        <Router
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          {" "}
          {/* Configura las banderas de futuro */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuSelection />} />
            <Route path="/products/:type" element={<ProductSelection />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cashier" element={<Cashier />} />{" "}
            {/* Añade esta ruta */}
          </Routes>
        </Router>
      </BarProvider>
    </CartProvider>
  );
}

export default App;
