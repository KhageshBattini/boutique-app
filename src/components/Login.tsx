import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    dispatch(loginStart());

    // Simulate API call
    setTimeout(() => {
      // Demo authentication - accept any email/password for demo purposes
      if (email.includes('@') && password.length >= 6) {
        dispatch(loginSuccess({
          id: '1',
          email,
          name: email.split('@')[0],
        }));
        navigate('/');
      } else {
        const errorMsg = 'Invalid email or password';
        dispatch(loginFailure(errorMsg));
        setError(errorMsg);
      }
    }, 1000);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderTop: '4px solid #967bb6' }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#967bb6' }}>
            ALANKRITA
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            The Art of Adornment
          </Typography>
        </Box>
        <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mt: 3 }}>
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Sign in to your account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#967bb6', '&:hover': { backgroundColor: '#6746c3' } }}
            disabled={false}
          >
            Sign In
          </Button>
          <Typography variant="body2" color="text.secondary" align="center">
            Demo: Use any valid email and password (min 6 characters)
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;