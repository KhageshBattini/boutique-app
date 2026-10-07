import React, { useState } from 'react';
import { Alert, Card, CardMedia, CardContent, CardActions, Typography, Button, IconButton, Snackbar, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Product } from '../store/slices/productsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addCartItem } from '../store/slices/cartSlice';
import { addProductToWishlist, removeProductFromWishlist } from '../store/slices/wishlistSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.cart);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { items: wishlist, mutating } = useAppSelector((state) => state.wishlist);
  const [notice, setNotice] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);
  
  const isInCart = items.some(item => item.id === product.id);
  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addCartItem({ product, persist: isAuthenticated })).unwrap()
      .catch((error: unknown) => setNotice({
        message: typeof error === 'string' ? error : 'Could not add this item to your cart.',
        severity: 'error',
      }));
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const request = isInWishlist
      ? dispatch(removeProductFromWishlist(product.id)).unwrap().then(() => 'Removed from wishlist')
      : dispatch(addProductToWishlist(product.id)).unwrap().then(() => 'Added to wishlist');
    request.then((message) => setNotice({ message, severity: 'success' }))
      .catch((error: unknown) => setNotice({
        message: typeof error === 'string' ? error : 'Could not update your wishlist.',
        severity: 'error',
      }));
  };

  const handleGoToCart = () => {
    navigate('/checkout');
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 6 } }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'contain' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: '#967bb6', fontWeight: 'bold' }}>
          ₹{product.price.toLocaleString('en-IN')}
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}>
          <IconButton aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'} onClick={handleWishlist} disabled={mutating}>
            {isInWishlist ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
        <Button 
          size="small" 
          variant="contained" 
          onClick={isInCart ? handleGoToCart : handleAddToCart}
          sx={{ backgroundColor: '#967bb6', '&:hover': { backgroundColor: '#6746c3' } }}
        >
          {isInCart ? 'Go to Cart' : 'Add to Cart'}
        </Button>
      </CardActions>
      <Snackbar open={Boolean(notice)} autoHideDuration={3500} onClose={() => setNotice(null)}>
        <Alert severity={notice?.severity ?? 'success'} onClose={() => setNotice(null)}>{notice?.message}</Alert>
      </Snackbar>
    </Card>
  );
};

export default ProductCard;