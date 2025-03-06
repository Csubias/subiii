const { db } = require("./database");

// Crear un nuevo pedido
const createOrder = async (customerName, total) => {
  return new Promise((resolve, reject) => {
    if (!customerName || typeof total !== "number" || total < 0) {
      return reject(new Error("⚠️ Datos inválidos para crear pedido."));
    }
    db.run(
      "INSERT INTO orders (customer_name, total) VALUES (?, ?)",
      [customerName, total],
      function (err) {
        if (err) {
          console.error("❌ Error creando pedido:", err.message);
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

// Agregar un ítem a un pedido
const addItemToOrder = async (orderId, productName, category, toppings) => {
  return new Promise((resolve, reject) => {
    if (!orderId || !productName || !category) {
      return reject(new Error("⚠️ Datos inválidos para agregar ítem."));
    }
    db.run(
      "INSERT INTO order_items (order_id, product_name, category, toppings) VALUES (?, ?, ?, ?)",
      [orderId, productName, category, toppings],
      function (err) {
        if (err) {
          console.error("❌ Error agregando item al pedido:", err.message);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

// Obtener un pedido por su ID
const getOrderById = async (orderId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT o.*, oi.id AS item_id, oi.product_name, oi.category, oi.toppings 
       FROM orders o 
       LEFT JOIN order_items oi ON o.id = oi.order_id 
       WHERE o.id = ?`,
      [orderId],
      (err, rows) => {
        if (err) {
          console.error("❌ Error obteniendo pedido:", err.message);
          reject(err);
        } else if (rows.length === 0) {
          reject(new Error("⚠️ Pedido no encontrado."));
        } else {
          const order = {
            id: rows[0].id,
            customer_name: rows[0].customer_name,
            total: rows[0].total,
            status: rows[0].status,
            items: rows
              .map(({ item_id, product_name, category, toppings }) => ({
                id: item_id,
                product_name,
                category,
                toppings,
              }))
              .filter((item) => item.id), // Filtra si no hay ítems
          };
          resolve(order);
        }
      }
    );
  });
};

// Actualizar el estado de un pedido
const updateOrderStatus = async (orderId, status) => {
  return new Promise((resolve, reject) => {
    if (!orderId || !status) {
      return reject(new Error("⚠️ Datos inválidos para actualizar estado."));
    }
    db.run(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, orderId],
      function (err) {
        if (err) {
          console.error(
            "❌ Error actualizando estado del pedido:",
            err.message
          );
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

module.exports = {
  createOrder,
  addItemToOrder,
  getOrderById,
  updateOrderStatus,
};
