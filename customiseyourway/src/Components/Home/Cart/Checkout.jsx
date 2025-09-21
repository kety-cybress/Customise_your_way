// src/Components/Home/Cart/Checkout.jsx
import React from "react";
import { useCart } from "../useCart"; // adjust path if needed
import "./Checkout.css";

export default function Checkout() {
  const { cartItems } = useCart();

  const getTotalPrice = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace("R", "")), 0);
    const deliveryFee = 30;
    return {
      subtotal,
      delivery: deliveryFee,
      total: subtotal + deliveryFee,
    };
  };

  const totals = getTotalPrice();

  return (
    <div className="checkout-page">
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-card">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.price}</p>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p>Subtotal: R{totals.subtotal}</p>
        <p>Delivery: R{totals.delivery}</p>
        <p>Total: R{totals.total}</p>
        <button className="checkout-btn">CHECKOUT</button>
      </div>
    </div>
  );
}
