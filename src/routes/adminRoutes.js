const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const multer = require('multer');
const upload = multer({ dest: "uploads/" });

router.get("/admins", adminController.getAdmin);
router.get("/admins/:id", adminController.getAdminById);
router.post("/admins", upload.single("photo"), adminController.createAdmin);
router.put("/admins/:id", upload.single("photo"), adminController.updateAdmin);
router.delete("/admins/:id", adminController.deleteAdmin);

module.exports = router;