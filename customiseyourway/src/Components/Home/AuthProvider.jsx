// AuthProvider.js
import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  const URL = "23.22.225.132"

  const signup = async (data) => {
    const res = await axios.post(`http://${URL}:3001/api/auth/signup`, data);
    setUser(res.data.user);
  };

  const login = async (identifier, password) => {
    const res = await axios.post(`http://${URL}:3001/api/auth/login`, {
      identifier,
      password,
    });
    setUser(res.data.user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
