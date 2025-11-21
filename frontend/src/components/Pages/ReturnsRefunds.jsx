// src/components/Pages/ReturnsRefunds.jsx
import React from 'react';
import MetaData from '../Layouts/MetaData';
import CachedIcon from '@mui/icons-material/Cached';

const ReturnsRefunds = () => {
  return (
    <>
      <MetaData title="Returns & Refunds Process - Best2Buy" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-blue to-blue-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <CachedIcon sx={{ fontSize: 60 }} className="mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Returns & Refunds Process</h1>
            <p className="text-xl text-blue-100">
              A simplified, step-by-step guide to get your money back quickly.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            
            {/* Return process step-by-step */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Return Process Step-by-Step</h2>
              <ul className="list-decimal pl-6 space-y-4 text-gray-600">
                <li>**Step 1: Initiate Online:** Log in, select the order from "Order History," and click "Start Return."</li>
                <li>**Step 2: Receive Label:** Print your prepaid shipping label and RMA number sent to your email.</li>
                <li>**Step 3: Pack & Ship:** Carefully package the item(s) using the original box if possible. Affix the label and drop off at the designated carrier location.</li>
                <li>**Step 4: Inspection & Refund:** We receive and inspect the item. Once approved, your refund is processed.</li>
              </ul>
            </section>

            {/* Refund methods (original payment, store credit) */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Refund Methods</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You can choose to receive your refund via two options:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>**Original Payment Method:** Refund to your credit card, PayPal, etc. (Default option).</li>
                <li>**Best2Buy Store Credit:** Receive the refund as store credit, often processed faster and with a small bonus credit.</li>
              </ul>
            </section>

            {/* Processing time (7-10 days) */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Refund Processing Timeline</h2>
              <p className="text-gray-600 leading-relaxed">
                From the date we receive your return, it takes **7-10 business days** for your return to be processed and the refund to be issued. Note that banks may take an additional 3-5 days to post the credit to your account.
              </p>
            </section>
            
            {/* Conditions for returns */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Conditions for a Successful Return</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To be eligible for a return, the item must meet the following criteria:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Returned within **30 days** of delivery.</li>
                <li>In its original, resellable condition.</li>
                <li>All tags, manuals, and accessories must be included.</li>
                <li>Not a final sale or non-returnable item (see full policy).</li>
              </ul>
            </section>

            {/* How to pack items for return */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Best Practices for Packing</h2>
              <p className="text-gray-600 leading-relaxed">
                To ensure your item arrives safely and your refund isn't delayed, please: wrap fragile items securely, fill any empty spaces in the box with padding (like newspaper or bubble wrap), and seal the box with strong packing tape.
              </p>
            </section>

            {/* FAQs about returns CTA */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center mt-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Got a Question?</h2>
              <p className="text-gray-600 mb-6">
                Our Returns FAQ covers common questions about eligibility, partial refunds, and more.
              </p>
              <a
                href="/faqs/returns"
                className="inline-block px-8 py-3 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue transition-all font-semibold"
              >
                Read Returns FAQs
              </a>
            </div>

          </div>
        </div>
      </main>
    </>
  );
};

export default ReturnsRefunds;