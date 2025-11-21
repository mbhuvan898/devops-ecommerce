// src/components/Pages/SecurityPage.jsx
import React from 'react';
import MetaData from '../Layouts/MetaData';
import SecurityIcon from '@mui/icons-material/Security';

const SecurityPage = () => {
  return (
    <>
      <MetaData title="Security & Privacy - Best2Buy" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-blue to-blue-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SecurityIcon sx={{ fontSize: 60 }} className="mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Commitment to Security</h1>
            <p className="text-xl text-blue-100">
              Protecting your data and ensuring a secure shopping experience is our top priority.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            
            {/* Our security measures */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Robust Security Measures</h2>
              <p className="text-gray-600 leading-relaxed">
                We employ a multi-layered approach to security, including firewalls, intrusion detection systems, and regular security audits to safeguard your information against unauthorized access, disclosure, or destruction.
              </p>
            </section>

            {/* SSL encryption */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Full SSL/TLS Encryption</h2>
              <p className="text-gray-600 leading-relaxed">
                Every connection to our website is protected by **industry-standard SSL/TLS encryption**. This ensures that all data transferred between your browser and our servers remains private and secure.
              </p>
            </section>

            {/* Payment security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Security (PCI DSS Compliant)</h2>
              <p className="text-gray-600 leading-relaxed">
                Your payment details are handled by **PCI DSS compliant** third-party payment processors. We **do not store** sensitive credit card information on our servers, ensuring the highest level of payment protection.
              </p>
            </section>

            {/* Account protection tips */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Tips for Account Protection</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You play a vital role in securing your account. We recommend:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Using a **strong, unique password** for Best2Buy.</li>
                <li>Logging out after each session, especially on public devices.</li>
                <li>Being vigilant against phishing emails or suspicious requests.</li>
              </ul>
            </section>

            {/* How we protect your data */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Protection and Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                We handle your personal data in strict adherence to our Privacy Policy. Data is encrypted both in transit and at rest, and access is restricted to authorized personnel only on a need-to-know basis.
              </p>
            </section>

            {/* Reporting security issues */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Reporting a Security Issue</h2>
              <p className="text-gray-600 leading-relaxed">
                If you believe you have discovered a vulnerability on our site, please report it immediately to our dedicated security team.
              </p>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2"><strong>Security Contact Email:</strong> security@best2buy.com</p>
              </div>
            </section>

            {/* Two-factor authentication */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Two-Factor Authentication (2FA)</h2>
              <p className="text-gray-600 leading-relaxed">
                We strongly encourage all users to enable **Two-Factor Authentication** in your account settings for an extra layer of protection against unauthorized access.
              </p>
            </section>

          </div>
        </div>
      </main>
    </>
  );
};

export default SecurityPage;