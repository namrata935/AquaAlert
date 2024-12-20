import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CommunityForum from "./pages/CommunityForum";
import Donation from "./pages/Donation";
import SafetyGuidelines from "./pages/SafetyGuidelines";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="background-overlay"></div> {/* Overlay above background */}
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/community-forum" element={<CommunityForum />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
