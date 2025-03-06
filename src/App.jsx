// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MenuSelection from "./components/MenuSelection";
import ProductSelection from "./components/ProductSelection";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Cashier from "./components/Cashier.jsx";
import Bar from "./components/Bar.jsx"; // Importa el componente Bar
import { CartProvider } from "./contexts/CartContext";
import { BarProvider } from "./contexts/BarContext";

function App() {
  return (
    <CartProvider>
      <BarProvider>
        <Router
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuSelection />} />
            <Route path="/products/:type" element={<ProductSelection />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cashier" element={<Cashier />} />
            <Route path="/bar" element={<Bar />} /> {/* Añade esta ruta */}
          </Routes>
        </Router>
      </BarProvider>
    </CartProvider>
  );
}

export default App;
