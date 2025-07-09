import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function Form({ children, onSubmit }) {
  return (
    <FormContainer onSubmit={onSubmit}>
      {children}
    </FormContainer>
  );
}