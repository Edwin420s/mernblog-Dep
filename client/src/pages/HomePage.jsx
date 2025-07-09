// src/pages/HomePage.jsx
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #2d3748;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const HomePage = () => {
  const {
    posts,
    loading,
    error,
    page,
    setPage,
    totalPages,
    category,
    setCategory,
    searchQuery,
    setSearchQuery
  } = usePosts();

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Title>Latest Posts</Title>

      <Filters>
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        <CategoryFilter 
          category={category} 
          setCategory={setCategory} 
        />
      </Filters>

      <PostsGrid>
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </PostsGrid>

      <Pagination 
        currentPage={page} 
        totalPages={totalPages} 
        onPageChange={setPage} 
      />
    </Container>
  );
};

export default HomePage;
