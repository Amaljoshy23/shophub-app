import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';
import { fetchProductById, setCurrentProduct, clearCurrentProduct } from '../redux/slices/productsSlice';
import { ProductDetailSkeleton } from '../components/SkeletonLoader';
import Breadcrumbs from '../components/Breadcrumbs';
import Badge from '../components/Badge';
import { getCategoryDisplayName, formatPrice, getRatingStars } from '../services/fakeStoreApi';
import { 
  ShoppingCartIcon, 
  ArrowLeftIcon, 
  StarIcon,
  HeartIcon,
  ShareIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct, productLoading, error } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Fetch product by ID
    dispatch(fetchProductById(id));
    
    // Cleanup on unmount
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to load product: ${error}`);
    }
  }, [error]);

  const handleAddToCart = () => {
    if (!currentProduct) return;
    
    for (let i = 0; i < quantity; i++) {
      dispatch(addItem(currentProduct));
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentProduct?.title,
          text: currentProduct?.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (productLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          <ProductDetailSkeleton />
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/products')}
            className="btn btn-primary"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const rating = getRatingStars(currentProduct.rating?.rate || 0);
  const breadcrumbItems = [
    { label: 'Products', href: '/products' },
    { label: getCategoryDisplayName(currentProduct.category), href: `/products?category=${currentProduct.category}` },
    { label: currentProduct.title }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={currentProduct.images?.[selectedImage] || currentProduct.image}
                alt={currentProduct.title}
                className="w-full h-full object-contain p-8"
                loading="lazy"
              />
            </div>

            {/* Thumbnail Images */}
            {currentProduct.images && currentProduct.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto">
                {currentProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-blue-600 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${currentProduct.title} ${index + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Brand */}
            <div className="flex items-center gap-3">
              <Badge variant="primary">
                {getCategoryDisplayName(currentProduct.category)}
              </Badge>
              {currentProduct.brand && (
                <span className="text-gray-600 text-sm">{currentProduct.brand}</span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {currentProduct.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  index < rating.fullStars ? (
                    <StarIconSolid key={index} className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <StarIcon key={index} className="w-5 h-5 text-gray-300" />
                  )
                ))}
              </div>
              <span className="text-gray-600">
                {currentProduct.rating?.rate || 0} ({currentProduct.rating?.count || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(currentProduct.price)}
                </span>
                {currentProduct.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(currentProduct.originalPrice)}
                  </span>
                )}
                {currentProduct.discount && (
                  <Badge variant="error">
                    {currentProduct.discount}% OFF
                  </Badge>
                )}
              </div>
              {currentProduct.discount && (
                <p className="text-green-600 font-medium">
                  You save {formatPrice(currentProduct.originalPrice - currentProduct.price)}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {currentProduct.inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">In Stock</span>
                  {currentProduct.stock && (
                    <span className="text-gray-500">({currentProduct.stock} available)</span>
                  )}
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  disabled={!currentProduct.inStock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!currentProduct.inStock}
                  className="flex-1 btn btn-primary btn-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!currentProduct.inStock}
                  className="flex-1 btn btn-accent btn-lg"
                >
                  Buy Now
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="flex gap-4">
                <button className="flex-1 btn btn-secondary flex items-center justify-center gap-2">
                  <HeartIcon className="w-5 h-5" />
                  Add to Wishlist
                </button>
                <button 
                  onClick={handleShare}
                  className="flex-1 btn btn-secondary flex items-center justify-center gap-2"
                >
                  <ShareIcon className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <TruckIcon className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Secure Payment</p>
                  <p className="text-sm text-gray-600">100% secure checkout</p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            {currentProduct.specifications && (
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(currentProduct.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
