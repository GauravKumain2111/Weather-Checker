import React from "react";
import { useState } from "react";
import axios from "axios";
import './Weather.css'; // Make sure to create and import this CSS file

export default function Weather() {
    const [City, SetCity] = useState('');
    const [WeatherData, SetWeatherData] = useState(null);
    const API_KEY = "29463908494d28c3e3548f2fbe40fcfa";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API_KEY}&units=metric`;

    async function CheckWeather(e) {
        e.preventDefault();
        if (!City) {
            alert("Please enter a city name");
            return;
        }

        try {
            const response = await axios.get(url);
            SetWeatherData(response.data);
        } catch (error) {
            console.log('Error fetching weather', error);
        }
    }

    return (
        <div className="weather-container">
            <form onSubmit={CheckWeather} className="weather-form">
                <h1 className="form-title">🌤️ Weather Checker</h1>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={City}
                    onChange={e => SetCity(e.target.value)}
                    className="input-field"
                />
                <button className="submit-button">Check Weather</button>
            </form>

            {WeatherData && (
                <div className="weather-data">
                    <h2>Weather in {WeatherData.name}</h2>
                    <p>🌡️ Temperature: {WeatherData.main.temp}°C</p>
                    <p>🌥️ Condition: {WeatherData.weather[0].description}</p>
                    <p>💧 Humidity: {WeatherData.main.humidity}%</p>
                </div>
            )}
        </div>
    );
}
