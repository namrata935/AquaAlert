// src/utils/fetchWeather.js
import axios from "axios";

const API_KEY = "your_openweather_api_key"; // Replace with your actual OpenWeather API key

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
