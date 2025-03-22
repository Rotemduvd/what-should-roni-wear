import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const WeatherContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const WeatherCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.8);
  margin: 0.5rem auto;
  font-family: 'Chakra Petch', sans-serif;

  @media (max-width: 600px) {
    padding: 1rem;
    width: 95%;
    margin: 0.25rem auto;
  }
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

const getClothingRecommendation = (temp) => {
  if (temp < 10) return 'Wear a warm jacket, scarf, and gloves!';
  if (temp < 20) return 'A light jacket or sweater would be perfect!';
  if (temp < 25) return 'T-shirt and light pants are ideal!';
  return 'It\'s hot! Wear something light and breathable!';
};

const WeatherDisplay = ({ weatherData, location, loading, error }) => {
  if (loading) {
    return (
      <WeatherContainer
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
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
        transition={{ duration: 0.3 }}
      >
        <ErrorMessage>{error}</ErrorMessage>
      </WeatherContainer>
    );
  }

  if (!weatherData) {
    return null;
  }

  const outfitColors = getOutfitColors(weatherData.current.temp_c);

  return (
    <WeatherContainer
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <WeatherCard>
        <WeatherInfo>
          <Location>{location === 'tel-aviv' ? 'Tel Aviv' : 'Holon'}</Location>
          <Temperature>{weatherData.current.temp_c}°C</Temperature>
          <Description>{weatherData.current.condition.text}</Description>
        </WeatherInfo>
        <ClothingRecommendation>
          <h3>Today's Recommendation:</h3>
          <p>{getClothingRecommendation(weatherData.current.temp_c)}</p>
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
    </WeatherContainer>
  );
};

export default WeatherDisplay; 