import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CssBaseline, Container, AppBar, Toolbar, Typography } from '@mui/material';
import { PatternList } from './components/PatternList';
import { PatternForm } from './components/PatternForm';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <StyledLink to="/">
              Solution Patterns Registry
            </StyledLink>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<PatternList />} />
          <Route path="/create-pattern" element={<PatternForm />} />
          <Route path="/edit-pattern/:id" element={<PatternForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
