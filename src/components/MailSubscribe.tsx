import React, { useState } from 'react';
import { Box, TextField, Button, Snackbar, Alert, Typography, SxProps, Theme } from '@mui/material';
import { api } from '../api';

interface MailSubscribeProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  maxWidth?: number;
  sx?: SxProps<Theme>;
  textFieldSx?: SxProps<Theme>;
  buttonSx?: SxProps<Theme>;
  showTitle?: boolean;
  showDescription?: boolean;
  onSubscribe?: (email: string) => void;
  layout?: 'row' | 'column';
}

const MailSubscribe: React.FC<MailSubscribeProps> = ({
  title = 'Subscribe to Our Newsletter',
  description = 'Get exclusive offers, new arrivals, and styling tips delivered to your inbox.',
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe',
  maxWidth = 500,
  sx,
  textFieldSx,
  buttonSx,
  showTitle = true,
  showDescription = true,
  onSubscribe,
  layout = 'row'
}) => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      return;
    }

    setSubmitting(true);
    setErrorMessage('');
    try {
      const response = await api<{ message: string }>('/subscriptions', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      onSubscribe?.(email);
      setEmail('');
      setSuccessMessage(response.message);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not subscribe. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseToast = () => {
    setSuccessMessage('');
  };

  return (
    <Box sx={sx}>
      {showTitle && (
        <Typography variant="h6" gutterBottom sx={{ color: '#967bb6', fontWeight: 'bold', textAlign: 'center' }}>
          {title}
        </Typography>
      )}
      {showDescription && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
          {description}
        </Typography>
      )}
      <Box 
        component="form" 
        onSubmit={handleSubscribe}
        sx={{ 
          display: 'flex', 
          gap: 2, 
          maxWidth, 
          mx: 'auto',
          flexDirection: layout === 'row' ? { xs: 'column', sm: 'row' } : 'column',
          justifyContent: 'center'
        }}
      >
        <TextField
          fullWidth
          placeholder={placeholder}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#967bb6',
              },
              '&:hover fieldset': {
                borderColor: '#967bb6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#967bb6',
              },
            },
            ...textFieldSx
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={submitting}
          sx={{ 
            backgroundColor: '#967bb6',
            '&:hover': { backgroundColor: '#6746c3' },
            whiteSpace: 'nowrap',
            ...buttonSx
          }}
        >
          {submitting ? 'Subscribing…' : buttonText}
        </Button>
      </Box>

      {/* Toast Notification */}
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={3500}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseToast} 
          severity="success"
          sx={{ backgroundColor: '#967bb6', color: 'white' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={Boolean(errorMessage)} autoHideDuration={3500} onClose={() => setErrorMessage('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setErrorMessage('')} severity="error">{errorMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default MailSubscribe;
