import { useState, useEffect } from "react";
import axios from "axios";
import "./Items.css";

function Items() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name || !price || !category) return alert("Please fill all required fields");
    try {
      await axios.post(
        "http://localhost:5000/api/items",
        { name, price, category, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName(""); setPrice(""); setCategory(""); setDescription("");
      fetchItems();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/",
        {
          userId,
          item: {
            itemId: item._id,
            name: item.name,
            price: item.price,
            quantity: 1,
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`${item.name} added to cart`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="items-container">
      <h2>Items</h2>
      <form onSubmit={handleAdd} className="item-form">
        <input type="text" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <input type="text" placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Add Item</button>
      </form>

      <div className="item-grid">
        {items.map(item => (
          <div className="item-card" key={item._id}>
            <h3>{item.name}</h3>
            <p>Category: {item.category}</p>
            <p>₹{item.price}</p>
            {item.description && <p>{item.description}</p>}
            <div className="item-actions">
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
