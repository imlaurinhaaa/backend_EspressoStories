const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/cartsController");

router.get("/carts", cartsController.getCarts);
router.get("/carts/:id", cartsController.getCartById);
router.post("/carts", cartsController.createCart);
router.put("/carts/:id", cartsController.updateCart);
router.delete("/carts/:id", cartsController.deleteCart);

module.exports = router;