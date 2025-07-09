import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { postService } from '../services/api';

function LikeButton({ postId, onLike }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await postService.likePost(postId);
      if (onLike) onLike(); // Optional: refresh like count
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  return (
    <button onClick={handleLike}>
      👍 Like
    </button>
  );
}

export default LikeButton;
