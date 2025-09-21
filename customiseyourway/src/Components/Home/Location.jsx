// src/Components/Home/Location.jsx
import React, { useState } from 'react';

const Location = () => {
  const [location, setLocation] = useState('');
  const [success, setSuccess] = useState(false);

  const handleManualLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleSave = () => {
    if (location.trim()) {
      localStorage.setItem('user_location', location);
      setSuccess(true);
    }
  };

  const handleGPS = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude}, ${pos.coords.longitude}`;
        setLocation(coords);
        localStorage.setItem('user_location', coords);
        setSuccess(true);
      },
      () => alert('Location access denied.')
    );
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem',
      gap: '2rem',
      flexWrap: 'wrap'
    }}>
      {/* Left Box */}
      <div style={{
        backgroundColor: 'hotpink',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '10px',
        width: '300px'
      }}>
        <p>Is your preferred location saved?</p>
        <button onClick={() => alert('Continuing')} style={btn}>Yes, continue</button>

        <p>Would you like to use your GPS/current location?</p>
        <button onClick={handleGPS} style={btn}>Yes, use GPS location</button>

        <label>
          <input type="checkbox" />
          Allow site to access location
        </label>

        {success && <p style={{ marginTop: '10px' }}>Location successfully saved!</p>}
      </div>

      {/* Right Box */}
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '10px',
        width: '300px',
        border: '1px solid lightgray'
      }}>
        <p>Is your preferred location saved?</p>
        <button onClick={() => setLocation('')} style={btn}>No, set location</button>

        <p>Would you like to use your GPS/current location?</p>
        <button onClick={() => setLocation('')} style={btn}>No, choose manually</button>

        <select onChange={handleManualLocation} value={location} style={{ ...btn, width: '100%' }}>
          <option value="">-- select --</option>
          <option value="New York">New York</option>
          <option value="Lagos">Lagos</option>
          <option value="London">London</option>
        </select>

        <button onClick={handleSave} style={btn}>Save location</button>

        {success && <p style={{ marginTop: '10px' }}>Location successfully saved!</p>}
      </div>
    </div>
  );
};

const btn = {
  display: 'block',
  margin: '10px 0',
  padding: '10px',
  backgroundColor: '#ff69b4',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default Location;
