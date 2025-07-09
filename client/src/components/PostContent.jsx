import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  line-height: 1.6;
  font-size: 1.1rem;
`;

export default function PostContent({ post }) {
  return (
    <Container>
      <Title>{post.title}</Title>
      <Content>{post.content}</Content>
    </Container>
  );
}