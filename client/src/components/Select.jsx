import React from 'react';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import Select from 'react-select';

const SelectContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
`;

const Error = styled.p`
  margin-top: 0.5rem;
  color: #e53e3e;
  font-size: 0.875rem;
`;

export default function CustomSelect({ label, name, control, error, options, isMulti = false, ...props }) {
  return (
    <SelectContainer>
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            isMulti={isMulti}
            classNamePrefix="select"
            className="react-select-container"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: error ? '#e53e3e' : '#e2e8f0',
                '&:hover': {
                  borderColor: error ? '#e53e3e' : '#cbd5e0',
                },
              }),
            }}
            {...props}
          />
        )}
      />
      {error && <Error>{error.message}</Error>}
    </SelectContainer>
  );
}