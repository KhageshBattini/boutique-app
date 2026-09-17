import React, { useState } from 'react';
import { Box, TextField, Button, Snackbar, Alert, Typography, SxProps, Theme } from '@mui/material';

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
  const [showToast, setShowToast] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      return;
    }

    // Call custom onSubscribe callback if provided
    if (onSubscribe) {
      onSubscribe(email);
    } else {
      // Default behavior: log to console
      console.log('Subscribing email:', email);
    }
    
    // Clear the email field
    setEmail('');
    
    // Show toast message
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
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
          sx={{ 
            backgroundColor: '#967bb6',
            '&:hover': { backgroundColor: '#6746c3' },
            whiteSpace: 'nowrap',
            ...buttonSx
          }}
        >
          {buttonText}
        </Button>
      </Box>

      {/* Toast Notification */}
      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseToast} 
          severity="success"
          sx={{ backgroundColor: '#967bb6', color: 'white' }}
        >
          Thanks for subscription!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MailSubscribe;