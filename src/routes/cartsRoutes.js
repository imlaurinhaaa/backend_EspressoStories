const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const cartsController = require("../controllers/cartsController");

router.get("/carts", cartsController.getCarts);
router.get("/carts/:id", cartsController.getCartById);
router.post("/carts", upload.none(), cartsController.createCart);
router.put("/carts/:id", upload.none(), cartsController.updateCart);
router.delete("/carts/:id", cartsController.deleteCart);

module.exports = router;