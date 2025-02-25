// src/components/Home.jsx
//Pantalla de inicio con el logo y botón para armar pedido.
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Importa el archivo CSS de Home
import "../styles/bublestyle.css"; // Importa el archivo CSS de los estilos del botón

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <img src="/logo.png" alt="Logo del Negocio" className="logo" />
      <h1>¡Bienvenido a Subi!</h1>
      <button className="arma-tu-pedido" onClick={() => navigate("/menu")}>
        Arma tu pedido
        <span></span><span></span><span></span><span></span>
      </button>
    </div>
  );
}

export default Home;
