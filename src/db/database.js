const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ruta de la base de datos local
const dbPath = path.resolve(__dirname, "database.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error al abrir la base de datos:", err.message);
  } else {
    console.log("✅ Base de datos SQLite conectada");
  }
});

// Función para crear las tablas necesarias
const initDB = () => {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        total REAL NOT NULL,
        status TEXT DEFAULT 'pending'
      )`,
      (err) => {
        if (err) console.error("❌ Error creando tabla orders:", err.message);
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        category TEXT NOT NULL,
        toppings TEXT,
        FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE
      )`,
      (err) => {
        if (err)
          console.error("❌ Error creando tabla order_items:", err.message);
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT UNIQUE NOT NULL
      )`,
      (err) => {
        if (err)
          console.error("❌ Error creando tabla employees:", err.message);
      }
    );
  });
};

// Cerrar la conexión a la base de datos al finalizar la aplicación
process.on("exit", () => {
  db.close(() => console.log("🔌 Base de datos cerrada."));
});

module.exports = { db, initDB };
