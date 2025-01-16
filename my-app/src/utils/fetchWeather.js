// src/utils/fetchWeather.js
import axios from "axios";



export const fetchWeatherData = async (location) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: location,
        appid: '3000e8afe86744fee1dc6f51c55d089e',
        units: "metric", // Use metric system for °C and m/s
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
