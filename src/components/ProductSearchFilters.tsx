import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

export type ProductSort = 'featured' | 'price-asc' | 'price-desc' | 'name';
export type ProductPriceRange = 'all' | 'under-5000' | '5000-10000' | 'over-10000';

interface ProductSearchFiltersProps {
  search: string;
  category: string;
  priceRange: ProductPriceRange;
  sort: ProductSort;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriceRangeChange: (value: ProductPriceRange) => void;
  onSortChange: (value: ProductSort) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const ProductSearchFilters: React.FC<ProductSearchFiltersProps> = ({
  search,
  category,
  priceRange,
  sort,
  categories,
  onSearchChange,
  onCategoryChange,
  onPriceRangeChange,
  onSortChange,
  onClear,
  hasActiveFilters,
}) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: '2fr 1fr 1fr 1fr auto' },
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
    <TextField
      fullWidth
      size="small"
      label="Search products"
      placeholder="Name, category, or description"
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
      slotProps={{
        input: {
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
        },
      }}
    />
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
