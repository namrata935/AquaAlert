import React, { useState, useEffect } from "react";
import "../styles/RegisterVolunteers.css"; // Import the CSS file

const RegisterVolunteers = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [volunteers, setVolunteers] = useState(
    JSON.parse(localStorage.getItem("volunteers")) || []
  );



  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(6));
          setLongitude(position.coords.longitude.toFixed(6));
        },
        (error) => {
          alert("Unable to detect location. Please enter manually.");
          console.error(error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVolunteer = {
      name,
      contact,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
    const updatedVolunteers = [...volunteers, newVolunteer];
    setVolunteers(updatedVolunteers);
    localStorage.setItem("volunteers", JSON.stringify(updatedVolunteers));
    setName("");
    setContact("");
    setLatitude("");
    setLongitude("");
    alert("Volunteer registered successfully!");
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register as Volunteer</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Information:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Latitude:</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Longitude:</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="button" onClick={handleDetectLocation}>
            Detect Location
          </button>
          <button type="submit">Register</button>
        </div>
      </form>

      <h2 className="volunteers-title">Registered Volunteers</h2>
      <ul className="volunteers-list">
        {volunteers.map((volunteer, index) => (
          <li key={index}>
            {volunteer.name} - {volunteer.contact} - Lat: {volunteer.latitude}, Lon: {volunteer.longitude}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegisterVolunteers;