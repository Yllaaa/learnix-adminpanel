import React, { useState, useCallback } from 'react';
import { Box, Button, Text, Icon } from '@adminjs/design-system';

interface FileRecord {
  params?: Record<string, string | null>;
}

interface Property {
  name: string;
  label?: string;
}

interface ImageUploaderProps {
  record: FileRecord;
  property: Property;
  onChange: (property: string, value: string | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ record, property, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(record.params?.[property.name] || '');
  const [isDragging, setIsDragging] = useState(false);

  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validTypes.includes(file.type)) {
      setError('❌ Only JPEG, PNG, and WebP images are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('❌ Image must be less than 5MB.');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload/image', { method: 'POST', body: formData });
      const data: { url?: string; error?: string } = await response.json();

      if (response.ok && data.url) {
        setPreviewUrl(data.url);
        onChange(property.name, data.url);
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl('');
    onChange(property.name, null);
    const fileInput = document.getElementById(`file-upload-${property.name}`) as HTMLInputElement | null;
    if (fileInput) fileInput.value = '';
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById(`file-upload-${property.name}`);
    if (fileInput) fileInput.click();
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && validTypes.includes(file.type)) {
        const fakeEvent = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleFileChange(fakeEvent);
      } else {
        setError('❌ Only image files are allowed.');
      }
    },
    [handleFileChange]
  );

  return (
    <Box mb="xl">
      {/* Title */}
      <Text fontSize="xl" fontWeight="bold" mb="xs">
        {'Picture'}
      </Text>
      <Text variant="sm" mb="md" color="grey60">
        PNG, JPG, or WebP • Max size: 5MB
      </Text>

      {/* Error */}
      {error && (
        <Box
          p="md"
          mb="md"
          style={{
            backgroundColor: '#fff5f5',
            border: '1px solid #ffcccc',
            borderRadius: '8px',
          }}
        >
          <Text color="red">{error}</Text>
        </Box>
      )}

      {/* Image Preview */}
      {previewUrl && (
        <Box
          mb="md"
          style={{
            position: 'relative',
            display: 'inline-block',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s ease',
          }}
        >
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              maxHeight: '150px',
              width: 'auto',
              display: 'block',
            }}
          />
          <Button
            size="icon"
            variant="danger"
            onClick={handleRemove}
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              borderRadius: '50%',
              width: '26px',
              height: '26px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              minWidth: 'unset',
              minHeight: 'unset',
            }}
          >
            <Icon icon="Trash2" size={12} />
          </Button>
        </Box>
      )}

      {/* Drag & Drop Area */}
      <Box
        border={`2px dashed ${isDragging ? '#007bff' : '#ccc'}`}
        borderRadius="xl"
        p="xl"
        textAlign="center"
        onMouseOver={onDragOver}
        onMouseLeave={onDragLeave}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={triggerFileInput}
        style={{
          backgroundColor: isDragging ? '#f0f8ff' : '#f9fafb',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
        }}
      >
        <Icon icon="Upload" size={30} />
        <Text mt="md" variant="lg" fontWeight="bold" color={isDragging ? 'primary' : 'grey60'}>
          {isDragging ? 'Drop your image here' : 'Drag & drop or click to upload'}
        </Text>
        <Text variant="sm" mt="xs" color="grey50">
          Supports: JPEG, PNG, WebP
        </Text>
      </Box>

      {/* Hidden Input */}
      <input
        id={`file-upload-${property.name}`}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Uploading */}
      {uploading && (
        <Box mt="md" display="flex" alignItems="center" gap="sm">
          <Icon icon="Loader" spin />
          <Text variant="sm" color="primary">
            Uploading...
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ImageUploader;
