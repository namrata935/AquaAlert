import React, { useState, useEffect } from "react";

const FindVolunteers = () => {
  const [location, setLocation] = useState(null);
  const [volunteers, setVolunteers] = useState(
    JSON.parse(localStorage.getItem("volunteers")) || []
  );
  const [nearbyVolunteers, setNearbyVolunteers] = useState([]);

  useEffect(() => {
    // Fetch the user's current location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []);

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
      {location ? (
        <div>
          <h2>Your Location</h2>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lon}</p>
        </div>
      ) : (
        <p>Loading your location...</p>
      )}

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