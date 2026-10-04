import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ProductCatalog from './ProductCatalog';
import { useAppSelector } from '../store/hooks';

const Home: React.FC = () => {
  const { items: products, loading, error } = useAppSelector((state) => state.products);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, color: '#967bb6' }}>
          Our Collection
        </Typography>
        <ProductCatalog products={products} loading={loading} error={error} />
      </Container>
    </Box>
  );
};

export default Home;
