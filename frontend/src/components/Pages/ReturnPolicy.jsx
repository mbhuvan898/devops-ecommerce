// src/components/Pages/ReturnPolicy.jsx
import React from 'react';
import MetaData from '../Layouts/MetaData';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';

const ReturnPolicy = () => {
  return (
    <>
      <MetaData title="Return Policy - Best2Buy" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-blue to-blue-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AssignmentReturnIcon sx={{ fontSize: 60 }} className="mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Return Policy</h1>
            <p className="text-xl text-blue-100">
              Easy and hassle-free returns for your peace of mind.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            
            {/* Return eligibility (30 days) */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Return Eligibility (30 Days)</h2>
              <p className="text-gray-600 leading-relaxed">
                You can return most items within <strong className="font-semibold">30 days</strong> of delivery for a full refund or exchange. Items must be unused, unwashed, and in the same condition that you received them, with all original tags and packaging intact. Proof of purchase is required.
              </p>
            </section>

            {/* How to initiate a return */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Initiate a Return</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To start a return, please follow these simple steps:
              </p>
              <ul className="list-decimal pl-6 space-y-2 text-gray-600">
                <li>Log into your Best2Buy account and go to your **Order History**.</li>
                <li>Select the order containing the item(s) you wish to return.</li>
                <li>Click the **"Start a Return"** button and follow the on-screen instructions.</li>
                <li>You will receive a Return Merchandise Authorization (RMA) number and a shipping label via email.</li>
              </ul>
            </section>

            {/* Refund process and timeline */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Refund Process and Timeline</h2>
              <p className="text-gray-600 leading-relaxed">
                Once your return is received and inspected, we will send you an email notification. Refunds are typically processed within **7-10 business days** and credited back to your original method of payment. Processing time can vary depending on your bank.
              </p>
            </section>
            
            {/* Non-returnable items */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Non-Returnable Items</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The following items cannot be returned:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Gift cards and downloadable software products.</li>
                <li>Perishable goods (e.g., food, flowers).</li>
                <li>Items marked as "Final Sale."</li>
                <li>Personalized or customized products.</li>
              </ul>
            </section>

            {/* Return shipping costs */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Return Shipping Costs</h2>
              <p className="text-gray-600 leading-relaxed">
                Return shipping is **free** for damaged or incorrect items. For returns due to a change of mind or wrong size ordered, a small fee may be deducted from your refund to cover return shipping.
              </p>
            </section>

            {/* Exchanges */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Exchanges</h2>
              <p className="text-gray-600 leading-relaxed">
                If you need to exchange an item, the fastest way is to return the unwanted item (following the return process) and make a separate purchase for the new item.
              </p>
            </section>

            {/* Contact for returns */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Assistance?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about your return, please contact our support team.
              </p>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> support@best2buy.com</p>
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

export default ReturnPolicy;