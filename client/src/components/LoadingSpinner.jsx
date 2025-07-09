import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 3px solid #4299e1;
  width: ${props => props.small ? '20px' : '40px'};
  height: ${props => props.small ? '20px' : '40px'};
  animation: ${spin} 0.8s linear infinite;
  margin: 0 auto;
`;

export default function LoadingSpinner({ small }) {
  return <Spinner small={small} />;
}
LoadingSpinner.propTypes = {
  small: PropTypes.bool,
};