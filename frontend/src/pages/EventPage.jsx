import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EventPage = () => {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/events/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch event");
      }
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center error-message">{error}</div>;
  }

  if (!event) {
    return <div className="text-center">Event not found</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{event.title}</h2>
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
    </div>
  );
};

export default EventPage;
