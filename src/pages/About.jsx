import { useState } from 'react';
import { 
  CheckCircleIcon, 
  HeartIcon, 
  ShieldCheckIcon, 
  TruckIcon,
  UserGroupIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');

  const features = [
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: 'Quality Guarantee',
      description: 'We ensure every product meets our high-quality standards before reaching you.'
    },
    {
      icon: <TruckIcon className="w-8 h-8" />,
      title: 'Fast Shipping',
      description: 'Free shipping on orders over $50 with express delivery options available.'
    },
    {
      icon: <HeartIcon className="w-8 h-8" />,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We\'re here to help 24/7.'
    },
    {
      icon: <GlobeAltIcon className="w-8 h-8" />,
      title: 'Global Reach',
      description: 'Serving customers worldwide with localized experiences.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Passionate about creating exceptional shopping experiences.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      bio: 'Crafting beautiful and functional user experiences.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Customer Success',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      bio: 'Ensuring every customer has an amazing experience.'
    }
  ];

  const stats = [
    { label: 'Happy Customers', value: '50K+' },
    { label: 'Products Sold', value: '1M+' },
    { label: 'Countries Served', value: '25+' },
    { label: 'Years of Excellence', value: '10+' }
  ];

  const tabs = [
    { id: 'story', label: 'Our Story' },
    { id: 'mission', label: 'Mission & Values' },
    { id: 'team', label: 'Meet the Team' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white section-padding">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-gradient">Our Story</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              We're passionate about bringing you the best products with exceptional service, 
              creating memorable shopping experiences that exceed your expectations.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="text-3xl md:text-4xl font-bold text-yellow-300">{stat.value}</div>
                  <div className="text-blue-200 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing exceptional value through quality products, 
              outstanding service, and innovative solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card card-hover p-8 text-center animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Tabs Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-xl p-2 shadow-lg border border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'story' && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">
                      Our Journey Began in 2014
                    </h3>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                      <p>
                        What started as a small passion project has grown into a thriving 
                        e-commerce platform serving customers worldwide. Our founder, Sarah Johnson, 
                        recognized the need for a more personalized and reliable online shopping experience.
                      </p>
                      <p>
                        From our humble beginnings in a garage to our current state-of-the-art 
                        fulfillment centers, we've never lost sight of our core mission: 
                        putting customers first and delivering exceptional value.
                      </p>
                      <p>
                        Today, we're proud to serve over 50,000 happy customers across 25 countries, 
                        with a team of dedicated professionals who share our passion for excellence.
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1126&q=80"
                      alt="Our story"
                      className="rounded-2xl shadow-2xl"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-lg">
                      <div className="text-2xl font-bold">10+</div>
                      <div className="text-sm">Years Strong</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mission' && (
              <div className="animate-fade-in">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    Our Mission & Values
                  </h3>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    We believe in creating meaningful connections between people and products, 
                    fostering a community built on trust, quality, and innovation.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="card p-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircleIcon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Quality First</h4>
                    <p className="text-gray-600">
                      We never compromise on quality. Every product is carefully selected 
                      and tested to meet our high standards.
                    </p>
                  </div>
                  
                  <div className="card p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <HeartIcon className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Customer Love</h4>
                    <p className="text-gray-600">
                      Our customers are at the heart of everything we do. Their satisfaction 
                      drives our continuous improvement.
                    </p>
                  </div>
                  
                  <div className="card p-8 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <UserGroupIcon className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Community</h4>
                    <p className="text-gray-600">
                      We're building more than a business – we're creating a community 
                      of like-minded individuals who value quality and authenticity.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="animate-fade-in">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    Meet Our Amazing Team
                  </h3>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Behind every great company are great people. Meet the passionate individuals 
                    who make our mission possible.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {team.map((member, index) => (
                    <div key={index} className="card card-hover p-8 text-center">
                      <div className="relative mb-6">
                        <img 
                          src={member.image}
                          alt={member.name}
                          className="w-24 h-24 rounded-full mx-auto object-cover"
                          loading="lazy"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <CheckCircleIcon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {member.name}
                      </h4>
                      <p className="text-blue-600 font-medium mb-4">
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover amazing products and become part of our growing family of satisfied customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100">
              Start Shopping
            </button>
            <button className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-blue-600">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
