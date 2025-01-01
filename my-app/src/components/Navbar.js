import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Ensure the CSS file is linked

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-logo">AquaAlert</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <a href="http://localhost:8501" target="_blank" rel="noopener noreferrer">
          Flood Prediction
        </a>
        <Link to="/severity-index">Severity Index</Link>
        <Link to="/community-forum">Community Forum</Link>
        <Link to="/donation">Donation</Link>
        <Link to="/safety-guidelines">Safety Guidelines</Link>

        {/* Volunteers Dropdown */}
        <div
          className="volunteers-dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span>Volunteers</span>
          {showDropdown && (
            <div className="dropdown-content">
              <Link to="/find-volunteer">Find Volunteers</Link>
              <Link to="/register-volunteer">Register as Volunteer</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
