// src/components/Pages/AboutUs.jsx
import React from 'react';
import MetaData from '../Layouts/MetaData';
import InfoIcon from '@mui/icons-material/Info';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const AboutUs = () => {
  const values = [
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 40 }} />,
      title: 'Trust & Quality',
      description: 'We ensure every product meets our high quality standards'
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to your doorstep'
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description: 'Our team is always here to help you'
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      title: 'Best Prices',
      description: 'Competitive pricing on all products'
    }
  ];

  const stats = [
    { value: '10M+', label: 'Happy Customers' },
    { value: '50K+', label: 'Products' },
    { value: '100+', label: 'Cities' },
    { value: '99%', label: 'Satisfaction Rate' }
  ];

  return (
    <>
      <MetaData title="About Us - Best2Buy" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-blue to-blue-600 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <InfoIcon sx={{ fontSize: 60 }} className="mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Best2Buy</h1>
            <p className="text-xl text-blue-100">
              Your trusted partner for online shopping since 2015
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Best2Buy was founded in 2015 with a simple mission: to make online shopping accessible, 
                affordable, and enjoyable for everyone. What started as a small team with big dreams has 
                grown into one of the most trusted e-commerce platforms serving millions of customers.
              </p>
              <p>
                We believe that shopping should be more than just transactions. It's about finding the 
                perfect product that fits your needs, delivered with care and backed by exceptional 
                customer service. Every day, we work hard to bring you the best selection of products 
                at competitive prices.
              </p>
              <p>
                Our commitment to quality, authenticity, and customer satisfaction has helped us build 
                lasting relationships with our customers. We're not just a marketplace; we're a community 
                of shoppers who trust us to deliver on our promises.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-all"
                >
                  <div className="w-20 h-20 bg-blue-100 text-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary-blue to-blue-600 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To revolutionize the online shopping experience by providing a seamless platform 
                that connects customers with quality products at the best prices, backed by 
                exceptional customer service.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We strive to be more than just an e-commerce platform. We want to be your 
                trusted shopping companion, making every purchase decision easier and every 
                delivery a delightful experience.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-12 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Customer First, Always
              </h3>
              <p className="text-gray-600">
                Every decision we make is guided by what's best for our customers
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Our Journey</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Become part of our growing community of satisfied shoppers
            </p>
            <a
              href="/register"
              className="inline-block px-8 py-4 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue transition-all font-semibold text-lg"
            >
              Start Shopping Today
            </a>
          </div>
        </div>

      </main>
    </>
  );
};

export default AboutUs;