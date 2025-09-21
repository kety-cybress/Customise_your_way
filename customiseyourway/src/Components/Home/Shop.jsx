import React from "react";

const products = [
  {
    name: "Phone Case",
    img: "https://dummyimage.com/220x220/ffffff/000000&text=Phone+Case",
    price: 20,
  },
  {
    name: "White Hoodie",
    img: "https://dummyimage.com/220x220/ffffff/000000&text=Hoodie",
    price: 60,
  },
  {
    name: "Backpack",
    img: "https://dummyimage.com/220x220/ffffff/000000&text=Backpack",
    price: 45,
  },
  {
    name: "Notebook",
    img: "https://dummyimage.com/220x220/ffffff/000000&text=Notebook",
    price: 25,
  },
  {
    name: "Bucket Hat",
    img: "https://dummyimage.com/220x220/ffffff/000000&text=Bucket+Hat",
    price: 30,
  },
  {
    name: "Sneakers",
    img: "https://dummyimage.com/220x220/ffffff/000000&text=Sneakers",
    price: 80,
  },
  {
    name: "Cushion",
    img: "https://dummyimage.com/220x220/ffffff/000000&text=Cushion",
    price: 35,
  },
  {
    name: "Table",
    img: "https://dummyimage.com/220x220/ffffff/000000&text=Table",
    price: 150,
  },
  {
    name: "Pants",
    img: "https://dummyimage.com/220x220/ffffff/000000&text=Pants",
    price: 50,
  },
];

export default function Products() {
  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Our Products</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "30px",
        }}
      >
        {products.map((product, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #eee",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            className="product-card"
          >
            <img
              src={product.img}
              alt={product.name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px", textAlign: "center" }}>
              <h3 style={{ margin: "10px 0" }}>{product.name}</h3>
              <p style={{ margin: "10px 0", fontWeight: "bold" }}>R{product.price}</p>
              <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
                <button
                  style={{
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#ff4081",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#e73370")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4081")}
                >
                  Customize
                </button>
                <button
                  style={{
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#2196f3",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#1976d2")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#2196f3")}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
