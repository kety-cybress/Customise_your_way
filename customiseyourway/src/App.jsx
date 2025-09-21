import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Components/Home/AuthProvider';
import { CartProvider } from './Components/Home/CartProvider';
import { useAuth } from './Components/Home/useAuth';

import Navbar from './Components/Home/Navbar';
import Home from './Components/Home/Home';
import Shop from './Components/Home/Shop';
import SignUp from './Components/Home/SignUp';
import SignIn from './Components/Home/SignIn';
import Checkout from './Components/Home/Cart/Checkout';
import Profile from './Components/Home/Profile';
import Location from './Components/Home/Location';
import Payment from './Components/Home/Payment';

// 🆕 added
import Customize from './Components/Home/Customize';

import './index.css';
import './App.css';

// ✅ Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />

      <Route
        path="/shop"
        element={
          <ProtectedRoute>
            <Shop />
          </ProtectedRoute>
        }
      />

      {/* Not protected */}
      <Route path="/cart" element={<Checkout />} />
      {/* 🆕 Added Customize route */}
      <Route path="/customize" element={<Customize />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/location" element={<Location />} />
      <Route path="/payment" element={<Payment />} />

      {/* Fallback */}
      <Route path="*" element={<div style={{ padding: '2rem' }}>404 — Page Not Found!</div>} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <AppRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
