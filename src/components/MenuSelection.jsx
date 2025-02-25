// src/components/MenuSelection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./MenuSelection.css"; // Importa los estilos

function MenuSelection() {
  const navigate = useNavigate();

  const handleSelection = (type) => {
    navigate(`/products/${type}`);
  };

  return (
    <div className="menu-selection">
      <h2>Elige una opción:</h2>
      <div className="button-container">
        <button className="menu-button" onClick={() => handleSelection("rebanada")}>Rebanada</button>
        <button className="menu-button" onClick={() => handleSelection("charola")}>Charola</button>
        <button className="menu-button" onClick={() => handleSelection("vaso")}>Vaso</button>
      </div>
    </div>
  );
}

export default MenuSelection;
