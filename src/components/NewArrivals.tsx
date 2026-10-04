import React from 'react';
import { Container, Typography, Box, Chip, Paper } from '@mui/material';
import ProductCatalog from './ProductCatalog';
import { useAppSelector } from '../store/hooks';

const NewArrivals: React.FC = () => {
  const { items: products, loading, error } = useAppSelector((state) => state.products);

  const newArrivals = products.filter((product) => product.newArrival);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #967bb6 0%, #b39ddb 100%)',
          color: 'white',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" sx={{ mr: 2 }}>
            New Arrivals
          </Typography>
          <Chip 
            label="Just In" 
            sx={{ 
              backgroundColor: 'white', 
              color: '#967bb6',
              fontWeight: 'bold'
            }} 
          />
        </Box>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Discover our latest additions to the collection
        </Typography>
      </Paper>

      <ProductCatalog
        products={newArrivals}
        loading={loading}
        error={error}
        emptyMessage="There are no new arrivals matching your search or filters."
      />
    </Container>
  );
};

export default NewArrivals;
