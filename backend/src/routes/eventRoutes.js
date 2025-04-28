const express = require("express");
const eventController = require("../controllers/eventController");
const router = express.Router();

router.post("/", eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get("/:eventId", eventController.getEvent);
router.put("/:eventId", eventController.updateEvent);
router.delete("/:eventId", eventController.deleteEvent);
router.post("/:eventId/register", eventController.registerForEvent);
router.post("/:eventId/cancel", eventController.cancelRegistration);
router.get("/user/:userId", eventController.getUserEvents);

module.exports = router;
