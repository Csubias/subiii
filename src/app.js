const {
  createOrder,
  addItemToOrder,
  getOrderById,
  updateOrderStatus,
} = require('./db/orders');

(async () => {
  try {
    console.log('🚀 Creando un nuevo pedido de postres...');
    const orderId = await createOrder('Jane Doe', 150.0);

    console.log('🍰 Agregando postres al pedido...');
    await addItemToOrder(orderId, 'Gelatina de Gansito', 'Gelatina', 'Lechera, Hersheys Chocolate');
    await addItemToOrder(orderId, 'Pastel de Chocolate', 'Pastel', 'Chispas de Chocolate');
    await addItemToOrder(orderId, 'Flan de Vainilla', 'Flan', 'Canela, Pasas');

    console.log('🔎 Obteniendo detalles del pedido...');
    const order = await getOrderById(orderId);
    console.log('📝 Pedido:', order);

    console.log('✅ Actualizando estado del pedido...');
    await updateOrderStatus(orderId, 'completed');

    console.log('🎉 Pedido de postres completado correctamente.');
  } catch (err) {
    console.error('❌ Error en la operación:', err);
  }
})();
