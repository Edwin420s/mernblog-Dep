import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Select = styled.select`
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

export default function CategoryFilter({ category, setCategory }) {
  return (
    <FilterContainer>
      <Select
        value={category || ''}
        onChange={(e) => setCategory(e.target.value || null)}
      >
        <option value="">All Categories</option>
        <option value="technology">Technology</option>
        <option value="programming">Programming</option>
        <option value="web-development">Web Development</option>
        <option value="mobile">Mobile</option>
        <option value="design">Design</option>
      </Select>
    </FilterContainer>
  );
}