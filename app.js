import { saveOrder, getOrders } from './ordersService';

// ...existing code...

// Función de checkout que guarda el pedido en Firebase
const checkout = (customerName, items) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const newOrder = {
    customerName,
    items,
    total,
    status: "Pending"
  };

  // Guardar un nuevo pedido
  saveOrder(newOrder);
};

// Ejemplo de uso del checkout
const customerName = "John Doe";
const items = [
  { name: "Pizza", quantity: 2, price: 10.00 },
  { name: "Coke", quantity: 1, price: 5.50 }
];

checkout(customerName, items);

// Obtener todos los pedidos
getOrders().then(orders => {
  console.log("Orders: ", orders);
});

// ...existing code...
