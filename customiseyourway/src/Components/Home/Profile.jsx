import React from "react";
import { useAuth } from "../Home/useAuth";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Your Profile</h1>
      {user ? (
        <>
          <p>Username: {user.username || "N/A"}</p>
          <p>Email: {user.email || "N/A"}</p>
          <button onClick={logout}>Sign Out</button>
        </>
      ) : (
        <p>No user info found.</p>
      )}
    </div>
  );
}
