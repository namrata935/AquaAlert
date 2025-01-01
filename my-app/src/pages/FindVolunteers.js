import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/FindVolunteers.css"; 

const FindVolunteers = () => {
  const [location, setLocation] = useState(null);
  const [volunteers, setVolunteers] = useState(
    JSON.parse(localStorage.getItem("volunteers")) || []
  );
  const [nearbyVolunteers, setNearbyVolunteers] = useState([]);
  const [skills, setSkills] = useState(""); // User's skill input

  const handleLocationClick = () => {
    // Fetch the user's current location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  };

  useEffect(() => {
    if (location) {
      // Filter volunteers within 5 km radius
      const radius = 5; // 5 km radius
      const nearby = volunteers.filter((volunteer) => {
        const distance = getDistance(
          location.lat,
          location.lon,
          volunteer.latitude,
          volunteer.longitude
        );
        return distance <= radius;
      });
      setNearbyVolunteers(nearby);
    }
  }, [location, volunteers]);

  // Haversine formula to calculate distance between two lat/lon points
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div>
      <h1>Find Volunteers Nearby</h1>

      {/* Input for skills */}
      <div>
        <label>Enter Skill:</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>

      {/* Button to detect location */}
      <button onClick={handleLocationClick}>Detect Location</button>

      {/* Display location */}
      {location ? (
        <div>
          <h2>Your Location</h2>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lon}</p>
        </div>
      ) : (
        <p>Loading your location...</p>
      )}

      {/* Display map */}
      {location && (
        <MapContainer
          center={[location.lat, location.lon]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Markers for nearby volunteers */}
          {nearbyVolunteers.map((volunteer, index) => (
            <Marker
              key={index}
              position={[volunteer.latitude, volunteer.longitude]}
              icon={new L.Icon({
                iconUrl: "https://example.com/marker-icon.png", // Customize icon here
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
              })}
            >
              <Popup>
                <strong>{volunteer.name}</strong> <br />
                Contact: {volunteer.contact}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {/* Display nearby volunteers */}
      <h2>Nearby Volunteers</h2>
      <ul>
        {nearbyVolunteers.map((volunteer, index) => (
          <li key={index}>
            {volunteer.name} - {volunteer.contact} - Lat: {volunteer.latitude}, Lon: {volunteer.longitude}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindVolunteers;
