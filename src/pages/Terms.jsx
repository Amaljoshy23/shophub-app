import { useState } from 'react';
import { 
  DocumentTextIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const Terms = () => {
  const [activeSection, setActiveSection] = useState('terms');

  const sections = [
    { id: 'terms', label: 'Terms of Service', icon: <DocumentTextIcon className="w-5 h-5" /> },
    { id: 'privacy', label: 'Privacy Policy', icon: <ShieldCheckIcon className="w-5 h-5" /> },
    { id: 'returns', label: 'Return Policy', icon: <InformationCircleIcon className="w-5 h-5" /> },
    { id: 'shipping', label: 'Shipping Policy', icon: <ExclamationTriangleIcon className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Terms & <span className="text-yellow-300">Conditions</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Please read these terms carefully before using our services. 
              Your use of our website constitutes acceptance of these terms.
            </p>
            <div className="text-sm text-blue-200">
              Last updated: January 1, 2024
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container-custom">
          <div className="flex overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                  activeSection === section.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {section.icon}
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {activeSection === 'terms' && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h2>
                
                <div className="space-y-8">
                  <div className="card p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h3>
                    <p className="text-gray-600 leading-relaxed">
                      By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                  </div>

                  <div className="card p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Use License</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>This is the grant of a license, not a transfer of title</li>
                      <li>You may not modify or copy the materials</li>
                      <li>You may not use the materials for commercial purposes</li>
                      <li>You may not attempt to reverse engineer any software</li>
                    </ul>
                  </div>

                  <div className="card p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Disclaimer</h3>
                    <p className="text-gray-600 leading-relaxed">
                      The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including implied warranties or conditions of merchantability.
                    </p>
                  </div>

                  <div className="card p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Limitations</h3>
                    <p className="text-gray-600 leading-relaxed">
                      In no event shall our company or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h2>
                
                <div className="space-y-8">
                  <div className="card p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Personal information (name, email, phone number)</li>
                      <li>Payment information (processed securely by third parties)</li>
                      <li>Shipping and billing addresses</li>
                      <li>Purchase history and preferences</li>
                    </ul>
                  </div>

                  <div className="card p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Process and fulfill your orders</li>
                      <li>Communicate with you about your account or orders</li>
                      <li>Improve our products and services</li>
                      <li>Send you marketing communications (with your consent)</li>
                    </ul>
                  </div>

                  <div className="card p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'returns' && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Return Policy</h2>
                
                <div className="space-y-8">
                  <div className="card p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">30-Day Return Window</h3>
                    <p className="text-gray-600 leading-relaxed">
                      You have 30 days from the date of delivery to return most items for a full refund or exchange.
                    </p>
                  </div>

                  <div className="card p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Return Conditions</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Items must be in original condition with tags attached</li>
                      <li>Items must be unworn and unwashed</li>
                      <li>Original packaging must be included</li>
                      <li>Proof of purchase required</li>
                    </ul>
                  </div>

                  <div className="card p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Non-Returnable Items</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Personalized or customized items</li>
                      <li>Perishable goods</li>
                      <li>Digital products</li>
                      <li>Items damaged by misuse</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'shipping' && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Shipping Policy</h2>
                
                <div className="space-y-8">
                  <div className="card p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Processing Time</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Orders are typically processed within 1-2 business days. You'll receive a tracking number once your order ships.
                    </p>
                  </div>

                  <div className="card p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Shipping Options</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Standard Shipping: 5-7 business days</li>
                      <li>Express Shipping: 2-3 business days</li>
                      <li>Overnight Shipping: 1 business day</li>
                      <li>International Shipping: 7-14 business days</li>
                    </ul>
                  </div>

                  <div className="card p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Free Shipping</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Free standard shipping on orders over $50 within the continental United States.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Questions About Our Policies?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              If you have any questions about these terms and conditions, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg">
                Contact Support
              </button>
              <button className="btn btn-secondary btn-lg">
                View FAQ
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
