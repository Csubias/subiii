// src/components/SliceCard.jsx
import React from "react";

// El componente SliceCard recibe propiedades desde SelectSlice.jsx
const SliceCard = ({ name, products, toppings, onClick }) => {
  const handleClick = () => {
    console.log(`Card clicked: ${name}`); // Debugging
    onClick();
  };

  return (
    <div
      className="slice-card"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "5px",
        margin: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3>{name}</h3>
      {products && (
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.name}
              {product.category && ` (${product.category})`}
            </li>
          ))}
        </ul>
      )}
      {toppings && (
        <ul>
          {toppings.map((topping, index) => (
            <li key={index}>{topping}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SliceCard;
