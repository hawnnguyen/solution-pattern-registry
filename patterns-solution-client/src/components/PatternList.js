import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Typography,
  Box,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Label as LabelIcon,
} from '@mui/icons-material';
import { GET_PATTERNS, DELETE_PATTERN } from '../graphql/queries';

function PatternList() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PATTERNS);
  const [deletePattern] = useMutation(DELETE_PATTERN, {
    refetchQueries: [{ query: GET_PATTERNS }],
  });

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/pattern/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this pattern?')) {
      try {
        await deletePattern({ variables: { id } });
      } catch (error) {
        console.error('Error deleting pattern:', error);
      }
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Pattern Solutions</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/create')}
        >
          Create New Pattern Solution
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Ring</TableCell>
              <TableCell>Quadrant</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Phase</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.patterns.map((pattern) => (
              <TableRow key={pattern.id}>
                <TableCell>{pattern.title}</TableCell>
                <TableCell>{pattern.name}</TableCell>
                <TableCell>{pattern.ring}</TableCell>
                <TableCell>{pattern.quadrant}</TableCell>
                <TableCell>{pattern.status}</TableCell>
                <TableCell>{pattern.phase}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {pattern.tags?.map((tag) => (
                      <Tooltip key={tag.tagId} title={`${tag.tagName}: ${tag.tagValue}`}>
                        <Chip
                          icon={<LabelIcon />}
                          label={tag.tagName}
                          size="small"
                          variant="outlined"
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(pattern.id)} color="info">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(pattern.id)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(pattern.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PatternList;
