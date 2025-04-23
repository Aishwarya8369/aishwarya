import React from "react";
import "./MenShirtsSale.css";

const saleShirts = [
  {
    id: 1,
    name: "Superhero Tee",
    originalPrice: 29.99,
    salePrice: 19.99,
    image: "https://via.placeholder.com/200x250?text=Superhero+Tee"
  },
  {
    id: 2,
    name: "Comic Style Shirt",
    originalPrice: 35.0,
    salePrice: 24.99,
    image: "https://via.placeholder.com/200x250?text=Comic+Shirt"
  },
  {
    id: 3,
    name: "Starry Night Tee",
    originalPrice: 32.5,
    salePrice: 21.5,
    image: "https://via.placeholder.com/200x250?text=Starry+Tee"
  }
];

const MenShirtsSale = () => {
  return (
    <section className="sale-section">
      <h2>🔥 Men's Shirts on Sale</h2>
      <div className="shirts-grid">
        {saleShirts.map((shirt) => (
          <div key={shirt.id} className="shirt-card">
            <img src={shirt.image} alt={shirt.name} />
            <h3>{shirt.name}</h3>
            <p className="price">
              <span className="original">${shirt.originalPrice.toFixed(2)}</span>
              <span className="sale">${shirt.salePrice.toFixed(2)}</span>
            </p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenShirtsSale;
