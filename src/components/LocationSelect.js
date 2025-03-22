import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const LocationContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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

const Question = styled.h2`
  color: #4A4A4A;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Chakra Petch', sans-serif;

  @media (max-width: 600px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

const LocationButtons = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 600px) {
    gap: 10px;
    padding: 0 0.5rem;
  }
`;

const LocationButton = styled(motion.button)`
  padding: 12px 24px;
  font-size: 1.1rem;
  border: 2px solid #ff8c42;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  color: #4a4a4a;
  cursor: pointer;
  font-family: 'Chakra Petch', sans-serif;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  -webkit-tap-highlight-color: transparent;
  flex: 1;
  min-width: 120px;
  transition: all 0.3s ease;

  @media (max-width: 600px) {
    padding: 10px 20px;
    font-size: 1rem;
    min-width: 100px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    border-color: #ff7b2e;
    background: rgba(255, 255, 255, 0.95);
  }

  &:active {
    transform: translateY(0);
    border-color: #ff6a1a;
  }
`;

const LocationSelect = ({ onLocationSelect }) => {
  return (
    <LocationContainer
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      
      <Question>Where are you today, Roni?</Question>
      <LocationButtons>
        <LocationButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onLocationSelect('tel-aviv')}
        >
          Tel Aviv
        </LocationButton>
        <LocationButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onLocationSelect('holon')}
        >
          Holon
        </LocationButton>
      </LocationButtons>
    </LocationContainer>
  );
};

export default LocationSelect; 