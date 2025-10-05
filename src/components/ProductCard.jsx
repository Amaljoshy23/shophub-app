import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addItem } from '../redux/slices/cartSlice';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { doc, setDoc, serverTimestamp, getDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebase';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addItem(product));
    toast.success('Added to cart!');
  };

  const handleAddToFavorites = async (e) => {
    e.preventDefault();
    try {
      const uid = auth?.currentUser?.uid || 'guest';
      const favId = `${uid}_${product.id}`; // stable per user+product
      await setDoc(
        doc(db, 'favorites', favId),
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          uid: uid === 'guest' ? null : uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      toast.success('Added to favorites');
      setIsFav(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to save favorite:', err);
      toast.error('Could not add to favorites');
    }
  };

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    const uid = auth?.currentUser?.uid || 'guest';
    const favId = `${uid}_${product.id}`;
    if (isFav) {
      try {
        await deleteDoc(doc(db, 'favorites', favId));
        setIsFav(false);
        toast.success('Removed from favorites');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to remove favorite:', err);
        toast.error('Could not remove from favorites');
      }
    } else {
      await handleAddToFavorites(e);
    }
  };

  // Check favorite state on mount/auth or product change
  useEffect(() => {
    let mounted = true;
    const check = async () => {
      try {
        const uid = auth?.currentUser?.uid || 'guest';
        const favId = `${uid}_${product.id}`;
        const snap = await getDoc(doc(db, 'favorites', favId));
        if (mounted) setIsFav(snap.exists());
      } catch (_) {
        if (mounted) setIsFav(false);
      }
    };
    check();
    return () => { mounted = false; };
  }, [product?.id]);

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 sm:h-56 md:h-64 object-contain bg-white group-hover:scale-110 transition-transform duration-300"
          />
          {product.discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
              -{product.discount}%
            </div>
          )}
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-indigo-600">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleFavorite}
                title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                className={`p-2 rounded-lg border transition ${
                  isFav
                    ? 'text-red-600 border-red-200 bg-red-50 hover:bg-red-100'
                    : 'text-gray-600 border-gray-200 hover:text-red-500 hover:border-red-200 hover:bg-red-50'
                }`}
              >
                {isFav ? (
                  // Filled heart
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.75 2.25 9.6 2.25 7.014 4.444 4.875 7.125 4.875c1.53 0 3.005.702 3.975 1.86a5.097 5.097 0 013.975-1.86c2.681 0 4.875 2.139 4.875 4.725 0 3.15-2.438 5.76-4.739 7.906a25.18 25.18 0 01-4.244 3.17 15.247 15.247 0 01-.383.218l-.022.012-.007.003a.75.75 0 01-.67 0z" />
                  </svg>
                ) : (
                  // Outline heart
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                )}
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
              >
                <ShoppingCartIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-gray-500">{product.category}</span>
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
