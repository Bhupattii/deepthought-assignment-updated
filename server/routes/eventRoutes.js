// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventsControllers");

router.get("/", eventController.getAllEvents);
router.post("/", eventController.createEvent);
router.get("/:id", eventController.getEvent);
router.patch("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
