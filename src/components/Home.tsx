import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ProductCard from './ProductCard';
import { useAppSelector } from '../store/hooks';

const Home: React.FC = () => {
  const { items: products } = useAppSelector((state) => state.products);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, color: '#967bb6' }}>
          Our Collection
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 4 
        }}>
          {products.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;