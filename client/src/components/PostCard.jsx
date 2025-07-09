import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatDate } from '../utils/formatDate';

const Card = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3748;
`;

const Excerpt = styled.p`
  color: #718096;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #718096;
  font-size: 0.875rem;
`;

const PostCard = ({ post }) => {
  return (
    <Card>
      <Link to={`/posts/${post._id}`}>
        <Image src={post.featuredImage} alt={post.title} />
      </Link>
      <Content>
        <Link to={`/posts/${post._id}`}>
          <Title>{post.title}</Title>
        </Link>
        <Excerpt>{post.excerpt}</Excerpt>
        <Meta>
          <span>{formatDate(post.createdAt)}</span>
          <span>{post.commentCount} comments</span>
        </Meta>
      </Content>
    </Card>
  );
};

export default PostCard;