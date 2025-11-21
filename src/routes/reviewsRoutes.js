const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const reviewsController = require("../controllers/reviewsController");

router.get("/reviews", reviewsController.getReviews);
router.get("/reviews/:id", reviewsController.getReviewsById);
router.post("/reviews", upload.none(), reviewsController.createReview);
router.put("/reviews/:id", upload.none(), reviewsController.updateReview);
router.delete("/reviews/:id", reviewsController.deleteReview);

module.exports = router;