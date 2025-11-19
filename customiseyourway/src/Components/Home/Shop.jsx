import React from "react";
import { useCart } from "./useCart";
import { useNavigate } from "react-router-dom";
import { images } from "./Images";

const products = [
  { id: 1, name: "Phone Case", price: 20 },
  { id: 2, name: "White Hoodie", price: 60 },
  { id: 3, name: "Backpack", price: 45 },
  { id: 4, name: "Notebook", price: 25 },
  { id: 5, name: "Bucket Hat", price: 30 },
  { id: 6, name: "Sneakers", price: 80 },
  { id: 7, name: "Cushion", price: 35 },
  { id: 8, name: "Table", price: 150 },
  { id: 9, name: "Pants", price: 50 },
];

export default function Shop() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Our Products</h1>
      <div
        data-test-id="product-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "30px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            data-test-id="product-card"
            style={{
              border: "1px solid #eee",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={images[product.name] || "/images/placeholder.png"}
              alt={product.name}
              style={{ width: "100%", height: "220px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px", textAlign: "center" }}>
              <h3>{product.name}</h3>
              <p style={{ fontWeight: "bold" }}>R{product.price}</p>
              <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
                <button
                  style={{
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#ff4081",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/customize", { state: product })}
                >
                  Customize
                </button>
                <button
                  data-test-id="add-to-cart"
                  style={{
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#2196f3",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
