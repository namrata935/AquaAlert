// src/pages/SeverityIndex.js
import React, { useState } from "react";
import { fetchWeatherData } from "../utils/fetchWeather";
import { calculateSeverityIndex } from "../utils/calculateSeverity";

const SeverityIndex = () => {
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckSeverity = async () => {
    setLoading(true);
    setError("");
    setSeverity(null);

    try {
      const weatherData = await fetchWeatherData(location);
      if (!weatherData) {
        throw new Error("Unable to fetch data. Check the location.");
      }
      const severityIndex = calculateSeverityIndex(weatherData);
      setSeverity(severityIndex);
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="severity-index-container">
      <h1>Flood Severity Checker</h1>
      <input
        type="text"
        placeholder="Enter location (e.g., London)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="input-field"
      />
      <button onClick={handleCheckSeverity} className="check-button">
        {loading ? "Checking..." : "Check Severity"}
      </button>

      {error && <p className="error-message">{error}</p>}
      {severity !== null && !error && (
        <div className="result-container">
          <h2>Severity Index: {severity.toFixed(2)}</h2>
          <p>
            {severity > 50
              ? "High severity - Take precautions!"
              : "Low severity - Stay alert!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default SeverityIndex;
