import React, { useState } from 'react';
import styled from '@emotion/styled';

const AnimationContainer = styled.div`
  width: 100%;
  max-width: 150px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0.5rem;
`;

const AnimatedGif = styled.img`
  width: 100%;
  height: auto;
  max-width: 150px;
  object-fit: contain;
`;

const ErrorMessage = styled.div`
  color: #FF8C00;
  text-align: center;
  font-family: 'Chakra Petch', sans-serif;
`;

const RoniDressUpAnimation = () => {
  const [error, setError] = useState(null);

  const handleError = (e) => {
    console.error('Error loading GIF:', e);
    setError('Failed to load animation');
  };

  return (
    <AnimationContainer>
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <AnimatedGif 
          src={process.env.PUBLIC_URL + '/images/roni-animation.gif'} 
          alt="Roni's dress up animation"
          onError={handleError}
        />
      )}
    </AnimationContainer>
  );
};

export default RoniDressUpAnimation; 