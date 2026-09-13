import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, IconButton, Badge, Box, Button } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, Login as LoginIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { store } from './store';
import Home from './components/Home';
import Login from './components/Login';
import Checkout from './components/Checkout';
import Collections from './components/Collections';
import NewArrivals from './components/NewArrivals';
import OurStory from './components/OurStory';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { logout } from './store/slices/authSlice';

const theme = createTheme({
  palette: {
    primary: {
      main: '#967bb6', // Lavender
      light: '#b39ddb',
      dark: '#6746c3',
    },
    secondary: {
      main: '#a78bfa', // Light lavender
      light: '#c4b5fd',
      dark: '#7c3aed',
    },
    background: {
      default: '#faf5ff', // Very light lavender background
      paper: '#ffffff',
    },
  },
});

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#967bb6' }}>
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Typography variant="h6" component="div">
            ALANKRITA
          </Typography>
          <Typography variant="caption" component="div" sx={{ opacity: 0.9 }}>
            The Art of Adornment
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/collections')}>
            Collections
          </Button>
          <Button color="inherit" onClick={() => navigate('/new-arrivals')}>
            New Arrivals
          </Button>
          <Button color="inherit" onClick={() => navigate('/our-story')}>
            Our Story
          </Button>
          <Button color="inherit" onClick={() => navigate('/contact')}>
            Contact
          </Button>
          
          {isAuthenticated ? (
            <>
              <Typography variant="body2" sx={{ mr: 1 }}>
                {user?.name}
              </Typography>
              <Button 
                color="inherit" 
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button 
              color="inherit" 
              startIcon={<LoginIcon />}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}
          
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={() => navigate('/checkout')}
          >
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function AppContent() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;