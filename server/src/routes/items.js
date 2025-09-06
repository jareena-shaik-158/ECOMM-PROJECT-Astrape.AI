const express = require("express");
const { addItem, getItems, updateItem, deleteItem } = require("../controllers/itemController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, addItem);
router.get("/", verifyToken, getItems);
router.put("/:id", verifyToken, updateItem);
router.delete("/:id", verifyToken, deleteItem);

module.exports = router;
