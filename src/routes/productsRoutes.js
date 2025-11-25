const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "uploads/" });
const productsController = require("../controllers/productsController");

router.get("/products", productsController.getProducts);
router.get("/products/:id", productsController.getProductById);

router.post(
    "/products",
    upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "photo_inspiration", maxCount: 1 }
    ]),
    productsController.createProduct
);

router.put(
    "/products/:id",
    upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "photo_inspiration", maxCount: 1 }
    ]),
    productsController.updateProduct
);

router.delete("/products/:id", productsController.deleteProduct);

module.exports = router;
