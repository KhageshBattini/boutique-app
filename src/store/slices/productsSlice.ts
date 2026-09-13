import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [
    {
      id: 1,
      name: 'Elegant Silk Dress',
      price: 129.99,
      description: 'Beautiful silk dress perfect for special occasions',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
      category: 'Dresses'
    },
    {
      id: 2,
      name: 'Designer Handbag',
      price: 249.99,
      description: 'Premium leather handbag with elegant design',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop',
      category: 'Accessories'
    },
    {
      id: 3,
      name: 'Cashmere Sweater',
      price: 89.99,
      description: 'Soft cashmere sweater for comfort and style',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop',
      category: 'Tops'
    },
    {
      id: 4,
      name: 'Classic Trench Coat',
      price: 199.99,
      description: 'Timeless trench coat for all seasons',
      image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop',
      category: 'Outerwear'
    },
    {
      id: 5,
      name: 'Leather Boots',
      price: 159.99,
      description: 'Premium leather boots with comfortable fit',
      image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=500&fit=crop',
      category: 'Shoes'
    },
    {
      id: 6,
      name: 'Pearl Necklace',
      price: 79.99,
      description: 'Elegant pearl necklace for any occasion',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop',
      category: 'Jewelry'
    }
  ],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError } = productsSlice.actions;
export default productsSlice.reducer;