import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container text-center">
      <h1>Welcome to Event Management App</h1>
      <div className="mt-4">
        <Link to="/events" className="btn btn-primary">
          View Events
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
