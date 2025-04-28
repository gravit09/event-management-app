const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/:userId", auth, userController.getUser);
router.put("/:userId", auth, userController.updateUser);
router.delete("/:userId", auth, userController.deleteUser);
router.get("/:userId/events", auth, userController.getUserEvents);

module.exports = router;
