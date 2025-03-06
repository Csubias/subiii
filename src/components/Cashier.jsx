import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useBar } from "../contexts/BarContext";
import Modal from "./Modal";

function Cashier() {
  const [orderCode, setOrderCode] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [change, setChange] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { getOrder } = useCart();
  const { barState, setBarState } = useBar();

  const handleSearchOrder = () => {
    const order = getOrder(orderCode);
    if (order) {
      setOrderDetails(order);
    } else {
      alert("Código de orden no encontrado.");
    }
  };

  const registerOrder = () => {
    // Define la función registerOrder
    // Aquí iría la lógica para registrar el pedido
    console.log("Pedido registrado");
  };

  const handlePayment = () => {
    if (orderDetails && paymentAmount >= orderDetails.total) {
      setChange(paymentAmount - orderDetails.total);
      setShowModal(true);
      registerOrder(); // Registrar el pedido en el contexto de la barra
    } else {
      alert("El monto recibido no es suficiente.");
    }
  };

  const handleCloseModal = () => {
    // Restablecer los estados al cerrar el modal
    setOrderCode("");
    setOrderDetails(null);
    setPaymentAmount("");
    setChange(null);
    setShowModal(false);
  };

  return (
    <div className="cashier">
      {!orderDetails ? (
        <>
          <h2>Ingrese el código de la orden</h2>
          <input
            type="text"
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
            placeholder="Código de orden"
          />
          <button onClick={handleSearchOrder}>Buscar Orden</button>
        </>
      ) : (
        <div>
          <h3>Resumen de la Orden</h3>
          {orderDetails.items.map((item, index) => (
            <div key={index}>
              {item.name} - ${item.price || "45.00"}
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
          <h3>Total: ${orderDetails.total.toFixed(2)}</h3>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            placeholder="Monto recibido"
          />
          <button onClick={handlePayment}>Pagar</button>
        </div>
      )}
      {showModal && (
        <Modal>
          <h2>Cambio: ${change.toFixed(2)}</h2>
          <button onClick={handleCloseModal}>Cerrar</button>
        </Modal>
      )}
    </div>
  );
}

export default Cashier;
