import React, { useState } from 'react';
import { Box, Container, Typography, Link, Divider, IconButton, TextField, Button, Snackbar, Alert } from '@mui/material';
import { Instagram, Facebook, Twitter, Pinterest } from '@mui/icons-material';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      return;
    }

    // Simulate API call for future integration
    console.log('Subscribing email:', email);
    
    // Clear the email field
    setEmail('');
    
    // Show toast message
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#f8f5fa', 
        py: 6, 
        mt: 'auto' 
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: 4 
        }}>
          {/* Brand Section */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: '#967bb6', fontWeight: 'bold' }}>
              ALANKRITA
            </Typography>
            <Typography variant="caption" sx={{ mb: 2, display: 'block' }}>
              The Art of Adornment
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Elegant fashion and accessories for the modern woman.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" sx={{ color: '#967bb6' }}>
                <Instagram />
              </IconButton>
              <IconButton size="small" sx={{ color: '#967bb6' }}>
                <Facebook />
              </IconButton>
              <IconButton size="small" sx={{ color: '#967bb6' }}>
                <Twitter />
              </IconButton>
              <IconButton size="small" sx={{ color: '#967bb6' }}>
                <Pinterest />
              </IconButton>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: '#967bb6', fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="text.secondary" underline="hover">
                Home
              </Link>
              <Link href="/collections" color="text.secondary" underline="hover">
                Collections
              </Link>
              <Link href="/new-arrivals" color="text.secondary" underline="hover">
                New Arrivals
              </Link>
              <Link href="/our-story" color="text.secondary" underline="hover">
                Our Story
              </Link>
              <Link href="/contact" color="text.secondary" underline="hover">
                Contact
              </Link>
            </Box>
          </Box>

          {/* Customer Service */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: '#967bb6', fontWeight: 'bold' }}>
              Customer Service
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="text.secondary" underline="hover">
                Shipping Policy
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Returns & Exchanges
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Size Guide
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                FAQ
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Contact Us
              </Link>
            </Box>
          </Box>

          {/* Contact Info */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: '#967bb6', fontWeight: 'bold' }}>
              Contact Info
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Store Address:</strong><br />
              123 Fashion Street, Design District<br />
              Metropolitan City, State 12345
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Phone:</strong><br />
              +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Email:</strong><br />
              info@alankrita.com
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Newsletter Subscription */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#967bb6', fontWeight: 'bold', textAlign: 'center' }}>
            Subscribe to Our Newsletter
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
            Get exclusive offers, new arrivals, and styling tips delivered to your inbox.
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleSubscribe}
            sx={{ 
              display: 'flex', 
              gap: 2, 
              maxWidth: 500, 
              mx: 'auto',
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <TextField
              fullWidth
              placeholder="Enter your email address"
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
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ 
                backgroundColor: '#967bb6',
                '&:hover': { backgroundColor: '#6746c3' },
                whiteSpace: 'nowrap'
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Copyright */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} ALANKRITA. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Link href="#" color="text.secondary" underline="hover" variant="body2">
              Privacy Policy
            </Link>
            <Link href="#" color="text.secondary" underline="hover" variant="body2">
              Terms of Service
            </Link>
            <Link href="#" color="text.secondary" underline="hover" variant="body2">
              Refund Policy
            </Link>
          </Box>
        </Box>
      </Container>

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

export default Footer;