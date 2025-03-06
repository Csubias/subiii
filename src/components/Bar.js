import React, { useState } from "react";
import { getOrderById, updateOrderStatus } from "../db/orders";

const Bar = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const handleSearchOrder = async () => {
    try {
      const order = await getOrderById(orderId);
      setOrder(order);
      setCurrentItemIndex(0);
    } catch (err) {
      console.error("❌ Error obteniendo pedido:", err);
      alert("Pedido no encontrado");
    }
  };

  const handleNextItem = () => {
    if (currentItemIndex < order.items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    } else {
      alert("Pedido completado");
      updateOrderStatus(order.id, "completed");
      setOrder(null);
      setOrderId("");
    }
  };

  return (
    <div>
      <h2>Barra</h2>
      <input
        type="text"
        placeholder="Código de pedido"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={handleSearchOrder}>Buscar Pedido</button>
      {order && (
        <div>
          <h3>Preparar Pedido</h3>
          <p>Cliente: {order.customer_name}</p>
          <p>Total: ${order.total}</p>
          <div>
            <h4>Producto Actual</h4>
            <p>{order.items[currentItemIndex].product_name}</p>
            <p>{order.items[currentItemIndex].category}</p>
            <p>{order.items[currentItemIndex].toppings}</p>
            <button onClick={handleNextItem}>Siguiente Producto</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bar;
