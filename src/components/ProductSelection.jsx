import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import ToppingsModal from "./ToppingsModal";
import products from "../data/products";
import "../styles/ProductSelection.css"; // Ruta relativa corregida

function ProductSelection() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectProduct = (product) => {
    if (type === "charola") {
      const isSelected = selectedProducts.includes(product);
      if (isSelected) {
        setSelectedProducts((prev) => prev.filter((p) => p !== product));
      } else if (selectedProducts.length < 3) {
        setSelectedProducts((prev) => [...prev, product]);
      }
    } else {
      setSelectedProduct(product);
      setShowModal(true);
    }
  };

  const handleAddToCart = (toppings) => {
    const productWithToppings = {
      ...selectedProduct,
      toppings,
    };
    addToCart(productWithToppings);
    setSelectedProduct(null);
    setShowModal(false);
    navigate("/cart");
  };

  const handleAddCharolaToCart = (toppings) => {
    addToCart({ type: "charola", products: selectedProducts, toppings });
    setSelectedProducts([]);
    setShowModal(false);
    navigate("/cart");
  };

  const handleAcceptCharola = () => {
    setShowModal(true);
  };

  const renderProducts = (productsList) => {
    return (
      <div className="product-grid">
        {productsList.map((product) => (
          <div
            className={`product-card ${
              selectedProducts.includes(product) ? "selected" : ""
            }`}
            key={product.name}
            onClick={() => handleSelectProduct(product)}
          >
            <img
              src={product.image || "https://via.placeholder.com/300"}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h4 className="product-title">
                {product.name}{" "}
                <span className="product-price">${product.price}</span>
              </h4>
              <p className="product-description">
                {product.description || "Un delicioso postre para disfrutar."}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="product-selection">
      <h2>
        {type === "rebanada" && "Selecciona tu rebanada"}
        {type === "charola" && "Selecciona 3 de nuestros ricos postres"}
        {type === "vaso" && "Escoge un vaso de tu postre favorito"}
      </h2>

      {type === "rebanada" &&
        ["gelatina", "pastel", "pay", "flan"].map((category) => (
          <div key={category}>
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            {renderProducts(
              products.rebanada.filter(
                (product) => product.category === category
              )
            )}
          </div>
        ))}

      {type === "charola" && (
        <>
          {renderProducts(products.charola)}
          {selectedProducts.length === 3 && (
            <button className="accept-button" onClick={handleAcceptCharola}>
              Aceptar
            </button>
          )}
        </>
      )}

      {type === "vaso" && renderProducts(products.vaso)}

      {showModal && (
        <ToppingsModal
          product={
            type === "charola"
              ? { name: "Charola", price: 45 }
              : selectedProduct
          }
          onClose={() => setShowModal(false)}
          onAddToCart={
            type === "charola" ? handleAddCharolaToCart : handleAddToCart
          }
        />
      )}
    </div>
  );
}

export default ProductSelection;
