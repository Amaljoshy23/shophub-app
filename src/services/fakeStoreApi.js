// Fake Store API Service
const BASE_URL = 'https://fakestoreapi.com';

// API endpoints
const ENDPOINTS = {
  PRODUCTS: '/products',
  CATEGORIES: '/products/categories',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,
  PRODUCTS_LIMIT: (limit) => `/products?limit=${limit}`,
  PRODUCTS_SORT: (sort) => `/products?sort=${sort}`, // asc or desc
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('API call failed:', error);
    return { data: null, error: error.message };
  }
};

// Product API functions
export const fakeStoreApi = {
  // Get all products
  getAllProducts: async (limit = null, sort = null) => {
    let endpoint = ENDPOINTS.PRODUCTS;
    const params = new URLSearchParams();
    
    if (limit) params.append('limit', limit);
    if (sort) params.append('sort', sort);
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }
    
    return apiCall(endpoint);
  },

  // Get single product by ID
  getProductById: async (id) => {
    return apiCall(ENDPOINTS.PRODUCT_BY_ID(id));
  },

  // Get all categories
  getCategories: async () => {
    return apiCall(ENDPOINTS.CATEGORIES);
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    return apiCall(ENDPOINTS.PRODUCTS_BY_CATEGORY(category));
  },

  // Get limited number of products
  getLimitedProducts: async (limit) => {
    return apiCall(ENDPOINTS.PRODUCTS_LIMIT(limit));
  },

  // Get sorted products
  getSortedProducts: async (sort = 'asc') => {
    return apiCall(ENDPOINTS.PRODUCTS_SORT(sort));
  },

  // Search products (client-side filtering since API doesn't support search)
  searchProducts: async (query, products = null) => {
    try {
      let productsData = products;
      
      // If no products provided, fetch all products first
      if (!productsData) {
        const result = await fakeStoreApi.getAllProducts();
        if (result.error) return result;
        productsData = result.data;
      }

      // Filter products based on query
      const filteredProducts = productsData.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );

      return { data: filteredProducts, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Transform API product data to match our app structure
  transformProduct: (apiProduct) => {
    return {
      id: apiProduct.id,
      name: apiProduct.title,
      title: apiProduct.title,
      price: apiProduct.price,
      originalPrice: Math.round(apiProduct.price * 1.2), // Add 20% as original price for discount effect
      discount: 17, // Fixed discount percentage
      image: apiProduct.image,
      images: [apiProduct.image], // API only provides one image
      category: apiProduct.category,
      description: apiProduct.description,
      rating: {
        rate: apiProduct.rating?.rate || 4.0,
        count: apiProduct.rating?.count || 100
      },
      inStock: true,
      stock: Math.floor(Math.random() * 50) + 10, // Random stock between 10-60
      brand: 'Premium Brand', // API doesn't provide brand
      tags: [apiProduct.category, 'featured'], // Generate tags from category
      specifications: {
        'Material': 'High Quality',
        'Warranty': '1 Year',
        'Shipping': 'Free Shipping'
      },
      reviews: [], // API doesn't provide reviews
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  },

  // Transform multiple products
  transformProducts: (apiProducts) => {
    return apiProducts.map(product => fakeStoreApi.transformProduct(product));
  },

  // Get featured products (first 8 products)
  getFeaturedProducts: async () => {
    const result = await fakeStoreApi.getLimitedProducts(8);
    if (result.error) return result;
    
    return {
      data: fakeStoreApi.transformProducts(result.data),
      error: null
    };
  },

  // Get products with pagination simulation
  getProductsWithPagination: async (page = 1, limit = 12) => {
    try {
      const allProductsResult = await fakeStoreApi.getAllProducts();
      if (allProductsResult.error) return allProductsResult;

      const products = fakeStoreApi.transformProducts(allProductsResult.data);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = products.slice(startIndex, endIndex);

      return {
        data: {
          products: paginatedProducts,
          totalProducts: products.length,
          totalPages: Math.ceil(products.length / limit),
          currentPage: page,
          hasNextPage: endIndex < products.length,
          hasPrevPage: page > 1
        },
        error: null
      };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }
};

// Category mapping for better display names
export const CATEGORY_DISPLAY_NAMES = {
  "men's clothing": "Men's Fashion",
  "women's clothing": "Women's Fashion",
  "jewelery": "Jewelry",
  "electronics": "Electronics"
};

// Helper function to get display name for category
export const getCategoryDisplayName = (category) => {
  return CATEGORY_DISPLAY_NAMES[category] || category.charAt(0).toUpperCase() + category.slice(1);
};

// Price formatting helper
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

// Rating stars helper
export const getRatingStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return {
    fullStars,
    hasHalfStar,
    emptyStars,
    percentage: (rating / 5) * 100
  };
};

export default fakeStoreApi;
