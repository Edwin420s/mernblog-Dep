import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';

import { postService } from '../services/api';
import { useAuth } from '../context/AuthContext';

import Form from '../components/Form';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import ImageUpload from '../components/ImageUpload';
import Select from '../components/Select';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters'),
  content: yup
    .string()
    .required('Content is required')
    .min(100, 'Content must be at least 100 characters'),
  categories: yup
    .array()
    .min(1, 'Select at least one category'),
  image: yup
    .mixed()
    .required('Featured image is required')
});

function CreatePostPage() {
  const { user } = useAuth();
  console.log('🧩 CreatePostPage loaded. User:', user);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('status', 'published');

      const categoryValues = data.categories.map((cat) => cat.value);
      formData.append('categories', JSON.stringify(categoryValues));

      const imageFile = Array.isArray(data.image) ? data.image[0] : data.image;
      formData.append('image', imageFile);

      await postService.createPost(formData);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return <ErrorMessage message="❌ You don't have permission to access this page." />;
  }

  return (
    <Container>
      <Title>📝 Create New Post</Title>

      {error && <ErrorMessage message={error} />}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Title"
          name="title"
          register={register}
          error={errors.title}
        />

        <TextArea
          label="Content"
          name="content"
          register={register}
          error={errors.content}
          rows={10}
        />

        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <Select
              label="Categories"
              isMulti
              options={[
                { value: 'technology', label: 'Technology' },
                { value: 'programming', label: 'Programming' },
                { value: 'web-development', label: 'Web Development' },
                { value: 'mobile', label: 'Mobile' },
                { value: 'design', label: 'Design' }
              ]}
              {...field}
              error={errors.categories}
            />
          )}
        />

        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <ImageUpload
              label="Featured Image"
              error={errors.image}
              {...field}
            />
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner small /> : '🚀 Create Post'}
        </Button>
      </Form>
    </Container>
  );
}

export default CreatePostPage;
