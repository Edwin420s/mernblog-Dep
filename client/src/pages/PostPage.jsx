import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { postService } from '../services/api';
import { useAuth } from '../context/AuthContext';

import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import PostContent from '../components/PostContent';
import CommentsSection from '../components/CommentsSection';
import LikeButton from '../components/LikeButton';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const PostPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await postService.getPost(id);
      setPost(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return <ErrorMessage message="Post not found" />;

  return (
    <Container>
      <PostContent post={post} />
      <LikeButton postId={post._id} onLike={fetchPost} />
      <CommentsSection postId={post._id} comments={post.comments} />
    </Container>
  );
};

export default PostPage;
