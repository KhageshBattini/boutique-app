import React, { useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  Snackbar,
  Typography,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addCartItem } from '../store/slices/cartSlice';
import { fetchWishlist, removeProductFromWishlist } from '../store/slices/wishlistSlice';

const Wishlist: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, mutating, error } = useAppSelector((state) => state.wishlist);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [notice, setNotice] = useState('');
  const [noticeIsError, setNoticeIsError] = useState(false);

  if (!isAuthenticated) return <Container maxWidth="md" sx={{ py: 5 }}><Alert severity="info">Please sign in to view your wishlist.</Alert></Container>;

  const handleRemove = (productId: number) => {
    dispatch(removeProductFromWishlist(productId)).unwrap()
      .then(() => {
        setNoticeIsError(false);
        setNotice('Removed from wishlist');
      })
      .catch((reason: unknown) => {
        setNoticeIsError(true);
        setNotice(typeof reason === 'string' ? reason : 'Could not remove this product from your wishlist.');
      });
  };

  const handleAddToCart = (product: (typeof items)[number]) => {
    dispatch(addCartItem({ product, persist: isAuthenticated })).unwrap()
      .then(() => {
        setNoticeIsError(false);
        setNotice('Added to cart');
      })
      .catch((reason: unknown) => {
        setNoticeIsError(true);
        setNotice(typeof reason === 'string' ? reason : 'Could not add this product to your cart.');
      });
  };

  if (loading && items.length === 0) {
    return <Container maxWidth="md" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Container>;
  }

  if (error && items.length === 0) {
    return <Container maxWidth="md" sx={{ py: 5 }}><Alert severity="error" action={<Button color="inherit" size="small" onClick={() => dispatch(fetchWishlist())}>Retry</Button>}>{error}</Alert></Container>;
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 }, minHeight: 320 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: 'text.primary' }}>My Wishlist</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {items.length === 0 ? (
        <Alert severity="info">Your wishlist is empty. Save products with the heart button while shopping.</Alert>
      ) : items.map((product) => (
        <Card key={product.id} variant="outlined" sx={{ mb: 2.5, borderRadius: 2, boxShadow: '0 2px 12px rgba(45, 30, 60, 0.05)' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: { xs: 2, sm: 3 }, '&:last-child': { pb: { xs: 2, sm: 3 } }, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
            <Avatar variant="rounded" src={product.image} alt={product.name} sx={{ width: 64, height: 64 }} />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">₹{product.price.toLocaleString('en-IN')}</Typography>
            </Box>
            <Button variant="contained" onClick={() => handleAddToCart(product)} disabled={mutating} sx={{ ml: { xs: 'auto', sm: 0 } }}>
              Add to Cart
            </Button>
            <IconButton aria-label={`Remove ${product.name} from wishlist`} onClick={() => handleRemove(product.id)} disabled={mutating}>
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
      <Snackbar open={Boolean(notice)} autoHideDuration={3500} onClose={() => setNotice('')}>
        <Alert severity={noticeIsError ? 'error' : 'success'} onClose={() => setNotice('')}>{notice}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Wishlist;
