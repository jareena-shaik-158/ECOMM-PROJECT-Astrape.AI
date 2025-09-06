const Item = require("../models/Item");

// Add new item
exports.addItem = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const newItem = new Item({ name, price, category, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: "Item not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Item not found" });
    res.json({ msg: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
