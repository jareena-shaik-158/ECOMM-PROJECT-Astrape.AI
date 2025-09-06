const Cart = require("../models/Cart");

// Add item
exports.addItem = async (req, res) => {
  try {
    const { userId, item } = req.body;
    let cart = await Cart.findOne({ userId });
    if(!cart) cart = new Cart({ userId, items: [] });

    const index = cart.items.findIndex(i => i.itemId === item.itemId);
    if(index > -1) cart.items[index].quantity += item.quantity;
    else cart.items.push(item);

    await cart.save();
    res.status(200).json(cart);
  } catch(err){ res.status(500).json(err); }
};

// Update cart
exports.updateCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if(!cart) return res.status(404).json("Cart not found");

    cart.items = req.body.items;
    const updated = await cart.save();
    res.status(200).json(updated);
  } catch(err){ res.status(500).json(err); }
};

// Get cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart || { items: [] });
  } catch(err){ res.status(500).json(err); }
};

// Delete cart
exports.deleteCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.status(200).json("Cart deleted");
  } catch(err){ res.status(500).json(err); }
};
