import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="home-content">
        <h1>
          Welcome to <span className="brand">CustomiseYourWay</span>
        </h1>
        <p className="hero-text">
          Where creativity meets personalization. Design your items your way!
        </p>
        <Link to="/shop" className="explore-btn">
          Explore Shop
        </Link>
      </div>

      {/* Features Section */}
      <div className="features">
        <h2>✨ What We Offer</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>👕 Custom Apparel</h3>
            <p>Design hoodies, shirts & shoes your way!</p>
          </div>
          <div className="card">
            <h3>🎁 Creative Gifts</h3>
            <p>Perfect for birthdays, events, or just because.</p>
          </div>
          <div className="card">
            <h3>📍 Local Love</h3>
            <p>Support local creators and makers.</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta">
        <h2>Start creating your unique style today!</h2>
        <Link to="/customize" className="signup-btn">
          Customize Now
        </Link>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} CustomiseYourWay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
