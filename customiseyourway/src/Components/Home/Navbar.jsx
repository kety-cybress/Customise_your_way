import React from "react"; 
import "./Navbar.css";
import { useCart } from './useCart';
import { useNavigate } from "react-router-dom";

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
        <a href="/payment" className="nav-link">payment</a> {/* Added Payment */}
      </div>

      <div className="navbar-right" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Cart icon with dynamic badge */}
        <div
          className="cart-icon"
          onClick={() => navigate("/cart")}
          style={{ position: "relative", cursor: "pointer", fontSize: "1.2rem" }}
        >
          🛒
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-10px",
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
        </div>

        {/* Profile icon */}
        <div
          className="profile-icon"
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer", fontSize: "1.2rem" }}
        >
          👤
        </div>
      </div>
    </nav>
  );
}
