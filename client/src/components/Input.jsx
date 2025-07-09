import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

const Error = styled.p`
  margin-top: 0.5rem;
  color: #e53e3e;
  font-size: 0.875rem;
`;

export default function Input({ label, name, register, error, ...props }) {
  return (
    <InputContainer>
      <Label htmlFor={name}>{label}</Label>
      <StyledInput
        id={name}
        {...register(name)}
        {...props}
      />
      {error && <Error>{error.message}</Error>}
    </InputContainer>
  );
}