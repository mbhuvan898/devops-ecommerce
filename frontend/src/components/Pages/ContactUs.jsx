// src/components/Pages/ContactUs.jsx
import React, { useState } from 'react';
import MetaData from '../Layouts/MetaData';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <MetaData title="Contact Us - Best2Buy" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-blue to-blue-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ContactSupportIcon sx={{ fontSize: 60 }} className="mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-blue-100">
              We're here to help and answer any question you might have
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Contact Cards */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 text-primary-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <EmailIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Email Us</h3>
                    <a href="mailto:support@best2buy.com" className="text-primary-blue hover:underline">
                      support@best2buy.com
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <PhoneIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Call Us</h3>
                    <a href="tel:1800-123-4567" className="text-primary-blue hover:underline">
                      1800-123-4567
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      Mon-Sun: 9:00 AM - 9:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <LocationOnIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Visit Us</h3>
                    <p className="text-gray-600 text-sm">
                      123 Commerce Street,<br />
                      New York, NY 10001,<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <AccessTimeIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Business Hours</h3>
                    <p className="text-sm text-gray-600">
                      Monday - Friday: 9:00 AM - 8:00 PM<br />
                      Saturday: 10:00 AM - 6:00 PM<br />
                      Sunday: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Quick Help</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/help" className="text-primary-blue hover:underline text-sm">
                      → Visit Help Center
                    </a>
                  </li>
                  <li>
                    <a href="/track-order" className="text-primary-blue hover:underline text-sm">
                      → Track Your Order
                    </a>
                  </li>
                  <li>
                    <a href="/return-policy" className="text-primary-blue hover:underline text-sm">
                      → Return Policy
                    </a>
                  </li>
                  <li>
                    <a href="/shipping" className="text-primary-blue hover:underline text-sm">
                      → Shipping Information
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        placeholder="+1 234-567-8900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      >
                        <option value="">Select a subject</option>
                        <option value="order">Order Related</option>
                        <option value="product">Product Inquiry</option>
                        <option value="return">Return/Refund</option>
                        <option value="technical">Technical Issue</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <SendIcon sx={{ fontSize: 20 }} />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

          </div>

          {/* Map Section (Optional) */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-4 overflow-hidden">
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map Integration (Google Maps / OpenStreetMap)</p>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};

export default ContactUs;