import React from 'react';
import { Container, Typography, Box, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

const collections: Collection[] = [
  {
    id: 'sarees',
    name: 'Sarees',
    description: 'Beautiful traditional sarees for every occasion',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=400&fit=crop',
    itemCount: 15
  },
  {
    id: 'dresses',
    name: 'Dresses',
    description: 'Elegant dresses for every occasion',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=400&fit=crop',
    itemCount: 12
  }
];

const Collections: React.FC = () => {
  const navigate = useNavigate();

  const handleCollectionClick = (collectionId: string) => {
    navigate(`/`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 2, color: '#967bb6' }}>
        Collections
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Explore our curated collections designed for the modern woman
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 4 
      }}>
        {collections.map((collection) => (
          <Card 
            key={collection.id}
            sx={{ 
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}
            onClick={() => handleCollectionClick(collection.id)}
          >
            <CardMedia
              component="img"
              height="200"
              image={collection.image}
              alt={collection.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {collection.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {collection.description}
              </Typography>
              <Typography variant="caption" color="primary">
                {collection.itemCount} items
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Collections;