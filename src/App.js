import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherDisplay from './components/WeatherDisplay';
import LocationSelect from './components/LocationSelect';

const AppContainer = styled.div`
  min-height: 100vh;
  height: 100vh;
  background: linear-gradient(135deg, #FFE4B5 0%, #FFDAB9 100%);
  color: #4A4A4A;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  font-family: 'Chakra Petch', sans-serif;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 600px) {
    margin: 0;
    border-radius: 0;
    padding: 0.5rem;
    height: 100vh;
    height: -webkit-fill-available;
  }
`;

const Title = styled.h1`
  font-family: 'Bungee', cursive;
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #FF8C00;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;

  @media (max-width: 600px) {
    font-size: 1.8rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const App = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    fetchWeatherData(selectedLocation);
  };

  const fetchWeatherData = async (selectedLocation) => {
    setLoading(true);
    setError(null);
    try {
      const coordinates = selectedLocation === 'tel-aviv' 
        ? { lat: 32.0853, lon: 34.7818 }
        : { lat: 32.0108, lon: 34.7795 };

      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${coordinates.lat},${coordinates.lon}&aqi=no`
      );

      if (!response.ok) {
        throw new Error('Weather data not available');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again later.');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContainer>
      <Title>What Should Roni Wear Today</Title>
      <AnimatePresence mode="wait">
        {!location ? (
          <LocationSelect key="location-select" onLocationSelect={handleLocationSelect} />
        ) : (
          <WeatherDisplay
            key="weather-display"
            weatherData={weatherData}
            location={location}
            loading={loading}
            error={error}
            onLocationChange={() => setLocation(null)}
          />
        )}
      </AnimatePresence>
    </AppContainer>
  );
};

export default App;
