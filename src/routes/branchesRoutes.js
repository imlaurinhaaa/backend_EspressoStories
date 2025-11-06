const express = require("express");
const router = express.Router();
const branchesController = require("../controllers/branchesController");

router.get("/branches", branchesController.getBranches);
router.get("/branches/:id", branchesController.getBranchById);
router.post("/branches", branchesController.createBranch);
router.put("/branches/:id", branchesController.updateBranch);
router.delete("/branches/:id", branchesController.deleteBranch);

module.exports = router;