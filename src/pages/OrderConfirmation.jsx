import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircleIcon,
  TruckIcon,
  EnvelopeIcon,
  PhoneIcon,
  PrinterIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock order data - in real app, fetch from API
  useEffect(() => {
    const fetchOrderData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrderData({
        id: orderId || 'ORD-2024-001',
        status: 'confirmed',
        date: new Date().toLocaleDateString(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        total: 299.97,
        subtotal: 249.97,
        shipping: 15.00,
        tax: 35.00,
        items: [
          {
            id: 1,
            name: 'Premium Wireless Headphones',
            price: 149.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'
          },
          {
            id: 2,
            name: 'Smart Fitness Watch',
            price: 99.98,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'
          }
        ],
        shippingAddress: {
          name: 'John Doe',
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          country: 'United States'
        },
        paymentMethod: {
          type: 'Credit Card',
          last4: '4242'
        }
      });
      setLoading(false);
    };

    fetchOrderData();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Order Confirmation',
          text: `Order ${orderData.id} confirmed!`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-green-100 mb-6">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
              <p className="text-sm text-green-100 mb-1">Order Number</p>
              <p className="text-2xl font-bold">{orderData.id}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Details */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-12 no-print">
              <button 
                onClick={handlePrint}
                className="btn btn-secondary flex items-center gap-2"
              >
                <PrinterIcon className="w-5 h-5" />
                Print Order
              </button>
              <button 
                onClick={handleShare}
                className="btn btn-secondary flex items-center gap-2"
              >
                <ShareIcon className="w-5 h-5" />
                Share
              </button>
              <Link to="/orders" className="btn btn-primary">
                View All Orders
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-2 space-y-8">
                {/* Order Status */}
                <div className="card p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Status</h2>
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Order Confirmed</h3>
                      <p className="text-gray-600">Your order has been received and is being processed</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <TruckIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Estimated Delivery</h3>
                      <p className="text-gray-600">{orderData.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="card p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Items</h2>
                  <div className="space-y-4">
                    {orderData.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="card p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900">{orderData.shippingAddress.name}</p>
                    <p className="text-gray-600">{orderData.shippingAddress.street}</p>
                    <p className="text-gray-600">
                      {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zip}
                    </p>
                    <p className="text-gray-600">{orderData.shippingAddress.country}</p>
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="space-y-8">
                {/* Price Breakdown */}
                <div className="card p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${orderData.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">${orderData.shipping}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${orderData.tax}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-lg font-bold text-gray-900">${orderData.total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="card p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
                    <div>
                      <p className="font-medium text-gray-900">{orderData.paymentMethod.type}</p>
                      <p className="text-gray-600 text-sm">****{orderData.paymentMethod.last4}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="card p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">support@ecommerce.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">1-800-123-4567</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              What Happens Next?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Order Processing</h3>
                <p className="text-gray-600">
                  We'll prepare your items and get them ready for shipment within 1-2 business days.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Shipping Notification</h3>
                <p className="text-gray-600">
                  You'll receive an email with tracking information once your order ships.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Delivery</h3>
                <p className="text-gray-600">
                  Your order will arrive by {orderData.estimatedDelivery}. Enjoy your purchase!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Shopping */}
      <section className="section-padding bg-gray-50 no-print">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Continue Shopping
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover more amazing products in our collection
          </p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OrderConfirmation;
