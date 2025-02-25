import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

function Checkout() {
  const { cart, getTotal, clearCart, setOrderCode, completeOrder } = useCart();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [orderCode, setOrderCodeState] = useState(null);

  const handleCompleteOrder = () => {
    const newOrder = completeOrder({ items: cart, total: getTotal() });
    setOrderCodeState(newOrder.code);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    clearCart();
    setShowModal(false);
    navigate("/");
  };

  const handleEditOrder = () => {
    navigate("/cart");
  };

  const handleBackToMenu = () => {
    navigate("/");
  };

  return (
    <div className="checkout">
      <h2>Resumen de Pedido</h2>
      {cart.length === 0 ? (
        <p>No hay productos en tu carrito.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="checkout-item">
              <strong>{item.name}</strong> - ${item.price || 45}
              {item.category && ` (${item.category})`}
              {item.toppings && ` - Toppings: (${item.toppings.join(", ")})`}
              {item.type === "charola" && (
                <ul>
                  {item.products.map((p, i) => (
                    <li key={i}>
                      {p.name}
                      {p.category && ` (${p.category})`}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <h3>Total: ${getTotal().toFixed(2)}</h3>
          <button onClick={handleEditOrder}>Editar Pedido</button>
          <button onClick={handleCompleteOrder}>Completar Pedido</button>
          <button onClick={handleBackToMenu}>Volver al Menú</button>
        </div>
      )}
      {showModal && (
        <Modal>
          <h2>Este es tu número de orden: {orderCode}</h2>
          <p>¡Gracias por tu pedido!</p>
          <button onClick={handleCloseModal}>Cerrar</button>
        </Modal>
      )}
    </div>
  );
}

export default Checkout;
