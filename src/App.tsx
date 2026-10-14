import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, IconButton, Badge, Box, Button, Tooltip, Avatar, Menu, MenuItem, ListItemIcon, TextField, InputAdornment } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, Login as LoginIcon, AccountCircle, FavoriteBorder, ReceiptLong, Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { store } from './store';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Account from './components/Account';
import Orders from './components/Orders';
import Wishlist from './components/Wishlist';
import Checkout from './components/Checkout';
import Collections from './components/Collections';
import NewArrivals from './components/NewArrivals';
import OurStory from './components/OurStory';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { fetchProducts, setSearchQuery } from './store/slices/productsSlice';
import { fetchWishlist } from './store/slices/wishlistSlice';
import { clearCart, fetchCart } from './store/slices/cartSlice';

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
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<HTMLElement | null>(null);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#967bb6' }}>
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ flexGrow: { xs: 1, md: 0 }, minWidth: 170, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Typography variant="h6" component="div">
            ALANKRITA
          </Typography>
          <Typography variant="caption" component="div" sx={{ opacity: 0.9 }}>
            The Art of Adornment
          </Typography>
        </Box>

        <Box component="form" onSubmit={submitSearch} sx={{ order: { xs: 3, md: 0 }, flex: { xs: '1 0 100%', md: '1 1 240px' }, maxWidth: { md: 330 }, mx: { md: 3 } }}>
          <TextField
            fullWidth
            size="small"
            value={searchQuery}
            onChange={(event) => dispatch(setSearchQuery(event.target.value))}
            placeholder="Search products"
            aria-label="Search products"
            sx={{ '& .MuiOutlinedInput-root': { color: 'white', borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.12)', '& fieldset': { borderColor: 'rgba(255,255,255,0.55)' }, '&:hover fieldset': { borderColor: 'white' } }, '& input::placeholder': { color: 'rgba(255,255,255,0.8)', opacity: 1 } }}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'white' }} /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    {searchQuery && <IconButton size="small" aria-label="Clear search" onClick={() => dispatch(setSearchQuery(''))} sx={{ color: 'white' }}><ClearIcon fontSize="small" /></IconButton>}
                    <IconButton type="submit" size="small" aria-label="Search" sx={{ color: 'white' }}><SearchIcon fontSize="small" /></IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', ml: { md: 'auto' } }}>
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
              <Tooltip title={`${user?.firstName} ${user?.lastName}`} arrow>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  sx={{ mr: 1 }}
                  id="profile-menu-button"
                  aria-label="Open profile menu"
                  aria-controls={profileMenuAnchor ? 'profile-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={Boolean(profileMenuAnchor)}
                  onClick={(event) => setProfileMenuAnchor(event.currentTarget)}
                >
                  {user?.profilePicture ? (
                    <Avatar
                      src={user.profilePicture}
                      alt={`${user?.firstName} ${user?.lastName}`}
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <AccountCircle sx={{ fontSize: 32 }} />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                id="profile-menu"
                anchorEl={profileMenuAnchor}
                open={Boolean(profileMenuAnchor)}
                onClose={() => setProfileMenuAnchor(null)}
              >
                <MenuItem onClick={() => { setProfileMenuAnchor(null); navigate('/account'); }}>
                  <ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>
                  Account
                </MenuItem>
                <MenuItem onClick={() => { setProfileMenuAnchor(null); navigate('/orders'); }}>
                  <ListItemIcon><ReceiptLong fontSize="small" /></ListItemIcon>
                  Orders
                </MenuItem>
                <MenuItem onClick={() => { setProfileMenuAnchor(null); navigate('/wishlist'); }}>
                  <ListItemIcon><FavoriteBorder fontSize="small" /></ListItemIcon>
                  Wishlist
                </MenuItem>
              </Menu>
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
          
          <Tooltip title="Wishlist" arrow>
            <IconButton
              size="large"
              color="inherit"
              aria-label="Open wishlist"
              onClick={() => navigate('/wishlist')}
            >
              <Badge badgeContent={wishlistItems.length} color="secondary">
                <FavoriteBorder />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Shopping cart" arrow>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="Open shopping cart"
              onClick={() => navigate('/checkout')}
            >
              <Badge badgeContent={cartItemCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function AppContent() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
      dispatch(fetchCart());
    } else {
      dispatch(clearCart());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
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
