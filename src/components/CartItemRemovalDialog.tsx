import React from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { CartItem } from '../store/slices/cartSlice';

interface CartItemRemovalDialogProps {
  item: CartItem | null;
  busy: boolean;
  error: string;
  onClose: () => void;
  onRemove: () => void;
  onMoveToWishlist: () => void;
}

const CartItemRemovalDialog: React.FC<CartItemRemovalDialogProps> = ({
  item,
  busy,
  error,
  onClose,
  onRemove,
  onMoveToWishlist,
}) => (
  <Dialog open={Boolean(item)} onClose={onClose} fullWidth maxWidth="xs">
    <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
      <Typography component="span" variant="h6">Remove item</Typography>
      <IconButton aria-label="Close" onClick={onClose} disabled={busy}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      {item && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar variant="rounded" src={item.image} alt={item.name} sx={{ width: 56, height: 56 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{item.name}</Typography>
          </Box>
          <Typography>Are you sure want to move this item from Cart?</Typography>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </>
      )}
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2 }}>
      <Button onClick={onRemove} color="error" disabled={busy}>Remove</Button>
      <Button onClick={onMoveToWishlist} variant="contained" disabled={busy}>
        {busy ? 'Please wait…' : 'Move to Wishlist'}
      </Button>
    </DialogActions>
  </Dialog>
);

export default CartItemRemovalDialog;
