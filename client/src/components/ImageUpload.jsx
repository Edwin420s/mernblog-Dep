import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

const Container = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
`;

const UploadArea = styled.div`
  border: 2px dashed #cbd5e0;
  border-radius: 0.375rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #a0aec0;
  }
`;

const Preview = styled.div`
  position: relative;
  margin-top: 1rem;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 0.375rem;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

const ImageUpload = ({ label, name, value, onChange }) => {
  const [preview, setPreview] = useState(
    value instanceof File ? null : value || null
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onChange({
          target: {
            name,
            value: file,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange({
      target: {
        name,
        value: null,
      },
    });
  };

  return (
    <Container>
      <Label htmlFor={`file-upload-${name}`}>{label}</Label>

      {!preview ? (
        <UploadArea>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id={`file-upload-${name}`}
          />
          <label htmlFor={`file-upload-${name}`}>
            <FaCloudUploadAlt size={48} color="#a0aec0" />
            <p>Click to upload or drag and drop</p>
            <p>PNG, JPG, GIF up to 5MB</p>
          </label>
        </UploadArea>
      ) : (
        <Preview>
          <PreviewImage src={preview} alt="Preview" />
          <RemoveButton type="button" onClick={handleRemove}>
            <FaTimes />
          </RemoveButton>
        </Preview>
      )}
    </Container>
  );
};

export default ImageUpload;
