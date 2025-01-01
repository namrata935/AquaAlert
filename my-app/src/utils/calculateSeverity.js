export const calculateSeverityIndex = (data) => {
    const { rain, wind, main } = data;
    const normalize = (value, min, max) => (value - min) / (max - min);

  
    const rainfall = normalize(rain?.["1h"] || 0, 0, 50); // Rainfall in mm
    const windSpeed = normalize(wind.speed, 0, 30); // Wind speed in m/s
    const humidity = normalize(main.humidity, 0, 100); // Humidity in %
    const pressure = normalize(main.pressure, 950, 1050); // Pressure in hPa
  
    // Adjusted weights to ensure a balanced index
    const RAIN_WEIGHT = 0.4;
    const WIND_WEIGHT = 0.3;
    const HUMIDITY_WEIGHT = 0.2;
    const PRESSURE_WEIGHT = 0.1;
  
    // Calculate severity index as a positive value
    const severityIndex =
      RAIN_WEIGHT * rainfall +
      WIND_WEIGHT * windSpeed +
      HUMIDITY_WEIGHT * humidity +
      PRESSURE_WEIGHT * (1 - pressure); // Lower pressure = more severe
  
    return severityIndex * 100; // Scale up for better readability
  };
  