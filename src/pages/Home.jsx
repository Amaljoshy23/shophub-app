import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories } from '../redux/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import { getCategoryDisplayName } from '../services/fakeStoreApi';
import toast from 'react-hot-toast';

const Home = () => {
  const dispatch = useDispatch();
  const { products, categories, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch products and categories on component mount
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to load data: ${error}`);
    }
  }, [error]);

  // Get featured products (first 8 products)
  const featuredProducts = products.slice(0, 8);
  
  // Get products by category for showcase
  const getProductsByCategory = (categoryName) => {
    return products.filter(product => 
      product.category.toLowerCase() === categoryName.toLowerCase()
    ).slice(0, 4);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-yellow-300">ShopHub</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Discover amazing products from the Fake Store API. Quality items at unbeatable prices,
              delivered right to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-blue-600"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of premium products from various categories
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-slide-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn btn-primary btn-lg"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-xl text-gray-600">
                Explore our diverse range of product categories
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => {
                const categoryProducts = getProductsByCategory(category);
                const displayName = getCategoryDisplayName(category);
                
                return (
                  <Link
                    key={category}
                    to={`/products?category=${category}`}
                    className="card card-hover p-6 text-center group animate-slide-up"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-white text-2xl font-bold">
                        {displayName.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {displayName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {categoryProducts.length} products available
                    </p>
                    <div className="text-blue-600 font-medium group-hover:text-blue-700">
                      Shop Now →
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Gift Promo (Illustration) */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Text */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="badge badge-primary w-max mb-4">Limited Time</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Make Someone Smile Today
                </h2>
                <p className="text-gray-600 mb-6">
                  Surprise your loved ones with thoughtful gifts. Discover curated picks for every
                  occasion and budget.
                </p>
                <div>
                  <Link to="/products?category=all" className="btn btn-primary btn-lg">
                    Shop Gifts
                  </Link>
                </div>
              </div>
              {/* Illustration */}
              <div className="relative min-h-[260px] md:min-h-[380px] bg-gray-100">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1602576666092-bf6447a729fc?q=80&w=1600&auto=format&fit=crop"
                  alt="Illustration of a man giving a gift to a girl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/0 md:to-white/0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ShopHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing you with the best shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Fast Shipping
              </h3>
              <p className="text-gray-600">
                Free shipping on orders over $50 with express delivery options
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure Shopping
              </h3>
              <p className="text-gray-600">
                Your data is protected with industry-standard security measures
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Quality Products
              </h3>
              <p className="text-gray-600">
                Carefully curated products from trusted brands and suppliers
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Our friendly support team is here to help you anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover amazing products at unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100"
            >
              Browse Products
            </Link>
            <Link
              to="/register"
              className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-blue-600"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
