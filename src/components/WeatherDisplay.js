import React from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import RoniDressUpAnimation from './RoniDressUpAnimation';

const WeatherContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
`;

const WeatherCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;
  overflow: hidden;
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Chakra Petch', sans-serif;
`;

const Location = styled.div`
  font-size: 1.2rem;
  color: #4A4A4A;
  text-align: center;
  margin-bottom: 0.25rem;
  font-family: 'Chakra Petch', sans-serif;
`;

const Temperature = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #FF8C00;
  font-family: 'Chakra Petch', sans-serif;

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Description = styled.div`
  font-size: 1.1rem;
  color: #4A4A4A;
  text-transform: capitalize;
  font-family: 'Chakra Petch', sans-serif;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const ClothingRecommendation = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(255, 140, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  color: #4A4A4A;
  font-family: 'Chakra Petch', sans-serif;
`;

const CharacterContainer = styled(motion.div)`
  width: 80px;
  height: 80px;
  margin: 1rem auto;
  position: relative;
  image-rendering: pixelated;

  @media (max-width: 600px) {
    width: 60px;
    height: 60px;
    margin: 0.5rem auto;
  }
`;

const PixelCharacter = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0px); }
  }
`;

const Hair = styled.div`
  width: 45px;
  height: 30px;
  background: #FF4500;
  position: absolute;
  top: 10px;
  left: 37px;
  border-radius: 25px 25px 0 0;
  z-index: 3;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    background: #FF4500;
    border-radius: 50%;
    top: 15px;
  }
  
  &::before {
    left: -6px;
  }
  
  &::after {
    right: -6px;
  }
`;

const Curls = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: #FF4500;
  border-radius: 50%;
  top: 20px;
  left: 35px;
  z-index: 3;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #FF4500;
    border-radius: 50%;
  }
  
  &::before {
    left: -15px;
  }
  
  &::after {
    left: 15px;
  }
`;

const Eyes = styled.div`
  width: 10px;
  height: 10px;
  background: #4A4A4A;
  border-radius: 50%;
  position: absolute;
  top: 25px;
  left: 48px;
  z-index: 3;
  
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: #4A4A4A;
    border-radius: 50%;
    left: 15px;
  }
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
  width: 35px;
  height: 45px;
  background: ${props => props.outfitColor || '#FF9ECD'};
  position: absolute;
  top: 45px;
  left: 42px;
  border-radius: 8px;
  z-index: 1;
`;

const Arms = styled.div`
  width: 15px;
  height: 35px;
  background: ${props => props.outfitColor || '#FF9ECD'};
  position: absolute;
  top: 50px;
  left: 35px;
  border-radius: 10px;
  z-index: 1;
`;

const ArmsRight = styled(Arms)`
  left: 72px;
`;

const Legs = styled.div`
  width: 15px;
  height: 35px;
  background: ${props => props.pantsColor || '#4A4A4A'};
  position: absolute;
  top: 85px;
  left: 45px;
  border-radius: 10px;
  z-index: 1;
`;

const LegsRight = styled(Legs)`
  left: 55px;
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

const ChangeLocationButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(255, 140, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  color: #4A4A4A;
  font-family: 'Chakra Petch', sans-serif;
  border: none;
  cursor: pointer;
`;

const WeatherDisplay = ({ weatherData, onLocationChange, loading, error }) => {
  const getClothingRecommendation = (temp) => {
    if (!temp) return 'Loading recommendations...';
    if (temp >= 30) return 'Very hot! Wearing a light summer dress';
    if (temp >= 25) return 'Hot! Wearing a short sleeve shirt and shorts';
    if (temp >= 20) return 'Nice! Wearing a shirt and pants';
    if (temp >= 15) return 'A bit chilly! Wearing a long sleeve shirt and pants';
    return 'Cold! Wearing a sweater and long pants';
  };

  if (loading) {
    return (
      <WeatherContainer
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <LoadingMessage>Loading weather data...</LoadingMessage>
      </WeatherContainer>
    );
  }

  if (error) {
    return (
      <WeatherContainer
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <ErrorMessage>Error loading weather data</ErrorMessage>
      </WeatherContainer>
    );
  }

  return (
    <WeatherContainer
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <WeatherCard>
        <Location>{weatherData?.location?.name || 'Loading location...'}</Location>
        <Temperature>{weatherData?.current?.temp_c ? Math.round(weatherData.current.temp_c) : '--'}°C</Temperature>
        <Description>{weatherData?.current?.condition?.text || 'Loading description...'}</Description>
        <ClothingRecommendation>
          {getClothingRecommendation(weatherData?.current?.temp_c)}
        </ClothingRecommendation>
        <RoniDressUpAnimation />
        <ChangeLocationButton onClick={onLocationChange}>
          Change Location
        </ChangeLocationButton>
      </WeatherCard>
    </WeatherContainer>
  );
};

export default WeatherDisplay; 