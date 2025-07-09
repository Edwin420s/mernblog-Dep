import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { postService } from '../services/api';

function CommentsSection({ postId, comments = [] }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [localComments, setLocalComments] = useState(comments);

  const submitComment = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!text.trim()) return;

    try {
      const newComment = await postService.addComment(postId, { text });
      setLocalComments([...localComments, newComment]);
      setText('');
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h4>🗨️ Comments</h4>

      {localComments.length === 0 && <p>No comments yet.</p>}
      {localComments.map((c) => (
        <p key={c._id}><strong>{c.user?.name || 'Anonymous'}:</strong> {c.text}</p>
      ))}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={user ? "Write a comment..." : "Please log in to comment"}
        disabled={!user}
        rows={4}
        style={{ width: '100%', marginTop: '1rem' }}
      />

      <button
        onClick={submitComment}
        disabled={!user}
        style={{ marginTop: '0.5rem', padding: '0.5rem 1rem' }}
      >
        {user ? 'Post Comment' : 'Login to Comment'}
      </button>
    </div>
  );
}

export default CommentsSection;
