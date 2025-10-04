import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserIcon, EnvelopeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import toast from 'react-hot-toast';
import { setUser } from '../redux/slices/authSlice';

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.displayName || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Profile</h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-8">
            <div className="bg-indigo-100 rounded-full p-4">
              <UserIcon className="h-16 w-16 text-indigo-600" />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-800">{user?.displayName}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <div className="ml-auto">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="btn btn-secondary"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={() => { setEditing(false); setFullName(user?.displayName || ''); }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <UserIcon className="h-6 w-6 text-gray-400" />
                <div className="w-full">
                  <p className="text-sm text-gray-600">Full Name</p>
                  {!editing ? (
                    <p className="font-semibold text-gray-800">{user?.displayName}</p>
                  ) : (
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="input mt-1"
                      placeholder="Enter your full name"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <EnvelopeIcon className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="font-semibold text-gray-800">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <ShieldCheckIcon className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Account Role</p>
                  <p className="font-semibold text-gray-800 capitalize">{user?.role || 'Customer'}</p>
                </div>
              </div>
            </div>
          </div>

          {editing && (
            <div className="border-t mt-8 pt-6">
              <button
                disabled={saving || !fullName.trim()}
                onClick={async () => {
                  try {
                    setSaving(true);
                    const current = auth.currentUser;
                    if (!current) throw new Error('No authenticated user');
                    // Update Firebase Auth profile
                    await updateProfile(current, { displayName: fullName.trim() });
                    // Upsert Firestore user doc
                    await setDoc(
                      doc(db, 'users', current.uid),
                      {
                        uid: current.uid,
                        email: current.email,
                        displayName: fullName.trim(),
                      },
                      { merge: true }
                    );
                    // Reflect immediately in Redux
                    dispatch(setUser({
                      uid: current.uid,
                      email: current.email,
                      displayName: fullName.trim(),
                      role: user?.role || 'customer',
                    }));
                    toast.success('Profile updated');
                    setEditing(false);
                  } catch (err) {
                    // eslint-disable-next-line no-console
                    console.error('Profile update failed:', err);
                    toast.error('Failed to update profile');
                  } finally {
                    setSaving(false);
                  }
                }}
                className="btn btn-primary"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          <div className="border-t mt-8 pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/orders')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                View Orders
              </button>
              <button
                onClick={() => navigate('/products')}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
