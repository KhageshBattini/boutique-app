import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  newArrival: boolean;
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Elegant Silver Necklace',
    price: 2999,
    description: 'A beautiful sterling silver necklace with intricate design, perfect for any occasion.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    category: 'Necklaces',
    newArrival: true,
  },
  {
    id: 2,
    name: 'Gold Drop Earrings',
    price: 2499,
    description: 'Stunning gold drop earrings that add elegance to your ensemble.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
    category: 'Earrings',
    newArrival: true,
  },
  {
    id: 3,
    name: 'Pearl Bracelet',
    price: 1899,
    description: 'Classic freshwater pearl bracelet with gold-plated clasp.',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop',
    category: 'Bracelets',
    newArrival: false,
  },
  {
    id: 4,
    name: 'Diamond Stud Earrings',
    price: 5999,
    description: 'Timeless diamond stud earrings for everyday luxury.',
    image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=400&h=400&fit=crop',
    category: 'Earrings',
    newArrival: true,
  },
  {
    id: 5,
    name: 'Rose Gold Ring',
    price: 3499,
    description: 'Delicate rose gold ring with a sparkling gemstone.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
    category: 'Rings',
    newArrival: false,
  },
  {
    id: 6,
    name: 'Vintage Brooch',
    price: 2199,
    description: 'Vintage-inspired brooch with floral design and crystals.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
    category: 'Brooches',
    newArrival: true,
  },
  {
    id: 7,
    name: 'Sapphire Pendant',
    price: 4499,
    description: 'Deep blue sapphire pendant in silver setting.',
    image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&h=400&fit=crop',
    category: 'Necklaces',
    newArrival: false,
  },
  {
    id: 8,
    name: 'Crystal Hair Pin',
    price: 999,
    description: 'Elegant crystal hair pin for special occasions.',
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400&h=400&fit=crop',
    category: 'Hair Accessories',
    newArrival: true,
  },
];

const initialState: ProductsState = {
  items: [],
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
export { FALLBACK_PRODUCTS };
export default productsSlice.reducer;
