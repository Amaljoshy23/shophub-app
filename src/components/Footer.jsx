import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  HeartIcon,
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubscribing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Successfully subscribed to newsletter!');
    setEmail('');
    setIsSubscribing(false);
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const customerService = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Shipping Policy', href: '/terms' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: '📘' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'LinkedIn', href: '#', icon: '💼' }
  ];

  const features = [
    { icon: <ShieldCheckIcon className="w-5 h-5" />, text: 'Secure Shopping' },
    { icon: <TruckIcon className="w-5 h-5" />, text: 'Free Shipping' },
    { icon: <CreditCardIcon className="w-5 h-5" />, text: 'Easy Returns' },
    { icon: <HeartIcon className="w-5 h-5" />, text: '24/7 Support' }
  ];

  return (
    <footer className="bg-gray-900 text-white mt-16">
      {/* Features Bar */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-center md:text-left">
                <div className="text-blue-400 flex-shrink-0">
                  {feature.icon}
                </div>
                <span className="text-sm font-medium text-gray-300">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold text-gradient">ShopHub</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted e-commerce destination for quality products, exceptional service, 
              and unbeatable prices. Shop with confidence.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <EnvelopeIcon className="w-4 h-4" />
                <span className="text-sm">support@shophub.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <PhoneIcon className="w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPinIcon className="w-4 h-4" />
                <span className="text-sm">123 Business Ave, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Customer Service</h4>
            <ul className="space-y-3">
              {customerService.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Stay Updated</h4>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Subscribe to our newsletter for exclusive deals, new arrivals, and special offers.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  disabled={isSubscribing}
                />
                <EnvelopeIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <button
                type="submit"
                disabled={isSubscribing}
                className="w-full btn btn-primary"
              >
                {isSubscribing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 spinner"></div>
                    Subscribing...
                  </div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-300 mb-3">Follow Us</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                    title={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>&copy; 2025 ShopHub. All rights reserved.</p>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link to="/terms" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <span className="flex items-center gap-1">
                Made with <HeartIcon className="w-4 h-4 text-red-500" /> by ShopHub Team
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
