import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Determine filter: signed-in user's uid or 'guest' for guest users
        const uid = auth?.currentUser?.uid || 'guest';
        console.log('Loading favorites for uid:', uid);
        
        const colRef = collection(db, 'favorites');
        
        // Try to get all favorites first to debug
        const allFavs = await getDocs(colRef);
        console.log('All favorites in database:', allFavs.docs.map(d => ({ id: d.id, ...d.data() })));
        
        // Create query based on uid
        const q = uid === 'guest' 
          ? query(colRef, where('uid', '==', null))
          : query(colRef, where('uid', '==', uid));

        const unsub = onSnapshot(
          q,
          (snap) => {
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            console.log('Filtered favorites:', data);
            setItems(data);
            setLoading(false);
          },
          (err) => {
            console.error('Firestore error:', err);
            setError(err.message);
            setLoading(false);
          }
        );

        return () => unsub();
      } catch (err) {
        console.error('Error loading favorites:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="spinner h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-red-600 mb-4">Error loading favorites: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Favorites ({items.length})</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">No favorites yet. Tap the heart on a product to add it.</p>
            <p className="text-sm text-gray-500">Check the browser console for debugging info.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((fav) => (
              <ProductCard
                key={fav.id}
                product={{
                  id: fav.productId,
                  name: fav.name,
                  image: fav.image,
                  price: fav.price,
                  category: fav.category,
                  originalPrice: fav.originalPrice,
                  stock: fav.stock ?? 1,
                  description: fav.description || '',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
