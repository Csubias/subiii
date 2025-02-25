import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, getTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío. No puedes finalizar el pedido.");
      return;
    }
    navigate("/checkout");
  };

  const handleRemoveItem = (index) => {
    removeFromCart(index);
  };

  const handleAddMore = () => {
    navigate("/menu");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="cart">
      <h2>Resumen de tu pedido</h2>
      {cart.length === 0 ? (
        <div>
          <p>Tu carrito está vacío.</p>
          <button onClick={handleGoHome}>Volver al Inicio</button>
        </div>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <span>
                  {item.type === "charola"
                    ? "Charola"
                    : item.type === "vaso"
                    ? "Vaso"
                    : item.name}
                  {item.category &&
                    item.type !== "charola" &&
                    item.type !== "vaso" &&
                    ` (${item.category})`}
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
                  {item.toppings &&
                    ` - Toppings: (${item.toppings.join(", ")})`}
                </span>
                <span>
                  $
                  {item.price ||
                    (item.type === "charola"
                      ? "45.00"
                      : "Precio no disponible")}
                </span>
                <button onClick={() => handleRemoveItem(index)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ${getTotal().toFixed(2)}</h3>
          <div className="cart-buttons">
            <button onClick={handleAddMore}>Añadir Otro Producto</button>
            <button onClick={handleCheckout}>Finalizar Pedido</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
