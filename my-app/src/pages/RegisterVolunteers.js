import React, { useState } from "react";
import "../styles/RegisterVolunteers.css";

const RegisterVolunteers = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState(""); // New state for address
  const [skills, setSkills] = useState([]);
  const [otherSkill, setOtherSkill] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [volunteers, setVolunteers] = useState(
    JSON.parse(localStorage.getItem("volunteers")) || []
  );

  const skillOptions = ["First Aid", "Search and Rescue", "Cooking", "Driving"];

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

  const handleFindCoordinates = async () => {
    if (!address) {
      alert("Please enter an address.");
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )}&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        setLatitude(data[0].lat);
        setLongitude(data[0].lon);
        alert("Coordinates found and updated!");
      } else {
        alert("Address not found. Please try again.");
      }
    } catch (error) {
      console.error("Error finding coordinates:", error);
      alert("Error finding coordinates. Please try again.");
    }
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSkills([...skills, value]);
    } else {
      setSkills(skills.filter((skill) => skill !== value));
    }
  };

  const handleOtherSkillCheckboxChange = (e) => {
    const { checked } = e.target;
    setIsOtherSelected(checked);
    if (!checked) {
      setOtherSkill("");
    }
  };

  const handleOtherSkillChange = (e) => {
    setOtherSkill(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalSkills = isOtherSelected && otherSkill ? [...skills, otherSkill] : skills;
    const newVolunteer = {
      name,
      contact,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      skills: finalSkills,
    };
    const updatedVolunteers = [...volunteers, newVolunteer];
    setVolunteers(updatedVolunteers);
    localStorage.setItem("volunteers", JSON.stringify(updatedVolunteers));
    setName("");
    setContact("");
    setLatitude("");
    setLongitude("");
    setAddress("");
    setSkills([]);
    setOtherSkill("");
    setIsOtherSelected(false);
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
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="button-group-inline">
            <button type="button" onClick={handleFindCoordinates}>
              Find Coordinates
            </button>
            <button type="button" onClick={handleDetectLocation}>
              Detect Location
            </button>
          </div>
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
        <div className="form-group">
          <label>Skills:</label>
          {skillOptions.map((skill) => (
            <div key={skill}>
              <input
                type="checkbox"
                value={skill}
                checked={skills.includes(skill)}
                onChange={handleSkillChange}
              />
              <label>{skill}</label>
            </div>
          ))}
          <div>
            <input
              type="checkbox"
              value="Other"
              checked={isOtherSelected}
              onChange={handleOtherSkillCheckboxChange}
            />
            <label>Other:</label>
            {isOtherSelected && (
              <input
                type="text"
                value={otherSkill}
                onChange={handleOtherSkillChange}
                placeholder="Enter other skill"
                required
              />
            )}
          </div>
        </div>
        <div className="button-group">
          <button type="submit">Register</button>
        </div>
      </form>

      <h2 className="volunteers-title">Registered Volunteers</h2>
      <ul className="volunteers-list">
        {volunteers.map((volunteer, index) => (
          <li key={index}>
            <strong>{volunteer.name}</strong> - {volunteer.contact} - Lat:{" "}
            {volunteer.latitude}, Lon: {volunteer.longitude} - Skills:{" "}
            {(volunteer.skills || []).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegisterVolunteers;
