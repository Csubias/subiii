import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import SliceCard from "./SliceCard";
import ToppingsModal from "./ToppingsModal";
import { useNavigate } from "react-router-dom";

const sliceData = {
  gelatina: [
    {
      name: "Gansito",
      description:
        "Rica base de 3 leches con queso philadelphia, rellena por dentro de gansito",
      price: 30,
    },
    {
      name: "Galleta Oreo",
      description: "Gelatina de Galleta Oreo",
      price: 30,
    },
    {
      name: "Chocolate Abuelita",
      description: "Gelatina de Chocolate Abuelita",
      price: 30,
    },
  ],
  pastel: [
    { name: "Chocolate", description: "Pastel de Chocolate", price: 40 },
    { name: "Turín", description: "Pastel de Turín", price: 40 },
    { name: "Hersheys", description: "Pastel de Hersheys", price: 40 },
  ],
  pay: [
    { name: "Chocolate", description: "Pay de Chocolate", price: 35 },
    { name: "Limón", description: "Pay de Limón", price: 35 },
  ],
  flan: [
    { name: "Vainilla", description: "Flan de Vainilla", price: 25 },
    {
      name: "Napolitano Sencillo",
      description: "Flan Napolitano Sencillo",
      price: 25,
    },
    {
      name: "Napolitano Philadelphia",
      description: "Flan Napolitano Philadelphia",
      price: 25,
    },
    { name: "Elote", description: "Flan de Elote", price: 25 },
  ],
};

function SelectSlice() {
  const [selectedSlice, setSelectedSlice] = useState(null);
  const [showToppingsModal, setShowToppingsModal] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Maneja la selección de rebanada
  const handleSelectSlice = (slice) => {
    setSelectedSlice(slice); // Guarda la rebanada seleccionada
    setShowToppingsModal(true); // Abre el modal de toppings
  };

  // Añade la rebanada con los toppings seleccionados al carrito
  const handleAddToCart = (toppings) => {
    addToCart({ ...selectedSlice, toppings, category: selectedSlice.category });
    setSelectedSlice(null); // Resetea la rebanada seleccionada
    setShowToppingsModal(false); // Cierra el modal
    navigate("/cart"); // Redirige al carrito
  };

  return (
    <div className="select-slice">
      {/* Muestra las categorías de rebanadas y las listas de productos */}
      {Object.entries(sliceData).map(([category, slices]) => (
        <div key={category} className="slice-category">
          <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
          <div className="slice-list">
            {slices.map((slice) => (
              <SliceCard
                key={slice.name}
                name={slice.name}
                description={slice.description}
                price={slice.price}
                // Al hacer clic en una tarjeta, selecciona la rebanada
                onClick={() => handleSelectSlice({ ...slice, category })}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Modal de toppings */}
      {showToppingsModal && selectedSlice && (
        <ToppingsModal
          product={selectedSlice} // Pasa la rebanada seleccionada al modal
          onClose={() => setShowToppingsModal(false)} // Cierra el modal
          onAddToCart={handleAddToCart} // Añade al carrito con los toppings
        />
      )}
    </div>
  );
}

export default SelectSlice;
