const router = require("express").Router();
const CartController = require("../controllers/cartController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, CartController.addItem);
router.put("/:userId", verifyToken, CartController.updateCart);
router.get("/find/:userId", verifyToken, CartController.getCart);
router.delete("/:userId", verifyToken, CartController.deleteCart);

module.exports = router;
