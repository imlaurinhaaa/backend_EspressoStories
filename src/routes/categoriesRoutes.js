const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

router.get("/categories", categoriesController.getCategories);
router.get("/categories/:id", categoriesController.getCategoryById);
router.post("/categories", categoriesController.createCategory);
router.put("/categories/:id", categoriesController.updateCategory);
router.delete("/categories/:id", categoriesController.deleteCategory);

module.exports = router;
