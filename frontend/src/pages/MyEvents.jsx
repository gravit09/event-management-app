import React, { useState, useEffect } from "react";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Not authenticated");
      }

      const response = await fetch(
        "http://localhost:5001/api/events/my-events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="events-page">
      <h1 className="text-center mb-4">My Events</h1>
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
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No events found</p>
      )}
    </div>
  );
};

export default MyEvents;
