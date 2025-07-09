import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  background-color: #fff5f5;
  color: #e53e3e;
  border: 1px solid #fed7d7;
  border-radius: 0.375rem;
`;

export default function ErrorMessage({ message }) {
  return message ? <Container>{message}</Container> : null;
}