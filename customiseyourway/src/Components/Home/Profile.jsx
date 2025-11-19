import React from "react";
import { useAuth } from "../Home/useAuth";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>

      {user ? (
        <>
          {/* Basic user info */}
          <div className="profile-info">
            <p><strong>Username:</strong> {user.username || "N/A"}</p>
            <p><strong>Email:</strong> {user.email || "N/A"}</p>
            <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
          </div>

          <hr />

          {/* Orders */}
          <div className="profile-orders">
            <h2>Order Summary</h2>
            {user.orders && user.orders.length > 0 ? (
              user.orders.map((order, index) => (
                <div key={index} className="order-card">
                  <p><strong>Order Date:</strong> {order.date}</p>
                  <p><strong>Payment Method:</strong> {order.method}</p>
                  <p><strong>Total:</strong> R{order.total}</p>
                  <p><strong>Items:</strong></p>
                  <ul>
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.name} x {item.quantity || 1} — R{item.price * (item.quantity || 1)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No orders yet.</p>
            )}
          </div>

          <hr />

          <button onClick={logout} className="logout-btn">Sign Out</button>
        </>
      ) : (
        <p>No user info found.</p>
      )}
    </div>
  );
}
