import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </SearchContainer>
  );
}