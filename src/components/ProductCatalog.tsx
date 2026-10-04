import React, { useMemo, useState } from 'react';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import ProductSearchFilters, { ProductPriceRange, ProductSort } from './ProductSearchFilters';
import { Product } from '../store/slices/productsSlice';

interface ProductCatalogProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  emptyMessage?: string;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ products, loading, error, emptyMessage = 'No products match your search or filters.' }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<ProductPriceRange>('all');
  const [sort, setSort] = useState<ProductSort>('featured');

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))).sort((a, b) => a.localeCompare(b)),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    const matchingProducts = products.filter((product) => {
      const matchesSearch = !query || [product.name, product.category, product.description]
        .some((value) => value.toLocaleLowerCase().includes(query));
      const matchesCategory = category === 'all' || product.category === category;
      const matchesPrice = priceRange === 'all'
        || (priceRange === 'under-5000' && product.price < 5000)
        || (priceRange === '5000-10000' && product.price >= 5000 && product.price <= 10000)
        || (priceRange === 'over-10000' && product.price > 10000);
      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sort === 'price-asc') return matchingProducts.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') return matchingProducts.sort((a, b) => b.price - a.price);
    if (sort === 'name') return matchingProducts.sort((a, b) => a.name.localeCompare(b.name));
    return matchingProducts;
  }, [products, search, category, priceRange, sort]);

  const hasActiveFilters = Boolean(search.trim()) || category !== 'all' || priceRange !== 'all' || sort !== 'featured';
  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setPriceRange('all');
    setSort('featured');
  };

  return (
    <>
      <ProductSearchFilters
        search={search}
        category={category}
        priceRange={priceRange}
        sort={sort}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onPriceRangeChange={setPriceRange}
        onSortChange={setSort}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}><CircularProgress /></Box>}
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {!loading && (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} aria-live="polite">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </Typography>
          {filteredProducts.length ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 4 }}>
              {filteredProducts.map((product) => <Box key={product.id}><ProductCard product={product} /></Box>)}
            </Box>
          ) : (
            <Alert severity="info">{emptyMessage}</Alert>
          )}
        </>
      )}
    </>
  );
};

export default ProductCatalog;
