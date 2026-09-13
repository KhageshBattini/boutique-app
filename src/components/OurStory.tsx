import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';

const OurStory: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, color: '#967bb6' }}>
        Our Story
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ color: '#967bb6' }}>
            ALANKRITA
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            The Art of Adornment
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Typography variant="body1" sx={{ mb: 3 }}>
          Welcome to ALANKRITA, where elegance meets craftsmanship. Our journey began with a simple vision: to create a space where modern women could discover timeless pieces that celebrate their individuality and style.
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Founded with a passion for fashion and an eye for detail, ALANKRITA has grown from a small boutique to a beloved destination for women seeking sophisticated, high-quality apparel and accessories. Each piece in our collection is carefully curated to reflect the latest trends while maintaining the classic elegance that defines our brand.
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          At ALANKRITA, we believe that fashion is more than just clothing—it's a form of self-expression. Our mission is to empower women to feel confident and beautiful in their own skin, offering pieces that not only look stunning but also tell a story.
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          From elegant dresses and statement accessories to comfortable everyday wear, our collections are designed to cater to the diverse needs of the modern woman. We work with skilled artisans and premium materials to ensure that every piece meets our exacting standards of quality and style.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom sx={{ color: '#967bb6' }}>
          Our Values
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Quality:</strong> We never compromise on the quality of our materials or craftsmanship.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Elegance:</strong> Timeless design that transcends fleeting trends.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Sustainability:</strong> Committed to ethical practices and sustainable fashion.
          </Typography>
          <Typography variant="body1">
            <strong>Customer Satisfaction:</strong> Your happiness is our top priority.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ fontStyle: 'italic', textAlign: 'center', mb: 1 }}>
          <Typography variant="body1">
            "Fashion is the armor to survive the reality of everyday life."
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            — Bill Cunningham
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default OurStory;