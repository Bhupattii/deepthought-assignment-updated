const express = require("express");
// const router = express.Router();
const multer = require("multer");
const eventModel = require("../models/eventModel");

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// GET /api/v3/app/events
const getAllEvents = (req, res) => {
  eventModel.getAllEvents((error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("An error occurred");
    } else {
      res.send(result);
    }
  });
};

// POST /api/v3/app/events
const createEvent = (req, res) => {
  upload.single("photo")(req, res, (error) => {
    if (error) {
      console.log(error);
      res.status(500).send("An error occurred during file upload");
      return;
    }

    const eventData = req.body;
    eventData.photo = req.file ? req.file.filename : null;

    eventModel.createEvent(eventData, (error) => {
      if (error) {
        console.log(error);
        res.status(500).send("An error occurred");
      } else {
        res.sendStatus(200);
      }
    });
  });
};

// DELETE /api/v3/app/events/:id
const deleteEvent = (req, res) => {
  const eventId = req.params.id;

  eventModel.deleteEvent(eventId, (error) => {
    if (error) {
      console.log(error);
      res.status(500).send("An error occurred");
    } else {
      res.sendStatus(200);
    }
  });
};

// GET /api/v3/app/events/:id
const getEvent = (req, res) => {
  const eventId = req.params.id;

  eventModel.getEvent(eventId, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("An error occurred");
    } else {
      const eventData = result.length ? result[0] : {};
      if (eventData) {
        res.send(eventData);
      } else {
        res.status(404).send("Record not found");
      }
    }
  });
};

// PUT /api/v3/app/events/:id
const updateEvent = (req, res) => {
  upload.single("photo")(req, res, (error) => {
    if (error) {
      console.log(error);
      res.status(500).send("An error occurred during file upload");
      return;
    }

    const eventId = req.params.id;
    const eventData = req.body;
    eventData.photo = req.file ? req.file.filename : null;

    eventModel.updateEvent(eventId, eventData, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("An error occurred");
      } else {
        res.send(result);
      }
    });
  });
};

module.exports = {
  getAllEvents,
  createEvent,
  deleteEvent,
  getEvent,
  updateEvent,
};
