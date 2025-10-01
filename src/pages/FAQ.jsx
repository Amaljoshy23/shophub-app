import { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ShoppingBagIcon,
  TruckIcon,
  CreditCardIcon,
  UserIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState(new Set());

  const categories = [
    { id: 'all', label: 'All Questions', icon: <QuestionMarkCircleIcon className="w-5 h-5" /> },
    { id: 'orders', label: 'Orders & Shipping', icon: <TruckIcon className="w-5 h-5" /> },
    { id: 'payments', label: 'Payments & Billing', icon: <CreditCardIcon className="w-5 h-5" /> },
    { id: 'products', label: 'Products & Returns', icon: <ShoppingBagIcon className="w-5 h-5" /> },
    { id: 'account', label: 'Account & Profile', icon: <UserIcon className="w-5 h-5" /> },
    { id: 'security', label: 'Security & Privacy', icon: <ShieldCheckIcon className="w-5 h-5" /> }
  ];

  const faqData = [
    {
      id: 1,
      category: 'orders',
      question: 'How can I track my order?',
      answer: 'You can track your order in several ways: 1) Log into your account and go to "My Orders" section, 2) Use the tracking number sent to your email, 3) Click the tracking link in your order confirmation email. You\'ll receive real-time updates on your order status, from processing to delivery.',
      tags: ['tracking', 'order status', 'delivery']
    },
    {
      id: 2,
      category: 'orders',
      question: 'How long does shipping take?',
      answer: 'Shipping times vary by location and shipping method: Standard shipping (5-7 business days), Express shipping (2-3 business days), Overnight shipping (1 business day). International orders typically take 7-14 business days. Processing time is 1-2 business days before shipping.',
      tags: ['shipping time', 'delivery', 'international']
    },
    {
      id: 3,
      category: 'orders',
      question: 'Can I change or cancel my order?',
      answer: 'Orders can be modified or cancelled within 1 hour of placement while they\'re still in "Processing" status. After this window, orders enter fulfillment and cannot be changed. Contact our support team immediately if you need to make changes.',
      tags: ['cancel order', 'modify order', 'order changes']
    },
    {
      id: 4,
      category: 'orders',
      question: 'Do you offer international shipping?',
      answer: 'Yes! We ship to over 25 countries worldwide. International shipping costs are calculated at checkout based on destination and package weight. Please note that customs duties and taxes may apply and are the responsibility of the recipient.',
      tags: ['international shipping', 'worldwide', 'customs']
    },
    {
      id: 5,
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All payments are processed securely using industry-standard encryption.',
      tags: ['payment methods', 'credit cards', 'paypal', 'security']
    },
    {
      id: 6,
      category: 'payments',
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use SSL encryption and comply with PCI DSS standards to protect your payment information. We never store your complete credit card details on our servers. All transactions are processed through secure payment gateways.',
      tags: ['security', 'ssl', 'pci compliance', 'encryption']
    },
    {
      id: 7,
      category: 'payments',
      question: 'Can I get a refund?',
      answer: 'Yes, refunds are processed according to our return policy. Once we receive and inspect your returned item, refunds are typically processed within 5-7 business days to your original payment method. Digital products and personalized items may have different refund policies.',
      tags: ['refund', 'return policy', 'money back']
    },
    {
      id: 8,
      category: 'products',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some exclusions apply (personalized items, perishables, digital products). Return shipping is free for defective items, otherwise customer pays return shipping.',
      tags: ['return policy', '30 days', 'original condition']
    },
    {
      id: 9,
      category: 'products',
      question: 'How do I return an item?',
      answer: 'To return an item: 1) Log into your account and go to "My Orders", 2) Select the order and click "Return Item", 3) Choose the reason for return, 4) Print the prepaid return label, 5) Package the item securely and attach the label, 6) Drop off at any authorized shipping location.',
      tags: ['return process', 'return label', 'how to return']
    },
    {
      id: 10,
      category: 'products',
      question: 'Are your products authentic?',
      answer: 'Yes, all our products are 100% authentic. We work directly with authorized distributors and brand partners. Every product comes with a guarantee of authenticity, and we have strict quality control measures in place.',
      tags: ['authentic', 'genuine', 'quality assurance']
    },
    {
      id: 11,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Creating an account is easy! Click "Sign Up" in the top right corner, enter your email and create a password, verify your email address, and you\'re ready to shop! Having an account allows you to track orders, save favorites, and checkout faster.',
      tags: ['create account', 'sign up', 'registration']
    },
    {
      id: 12,
      category: 'account',
      question: 'I forgot my password. How do I reset it?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, check your email for a reset link, click the link and create a new password. If you don\'t receive the email within 10 minutes, check your spam folder or contact support.',
      tags: ['forgot password', 'reset password', 'login issues']
    },
    {
      id: 13,
      category: 'account',
      question: 'How do I update my account information?',
      answer: 'Log into your account, go to "Account Settings" or "Profile", update your information (name, email, phone, addresses), and click "Save Changes". You may need to verify your email if you change it.',
      tags: ['update account', 'profile settings', 'personal information']
    },
    {
      id: 14,
      category: 'security',
      question: 'How do you protect my personal information?',
      answer: 'We take privacy seriously. We use SSL encryption, secure servers, and follow industry best practices. We never sell your personal information to third parties. Our privacy policy details exactly how we collect, use, and protect your data.',
      tags: ['privacy', 'data protection', 'personal information']
    },
    {
      id: 15,
      category: 'security',
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account at any time. Go to Account Settings > Privacy > Delete Account. Please note that this action is permanent and cannot be undone. You\'ll lose access to order history, saved items, and account benefits.',
      tags: ['delete account', 'account deletion', 'privacy']
    }
  ];

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const popularQuestions = faqData.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="text-yellow-300">Questions</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Find quick answers to common questions. Can't find what you're looking for? 
              Our support team is here to help!
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-xl border-0 shadow-lg focus:ring-2 focus:ring-yellow-300 focus:outline-none text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Questions
            </h2>
            <p className="text-xl text-gray-600">
              The most commonly asked questions by our customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularQuestions.map((item, index) => (
              <div 
                key={item.id} 
                className="card card-hover p-6 cursor-pointer animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <QuestionMarkCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <ChevronDownIcon 
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      openItems.has(item.id) ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">
                  {item.question}
                </h3>
                {openItems.has(item.id) && (
                  <p className="text-gray-600 text-sm leading-relaxed animate-fade-in">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeCategory === category.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.icon}
                      <span className="font-medium">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {activeCategory === 'all' ? 'All Questions' : 
                   categories.find(cat => cat.id === activeCategory)?.label}
                </h2>
                <p className="text-gray-600">
                  {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </div>

              {filteredFAQs.length === 0 ? (
                <div className="card p-12 text-center">
                  <QuestionMarkCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No questions found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or browse different categories.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('all');
                    }}
                    className="btn btn-primary"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFAQs.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="card animate-slide-up"
                      style={{animationDelay: `${index * 0.05}s`}}
                    >
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {item.question}
                        </h3>
                        <ChevronDownIcon 
                          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                            openItems.has(item.id) ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      
                      {openItems.has(item.id) && (
                        <div className="px-6 pb-6 animate-fade-in">
                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-gray-600 leading-relaxed mb-4">
                              {item.answer}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {item.tags.map((tag, tagIndex) => (
                                <span 
                                  key={tagIndex}
                                  className="badge badge-primary text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Still Need Help?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Can't find the answer you're looking for? Our friendly support team is here to help!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card card-hover p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-4">Get instant help</p>
                <button className="btn btn-primary btn-sm">Start Chat</button>
              </div>
              
              <div className="card card-hover p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QuestionMarkCircleIcon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact Form</h3>
                <p className="text-gray-600 text-sm mb-4">Send us a message</p>
                <button className="btn btn-success btn-sm">Contact Us</button>
              </div>
              
              <div className="card card-hover p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Help Center</h3>
                <p className="text-gray-600 text-sm mb-4">Browse guides</p>
                <button className="btn btn-secondary btn-sm">Visit Center</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
