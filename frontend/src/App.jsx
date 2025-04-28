import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Events from "./pages/Events";
import MyEvents from "./pages/MyEvents";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventPage from "./pages/EventPage";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";

const App = () => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="container nav-container">
            <div className="nav-links">
              <Link to="/" className="btn btn-secondary">
                Home
              </Link>
              <Link to="/events" className="btn btn-secondary">
                Events
              </Link>
              {isLoggedIn && (
                <Link to="/my-events" className="btn btn-secondary">
                  My Events
                </Link>
              )}
            </div>
            <div className="nav-links">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="btn btn-primary">
                    Profile
                  </Link>
                  <Link to="/create-event" className="btn btn-primary">
                    Create Event
                  </Link>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-primary">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventPage />} />
            <Route path="/events/:id/edit" element={<EditEvent />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
