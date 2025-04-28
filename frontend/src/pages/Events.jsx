import React, { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState(0);

  useEffect(() => {
    checkAuth();
    fetchEvents();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Not authenticated");
      }

      const response = await fetch("http://localhost:5001/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          date,
          location,
          capacity: Number(capacity),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      fetchEvents();
      setShowCreateForm(false);
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setCapacity(0);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Not authenticated");
      }

      const response = await fetch(
        `http://localhost:5001/api/events/${eventId}/register`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register for event");
      }

      fetchEvents();
    } catch (error) {
      console.error("Error registering for event:", error);
    }
  };

  return (
    <div className="events-page">
      <div className="text-center mb-4">
        <h1>Upcoming Events</h1>
        {isLoggedIn && (
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn btn-primary"
          >
            {showCreateForm ? "Cancel" : "Create New Event"}
          </button>
        )}
      </div>

      {showCreateForm && (
        <div className="card">
          <h2 className="text-center mb-4">Create New Event</h2>
          <form onSubmit={handleCreateEvent} className="event-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input"
                rows={4}
                required
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="form-input"
                required
                min="1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Event
            </button>
          </form>
        </div>
      )}

      {events.length > 0 ? (
        <div className="event-grid">
          {events.map((event) => (
            <div key={event._id} className="card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(event.date).toLocaleString()}
                </p>
                <p>
                  <strong>Attendees:</strong> {event.attendees.length}/
                  {event.capacity}
                </p>
              </div>
              {isLoggedIn && (
                <button
                  onClick={() => handleRegister(event._id)}
                  className="btn btn-primary"
                >
                  Register
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No events available</p>
      )}
    </div>
  );
};

export default Events;
