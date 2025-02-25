import React from "react";
import "./Modal.css"; // Importa el archivo CSS para el modal

function Modal({ children }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>
  );
}

export default Modal;
