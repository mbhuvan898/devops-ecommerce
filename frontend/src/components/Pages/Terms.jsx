// src/components/Pages/Terms.jsx
import React from 'react';
import MetaData from '../Layouts/MetaData';
import DescriptionIcon from '@mui/icons-material/Description';

const Terms = () => {
  return (
    <>
      <MetaData title="Terms & Conditions - Best2Buy" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-blue to-blue-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <DescriptionIcon sx={{ fontSize: 60 }} className="mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-xl text-blue-100">
              Last Updated: November 2, 2024
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                By accessing and using Best2Buy's website and services, you accept and agree to be bound 
                by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Use of Services</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You agree to use our services only for lawful purposes. You must not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Use the website in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to any part of the website</li>
                <li>Interfere with or disrupt the website or servers</li>
                <li>Use automated systems to access the website without permission</li>
                <li>Impersonate another person or entity</li>
                <li>Transmit viruses, malware, or other harmful code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Account Registration</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To access certain features, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information</li>
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Product Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We strive to provide accurate product descriptions, pricing, and availability. However:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Product images are for illustration purposes and may not exactly match the product</li>
                <li>We do not guarantee that product descriptions are error-free</li>
                <li>Prices are subject to change without notice</li>
                <li>We reserve the right to limit quantities and discontinue products</li>
                <li>We are not liable for typographical or photographic errors</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Orders and Payment</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you place an order:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Your order is an offer to purchase products from us</li>
                <li>We reserve the right to accept or reject any order</li>
                <li>Payment must be made at the time of order</li>
                <li>We accept various payment methods as indicated on our website</li>
                <li>All prices are in USD and include applicable taxes unless stated otherwise</li>
                <li>You are responsible for providing accurate billing and shipping information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Shipping and Delivery</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We aim to deliver products within the estimated timeframe, but:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Delivery times are estimates and not guaranteed</li>
                <li>We are not liable for delays caused by circumstances beyond our control</li>
                <li>Risk of loss passes to you upon delivery</li>
                <li>You must inspect products upon delivery and report any issues immediately</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Returns and Refunds</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our return and refund policy is detailed in our Return Policy page. Key points:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>You have 30 days from delivery to return most products</li>
                <li>Products must be unused and in original packaging</li>
                <li>Certain products are not eligible for return</li>
                <li>Refunds are processed within 7-10 business days after receiving the return</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                All content on this website, including text, graphics, logos, images, and software, is 
                the property of Best2Buy and is protected by copyright and trademark laws. You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Copy, reproduce, or distribute our content without permission</li>
                <li>Use our trademarks or branding without authorization</li>
                <li>Create derivative works from our content</li>
                <li>Remove copyright or proprietary notices</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. User Content</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you submit reviews, comments, or other content:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>You grant us a non-exclusive license to use, display, and distribute your content</li>
                <li>You represent that you have the right to submit the content</li>
                <li>You agree not to submit inappropriate, offensive, or illegal content</li>
                <li>We reserve the right to remove any content at our discretion</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>Our total liability shall not exceed the amount paid for the product</li>
                <li>We do not guarantee uninterrupted or error-free service</li>
                <li>We are not responsible for third-party websites or services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Indemnification</h2>
              <p className="text-gray-600 leading-relaxed">
                You agree to indemnify and hold Best2Buy harmless from any claims, damages, losses, or 
                expenses arising from your use of our services or violation of these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to terminate or suspend your account and access to our services at 
                any time, without notice, for violation of these terms or for any other reason.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These terms are governed by the laws of the State of New York, United States, without 
                regard to conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">14. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting. Your continued use of our services constitutes acceptance of 
                the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">15. Contact Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> legal@best2buy.com</p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> 1800-123-4567</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Commerce Street, New York, NY 10001</p>
              </div>
            </section>

          </div>
        </div>
      </main>
    </>
  );
};

export default Terms;