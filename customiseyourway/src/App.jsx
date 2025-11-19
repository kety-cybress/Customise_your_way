import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./Components/Home/AuthProvider";
import { CartProvider } from "./Components/Home/CartProvider";
import { useAuth } from "./Components/Home/useAuth";

import Navbar from "./Components/Home/Navbar";
import Home from "./Components/Home/Home";
import Shop from "./Components/Home/Shop";
import SignUp from "./Components/Home/SignUp";
import SignIn from "./Components/Home/SignIn";
import Checkout from "./Components/Home/Cart/Checkout";
import Profile from "./Components/Home/Profile";
import Location from "./Components/Home/Location";
import Payment from "./Components/Home/Payment";
import Customize from "./Components/Home/Customize";

import "./index.css";
import "./App.css";

// ✅ Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" />;
};

function AppRoutes() {
  return (
    <div className="page-content">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/location" element={<Location />} />

        {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<div style={{ padding: "2rem" }}>404 — Page Not Found!</div>}
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <AppRoutes />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
