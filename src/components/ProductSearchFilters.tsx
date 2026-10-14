import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

export type ProductSort = 'featured' | 'price-asc' | 'price-desc' | 'name';
export type ProductPriceRange = 'all' | 'under-5000' | '5000-10000' | 'over-10000';

interface ProductSearchFiltersProps {
  category: string;
  priceRange: ProductPriceRange;
  sort: ProductSort;
  categories: string[];
  onCategoryChange: (value: string) => void;
  onPriceRangeChange: (value: ProductPriceRange) => void;
  onSortChange: (value: ProductSort) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const ProductSearchFilters: React.FC<ProductSearchFiltersProps> = ({
  category,
  priceRange,
  sort,
  categories,
  onCategoryChange,
  onPriceRangeChange,
  onSortChange,
  onClear,
  hasActiveFilters,
}) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: '1fr 1fr 1fr auto' },
      gap: 2,
      alignItems: 'center',
      mb: 3,
      p: 2,
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      backgroundColor: 'background.paper',
    }}
  >
    <FormControl fullWidth size="small">
      <InputLabel id="product-category-label">Category</InputLabel>
      <Select labelId="product-category-label" value={category} label="Category" onChange={(event) => onCategoryChange(event.target.value)}>
        <MenuItem value="all">All categories</MenuItem>
        {categories.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
      </Select>
    </FormControl>
    <FormControl fullWidth size="small">
      <InputLabel id="product-price-label">Price</InputLabel>
      <Select labelId="product-price-label" value={priceRange} label="Price" onChange={(event) => onPriceRangeChange(event.target.value as ProductPriceRange)}>
        <MenuItem value="all">Any price</MenuItem>
        <MenuItem value="under-5000">Under ₹5,000</MenuItem>
        <MenuItem value="5000-10000">₹5,000 – ₹10,000</MenuItem>
        <MenuItem value="over-10000">Over ₹10,000</MenuItem>
      </Select>
    </FormControl>
    <FormControl fullWidth size="small">
      <InputLabel id="product-sort-label">Sort by</InputLabel>
      <Select labelId="product-sort-label" value={sort} label="Sort by" onChange={(event) => onSortChange(event.target.value as ProductSort)}>
        <MenuItem value="featured">Featured</MenuItem>
        <MenuItem value="price-asc">Price: low to high</MenuItem>
        <MenuItem value="price-desc">Price: high to low</MenuItem>
        <MenuItem value="name">Name: A to Z</MenuItem>
      </Select>
    </FormControl>
    {hasActiveFilters && (
      <Button onClick={onClear} sx={{ whiteSpace: 'nowrap' }}>
        Clear filters
      </Button>
    )}
  </Box>
);

export default ProductSearchFilters;
