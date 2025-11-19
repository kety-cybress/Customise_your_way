import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { images } from "./Images"; 
import "./Customize.css";

function CustomizePage() {
  const location = useLocation();
  const product = location.state || { name: "Default Tee", price: 50 };
  const [shirtImage, setShirtImage] = useState(null);
  const [customText, setCustomText] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [showTextInput, setShowTextInput] = useState(false);
  const [elements, setElements] = useState([]); // stores all draggable elements
  const navigate = useNavigate();
  const draggingRef = useRef(null);

  React.useEffect(() => {
    if (images[product.name]) setShirtImage(images[product.name]);
  }, [product.name]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newElement = {
        type: "image",
        src: url,
        x: 100,
        y: 50,
        width: 150,
        height: 150
      };
      setElements((prev) => [...prev, newElement]);
    }
  };

  const handleAddText = () => {
    const newElement = {
      type: "text",
      content: customText || "Text",
      x: 100,
      y: 50,
      fontSize: 18,
      color: textColor
    };
    setElements((prev) => [...prev, newElement]);
    setCustomText("");
    setShowTextInput(false);
  };

  const handleStickerAdd = (sticker) => {
    const newElement = {
      type: "sticker",
      content: sticker,
      x: 100,
      y: 50,
      fontSize: 24
    };
    setElements((prev) => [...prev, newElement]);
  };

  const handleMouseDown = (index, e) => {
    draggingRef.current = { index, offsetX: e.nativeEvent.offsetX, offsetY: e.nativeEvent.offsetY };
  };

  const handleMouseMove = (e) => {
    if (draggingRef.current) {
      const { index, offsetX, offsetY } = draggingRef.current;
      const newElements = [...elements];
      newElements[index].x = e.nativeEvent.offsetX - offsetX;
      newElements[index].y = e.nativeEvent.offsetY - offsetY;
      setElements(newElements);
    }
  };

  const handleMouseUp = () => {
    draggingRef.current = null;
  };

  const increaseSize = (index) => {
    const newElements = [...elements];
    if (newElements[index].type === "text" || newElements[index].type === "sticker") {
      newElements[index].fontSize += 2;
    } else if (newElements[index].type === "image") {
      newElements[index].width += 10;
      newElements[index].height += 10;
    }
    setElements(newElements);
  };

  const decreaseSize = (index) => {
    const newElements = [...elements];
    if (newElements[index].type === "text" || newElements[index].type === "sticker") {
      newElements[index].fontSize = Math.max(10, newElements[index].fontSize - 2);
    } else if (newElements[index].type === "image") {
      newElements[index].width = Math.max(20, newElements[index].width - 10);
      newElements[index].height = Math.max(20, newElements[index].height - 10);
    }
    setElements(newElements);
  };

  const addToCart = () => {
    navigate("/cart");
  };

  const coolStickers = ["🙂", "🔥", "🌟", "💖", "🎵", "⚡", "🌈", "🎯", "😎"];

  return (
    <div className="customize-container">
      <h1>Customize Your {product.name}</h1>

      <div className="tools">
        <label className="upload-btn">
          Upload Image 📤
          <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
        </label>
        <button onClick={() => setShowTextInput(!showTextInput)}>Add Text 🅰️</button>
        <select onChange={(e) => setTextColor(e.target.value)} value={textColor}>
          <option value="#000000">Black</option>
          <option value="#ff0000">Red</option>
          <option value="#0000ff">Blue</option>
          <option value="#00aa00">Green</option>
          <option value="#ff9900">Orange</option>
        </select>
        <div className="emoji-picker-btn">
          <select
            onChange={(e) => handleStickerAdd(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Add Sticker 🎉
            </option>
            {coolStickers.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showTextInput && (
        <input
          type="text"
          placeholder="Enter your text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
        />
      )}
      {showTextInput && <button onClick={handleAddText}>Add Text</button>}

      <div
        className="preview"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {shirtImage && (
          <img src={shirtImage} alt="shirt" className="shirt-image" />
        )}

        {elements.map((el, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: el.y,
              left: el.x,
              fontSize: el.fontSize || undefined,
              color: el.color || undefined,
              width: el.width || "auto",
              height: el.height || "auto",
              cursor: "grab"
            }}
            onMouseDown={(e) => handleMouseDown(index, e)}
          >
            {el.type === "image" ? (
              <img src={el.src} width={el.width} height={el.height} alt="custom" />
            ) : (
              el.content
            )}
            <div style={{ marginTop: "2px" }}>
              <button onClick={() => increaseSize(index)}>+</button>
              <button onClick={() => decreaseSize(index)}>-</button>
            </div>
          </div>
        ))}
      </div>

      <button className="add-to-cart" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default CustomizePage;
