import React, { useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
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
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>;
  }

  if (error && items.length === 0) {
    return <Alert severity="error" action={<Button color="inherit" size="small" onClick={() => dispatch(fetchWishlist())}>Retry</Button>}>{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>My Wishlist</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {items.length === 0 ? (
        <Alert severity="info">Your wishlist is empty. Save products with the heart button while shopping.</Alert>
      ) : items.map((product) => (
        <Card key={product.id} variant="outlined" sx={{ mb: 2 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar variant="rounded" src={product.image} alt={product.name} sx={{ width: 64, height: 64 }} />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">₹{product.price.toLocaleString('en-IN')}</Typography>
            </Box>
            <Button variant="contained" onClick={() => handleAddToCart(product)} disabled={mutating}>
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
    </Box>
  );
};

export default Wishlist;
