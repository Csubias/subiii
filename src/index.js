const { initDB } = require("./db/database");

initDB();

console.log("✅ Base de datos inicializada correctamente.");

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
