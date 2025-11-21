// src/components/Pages/ShippingInfo.jsx
import React from 'react';
import MetaData from '../Layouts/MetaData';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const ShippingInfo = () => {
  return (
    <>
      <MetaData title="Shipping Information - Best2Buy" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-blue to-blue-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <LocalShippingIcon sx={{ fontSize: 60 }} className="mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipping and Delivery</h1>
            <p className="text-xl text-blue-100">
              Find out about our reliable delivery options and timelines.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            
            {/* Shipping methods (Standard, Express) */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Shipping Methods</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-blue-200 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-primary-blue mb-2">Standard Shipping</h3>
                  <p className="text-gray-600">Our economical option, typically delivering within **5-7 business days** after processing.</p>
                </div>
                <div className="border border-blue-200 p-4 rounded-lg bg-blue-50">
                  <h3 className="text-xl font-semibold text-primary-blue mb-2">Express Shipping</h3>
                  <p className="text-gray-600">The fastest option, ensuring delivery within **1-3 business days** after processing.</p>
                </div>
              </div>
            </section>

            {/* Delivery timeline */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Processing and Delivery Time</h2>
              <p className="text-gray-600 leading-relaxed">
                Orders are usually processed within **1-2 business days** before they are shipped. The total delivery time is: **Processing Time + Shipping Time**.
              </p>
            </section>

            {/* Shipping charges */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Shipping Charges</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We offer **FREE Standard Shipping** on all orders over $50. Shipping fees for other orders are calculated at checkout based on your location and chosen method.
              </p>
            </section>
            
            {/* International shipping */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">International Shipping</h2>
              <p className="text-gray-600 leading-relaxed">
                We currently ship to over 50 countries. International rates and timelines are calculated at checkout. Please note that customs duties and taxes are the responsibility of the customer.
              </p>
            </section>

            {/* Order tracking */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Tracking</h2>
              <p className="text-gray-600 leading-relaxed">
                Once your order ships, you will receive an email confirmation containing your **tracking number** and a link to the carrier's website to monitor your shipment's progress.
              </p>
            </section>

            {/* Shipping restrictions */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Shipping Restrictions</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>We cannot ship to P.O. boxes for Express orders.</li>
                <li>Certain items may be restricted from international shipping due to size or contents (e.g., aerosols).</li>
              </ul>
            </section>

            {/* FAQs CTA */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center mt-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Need More Info?</h2>
              <p className="text-gray-600 mb-6">
                Check our Frequently Asked Questions for detailed answers about delivery.
              </p>
              <a
                href="/faqs"
                className="inline-block px-8 py-3 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue transition-all font-semibold"
              >
                View Shipping FAQs
              </a>
            </div>

          </div>
        </div>
      </main>
    </>
  );
};

export default ShippingInfo;