// src/components/Pages/HelpCenter.jsx
import React, { useState } from 'react';
import MetaData from '../Layouts/MetaData';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    {
      title: 'Orders & Tracking',
      icon: <ShoppingBagIcon sx={{ fontSize: 40 }} />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Shipping & Delivery',
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Payments',
      icon: <CreditCardIcon sx={{ fontSize: 40 }} />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Returns & Refunds',
      icon: <AssignmentReturnIcon sx={{ fontSize: 40 }} />,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by going to "My Orders" section in your account. Click on the order you want to track and you will see the real-time status of your delivery.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, net banking, UPI, and cash on delivery (COD) for eligible orders.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business days delivery. Delivery times may vary based on your location.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be unused and in original packaging. Some items like personal care products may not be eligible for return.'
    },
    {
      question: 'How do I cancel my order?',
      answer: 'You can cancel your order from the "My Orders" section if it hasn\'t been shipped yet. Once shipped, you can refuse the delivery or initiate a return after receiving the product.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we only ship within the United States. We are working on expanding our services to international locations soon.'
    }
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
      <MetaData title="Help Center" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-blue to-blue-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <HelpOutlineIcon sx={{ fontSize: 60 }} className="mb-4" />
            <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
            <p className="text-lg mb-8 text-blue-100">Search for answers or browse our help topics</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                className="w-full px-6 py-4 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
              <SearchIcon
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                sx={{ fontSize: 28 }}
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          
          {/* Help Categories */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Browse by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all cursor-pointer text-center"
                >
                  <div className={`w-20 h-20 ${cat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800">{cat.title}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ExpandLessIcon className="text-primary-blue" />
                    ) : (
                      <ExpandMoreIcon className="text-gray-400" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Still need help?</h2>
            <p className="text-gray-600 mb-6">Our support team is available 24/7 to assist you</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue transition-all font-medium"
              >
                Contact Support
              </a>
              <a
                href="tel:1800-123-4567"
                className="px-8 py-3 bg-white text-primary-blue border-2 border-primary-blue rounded-md hover:bg-primary-blue hover:text-white transition-all font-medium"
              >
                Call: 1800-123-4567
              </a>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};

export default HelpCenter;