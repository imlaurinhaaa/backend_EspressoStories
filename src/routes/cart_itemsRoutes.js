const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const carts_itemsController = require("../controllers/cart_itemsController");

router.get("/cart_items", carts_itemsController.getCartItems);
router.get("/cart_items/:id", carts_itemsController.getCartItemsById);
router.post("/cart_items", upload.none(), carts_itemsController.createCartItem);
router.put("/cart_items/:id", upload.none(), carts_itemsController.updateCartItem);
router.delete("/cart_items/:id", carts_itemsController.deleteCartItem);

module.exports = router;