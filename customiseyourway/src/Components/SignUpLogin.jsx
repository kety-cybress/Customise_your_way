import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signuplogin() {
  const { login, signup } = useAuth();
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    location: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (isSignup) {
      await signup(formData);
      alert('Signup successful!');
      navigate('/dummy'); // ← redirect after signup
    } else {
      await login(formData.email, formData.password);
      alert('Login successful!');
      navigate('/dummy'); // ← redirect after login
    }
  } catch (error) {
    alert(error.message || 'An error occurred');
  }
};

  return (
    <div style={{
      background: 'linear-gradient(to right, #fcb1cc, #90dffe)',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#fff0f6',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        width: '300px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>

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
        {isSignup && (
          <>
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
              name="location"
              type="text"
              placeholder="Location (optional)"
              value={formData.location}
              onChange={handleChange}
              style={inputStyle}
            />
          </>
        )}

        <button type="submit" style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#ff69b4',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginTop: '1rem'
        }}>
          {isSignup ? 'Sign Up' : 'Log In'}
        </button>

        <p onClick={() => setIsSignup(!isSignup)} style={{
          marginTop: '1rem',
          textAlign: 'center',
          color: '#007BFF',
          cursor: 'pointer'
        }}>
          {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '0.75rem',
  border: '1px solid #ff69b4',
  borderRadius: '5px',
};

export default Signuplogin;
