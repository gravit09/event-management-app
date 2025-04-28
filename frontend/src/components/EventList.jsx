import React from "react";
import { Link } from "react-router-dom";

const EventList = ({ events }) => {
  return (
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
          <Link to={`/events/${event._id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EventList;
