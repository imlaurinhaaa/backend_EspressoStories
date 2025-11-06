const express = require("express");
const router = express.Router();
const featureProductController = require("../controllers/featureProductController");

router.get("/products", featureProductController.getFeaturedProducts);
router.get("/products/:id", featureProductController.getFeaturedProductById);
router.post("/products", featureProductController.createFeaturedProduct);
router.put("/products/:id", featureProductController.updateFeaturedProduct);
router.delete("/products/:id", featureProductController.deleteFeaturedProduct);

module.exports = router;
