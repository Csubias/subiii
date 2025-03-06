import React, { useState } from "react";
import { getOrderById, updateOrderStatus } from "../db/orders";

const Cashier = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  const handleSearchOrder = async () => {
    try {
      const order = await getOrderById(orderId);
      setOrder(order);
    } catch (err) {
      console.error("❌ Error obteniendo pedido:", err);
      alert("Pedido no encontrado");
    }
  };

  const handlePayment = async () => {
    if (parseFloat(paymentAmount) >= order.total) {
      await updateOrderStatus(order.id, "paid");
      alert("Pago realizado con éxito");
      setOrder(null);
      setOrderId("");
      setPaymentAmount("");
    } else {
      alert("Monto insuficiente");
    }
  };

  return (
    <div>
      <h2>Cajero</h2>
      <input
        type="text"
        placeholder="Código de pedido"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={handleSearchOrder}>Buscar Pedido</button>
      {order && (
        <div>
          <h3>Detalles del Pedido</h3>
          <p>Cliente: {order.customer_name}</p>
          <p>Total: ${order.total}</p>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.product_name} - {item.category} - {item.toppings}
              </li>
            ))}
          </ul>
          <input
            type="number"
            placeholder="Monto recibido"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
          <button onClick={handlePayment}>Realizar Pago</button>
        </div>
      )}
    </div>
  );
};

export default Cashier;
