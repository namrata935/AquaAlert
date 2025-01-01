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

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div className="find-volunteers">
      <div className="card">
        <h1>Find Volunteers Nearby</h1>

        <div className="input-container">
          <label>Enter Skill:</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <button className="location-btn" onClick={handleLocationClick}>
          Detect Location
        </button>

        {location ? (
          <div className="location-info">
            <h2>Your Location</h2>
            <p>Latitude: {location.lat}</p>
            <p>Longitude: {location.lon}</p>
          </div>
        ) : (
          <p>Loading your location...</p>
        )}

        {location && (
          <div className="map-container">
            <MapContainer
              center={[location.lat, location.lon]}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {nearbyVolunteers.map((volunteer, index) => (
                <Marker
                  key={index}
                  position={[volunteer.latitude, volunteer.longitude]}
                  icon={new L.Icon({
                    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
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
          </div>
        )}

        <h2>Nearby Volunteers</h2>
        <ul className="volunteer-list">
          {nearbyVolunteers.map((volunteer, index) => (
            <li key={index} className="volunteer-item">
              {volunteer.name} - {volunteer.contact} - Lat: {volunteer.latitude}, Lon: {volunteer.longitude}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FindVolunteers;
