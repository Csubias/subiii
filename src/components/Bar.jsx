import React, { useState } from "react";
import { useBar } from "../contexts/BarContext";
import { useCart } from "../contexts/CartContext";
import SliceCard from "./SliceCard";

function Bar() {
  const {
    currentOrder,
    currentItemIndex,
    nextItem,
    resetOrder,
    registerOrder,
  } = useBar();
  const { getOrder } = useCart();
  const [orderCode, setOrderCode] = useState("");

  const handleRegisterOrder = () => {
    const order = getOrder(orderCode);
    if (order) {
      registerOrder(order);
    } else {
      alert("Orden no encontrada.");
    }
  };

  if (!currentOrder) {
    return (
      <div className="bar">
        <h2>Registrar Código de Orden</h2>
        <input
          type="text"
          value={orderCode}
          onChange={(e) => setOrderCode(e.target.value)}
          placeholder="Código de orden"
        />
        <button onClick={handleRegisterOrder}>Registrar</button>
      </div>
    );
  }

  const currentItem = currentOrder.items[currentItemIndex];

  return (
    <div className="bar">
      <h2>Preparar Pedido</h2>
      {currentItem ? (
        <div>
          <SliceCard
            name={currentItem.name}
            description={currentItem.category}
            price={currentItem.price}
            onClick={() => {}}
          />
          <ul>
            {currentItem.toppings.map((topping, index) => (
              <li key={index}>{topping}</li>
            ))}
          </ul>
          <button onClick={nextItem}>Siguiente</button>
        </div>
      ) : (
        <div>
          <h3>Pedido Completo</h3>
          <button onClick={resetOrder}>Finalizar</button>
        </div>
      )}
    </div>
  );
}

export default Bar;
