import axios from 'axios';
import { Pattern } from '../types/Pattern';

const API_BASE_URL = 'http://localhost:8080/api';

// Helper function to convert Pattern to PatternInput
const toPatternInput = (pattern: Pattern) => {
    const { id, ...patternInput } = pattern;
    return patternInput;
};

export const api = {
    // Patterns
    getPatterns: () => axios.get<Pattern[]>(`${API_BASE_URL}/patterns`),
    getPattern: (id: string) => axios.get<Pattern>(`${API_BASE_URL}/patterns/${id}`),
    createPattern: (pattern: Pattern) => axios.post<Pattern>(`${API_BASE_URL}/patterns`, toPatternInput(pattern)),
    updatePattern: (id: string, pattern: Pattern) => axios.put<Pattern>(`${API_BASE_URL}/patterns/${id}`, toPatternInput(pattern)),
    deletePattern: (id: string) => axios.delete(`${API_BASE_URL}/patterns/${id}`),

    // Tags
    addTag: (patternId: string, tag: string) => axios.post(`${API_BASE_URL}/patterns/${patternId}/tags`, { tag }),
    removeTag: (patternId: string, tag: string) => axios.delete(`${API_BASE_URL}/patterns/${patternId}/tags/${tag}`),
};
