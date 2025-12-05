const express = require("express");
const router = express.Router();
const upload = require('../config/upload');
const featureProductController = require("../controllers/featureProductController");

router.get("/feature_products", featureProductController.getFeaturedProducts);
router.get("/feature_products/:id", featureProductController.getFeaturedProductById);

// Atualizado para aceitar múltiplos campos de upload
router.post(
    "/feature_products",
    upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "photo_inspiration", maxCount: 1 }
    ]),
    featureProductController.createFeaturedProduct
);

router.put(
    "/feature_products/:id",
    upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "photo_inspiration", maxCount: 1 }
    ]),
    featureProductController.updateFeaturedProduct
);
router.delete("/feature_products/:id", featureProductController.deleteFeaturedProduct);

module.exports = router;
