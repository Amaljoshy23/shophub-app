import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fakeStoreApi } from '../../services/fakeStoreApi';

// Async thunks for API calls
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const result = await fakeStoreApi.getAllProducts();
      if (result.error) {
        return rejectWithValue(result.error);
      }
      return fakeStoreApi.transformProducts(result.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const result = await fakeStoreApi.getProductById(productId);
      if (result.error) {
        return rejectWithValue(result.error);
      }
      return fakeStoreApi.transformProduct(result.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const result = await fakeStoreApi.getCategories();
      if (result.error) {
        return rejectWithValue(result.error);
      }
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const result = await fakeStoreApi.getProductsByCategory(category);
      if (result.error) {
        return rejectWithValue(result.error);
      }
      return fakeStoreApi.transformProducts(result.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async ({ query, products }, { rejectWithValue }) => {
    try {
      const result = await fakeStoreApi.searchProducts(query, products);
      if (result.error) {
        return rejectWithValue(result.error);
      }
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: 'all',
  searchQuery: '',
  loading: false,
  error: null,
  currentProduct: null,
  productLoading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.loading = false;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.filteredProducts.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        state.filteredProducts = state.products;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
      state.filteredProducts = state.products;
    },
    // Client-side filtering
    filterProducts: (state, action) => {
      const { category, searchQuery } = action.payload;
      let filtered = [...state.products];

      // Filter by category
      if (category && category !== 'all') {
        filtered = filtered.filter(product => 
          product.category.toLowerCase() === category.toLowerCase()
        );
      }

      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      state.filteredProducts = filtered;
    },
  },
  extraReducers: (builder) => {
    // Fetch all products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Fetch product by ID
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.productLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productLoading = false;
        state.currentProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload;
      })

    // Fetch categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Fetch products by category
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Search products
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
        state.error = null;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setProducts,
  setFilteredProducts,
  setSelectedCategory,
  setSearchQuery,
  setLoading,
  setError,
  clearError,
  setCurrentProduct,
  clearCurrentProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  filterProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
