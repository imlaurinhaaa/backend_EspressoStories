const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

router.get("/orders", ordersController.getOrders);
router.get("/orders/:id", ordersController.getOrdersById);
router.post("/orders", ordersController.createOrders);
router.put("/orders/:id", ordersController.updateOrder);
router.delete("/orders/:id", ordersController.deleteOrder);

module.exports = router;