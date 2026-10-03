import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import { LocationOn, Phone, AccessTime, Email } from '@mui/icons-material';
import { api } from '../api';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await api<{ message: string }>('/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setNotice({ message: response.message, severity: 'success' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setNotice({ message: error instanceof Error ? error.message : 'Could not send your message. Please try again.', severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, color: '#967bb6' }}>
        Contact Us
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#967bb6', mb: 3 }}>
            Get in Touch
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <LocationOn sx={{ mr: 2, color: '#967bb6' }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Store Address
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  123 Fashion Street, Design District<br />
                  Metropolitan City, State 12345
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <AccessTime sx={{ mr: 2, color: '#967bb6' }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Business Hours
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mon - Sat: 9:00 AM - 7:00 PM<br />
                  Sunday: Closed
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <Phone sx={{ mr: 2, color: '#967bb6' }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Phone
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +1 (555) 123-4567
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Email sx={{ mr: 2, color: '#967bb6' }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Email
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  info@alankrita.com
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ color: '#967bb6', mb: 2 }}>
            About
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Find the perfect outfit for any event at our leading designer boutique. 
            Specializing in elegant dresses, accessories, and contemporary fashion for the modern woman.
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#967bb6', mb: 3 }}>
            Send us a Message
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={submitting}
              sx={{ 
                mt: 3, 
                backgroundColor: '#967bb6', 
                '&:hover': { backgroundColor: '#6746c3' } 
              }}
            >
              {submitting ? 'Sending…' : 'Send Message'}
            </Button>
          </Box>
        </Paper>
      </Box>
      <Snackbar open={Boolean(notice)} autoHideDuration={3500} onClose={() => setNotice(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={() => setNotice(null)}
          severity={notice?.severity ?? 'success'}
          sx={notice?.severity === 'success' ? { backgroundColor: '#967bb6', color: 'white' } : undefined}
        >
          {notice?.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
