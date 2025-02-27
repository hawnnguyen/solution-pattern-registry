import React, { useEffect, useState } from 'react';
import { 
    Box, 
    Card, 
    CardContent, 
    Typography, 
    Chip, 
    IconButton, 
    Grid,
    Button
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Pattern } from '../types/Pattern';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const PatternList: React.FC = () => {
    const [patterns, setPatterns] = useState<Pattern[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadPatterns();
    }, []);

    const loadPatterns = async () => {
        try {
            const response = await api.getPatterns();
            setPatterns(response.data);
        } catch (error) {
            console.error('Error loading patterns:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this pattern?')) {
            try {
                await api.deletePattern(id);
                loadPatterns();
            } catch (error) {
                console.error('Error deleting pattern:', error);
            }
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/edit-pattern/${id}`);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Patterns</Typography>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate('/create-pattern')}
                >
                    Create New Pattern
                </Button>
            </Box>
            <Grid container spacing={3}>
                {patterns.map((pattern) => (
                    <Grid item xs={12} sm={6} md={4} key={pattern.id}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Typography variant="h6" component="div">
                                        {pattern.name}
                                    </Typography>
                                    <Box>
                                        <IconButton 
                                            size="small" 
                                            onClick={() => pattern.id && handleEdit(pattern.id)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton 
                                            size="small" 
                                            onClick={() => pattern.id && handleDelete(pattern.id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                                    {pattern.description}
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {pattern.tags.map((tag) => (
                                        <Chip 
                                            key={tag.tagId} 
                                            label={tag.tagName}
                                            size="small" 
                                            variant="outlined"
                                            className={tag.className}
                                        />
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
