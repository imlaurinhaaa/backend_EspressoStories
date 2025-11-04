const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = multer({ dest: "uploads/" });

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", upload.single("photo"), userController.createUser);
router.put("/users/:id", upload.single("photo"), userController.updateUser);
router.delete("/users/:id", userController.deleteUser);