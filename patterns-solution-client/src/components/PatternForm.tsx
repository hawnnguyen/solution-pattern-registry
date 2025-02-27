import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Chip,
    Paper,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Snackbar
} from '@mui/material';
import { Pattern, Tag } from '../types/Pattern';
import { api } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export const PatternForm: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pattern, setPattern] = useState<Pattern>({
        name: '',
        title: '',
        url: '',
        ring: '',
        quadrant: '',
        status: '',
        description: '',
        phase: '',
        tags: []
    });
    const [newTag, setNewTag] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (id) {
            loadPattern();
        }
    }, [id]);

    const loadPattern = async () => {
        try {
            const response = await api.getPattern(id!);
            setPattern(response.data);
        } catch (error) {
            console.error('Error loading pattern:', error);
            setError('Error loading pattern. Please try again.');
        }
    };

    const validatePattern = () => {
        if (!pattern.name.trim()) return 'Name is required';
        if (!pattern.title.trim()) return 'Title is required';
        if (!pattern.description.trim()) return 'Description is required';
        if (!pattern.quadrant) return 'Quadrant is required';
        if (!pattern.ring) return 'Ring is required';
        if (!pattern.phase) return 'Phase is required';
        if (!pattern.status) return 'Status is required';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validatePattern();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            if (id) {
                await api.updatePattern(id, pattern);
            } else {
                await api.createPattern(pattern);
            }
            navigate('/');
        } catch (error: any) {
            console.error('Error saving pattern:', error);
            setError(error.response?.data?.message || 'Error saving pattern. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAddTag = () => {
        if (newTag && !pattern.tags.some(tag => tag.tagName === newTag)) {
            const newTagObject: Tag = {
                tagId: Date.now().toString(),
                tagName: newTag,
                tagValue: newTag,
                className: 'fas fa-tag'
            };
            setPattern(prev => ({
                ...prev,
                tags: [...prev.tags, newTagObject]
            }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: Tag) => {
        setPattern(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag.tagId !== tagToRemove.tagId)
        }));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {id ? 'Edit Pattern' : 'Create New Pattern'}
            </Typography>

            <Snackbar 
                open={!!error} 
                autoHideDuration={6000} 
                onClose={() => setError(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

            <Stack spacing={3}>
                <TextField
                    fullWidth
                    label="Name"
                    value={pattern.name}
                    onChange={(e) => setPattern({ ...pattern, name: e.target.value })}
                    required
                    error={!pattern.name.trim()}
                    helperText={!pattern.name.trim() ? 'Name is required' : ''}
                />
                <TextField
                    fullWidth
                    label="Title"
                    value={pattern.title}
                    onChange={(e) => setPattern({ ...pattern, title: e.target.value })}
                    required
                    error={!pattern.title.trim()}
                    helperText={!pattern.title.trim() ? 'Title is required' : ''}
                />
                <TextField
                    fullWidth
                    label="URL"
                    value={pattern.url}
                    onChange={(e) => setPattern({ ...pattern, url: e.target.value })}
                />
                <FormControl fullWidth required error={!pattern.ring}>
                    <InputLabel>Ring</InputLabel>
                    <Select
                        value={pattern.ring}
                        label="Ring"
                        onChange={(e) => setPattern({ ...pattern, ring: e.target.value })}
                    >
                        <MenuItem value="identify">Identify</MenuItem>
                        <MenuItem value="adopt">Adopt</MenuItem>
                        <MenuItem value="trial">Trial</MenuItem>
                        <MenuItem value="assess">Assess</MenuItem>
                        <MenuItem value="hold">Hold</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth required error={!pattern.quadrant}>
                    <InputLabel>Quadrant</InputLabel>
                    <Select
                        value={pattern.quadrant}
                        label="Quadrant"
                        onChange={(e) => setPattern({ ...pattern, quadrant: e.target.value })}
                    >
                        <MenuItem value="enterprise">Enterprise</MenuItem>
                        <MenuItem value="data">Data</MenuItem>
                        <MenuItem value="integration">Integration</MenuItem>
                        <MenuItem value="security">Security</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth required error={!pattern.status}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={pattern.status}
                        label="Status"
                        onChange={(e) => setPattern({ ...pattern, status: e.target.value })}
                    >
                        <MenuItem value="Moved In">Moved In</MenuItem>
                        <MenuItem value="Moved Out">Moved Out</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth required error={!pattern.phase}>
                    <InputLabel>Phase</InputLabel>
                    <Select
                        value={pattern.phase}
                        label="Phase"
                        onChange={(e) => setPattern({ ...pattern, phase: e.target.value })}
                    >
                        <MenuItem value="planning">Planning</MenuItem>
                        <MenuItem value="development">Development</MenuItem>
                        <MenuItem value="production">Production</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label="Description"
                    value={pattern.description}
                    onChange={(e) => setPattern({ ...pattern, description: e.target.value })}
                    multiline
                    rows={4}
                    required
                    error={!pattern.description.trim()}
                    helperText={!pattern.description.trim() ? 'Description is required' : ''}
                />
                <Box>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <TextField
                            label="Add Tag"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            size="small"
                        />
                        <Button
                            variant="outlined"
                            onClick={handleAddTag}
                            disabled={!newTag}
                        >
                            Add Tag
                        </Button>
                    </Box>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Tags:</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {pattern.tags.map((tag) => (
                                <Chip
                                    key={tag.tagId}
                                    label={tag.tagName}
                                    onDelete={() => handleRemoveTag(tag)}
                                    className={tag.className}
                                />
                            ))}
                        </Box>
                    </Paper>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : id ? 'Update Pattern' : 'Create Pattern'}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};
