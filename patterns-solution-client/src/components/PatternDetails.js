import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Label as LabelIcon,
} from '@mui/icons-material';
import { GET_PATTERN, DELETE_TAG } from '../graphql/queries';
import TagForm from './TagForm';
import PatternForm from './PatternForm';

function PatternDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isTagFormOpen, setTagFormOpen] = useState(false);
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const { loading, error, data, refetch } = useQuery(GET_PATTERN, {
    variables: { id },
  });

  const [deleteTag] = useMutation(DELETE_TAG, {
    onCompleted: () => {
      refetch();
    },
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const pattern = data.patternById;

  const handleEditPattern = () => {
    setEditFormOpen(true);
  };

  const handleAddTag = () => {
    setSelectedTag(null);
    setTagFormOpen(true);
  };

  const handleEditTag = (tag) => {
    setSelectedTag(tag);
    setTagFormOpen(true);
  };

  const handleDeleteTag = async (tagId) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      try {
        await deleteTag({
          variables: {
            patternId: id,
            tagId: tagId,
          },
        });
      } catch (error) {
        console.error('Error deleting tag:', error);
      }
    }
  };

  const handleTagFormClose = () => {
    setTagFormOpen(false);
    setSelectedTag(null);
    refetch();
  };

  const handleEditFormClose = () => {
    setEditFormOpen(false);
    refetch();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">{pattern.title}</Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleEditPattern}
            sx={{ mr: 1 }}
          >
            Edit Pattern
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={handleAddTag}
          >
            Add Tag
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Pattern Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="textSecondary">Name</Typography>
                  <Typography variant="body1">{pattern.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="textSecondary">Ring</Typography>
                  <Typography variant="body1">{pattern.ring}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="textSecondary">Quadrant</Typography>
                  <Typography variant="body1">{pattern.quadrant}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="textSecondary">Status</Typography>
                  <Typography variant="body1">{pattern.status}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="textSecondary">Phase</Typography>
                  <Typography variant="body1">{pattern.phase}</Typography>
                </Grid>
              </Grid>
              <Box mt={3}>
                <Typography variant="subtitle1" color="textSecondary">Description</Typography>
                <Typography variant="body1">{pattern.description}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Tags</Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {pattern.tags?.map((tag) => (
                  <Box
                    key={tag.tagId}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Chip
                      icon={<LabelIcon />}
                      label={`${tag.tagName}: ${tag.tagValue}`}
                      variant="outlined"
                      sx={{ flexGrow: 1, mr: 1 }}
                    />
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleEditTag(tag)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteTag(tag.tagId)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={isTagFormOpen} onClose={handleTagFormClose} maxWidth="sm" fullWidth>
        <TagForm
          patternId={id}
          tag={selectedTag}
          onClose={handleTagFormClose}
        />
      </Dialog>

      <Dialog open={isEditFormOpen} onClose={handleEditFormClose} maxWidth="md" fullWidth>
        <PatternForm
          pattern={pattern}
          onClose={handleEditFormClose}
        />
      </Dialog>
    </Container>
  );
}

export default PatternDetails;
