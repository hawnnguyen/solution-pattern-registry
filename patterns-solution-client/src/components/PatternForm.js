import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { GET_PATTERN, CREATE_PATTERN, UPDATE_PATTERN } from '../graphql/queries';
import TagForm from './TagForm';

function PatternForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    name: '',
    url: '',
    ring: '',
    quadrant: '',
    status: '',
    isNew: 'false',
    description: '',
    phase: '',
    pattern: [],
    useCase: [],
    tags: [],
  });

  const [tagFormOpen, setTagFormOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const { data: patternData } = useQuery(GET_PATTERN, {
    variables: { id },
    skip: !isEdit,
  });

  const [createPattern] = useMutation(CREATE_PATTERN);
  const [updatePattern] = useMutation(UPDATE_PATTERN);

  useEffect(() => {
    if (patternData?.patternById) {
      setFormData(patternData.patternById);
    }
  }, [patternData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(',').map(item => item.trim()),
    }));
  };

  const handleAddTag = () => {
    setSelectedTag(null);
    setTagFormOpen(true);
  };

  const handleEditTag = (tag) => {
    setSelectedTag(tag);
    setTagFormOpen(true);
  };

  const handleDeleteTag = (tagToDelete) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter(tag => tag.tagId !== tagToDelete.tagId),
    }));
  };

  const handleSaveTag = (tagData) => {
    if (selectedTag) {
      // Edit existing tag
      setFormData((prev) => ({
        ...prev,
        tags: prev.tags.map(tag =>
          tag.tagId === selectedTag.tagId ? { ...tagData, tagId: tag.tagId } : tag
        ),
      }));
    } else {
      // Add new tag
      const newTag = {
        ...tagData,
        tagId: Date.now().toString(), // Temporary ID for new tags
      };
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updatePattern({
          variables: {
            id,
            pattern: formData,
          },
        });
      } else {
        await createPattern({
          variables: {
            pattern: formData,
          },
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving pattern:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? 'Edit Pattern' : 'Create Pattern'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL"
                name="url"
                value={formData.url}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Ring</InputLabel>
                <Select
                  name="ring"
                  value={formData.ring}
                  onChange={handleChange}
                  label="Ring"
                  required
                >
                  <MenuItem value="adopt">Adopt</MenuItem>
                  <MenuItem value="trial">Trial</MenuItem>
                  <MenuItem value="assess">Assess</MenuItem>
                  <MenuItem value="hold">Hold</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Quadrant</InputLabel>
                <Select
                  name="quadrant"
                  value={formData.quadrant}
                  onChange={handleChange}
                  label="Quadrant"
                  required
                >
                  <MenuItem value="tools">Tools</MenuItem>
                  <MenuItem value="techniques">Techniques</MenuItem>
                  <MenuItem value="platforms">Platforms</MenuItem>
                  <MenuItem value="languages-and-frameworks">Languages & Frameworks</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                  required
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Phase</InputLabel>
                <Select
                  name="phase"
                  value={formData.phase}
                  onChange={handleChange}
                  label="Phase"
                  required
                >
                  <MenuItem value="initial">Initial</MenuItem>
                  <MenuItem value="structured">Structured</MenuItem>
                  <MenuItem value="validated">Validated</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Pattern (comma-separated)"
                name="pattern"
                value={formData.pattern.join(', ')}
                onChange={handleArrayChange}
                helperText="Enter patterns separated by commas"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Use Cases (comma-separated)"
                name="useCase"
                value={formData.useCase.join(', ')}
                onChange={handleArrayChange}
                helperText="Enter use cases separated by commas"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" display="inline">Tags</Typography>
                <IconButton 
                  color="primary" 
                  onClick={handleAddTag}
                  sx={{ ml: 1 }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.tags.map((tag) => (
                  <Chip
                    key={tag.tagId}
                    label={`${tag.tagName}: ${tag.tagValue}`}
                    onDelete={() => handleDeleteTag(tag)}
                    onClick={() => handleEditTag(tag)}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              {isEdit ? 'Update' : 'Create'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>

      <TagForm
        open={tagFormOpen}
        onClose={() => setTagFormOpen(false)}
        onSave={handleSaveTag}
        initialData={selectedTag}
      />
    </Container>
  );
}

export default PatternForm;
