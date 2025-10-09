import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllOrders } from '../services/ordersService';
import { getAllMessages } from '../services/messagesService';
import { getAllFavorites } from '../services/favoritesService';

const ADMIN_ID = import.meta.env.VITE_ADMIN_ID;
const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN;

const StatCard = ({ title, value, subtitle, accent = 'primary' }) => {
  const accentBg =
    accent === 'primary' ? 'bg-blue-600' :
    accent === 'success' ? 'bg-green-600' :
    accent === 'warning' ? 'bg-yellow-500' :
    accent === 'accent' ? 'bg-red-600' :
    'bg-blue-600';
  return (
    <div className="card p-6">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-sm text-gray-600 mt-2">{subtitle}</p>}
      <div className={`mt-4 h-1 rounded ${accentBg}`} />
    </div>
  );
};

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium border ${
      active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
    }`}
  >
    {children}
  </button>
);

const AdminDashboard = () => {
  const { user } = useSelector((s) => s.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [gateOk, setGateOk] = useState(false);
  const [gateId, setGateId] = useState('');
  const [gatePin, setGatePin] = useState('');
  const [gateError, setGateError] = useState('');

  useEffect(() => {
    const session = localStorage.getItem('adminDashboardSession');
    if (session === 'true') setGateOk(true);
  }, []);

  const handleGateLogin = (e) => {
    e.preventDefault();
    setGateError('');
    const idOk = (gateId || '').trim() === String(ADMIN_ID || '').trim();
    const pinOk = (gatePin || '').trim() === String(ADMIN_PIN || '').trim();
    if (idOk && pinOk) {
      localStorage.setItem('adminDashboardSession', 'true');
      setGateOk(true);
      setGateId('');
      setGatePin('');
    } else {
      setGateError('Invalid ID or PIN');
    }
  };

  const handleGateLogout = () => {
    localStorage.removeItem('adminDashboardSession');
    setGateOk(false);
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const [o, m, f] = await Promise.all([
          getAllOrders(),
          getAllMessages(),
          getAllFavorites(),
        ]);
        setOrders(o);
        setMessages(m);
        setFavorites(f);
      } catch (e) {
        setError(e?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const analytics = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || o.price || 0), 0);
    const pendingOrders = orders.filter((o) => o.status === 'pending').length;
    const completedOrders = orders.filter((o) => o.status === 'completed' || o.status === 'delivered').length;
    const avgOrder = orders.length ? (totalRevenue / orders.length) : 0;
    return { totalRevenue, pendingOrders, completedOrders, avgOrder };
  }, [orders]);

  const canAccess = gateOk || user?.role === 'admin';

  if (!canAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="card p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Admin Access</h2>
          <p className="text-sm text-gray-600 mb-4">Enter your Admin ID and PIN</p>
          {gateError && (
            <div className="mb-3 text-sm text-red-600">{gateError}</div>
          )}
          <form onSubmit={handleGateLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admin ID</label>
              <input
                type="text"
                value={gateId}
                onChange={(e) => setGateId(e.target.value)}
                className="input"
                placeholder="Enter Admin ID"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PIN</label>
              <input
                type="password"
                value={gatePin}
                onChange={(e) => setGatePin(e.target.value)}
                className="input"
                placeholder="Enter PIN"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">Unlock Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-start justify-between gap-3">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="text-right">
            <p className="text-gray-600">Insights, messages, orders and favorites</p>
            <button onClick={handleGateLogout} className="mt-2 text-sm text-gray-500 hover:text-gray-700 underline">Logout</button>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>Overview</TabButton>
          <TabButton active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>Orders</TabButton>
          <TabButton active={activeTab === 'messages'} onClick={() => setActiveTab('messages')}>Messages</TabButton>
          <TabButton active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')}>Favorites</TabButton>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="spinner h-10 w-10" />
          </div>
        ) : error ? (
          <div className="card p-6">
            <p className="text-accent-600">{error}</p>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard title="Total Orders" value={orders.length} subtitle={`${analytics.completedOrders} completed`} />
                  <StatCard title="Pending Orders" value={analytics.pendingOrders} accent="warning" />
                  <StatCard title="Messages" value={messages.length} accent="success" />
                  <StatCard title="Favorites" value={favorites.length} accent="accent" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Revenue</h3>
                    <p className="text-3xl font-bold text-gray-900">${analytics.totalRevenue.toFixed(2)}</p>
                    <p className="text-sm text-secondary-600 mt-2">Average order: ${analytics.avgOrder.toFixed(2)}</p>
                  </div>
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Messages</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {messages.slice(0, 6).map((m) => (
                        <div key={m.id} className="p-3 border border-gray-200 rounded-md">
                          <div className="flex justify-between items-center">
                            <p className="font-medium text-gray-900">{m.name || m.email || 'Anonymous'}</p>
                            <span className="text-xs text-gray-500">{new Date(m.createdAt).toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1 line-clamp-2">{m.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((o) => (
                        <tr key={o.id}>
                          <td className="px-6 py-4 text-sm text-gray-900">{o.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{o.userId || o.email || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">${(o.totalAmount || o.price || 0).toFixed(2)}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`badge ${o.status === 'pending' ? 'badge-warning' : 'badge-success'}`}>{o.status}</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{o.createdAt ? new Date(o.createdAt).toLocaleString() : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {messages.map((m) => (
                        <tr key={m.id}>
                          <td className="px-6 py-4 text-sm text-gray-900">{m.name || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{m.email || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{m.subject || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-700 max-w-[400px]"><span className="line-clamp-2">{m.message}</span></td>
                          <td className="px-6 py-4 text-sm text-gray-900">{m.createdAt ? new Date(m.createdAt).toLocaleString() : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {favorites.map((f) => (
                        <tr key={f.id}>
                          <td className="px-6 py-4 text-sm text-gray-900">{f.uid || 'guest'}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{f.name || f.productId}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{f.price ? `$${Number(f.price).toFixed(2)}` : '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{f.createdAt ? new Date(f.createdAt).toLocaleString() : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
