import { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => { fetchCart(); }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`https://ecomm-project-astrape-ai-6.onrender.com/api/cart/find/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data?.items || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const updatedItems = cartItems.filter(item => item.itemId !== itemId);
      await axios.put(`https://ecomm-project-astrape-ai-6.onrender.com/api/cart/${userId}`, { items: updatedItems }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(updatedItems);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.itemId} className="cart-item">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500">₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button onClick={() => handleRemove(item.itemId)} className="remove-btn">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
