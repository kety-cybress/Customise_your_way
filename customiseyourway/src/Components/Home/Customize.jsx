import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomizePage() {
  const [shirtImage, setShirtImage] = useState(null); // main t-shirt base
  const [customText, setCustomText] = useState("");   // text overlay
  const [showTextInput, setShowTextInput] = useState(false);
  const [stickers, setStickers] = useState([]);       // stickers overlay
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setShirtImage(URL.createObjectURL(file));
    }
  };

  const handleAddText = () => {
    setShowTextInput(true);
  };

  const handleStickerAdd = (sticker) => {
    setStickers((prev) => [...prev, sticker]);
  };

  const addToCart = () => {
    // later connect this to CartProvider
    navigate("/cart");
  };

  return (
    <div className="customize-container" style={{ padding: "2rem" }}>
      <h1>Customize Your T-Shirt</h1>

      {/* Tools */}
      <div className="tools" style={{ marginBottom: "1rem" }}>
        <label className="upload-btn" style={{ marginRight: "1rem" }}>
          Upload Image 📤
          <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
        </label>
        <button onClick={handleAddText} style={{ marginRight: "1rem" }}>
          Add Text 🅰️
        </button>
        <button onClick={() => handleStickerAdd("🙂")} style={{ marginRight: "1rem" }}>
          Add Sticker 🙂
        </button>
      </div>

      {/* Workspace Preview */}
      <div
        className="preview"
        style={{
          width: "300px",
          height: "400px",
          border: "2px dashed gray",
          position: "relative",
          marginBottom: "1rem",
        }}
      >
        {/* Shirt base image */}
        {shirtImage && (
          <img
            src={shirtImage}
            alt="t-shirt"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}

        {/* Text overlay */}
        {customText && (
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: "bold",
              fontSize: "18px",
              color: "black",
            }}
          >
            {customText}
          </p>
        )}

        {/* Stickers overlay */}
        {stickers.map((sticker, index) => (
          <span
            key={index}
            style={{
              position: "absolute",
              top: 30 + index * 30,
              left: 30 + index * 30,
              fontSize: "24px",
            }}
          >
            {sticker}
          </span>
        ))}
      </div>

      {/* Show text input only when "Add Text" is clicked */}
      {showTextInput && (
        <input
          type="text"
          placeholder="Enter your text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          style={{ marginBottom: "1rem", padding: "0.5rem" }}
        />
      )}

      <button className="add-to-cart" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default CustomizePage;
