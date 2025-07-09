// hooks/usePosts.js

import { useState, useEffect } from 'react'; 
import { postService } from '../services/api';

export const usePosts = (initialPage = 1, initialLimit = 10) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await postService.getAllPosts(page, limit, category, searchQuery);
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, limit, category, searchQuery]);

  return {
    posts,
    loading,
    error,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
    category,
    setCategory,
    searchQuery,
    setSearchQuery
  };
};
