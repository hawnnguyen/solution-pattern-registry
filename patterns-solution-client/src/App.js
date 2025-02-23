import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import client from './apolloClient';
import PatternList from './components/PatternList';
import PatternForm from './components/PatternForm';
import PatternDetails from './components/PatternDetails';
import theme from './theme';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
            <AppBar 
              position="static" 
              elevation={1} 
              sx={{ 
                backgroundColor: '#000000',
                borderBottom: 1, 
                borderColor: 'divider' 
              }}
            >
              <Toolbar>
                <Link 
                  to="/" 
                  style={{ 
                    textDecoration: 'none',
                    flexGrow: 1,
                    '&:hover': {
                      opacity: 0.9
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                      color: '#ffffff',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      cursor: 'pointer'
                    }}
                  >
                    Pattern Solution Library Marketplace Registry
                  </Typography>
                </Link>
              </Toolbar>
            </AppBar>
            <Container maxWidth={false} sx={{ py: 4 }}>
              <Routes>
                <Route path="/" element={<PatternList />} />
                <Route path="/create" element={<PatternForm />} />
                <Route path="/edit/:id" element={<PatternForm />} />
                <Route path="/pattern/:id" element={<PatternDetails />} />
              </Routes>
            </Container>
          </Box>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
