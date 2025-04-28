const Event = require("../models/eventModel");
const User = require("../models/userModel");

const eventController = {
  // Create a new event
  async createEvent(req, res) {
    try {
      const { date } = req.body;
      if (new Date(date) <= new Date()) {
        return res
          .status(400)
          .json({ error: "Event date must be in the future" });
      }
      const event = new Event({ ...req.body, organizer: req.user._id });
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all events
  async getAllEvents(req, res) {
    try {
      const events = await Event.find({ date: { $gt: new Date() } }).populate(
        "organizer attendees"
      );
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a single event
  async getEvent(req, res) {
    try {
      const event = await Event.findById(req.params.eventId).populate(
        "organizer attendees"
      );
      if (!event) return res.status(404).json({ error: "Event not found" });
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update an event
  async updateEvent(req, res) {
    try {
      const event = await Event.findById(req.params.eventId);
      if (!event) return res.status(404).json({ error: "Event not found" });
      if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "Not authorized" });
      }
      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.eventId,
        req.body,
        { new: true }
      );
      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete an event
  async deleteEvent(req, res) {
    try {
      const event = await Event.findById(req.params.eventId);
      if (!event) return res.status(404).json({ error: "Event not found" });
      if (event.organizer.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "Not authorized" });
      }
      await event.deleteOne();
      res.json({ message: "Event deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Register for an event
  async registerForEvent(req, res) {
    try {
      const event = await Event.findById(req.params.eventId);
      if (!event) return res.status(404).json({ error: "Event not found" });
      if (event.attendees.includes(req.user._id)) {
        return res.status(400).json({ error: "Already registered" });
      }
      event.attendees.push(req.user._id);
      await event.save();
      res.json({ message: "Registered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Cancel registration for an event
  async cancelRegistration(req, res) {
    try {
      const event = await Event.findById(req.params.eventId);
      if (!event) return res.status(404).json({ error: "Event not found" });
      if (!event.attendees.includes(req.user._id)) {
        return res.status(400).json({ error: "Not registered" });
      }
      event.attendees = event.attendees.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
      await event.save();
      res.json({ message: "Registration cancelled" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserEvents(req, res) {
    try {
      const events = await Event.find({
        attendees: req.params.userId,
      }).populate("organizer attendees");
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = eventController;
