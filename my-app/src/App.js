import React from "react";
import { Provider } from 'react-redux'; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FindVolunteers from "./pages/FindVolunteers";
import RegisterVolunteers from "./pages/RegisterVolunteers"; // Create this component later
import CommunityForum from "./forum/src/App.js";
import Donation from "./pages/Donation";
import SafetyGuidelines from "./pages/SafetyGuidelines";
import "./App.css";
import {store} from './forum/src/app/store.js'

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <div className="background-overlay"></div> {/* Overlay above background */}
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register-volunteer" element={<RegisterVolunteers />} />
            <Route path="/community-forum" element={<CommunityForum />} />
            <Route path="/community-forum" element={<CommunityForum />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
          </Routes>
        </div>
      </div>
    </Router>
    </Provider>
  );
};

export default App;
