import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Create a CSS file for styling the navbar

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">AquaAlert</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <a href="http://localhost:8501" target="_blank" rel="noopener noreferrer">
          Flood Prediction
        </a>
        <Link to="/community-forum">Community Forum</Link>
        <Link to="/donation">Donation</Link>
        <Link to="/safety-guidelines">Safety Guidelines</Link>
      </div>
    </div>
  );
};

export default Navbar;
