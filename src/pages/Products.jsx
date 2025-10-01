import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { 
  fetchProducts, 
  fetchCategories, 
  fetchProductsByCategory,
  filterProducts,
  setSelectedCategory,
  setSearchQuery
} from '../redux/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import Breadcrumbs from '../components/Breadcrumbs';
import { getCategoryDisplayName } from '../services/fakeStoreApi';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Products = () => {
  const dispatch = useDispatch();
  const { 
    products, 
    filteredProducts, 
    categories, 
    loading, 
    error,
    selectedCategory: reduxSelectedCategory,
    searchQuery: reduxSearchQuery
  } = useSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('default');
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get URL parameters
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  // Initialize data on component mount
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle URL parameters
  useEffect(() => {
    if (categoryParam) {
      dispatch(setSelectedCategory(categoryParam));
    }
    if (searchParam) {
      dispatch(setSearchQuery(searchParam));
      setLocalSearchQuery(searchParam);
    }
  }, [categoryParam, searchParam, dispatch]);

  // Filter products when category or search changes
  useEffect(() => {
    dispatch(filterProducts({
      category: reduxSelectedCategory,
      searchQuery: reduxSearchQuery
    }));
  }, [reduxSelectedCategory, reduxSearchQuery, products, dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(`Failed to load products: ${error}`);
    }
  }, [error]);

  // Handle category filter
  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category));
    const newParams = new URLSearchParams(searchParams);
    if (category === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(localSearchQuery));
    const newParams = new URLSearchParams(searchParams);
    if (localSearchQuery.trim()) {
      newParams.set('search', localSearchQuery);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  // Handle sorting
  const handleSort = (sortType) => {
    setSortBy(sortType);
    // Sort logic will be applied to filteredProducts
  };

  // Apply sorting to filtered products
  const getSortedProducts = () => {
    let sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'rating':
        return sorted.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
      default:
        return sorted;
    }
  };

  const sortedProducts = getSortedProducts();
  const allCategories = ['all', ...categories];

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Products', href: '/products' }
  ];
  
  if (reduxSelectedCategory && reduxSelectedCategory !== 'all') {
    breadcrumbItems.push({
      label: getCategoryDisplayName(reduxSelectedCategory)
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {reduxSelectedCategory && reduxSelectedCategory !== 'all' 
              ? getCategoryDisplayName(reduxSelectedCategory)
              : 'All Products'
            }
          </h1>
          <p className="text-gray-600 text-lg">
            {loading ? 'Loading products...' : `${sortedProducts.length} products found`}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="input pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden btn btn-secondary flex items-center gap-2"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              Filters
            </button>

            {/* Sort */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="input min-w-[150px]"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Filters */}
          <div className={`mt-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <label className="block text-sm font-medium text-gray-700 mb-3">Categories:</label>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((category) => {
                const isActive = reduxSelectedCategory === category;
                const displayName = category === 'all' ? 'All Categories' : getCategoryDisplayName(category);
                
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {displayName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-slide-up"
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              {reduxSearchQuery 
                ? `No products match "${reduxSearchQuery}"`
                : 'No products available in this category'
              }
            </p>
            <button
              onClick={() => {
                dispatch(setSearchQuery(''));
                dispatch(setSelectedCategory('all'));
                setLocalSearchQuery('');
                setSearchParams({});
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More (Future Enhancement) */}
        {sortedProducts.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600">
              Showing {sortedProducts.length} of {products.length} products
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
