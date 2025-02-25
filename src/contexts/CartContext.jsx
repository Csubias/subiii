import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [orderCode, setOrderCode] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.name === item.name && cartItem.type === item.type
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }
      return [
        ...prevCart,
        {
          ...item,
          quantity: 1,
          category: item.category || null,
          toppings: item.toppings || [],
          // Añadir otros atributos del producto aquí si es necesario
        },
      ];
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      if (updatedCart[index].quantity > 1) {
        updatedCart[index].quantity -= 1;
      } else {
        updatedCart.splice(index, 1);
      }
      return updatedCart;
    });
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      if (item.type === "charola") {
        return total + 45; // Precio fijo de la charola
      }
      return total + (item.price || 0);
    }, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  const completeOrder = (order) => {
    const generateCode = () =>
      Math.floor(100000 + Math.random() * 900000).toString(); // Genera un código de 6 dígitos
    const newOrder = { code: generateCode(), ...order };
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    console.log("Order saved with code: ", newOrder.code);
    return newOrder;
  };

  const getOrder = (code) => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    console.log("Orders in localStorage:", orders); // Mensaje de depuración
    const order = orders.find((order) => order.code === code.toString()); // Asegúrate de que estás buscando por 'code' como cadena
    if (order) {
      return order;
    } else {
      console.log("No se encontró el pedido!");
      return null;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        getTotal,
        clearCart,
        orderCode,
        setOrderCode,
        completeOrder,
        getOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
