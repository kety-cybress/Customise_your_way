import React, { useState, useEffect } from "react";
import "./Location.css";

export default function Location() {
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState("");
  const [manualSearch, setManualSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);

  // ✅ Load saved location when page opens
  useEffect(() => {
    const savedData = localStorage.getItem("userLocation");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setCoords({ lat: parsed.lat, lng: parsed.lng });
      setAddress(parsed.address);
      setSaved(true);
    }
  }, []);

  // ✅ Get location using GPS
  const handleAddLocation = () => {
    setLoading(true);
    setError("");
    setAddress("");
    setSaved(false);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoords({ lat, lng });

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            setAddress(data.display_name || "Unable to find your address.");
          } catch {
            setAddress("Unable to find your address.");
          }

          setLoading(false);
        },
        () => {
          setError("Failed to access location. Please allow location permission.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  // ✅ Manual search by address
  const handleManualSearch = async () => {
    if (!manualSearch.trim()) {
      alert("Please enter a location name or address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          manualSearch
        )}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setCoords({ lat: parseFloat(lat), lng: parseFloat(lon) });
        setAddress(display_name);
      } else {
        setError("No results found for that location.");
      }
    } catch {
      setError("Failed to search location. Try again later.");
    }

    setLoading(false);
  };

  // ✅ Save location to localStorage
  const handleSaveLocation = () => {
    if (coords.lat && coords.lng && address) {
      localStorage.setItem(
        "userLocation",
        JSON.stringify({
          lat: coords.lat,
          lng: coords.lng,
          address,
        })
      );
      setSaved(true);
      setEditing(false);
      alert("📍 Location saved successfully!");
    }
  };

  // ✅ Allow user to change saved location
  const handleChangeLocation = () => {
    setEditing(true);
    setSaved(false);
    alert("You can now change your location!");
  };

  return (
    <div className="location-page">
      <h1>📍 Location Finder</h1>

      {/* ✅ Current location button */}
      <button onClick={handleAddLocation} className="location-btn">
        {loading ? "Getting Location..." : "Get My Location"}
      </button>

      {/* ✅ Manual search section */}
      <div className="manual-search">
        <input
          type="text"
          placeholder="Search for a location..."
          value={manualSearch}
          onChange={(e) => setManualSearch(e.target.value)}
          disabled={!editing && saved}
        />
        <button
          onClick={handleManualSearch}
          className="search-btn"
          disabled={!editing && saved}
        >
          🔍 Search
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {coords.lat && coords.lng && (
        <div className="map-container">
          <iframe
            title="Your Location Map"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
          ></iframe>

          <p className="coords">
            Latitude: {Number(coords.lat).toFixed(4)} | Longitude:{" "}
            {Number(coords.lng).toFixed(4)}
          </p>

          {address && <p className="address">📍 {address}</p>}

          {/* ✅ Save / Change Buttons */}
          {!saved ? (
            <button onClick={handleSaveLocation} className="save-btn">
              💾 Save Location
            </button>
          ) : (
            <div className="saved-section">
              <p className="saved-text">✅ Location Saved Successfully!</p>
              <button onClick={handleChangeLocation} className="change-btn">
                🔁 Change Location
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
