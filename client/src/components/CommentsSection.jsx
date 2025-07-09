import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { postService } from '../services/api';

const Container = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const CommentList = styled.div`
  margin-bottom: 2rem;
`;

const CommentBox = styled.div`
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const Author = styled.div`
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const CommentText = styled.p`
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  resize: vertical;
  min-height: 100px;
  padding: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #cbd5e0;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  align-self: flex-end;
  background-color: #2b6cb0;
  color: white;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;

  &:hover {
    background-color: #2c5282;
  }
`;

const CommentsSection = ({ postId, comments = [], user }) => {
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState(comments);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      text: newComment,
      user: {
        username: user?.username || 'Anonymous',
        id: user?._id,
      },
    };

    // Optimistic UI update
    setLocalComments([...localComments, commentData]);
    setNewComment('');

    try {
      await postService.addComment(postId, { text: newComment });
    } catch (err) {
      console.error('Failed to submit comment:', err.message);
      // Revert optimistic update if error
      setLocalComments(comments);
    }
  };

  return (
    <Container>
      <Title>Comments ({localComments.length})</Title>

      <CommentList>
        {localComments.map((comment, index) => (
          <CommentBox key={index}>
            <Author>{comment.user?.username || 'Anonymous'}</Author>
            <CommentText>{comment.text}</CommentText>
          </CommentBox>
        ))}
      </CommentList>

      {user && (
        <Form onSubmit={handleSubmit}>
          <TextArea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
          />
          <Button type="submit">Post Comment</Button>
        </Form>
      )}
    </Container>
  );
};

export default CommentsSection;
