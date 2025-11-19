import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postal: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    // Validate form fields
    if (!form.name || !form.email || !form.address || !form.city || !form.postal) {
      alert("Please fill in all billing details.");
      return;
    }

    // Mock payment validation
    if (paymentMethod === "card") {
      alert("Payment Successful! 🎉\nPaid via Credit/Debit Card.");
    } else if (paymentMethod === "eft") {
      alert("Payment Successful! 🎉\nPaid via EFT / Bank Transfer.");
    } else if (paymentMethod === "payfast") {
      alert("Payment Successful! 🎉\nPaid via PayFast.");
    }

    // After alert, redirect to profile/shop page
    navigate("/profile"); // or "/shop" if you want
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>

      {/* Billing Details */}
      <section>
        <h3>Billing Details</h3>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="postal"
            placeholder="Postal Code"
            value={form.postal}
            onChange={handleChange}
            required
          />
        </form>
      </section>

      <hr />

      {/* Payment Method */}
      <section>
        <h3>Payment Method</h3>
        <label>
          <input
            type="radio"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          Credit/Debit Card
        </label>
        {paymentMethod === "card" && (
          <div className="payment-fields">
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="MM/YY" />
            <input type="text" placeholder="CVV" />
          </div>
        )}

        <label>
          <input
            type="radio"
            value="eft"
            checked={paymentMethod === "eft"}
            onChange={() => setPaymentMethod("eft")}
          />
          EFT / Bank Transfer
        </label>
        {paymentMethod === "eft" && (
          <div className="payment-fields">
            <input type="text" placeholder="Bank Account Number" />
          </div>
        )}

        <label>
          <input
            type="radio"
            value="payfast"
            checked={paymentMethod === "payfast"}
            onChange={() => setPaymentMethod("payfast")}
          />
          PayFast
        </label>
      </section>

      <hr />

      <button onClick={handlePayment} className="pay-btn">
        Make Payment
      </button>
    </div>
  );
}