const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviewsController");

router.get("/reviews", reviewsController.getReviews);
router.get("/reviews/:id", reviewsController.getReviewsById);
router.post("/reviews", reviewsController.createReview);
router.put("/reviews/:id", reviewsController.updateReview);
router.delete("/reviews/:id", reviewsController.deleteReview);

module.exports = router;