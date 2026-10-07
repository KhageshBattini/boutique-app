import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Button,
  Divider,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearPersistedCart, deleteCartItem, removeFromCart, updateCartItemQuantity } from '../store/slices/cartSlice';
import type { CartItem } from '../store/slices/cartSlice';
import { moveCartItemToWishlist } from '../store/slices/wishlistSlice';
import CartItemRemovalDialog from './CartItemRemovalDialog';

interface CartProps {
  open: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, total } = useAppSelector((state) => state.cart);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);
  const [actionBusy, setActionBusy] = useState(false);
  const [actionError, setActionError] = useState('');

  const handleRemove = (item: CartItem) => {
    setActionError('');
    setItemToRemove(item);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateCartItemQuantity({ id, quantity, persist: isAuthenticated })).unwrap()
        .catch((reason: unknown) => setActionError(typeof reason === 'string' ? reason : 'Unable to update cart quantity'));
    }
  };

  const handleClearCart = () => {
    dispatch(clearPersistedCart(isAuthenticated)).unwrap()
      .catch((reason: unknown) => setActionError(typeof reason === 'string' ? reason : 'Unable to clear your cart.'));
  };

  const confirmRemove = () => {
    if (!itemToRemove) return;
    setActionBusy(true);
    dispatch(deleteCartItem({ id: itemToRemove.id, persist: isAuthenticated }))
      .unwrap()
      .then(() => setItemToRemove(null))
      .catch((reason: unknown) => setActionError(typeof reason === 'string' ? reason : 'Unable to remove this item from your cart.'))
      .finally(() => setActionBusy(false));
  };

  const moveToWishlist = () => {
    if (!itemToRemove) return;
    if (!isAuthenticated) {
      setActionError('Sign in to use your wishlist.');
      return;
    }
    setActionBusy(true);
    dispatch(moveCartItemToWishlist(itemToRemove.id))
      .unwrap()
      .then(() => {
        dispatch(removeFromCart(itemToRemove.id));
        setItemToRemove(null);
      })
      .catch((reason: unknown) => setActionError(typeof reason === 'string' ? reason : 'Unable to move this item to your wishlist.'))
      .finally(() => setActionBusy(false));
  };

  const closeRemoveDialog = () => {
    if (!actionBusy) {
      setItemToRemove(null);
      setActionError('');
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 400,
          padding: 2,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Shopping Cart</Typography>
        <Button size="small" onClick={handleClearCart} disabled={items.length === 0}>
          Clear Cart
        </Button>
      </Box>

      {items.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          Your cart is empty
        </Typography>
      ) : (
        <>
          <List>
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleRemove(item)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      src={item.image}
                      alt={item.name}
                      sx={{ width: 50, height: 50, mr: 2 }}
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

          <Box sx={{ mt: 'auto', pt: 2 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Total: ₹{total.toLocaleString('en-IN')}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={onClose}
              sx={{ mb: 1 }}
            >
              Continue Shopping
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                navigate('/checkout');
                onClose();
              }}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
      <CartItemRemovalDialog
        item={itemToRemove}
        busy={actionBusy}
        error={actionError}
        onClose={closeRemoveDialog}
        onRemove={confirmRemove}
        onMoveToWishlist={moveToWishlist}
      />
    </Drawer>
  );
};

export default Cart;
