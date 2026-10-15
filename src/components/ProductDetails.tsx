import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addCartItem } from '../store/slices/cartSlice';
import { fetchProductById } from '../store/slices/productsSlice';
import { addProductToWishlist, removeProductFromWishlist } from '../store/slices/wishlistSlice';

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedProduct: product, detailLoading, detailError } = useAppSelector((state) => state.products);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { items: wishlistItems, mutating: wishlistMutating } = useAppSelector((state) => state.wishlist);
  const [selectedImage, setSelectedImage] = useState('');
  const [notice, setNotice] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  const id = Number(productId);

  useEffect(() => {
    if (Number.isInteger(id) && id > 0) dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const galleryImages = product
    ? Array.from(new Set([product.image, ...(product.images ?? [])].filter(Boolean)))
    : [];
  const firstImage = galleryImages[0] ?? '';

  useEffect(() => {
    setSelectedImage(firstImage);
  }, [firstImage]);

  if (!Number.isInteger(id) || id <= 0) {
    return <Container maxWidth="md" sx={{ py: 6 }}><Alert severity="error">This product could not be found.</Alert></Container>;
  }

  if (detailLoading) {
    return <Container maxWidth="lg" sx={{ py: 10, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Container>;
  }

  if (detailError || !product) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Alert severity="error" action={<Button color="inherit" size="small" onClick={() => dispatch(fetchProductById(id))}>Retry</Button>}>
          {detailError ?? 'This product could not be found.'}
        </Alert>
      </Container>
    );
  }

  const isInCart = cartItems.some((item) => item.id === product.id);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleCart = () => {
    if (isInCart) {
      navigate('/checkout');
      return;
    }
    dispatch(addCartItem({ product, persist: isAuthenticated })).unwrap()
      .then(() => setNotice({ message: 'Added to cart', severity: 'success' }))
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

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, minHeight: 520 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.1fr) minmax(320px, 0.9fr)' }, gap: { xs: 3, md: 6 }, alignItems: 'start' }}>
        <Box>
          <Paper elevation={0} sx={{ display: 'flex', height: { xs: 360, sm: 460, md: 540 }, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
            <Box
              component="img"
              src={selectedImage || product.image}
              alt={product.name}
              sx={{ width: '100%', height: '100%', objectFit: 'contain', p: { xs: 1, md: 2 } }}
            />
          </Paper>
          {galleryImages.length > 1 && (
            <Box role="group" aria-label={`${product.name} photos`} sx={{ display: 'flex', gap: 1.25, mt: 1.5, overflowX: 'auto', pb: 0.5 }}>
              {galleryImages.map((image, index) => (
                <IconButton
                  key={`${product.id}-gallery-${index}`}
                  aria-label={`Show product photo ${index + 1}`}
                  aria-pressed={selectedImage === image}
                  onClick={() => setSelectedImage(image)}
                  sx={{ flex: '0 0 auto', p: 0.4, border: '2px solid', borderColor: selectedImage === image ? 'primary.main' : 'transparent', borderRadius: 1.5 }}
                >
                  <Box component="img" src={image} alt="" sx={{ display: 'block', width: 76, height: 84, objectFit: 'cover', borderRadius: 1 }} />
                </IconButton>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ pt: { md: 2 } }}>
          <Chip label={product.category} size="small" sx={{ mb: 2, bgcolor: 'rgba(150,123,182,0.12)', color: 'primary.dark', fontWeight: 600 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1.5 }}>{product.name}</Typography>
          <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 700, mb: 3 }}>
            ₹{product.price.toLocaleString('en-IN')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line', mb: 4 }}>
            {product.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" onClick={handleCart} sx={{ px: 4 }}>
              {isInCart ? 'Go to Cart' : 'Add to Cart'}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleWishlist}
              disabled={wishlistMutating}
              startIcon={isInWishlist ? <Favorite color="error" /> : <FavoriteBorder />}
            >
              {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
          </Box>
        </Box>
      </Box>
      <Snackbar open={Boolean(notice)} autoHideDuration={3500} onClose={() => setNotice(null)}>
        <Alert severity={notice?.severity ?? 'success'} onClose={() => setNotice(null)}>{notice?.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetails;
