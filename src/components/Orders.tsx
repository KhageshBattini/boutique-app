import React, { useEffect } from 'react';
import { Alert, Box, Button, Card, CardContent, Chip, CircularProgress, Divider, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMyOrders } from '../store/slices/orderSlice';

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loadingHistory, historyError } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loadingHistory && orders.length === 0) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>;
  }

  if (historyError && orders.length === 0) {
    return (
      <Alert
        severity="error"
        action={<Button color="inherit" size="small" onClick={() => dispatch(fetchMyOrders())}>Retry</Button>}
      >
        {historyError}
      </Alert>
    );
  }

  if (orders.length === 0) {
    return <Alert severity="info">You haven’t placed any orders yet.</Alert>;
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Order History</Typography>
      {historyError && <Alert severity="error" sx={{ mb: 2 }}>{historyError}</Alert>}
      {orders.map((order) => (
        <Card key={order.id} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Order #{order.id}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Placed {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </Typography>
              </Box>
              <Chip label={order.status} color={order.status === 'PLACED' ? 'primary' : 'default'} size="small" />
            </Box>
            <Divider sx={{ mb: 1 }} />
            {order.items.map((item, index) => (
              <Box key={`${order.id}-${index}`} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, py: 0.75 }}>
                <Typography variant="body2">{item.productName} × {item.quantity}</Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                  ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                </Typography>
              </Box>
            ))}
            <Divider sx={{ mt: 1, mb: 1.5 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">Total</Typography>
              <Typography variant="subtitle2" sx={{ color: '#967bb6', fontWeight: 700 }}>
                ₹{order.total.toLocaleString('en-IN')}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
      {loadingHistory && <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}><CircularProgress size={24} /></Box>}
    </Box>
  );
};

export default Orders;
