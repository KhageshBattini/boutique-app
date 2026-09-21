import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  ListItemAvatar,
  Avatar,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Remove as RemoveIcon, Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';

interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  countryCode: string;
  mobileNumber: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: user ? `${user.firstName} ${user.lastName}` : '',
    address: '',
    city: '',
    zipCode: '',
    countryCode: '+91',
    mobileNumber: '',
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const steps = ['Review Cart', 'Shipping Information', 'Confirmation'];

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle maxLength for specific fields
    if (name === 'zipCode' && value.length > 6) {
      return;
    }
    if (name === 'mobileNumber' && value.length > 10) {
      return;
    }
    
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (activeStep === 1) {
      // Validate shipping info
      if (!shippingInfo.fullName || !shippingInfo.address || !shippingInfo.city || 
          !shippingInfo.zipCode || !shippingInfo.countryCode || !shippingInfo.mobileNumber) {
        setError('Please fill in all shipping information');
        return;
      }

      // Validate ZIP code (6 digits)
      if (!/^\d{6}$/.test(shippingInfo.zipCode)) {
        setError('ZIP code must be exactly 6 digits');
        return;
      }

      // Validate mobile number (10 digits)
      if (!/^\d{10}$/.test(shippingInfo.mobileNumber)) {
        setError('Mobile number must be exactly 10 digits');
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const isFormValid = () => {
    return (
      shippingInfo.fullName.trim() !== '' &&
      shippingInfo.address.trim() !== '' &&
      shippingInfo.city.trim() !== '' &&
      shippingInfo.countryCode.trim() !== '' &&
      /^\d{6}$/.test(shippingInfo.zipCode) &&
      /^\d{10}$/.test(shippingInfo.mobileNumber)
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePlaceOrder = () => {
    // Simulate order processing
    setOrderSuccess(true);
    dispatch(clearCart());
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (items.length === 0 && !orderSuccess) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  if (orderSuccess) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Order placed successfully!
          </Alert>
          <Typography variant="h5" gutterBottom>
            Thank you for your purchase
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Redirecting to home page...
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <List>
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" onClick={() => handleRemove(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 60, height: 60, mr: 2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography variant="body2">{item.quantity}</Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                          <Typography variant="body2" sx={{ ml: 'auto' }}>
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>

            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">₹{total.toLocaleString('en-IN')}</Typography>
                </Box>
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button variant="contained" onClick={handleNext}>
                Shipping Information
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleShippingChange}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="City"
                name="city"
                value={shippingInfo.city}
                onChange={handleShippingChange}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="ZIP Code"
                name="zipCode"
                value={shippingInfo.zipCode}
                onChange={handleShippingChange}
                sx={{ mb: 2 }}
                required
                error={shippingInfo.zipCode !== '' && !/^\d{6}$/.test(shippingInfo.zipCode)}
                helperText={shippingInfo.zipCode !== '' && !/^\d{6}$/.test(shippingInfo.zipCode) ? 'ZIP code must be 6 digits' : ''}
              />
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
                <FormControl sx={{ minWidth: 120, flexShrink: 0 }}>
                  <InputLabel>Country Code</InputLabel>
                  <Select
                    value={shippingInfo.countryCode}
                    label="Country Code"
                    onChange={(e) => setShippingInfo({ ...shippingInfo, countryCode: e.target.value })}
                  >
                    <MenuItem value="+91">+91 (India)</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobileNumber"
                  value={shippingInfo.mobileNumber}
                  onChange={handleShippingChange}
                  required
                  error={shippingInfo.mobileNumber !== '' && !/^\d{10}$/.test(shippingInfo.mobileNumber)}
                  helperText={shippingInfo.mobileNumber !== '' && !/^\d{10}$/.test(shippingInfo.mobileNumber) ? 'Mobile number must be 10 digits' : ''}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button onClick={handleBack}>
                Back
              </Button>
              <Button 
                variant="contained" 
                onClick={handleNext}
                disabled={!isFormValid()}
              >
                Confirmation
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Confirmation
            </Typography>
            
            <Card sx={{ mt: 2, mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Shipping Information:
                </Typography>
                <Typography variant="body2">
                  {shippingInfo.fullName}<br />
                  {shippingInfo.address}<br />
                  {shippingInfo.city}, {shippingInfo.zipCode}<br />
                  {shippingInfo.countryCode} {shippingInfo.mobileNumber}
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Order Total:
                </Typography>
                <Typography variant="h5">₹{total.toLocaleString('en-IN')}</Typography>
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          onClose={() => setError(null)}
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={() => setError(null)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Checkout;