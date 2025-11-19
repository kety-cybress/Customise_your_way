import React from "react";
import { useCart } from "../useCart";
import { images } from "../Images";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  if (cartItems.length === 0) return <div style={{ padding: "2rem" }}>Your cart is empty.</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Checkout</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Product</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Price</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Quantity</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: "8px", display: "flex", alignItems: "center" }}>
                <img
                  src={images[item.name] || "/images/placeholder.png"}
                  alt={item.name}
                  style={{ width: "50px", height: "50px", marginRight: "10px", objectFit: "cover" }}
                />
                {item.name}
              </td>
              <td style={{ padding: "8px" }}>R{item.price}</td>
              <td style={{ padding: "8px" }}>{item.quantity || 1}</td>
              <td style={{ padding: "8px" }}>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ padding: "4px 8px", border: "none", borderRadius: "4px", backgroundColor: "red", color: "#fff", cursor: "pointer" }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: "2rem" }}>Total: R{getTotalPrice()}</h2>

      <button
        onClick={clearCart}
        style={{ marginTop: "1rem", padding: "10px 20px", backgroundColor: "green", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}
      >
        Clear Cart
      </button>

      <button
        onClick={() => navigate("/payment")}
        style={{ marginTop: "1rem", padding: "10px 20px", backgroundColor: "blue", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Proceed to Payment
      </button>
    </div>
  );
}
