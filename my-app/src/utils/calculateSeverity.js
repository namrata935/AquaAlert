// src/utils/calculateSeverity.js
export const calculateSeverityIndex = (data) => {
    if (!data) return null;
  
    const { rain, wind, main } = data;
  
    // Example weights
    const RAIN_WEIGHT = 0.4;
    const WIND_WEIGHT = 0.3;
    const HUMIDITY_WEIGHT = 0.2;
    const PRESSURE_WEIGHT = 0.1;
  
    // Extract necessary data
    const rainfall = rain ? rain["1h"] || rain["3h"] || 0 : 0; // Rainfall in mm
    const windSpeed = wind.speed; // Wind speed in m/s
    const humidity = main.humidity; // Humidity in %
    const pressure = main.pressure; // Pressure in hPa
  
    // Calculate severity index
    const severityIndex =
      RAIN_WEIGHT * rainfall +
      WIND_WEIGHT * windSpeed +
      HUMIDITY_WEIGHT * humidity -
      PRESSURE_WEIGHT * pressure;
  
    return severityIndex;
  };
  