import React, { useState } from "react";

function ToppingsModal({ product, onClose, onAddToCart }) {
  const [selectedToppings, setSelectedToppings] = useState([]);

  // Toppings divididos por categoría
  const toppings = {
    "Líquidos dulces": ["Lechera", "Hersheys Chocolate", "Hersheys Fresa"],
    Rompopes: ["Vainilla", "Piñon", "Capuchino"],
    Chispas: [
      "Chocolate",
      "Capucchino",
      "Tres Chocolates",
      "Arcoiris",
      "Unicornio",
      "Mini Kisses",
    ],
    Otros: ["Pasas", "Canela", "Granola", "Arándanos", "Galleta", "Bombón"],
    "Sin Toppings": ["Sin Toppings"],
  };

  const handleToggleTopping = (topping) => {
    if (topping === "Sin Toppings") {
      // Si se selecciona "Sin Toppings", se deseleccionan todos los demás
      setSelectedToppings(["Sin Toppings"]);
    } else {
      setSelectedToppings((prev) => {
        // Si "Sin Toppings" está seleccionado, lo eliminamos y permitimos la selección normal
        const updatedToppings = prev.includes("Sin Toppings")
          ? [topping]
          : prev.includes(topping)
          ? prev.filter((t) => t !== topping)
          : [...prev, topping];

        return updatedToppings;
      });
    }
  };

  const handleSubmit = () => {
    onAddToCart(selectedToppings);
    onClose(); // Cierra la ventana modal después de agregar
  };

  return (
    <div className="modal" role="dialog" aria-labelledby="modal-title">
      <div className="modal-content">
        <h3 id="modal-title">
          {product.type === "charola"
            ? "Elige tus toppings para tu charola:"
            : `Elige tus toppings para ${product.name}`}
        </h3>
        <div className="topping-options">
          {/* Renderiza los toppings por categoría */}
          {Object.keys(toppings).map((category) => (
            <div key={category}>
              <h4>{category}</h4>
              {toppings[category].map((topping) => (
                <label key={topping}>
                  <input
                    type="checkbox"
                    checked={selectedToppings.includes(topping)}
                    onChange={() => handleToggleTopping(topping)}
                    disabled={
                      topping === "Sin Toppings" && selectedToppings.length > 1
                    }
                  />
                  {topping}
                </label>
              ))}
            </div>
          ))}
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Cerrar</button>
          <button
            onClick={handleSubmit}
            disabled={selectedToppings.length === 0}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToppingsModal;
