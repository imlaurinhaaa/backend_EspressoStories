const express = require("express");
const router = express.Router();
const user_addressesController = require("../controllers/user_addressesController");

router.get("/user_addresses", user_addressesController.getUsersAddresses);
router.get("/user_addresses/:id", user_addressesController.getUserAddressById);
router.post("/user_addresses", user_addressesController.createUserAddress);
router.put("/user_addresses/:id", user_addressesController.updateUserAddress);
router.delete("/user_addresses/:id", user_addressesController.deleteUserAddress);
router.get("/user_addresses", user_addressesController.getUserAddresses);


module.exports = router;