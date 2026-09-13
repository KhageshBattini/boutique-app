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
    id: 'dresses',
    name: 'Dresses',
    description: 'Elegant dresses for every occasion',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=400&fit=crop',
    itemCount: 12
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Complete your look with our accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=400&fit=crop',
    itemCount: 8
  },
  {
    id: 'tops',
    name: 'Tops & Blouses',
    description: 'Stylish tops for modern women',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=400&fit=crop',
    itemCount: 15
  },
  {
    id: 'outerwear',
    name: 'Outerwear',
    description: 'Stay warm and fashionable',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=400&fit=crop',
    itemCount: 6
  },
  {
    id: 'shoes',
    name: 'Shoes',
    description: 'Step out in style',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=400&fit=crop',
    itemCount: 10
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    description: 'Add sparkle to your ensemble',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop',
    itemCount: 9
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