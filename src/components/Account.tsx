import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
  Alert,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout, updateProfile } from '../store/slices/authSlice';
import { api } from '../api';
import { Edit as EditIcon, CameraAlt as CameraIcon } from '@mui/icons-material';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePicture, setProfilePicture] = useState<string | undefined>(user?.profilePicture);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset to original values
      setFirstName(user?.firstName || '');
      setLastName(user?.lastName || '');
      setEmail(user?.email || '');
      setProfilePicture(user?.profilePicture);
      setError('');
      setSuccess('');
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    if (!firstName || !lastName || !email) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const updated = await api<{ id: number; email: string; firstName: string; lastName: string; profilePicture?: string }>('/auth/me', { method: 'PUT', body: JSON.stringify({ firstName, lastName, email, profilePicture }) });
      dispatch(updateProfile(updated)); setSuccess('Profile updated successfully!'); setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to update profile'); }
  };

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    await api<void>('/auth/logout', { method: 'POST' }).catch(() => undefined);
    localStorage.removeItem('authToken');
    dispatch(logout());
    navigate('/login');
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Please log in to view your account
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{ mt: 2 }}
          >
            Go to Login
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#967bb6' }}>
          My Account
        </Typography>
        <Divider sx={{ mb: 4 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Profile Picture Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 200 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={profilePicture}
                alt={`${firstName} ${lastName}`}
                sx={{ width: 150, height: 150, mb: 2 }}
              />
              {isEditing && (
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    backgroundColor: '#967bb6',
                    color: 'white',
                    '&:hover': { backgroundColor: '#6746c3' },
                  }}
                  onClick={() => document.getElementById('profile-picture-input')?.click()}
                >
                  <CameraIcon />
                </IconButton>
              )}
            </Box>
            <input
              id="profile-picture-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleProfilePictureUpload}
            />
            {isEditing && (
              <Typography variant="caption" color="text.secondary">
                Click camera icon to upload
              </Typography>
            )}
          </Box>

          {/* User Details Section */}
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Personal Information</Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleEditToggle}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </Box>

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing}
                required
              />
              <TextField
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing}
                required
              />
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                required
                type="email"
              />
            </Box>

            {isEditing && (
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{ backgroundColor: '#967bb6', '&:hover': { backgroundColor: '#6746c3' } }}
                >
                  Save Changes
                </Button>
              </Box>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Account Actions */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Account Actions
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Account;
