// src/components/Pages/PrivacyPolicy.jsx
import React from 'react';
import MetaData from '../Layouts/MetaData';
import SecurityIcon from '@mui/icons-material/Security';

const PrivacyPolicy = () => {
  return (
    <>
      <MetaData title="Privacy Policy - Best2Buy" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-blue to-blue-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SecurityIcon sx={{ fontSize: 60 }} className="mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100">
              Last Updated: November 2, 2024
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Welcome to Best2Buy. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit 
                our website and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Information We Collect</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may collect, use, store and transfer different kinds of personal data about you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Identity Data:</strong> First name, last name, username, date of birth</li>
                <li><strong>Contact Data:</strong> Email address, telephone numbers, billing and delivery addresses</li>
                <li><strong>Financial Data:</strong> Bank account and payment card details</li>
                <li><strong>Transaction Data:</strong> Details about payments and products purchased</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
                <li><strong>Profile Data:</strong> Username, purchases, preferences, feedback</li>
                <li><strong>Usage Data:</strong> Information about how you use our website and services</li>
                <li><strong>Marketing Data:</strong> Your preferences for receiving marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use your personal data for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>To process and deliver your orders</li>
                <li>To manage your account and provide customer support</li>
                <li>To send you important information about your orders and account</li>
                <li>To improve our website and services</li>
                <li>To send you marketing communications (with your consent)</li>
                <li>To detect and prevent fraud</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Data Security</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We have implemented appropriate security measures to prevent your personal data from being 
                accidentally lost, used, or accessed in an unauthorized way. We use industry-standard 
                encryption technologies to protect your data during transmission and storage.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Payment information is encrypted and processed through secure payment gateways. We do not 
                store complete credit card information on our servers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Sharing Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may share your personal data with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Service providers who help us operate our business</li>
                <li>Payment processors for transaction processing</li>
                <li>Delivery partners for order fulfillment</li>
                <li>Analytics providers to improve our services</li>
                <li>Legal authorities when required by law</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                We ensure all third parties respect the security of your data and treat it in accordance 
                with applicable laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Under data protection laws, you have rights including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate personal data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Right to Restrict Processing:</strong> Request restriction of processing your data</li>
                <li><strong>Right to Data Portability:</strong> Transfer your data to another service</li>
                <li><strong>Right to Object:</strong> Object to processing of your data</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to improve your browsing experience, 
                analyze site traffic, and personalize content. You can control cookies through your 
                browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Data Retention</h2>
              <p className="text-gray-600 leading-relaxed">
                We will only retain your personal data for as long as necessary to fulfill the purposes 
                for which it was collected, including legal, accounting, or reporting requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Our services are not intended for children under 18 years of age. We do not knowingly 
                collect personal information from children under 18.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes 
                by posting the new policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about this privacy policy or our privacy practices, please contact us:
              </p>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@best2buy.com</p>
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

export default PrivacyPolicy;