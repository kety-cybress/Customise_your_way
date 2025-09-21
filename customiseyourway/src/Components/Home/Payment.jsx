import React from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    alert('Payment Successful! Thank you 🎉');
    navigate('/');
  };

  return (
    <div style={containerStyle}>
      <h2>Payment Page</h2>
      <p>Total: $49.99</p>

      <button onClick={handlePayment} style={buttonStyle}>
        Pay Now
      </button>
    </div>
  );
};

const containerStyle = {
  padding: '2rem',
  textAlign: 'center',
};

const buttonStyle = {
  padding: '1rem 2rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#00b894',
  color: '#fff',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '1rem',
};

export default Payment;
