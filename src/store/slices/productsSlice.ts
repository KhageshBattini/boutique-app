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
      name: 'Elegant Silk Saree',
      price: 12999,
      description: 'Beautiful silk saree with intricate embroidery perfect for special occasions',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop',
      category: 'Sarees'
    },
    {
      id: 2,
      name: 'Banarasi Silk Saree',
      price: 15999,
      description: 'Traditional Banarasi silk saree with gold zari work',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop',
      category: 'Sarees'
    },
    {
      id: 3,
      name: 'Floral Print Saree',
      price: 6999,
      description: 'Lightweight floral print saree for casual wear',
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop',
      category: 'Sarees'
    },
    {
      id: 4,
      name: 'Elegant Silk Dress',
      price: 9999,
      description: 'Beautiful silk dress perfect for special occasions',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
      category: 'Dresses'
    },
    {
      id: 5,
      name: 'Floral Maxi Dress',
      price: 7999,
      description: 'Flowing floral maxi dress for summer elegance',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop',
      category: 'Dresses'
    },
    {
      id: 6,
      name: 'Cocktail Dress',
      price: 14999,
      description: 'Stunning cocktail dress for evening events',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop',
      category: 'Dresses'
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