const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const order_itemsController = require("../controllers/order_itemsController");

router.get("/order_items", order_itemsController.getOrderItems);
router.get("/order_items/:id", order_itemsController.getOrderItemsById);
router.post("/order_items", upload.none(), order_itemsController.createOrderItem);
router.put("/order_items/:id", upload.none(), order_itemsController.updateOrderItem);
router.delete("/order_items/:id", order_itemsController.deleteOrderItem);

module.exports = router;