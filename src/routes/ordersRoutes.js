const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const ordersController = require("../controllers/ordersController");

router.get("/orders", ordersController.getOrders);
router.get("/orders/:id", ordersController.getOrdersById);
router.post("/orders", upload.none(), ordersController.createOrders);
router.put("/orders/:id", upload.none(), ordersController.updateOrder);
router.delete("/orders/:id", ordersController.deleteOrder);
router.get("/user/order/:userId", ordersController.getOrderWithItems);

module.exports = router;