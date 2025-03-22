import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import axios from 'axios';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FFE4B5 0%, #FFDAB9 100%);
  color: #4A4A4A;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: 'Chakra Petch', sans-serif;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const WeatherCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.8);
  margin-top: 2rem;
  font-family: 'Chakra Petch', sans-serif;
`;

const Title = styled.h1`
  font-family: 'Bungee', cursive;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #FF8C00;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: 'Chakra Petch', sans-serif;
`;

const Location = styled.div`
  font-size: 1.2rem;
  color: #4A4A4A;
  text-align: center;
  margin-bottom: 0.5rem;
  font-family: 'Chakra Petch', sans-serif;
`;

const Temperature = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #FF8C00;
  font-family: 'Chakra Petch', sans-serif;
`;

const Description = styled.div`
  font-size: 1.2rem;
  color: #4A4A4A;
  text-transform: capitalize;
  font-family: 'Chakra Petch', sans-serif;
`;

const ClothingRecommendation = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(255, 140, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  color: #4A4A4A;
  font-family: 'Chakra Petch', sans-serif;
`;

const CharacterContainer = styled(motion.div)`
  width: 120px;
  height: 120px;
  margin: 2rem auto;
  position: relative;
  image-rendering: pixelated;
`;

const PixelCharacter = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Head = styled.div`
  width: 30px;
  height: 30px;
  background: ${props => props.skinColor || '#FFE0BD'};
  border-radius: 50%;
  position: absolute;
  top: 20px;
  left: 45px;
  z-index: 2;
`;

const Body = styled.div`
  width: 40px;
  height: 50px;
  background: ${props => props.outfitColor || '#FF9ECD'};
  position: absolute;
  top: 45px;
  left: 40px;
  border-radius: 8px;
  z-index: 1;
`;

const Arms = styled.div`
  width: 20px;
  height: 40px;
  background: ${props => props.outfitColor || '#FF9ECD'};
  position: absolute;
  top: 50px;
  left: 30px;
  border-radius: 10px;
  z-index: 1;
`;

const ArmsRight = styled(Arms)`
  left: 70px;
`;

const Legs = styled.div`
  width: 20px;
  height: 40px;
  background: ${props => props.pantsColor || '#4A4A4A'};
  position: absolute;
  top: 90px;
  left: 45px;
  border-radius: 10px;
  z-index: 1;
`;

const LegsRight = styled(Legs)`
  left: 55px;
`;

const Hair = styled.div`
  width: 40px;
  height: 20px;
  background: #4A4A4A;
  position: absolute;
  top: 15px;
  left: 40px;
  border-radius: 20px 20px 0 0;
  z-index: 3;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #FF8C00;
  font-size: 1.2rem;
  margin-top: 2rem;
  font-family: 'Chakra Petch', sans-serif;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #FF6B6B;
  font-size: 1.2rem;
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 10px;
  font-family: 'Chakra Petch', sans-serif;
`;

const getOutfitColors = (temp) => {
  if (temp < 10) {
    return {
      outfitColor: '#FFA07A', // Light salmon winter jacket
      pantsColor: '#4A4A4A',
      skinColor: '#FFE0BD'
    };
  }
  if (temp < 20) {
    return {
      outfitColor: '#FFB6C1', // Light pink spring sweater
      pantsColor: '#4A4A4A',
      skinColor: '#FFE0BD'
    };
  }
  if (temp < 25) {
    return {
      outfitColor: '#FFD700', // Gold summer t-shirt
      pantsColor: '#FFA07A', // Light salmon shorts
      skinColor: '#FFE0BD'
    };
  }
  return {
    outfitColor: '#FF8C00', // Orange tank top
    pantsColor: '#FFA07A', // Light salmon shorts
    skinColor: '#FFE0BD'
  };
};

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get API key from environment variable
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        console.log('API Key:', API_KEY); // Debug log
        if (!API_KEY) {
          throw new Error('Weather API key not found. Please add your WeatherAPI.com API key to .env file');
        }

        // Get user's location
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });

        const { latitude, longitude } = position.coords;
        const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`;
        console.log('Request URL:', url); // Debug log
        const response = await axios.get(url);
        
        setWeather({
          temperature: Math.round(response.data.current.temp_c),
          description: response.data.current.condition.text,
          feelsLike: Math.round(response.data.current.feelslike_c),
          location: response.data.location.name,
        });
      } catch (err) {
        console.error('Full error:', err); // Debug log
        if (err.code === 1) {
          setError('Please allow location access to get weather for your area.');
        } else {
          setError('Failed to fetch weather data. Please check your API key and try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Update weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getClothingRecommendation = (temp) => {
    if (temp < 10) return 'Wear a warm jacket, scarf, and gloves!';
    if (temp < 20) return 'A light jacket or sweater would be perfect!';
    if (temp < 25) return 'T-shirt and light pants are ideal!';
    return 'It\'s hot! Wear something light and breathable!';
  };

  if (loading) {
    return (
      <AppContainer>
        <Title>What 2 Wear Today</Title>
        <LoadingMessage>Loading weather data...</LoadingMessage>
      </AppContainer>
    );
  }

  if (error) {
    return (
      <AppContainer>
        <Title>What 2 Wear Today</Title>
        <ErrorMessage>{error}</ErrorMessage>
      </AppContainer>
    );
  }

  if (!weather) {
    return (
      <AppContainer>
        <Title>What 2 Wear Today</Title>
        <ErrorMessage>No weather data available</ErrorMessage>
      </AppContainer>
    );
  }

  const outfitColors = getOutfitColors(weather.temperature);

  return (
    <AppContainer>
      <Title>What 2 Wear Today</Title>
      <WeatherCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <WeatherInfo>
          <Location>{weather.location}</Location>
          <Temperature>{weather.temperature}°C</Temperature>
          <Description>{weather.description}</Description>
        </WeatherInfo>
        <ClothingRecommendation>
          <h3>Today's Recommendation:</h3>
          <p>{getClothingRecommendation(weather.temperature)}</p>
        </ClothingRecommendation>
      </WeatherCard>
      <CharacterContainer
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <PixelCharacter>
          <Hair />
          <Head skinColor={outfitColors.skinColor} />
          <Body outfitColor={outfitColors.outfitColor} />
          <Arms outfitColor={outfitColors.outfitColor} />
          <ArmsRight outfitColor={outfitColors.outfitColor} />
          <Legs pantsColor={outfitColors.pantsColor} />
          <LegsRight pantsColor={outfitColors.pantsColor} />
        </PixelCharacter>
      </CharacterContainer>
    </AppContainer>
  );
}

export default App;
