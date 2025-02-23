import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { CREATE_TAG, UPDATE_TAG } from '../graphql/queries';

function TagForm({ patternId, tag, onClose }) {
  const [formData, setFormData] = useState({
    tagName: '',
    tagValue: '',
  });

  useEffect(() => {
    if (tag) {
      setFormData({
        tagName: tag.tagName,
        tagValue: tag.tagValue,
      });
    }
  }, [tag]);

  const [createTag] = useMutation(CREATE_TAG);
  const [updateTag] = useMutation(UPDATE_TAG);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tag) {
        await updateTag({
          variables: {
            patternId,
            tagId: tag.tagId,
            input: formData,
          },
        });
      } else {
        await createTag({
          variables: {
            patternId,
            input: formData,
          },
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving tag:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <DialogTitle>{tag ? 'Edit Tag' : 'Add New Tag'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Tag Name"
          name="tagName"
          value={formData.tagName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Tag Value"
          name="tagValue"
          value={formData.tagValue}
          onChange={handleChange}
          margin="normal"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained" color="primary">
          {tag ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Box>
  );
}

export default TagForm;
