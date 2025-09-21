import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

function Signuplogin() {
  const { login, signup } = useAuth();
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phone: '',
    location: '',
    rememberMe: false,
    addLocationLater: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        const signupData = {
          ...formData,
          location: formData.addLocationLater ? '' : formData.location,
        };
        await signup(signupData); // 🔁 Call the signup function from useAuth
        alert('Signup successful!');
        navigate('/shop');
      } else {
        await login(formData.email, formData.password); // ✅ Correct usage
        alert('Login successful!');
        navigate('/shop');
      }
    } catch (error) {
      alert(error.message || 'An error occurred');
    }
  };

  return (
    <div style={containerStyle}>
      {/* Signup Form */}
      <form onSubmit={handleSubmit} style={{ ...formStyle, display: isSignup ? 'block' : 'none' }}>
        <h2 style={titleStyle}>Sign Up</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="phone"
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="location"
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          disabled={formData.addLocationLater}
          style={{
            ...inputStyle,
            opacity: formData.addLocationLater ? 0.5 : 1,
          }}
        />

        <label style={checkboxLabel}>
          <input
            name="addLocationLater"
            type="checkbox"
            checked={formData.addLocationLater}
            onChange={handleChange}
            style={checkboxInput}
          />
          Add location later
        </label>

        <label style={checkboxLabel}>
          <input
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleChange}
            style={checkboxInput}
          />
          Remember me
        </label>

        <button type="submit" style={buttonStyle}>Sign Up</button>

        <p onClick={() => setIsSignup(false)} style={linkStyle}>
          Already have an account? Log In
        </p>
      </form>

      {/* Login Form */}
      <form onSubmit={handleSubmit} style={{ ...formStyle, display: isSignup ? 'none' : 'block' }}>
        <h2 style={titleStyle}>Log In</h2>

        <input
          name="email"
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              email: e.target.value,
              phone: e.target.value,
              username: e.target.value,
            }))
          }
          required
          style={inputStyle}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label style={checkboxLabel}>
          <input
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleChange}
            style={checkboxInput}
          />
          Remember me
        </label>

        <button type="submit" style={buttonStyle}>Log In</button>

        <p onClick={() => setIsSignup(true)} style={linkStyle}>
          Don't have an account? Sign Up
        </p>

        <button
          type="button"
          onClick={() => navigate('/checkout')}
          style={{ ...buttonStyle, backgroundColor: '#ff69b4', marginTop: '1rem' }}
        >
          Checkout →
        </button>
      </form>
    </div>
  );
}

// 💄 Styles
const containerStyle = {
  background: 'linear-gradient(to right, #fcb1cc, #90dffe)',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
  flexWrap: 'wrap',
};

const formStyle = {
  backgroundColor: '#fff0f6',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  width: '320px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '0.75rem',
  border: '1px solid #ff69b4',
  borderRadius: '5px',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#ff69b4',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '1rem',
};

const linkStyle = {
  marginTop: '1rem',
  textAlign: 'center',
  color: '#007BFF',
  cursor: 'pointer',
};

const checkboxLabel = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.75rem',
};

const checkboxInput = {
  marginRight: '0.5rem',
};

export default Signuplogin;
