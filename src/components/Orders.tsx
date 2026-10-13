import React, { useEffect } from 'react';
import { Alert, Box, Button, Card, CardContent, Chip, CircularProgress, Container, Divider, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMyOrders } from '../store/slices/orderSlice';

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loadingHistory, historyError } = useAppSelector((state) => state.orders);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchMyOrders());
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) return <Container maxWidth="md" sx={{ py: 5 }}><Alert severity="info">Please sign in to view your orders.</Alert></Container>;

  if (loadingHistory && orders.length === 0) {
    return <Container maxWidth="md" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Container>;
  }

  if (historyError && orders.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
      <Alert
        severity="error"
        action={<Button color="inherit" size="small" onClick={() => dispatch(fetchMyOrders())}>Retry</Button>}
      >
        {historyError}
      </Alert>
      </Container>
    );
  }

  if (orders.length === 0) {
    return <Container maxWidth="md" sx={{ py: 5 }}><Alert severity="info">You haven’t placed any orders yet.</Alert></Container>;
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 }, minHeight: 320 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: 'text.primary' }}>Order History</Typography>
      {historyError && <Alert severity="error" sx={{ mb: 2 }}>{historyError}</Alert>}
      {orders.map((order) => (
        <Card key={order.id} variant="outlined" sx={{ mb: 2.5, borderRadius: 2, boxShadow: '0 2px 12px rgba(45, 30, 60, 0.05)' }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 }, '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
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
    </Container>
  );
};

export default Orders;
