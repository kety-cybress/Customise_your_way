import React from "react";
import "./Navbar.css";
import { useCart } from './useCart'; // ✅ correct
import { useNavigate } from "react-router-dom"; // ✅ navigation for 👤 icon

export default function Navbar() {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">⟵</a>
      </div>

      <div className="navbar-center">
        <a href="/" className="nav-link">home</a>
        <a href="/shop" className="nav-link">shop</a>
        <a href="/customize" className="nav-link">customize</a>
        <a href="/location" className="nav-link">location</a>

        {/* ✅ Cart link with badge */}
        <a href="/cart" className="nav-link" style={{ position: "relative" }}>
          cart/checkout
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-16px",
                background: "hotpink",
                color: "white",
                padding: "2px 6px",
                fontSize: "0.75rem",
                borderRadius: "50%",
              }}
            >
              {cartCount}
            </span>
          )}
        </a>

        <a href="/payment" className="nav-link">payment</a>
      </div>

      <div className="navbar-right">
        {/* ✅ Profile icon with navigation */}
        <div
          className="profile-icon"
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
        >
          👤
        </div>
      </div>
    </nav>
  );
}
