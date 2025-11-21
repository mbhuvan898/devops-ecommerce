// src/components/User/PaymentMethods.jsx
import React, { useState } from 'react';
import MetaData from '../Layouts/MetaData';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from '@mui/icons-material/Add';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'Credit Card',
      cardNumber: '**** **** **** 4532',
      cardHolder: 'John Doe',
      expiryDate: '12/25',
      brand: 'Visa',
      isDefault: true
    },
    {
      id: 2,
      type: 'Debit Card',
      cardNumber: '**** **** **** 8901',
      cardHolder: 'John Doe',
      expiryDate: '08/26',
      brand: 'Mastercard',
      isDefault: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const getBrandColor = (brand) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return 'from-blue-600 to-blue-800';
      case 'mastercard':
        return 'from-red-600 to-orange-600';
      case 'amex':
        return 'from-green-600 to-teal-600';
      default:
        return 'from-gray-600 to-gray-800';
    }
  };

  return (
    <>
      <MetaData title="Payment Methods" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <PaymentIcon className="text-primary-blue" sx={{ fontSize: 32 }} />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Payment Methods</h1>
                <p className="text-sm text-gray-600">Manage your saved payment methods</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-6 py-2 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue transition-all"
            >
              <AddIcon sx={{ fontSize: 20 }} />
              Add Payment Method
            </button>
          </div>

          {/* Security Badge */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-center gap-3">
            <VerifiedUserIcon className="text-green-600" sx={{ fontSize: 28 }} />
            <div>
              <h3 className="font-semibold text-green-800">Your payments are secure</h3>
              <p className="text-sm text-green-700">
                We use industry-standard encryption to protect your payment information
              </p>
            </div>
          </div>

          {/* Payment Methods Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Card Design */}
                <div className={`bg-gradient-to-r ${getBrandColor(method.brand)} text-white p-6 rounded-t-lg`}>
                  <div className="flex justify-between items-start mb-8">
                    <CreditCardIcon sx={{ fontSize: 40 }} />
                    {method.isDefault && (
                      <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <StarIcon sx={{ fontSize: 16 }} />
                        <span className="text-xs font-semibold">Default</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="font-mono text-xl tracking-wider">
                      {method.cardNumber}
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-white/70 mb-1">Card Holder</p>
                        <p className="font-semibold uppercase text-sm">{method.cardHolder}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/70 mb-1">Expires</p>
                        <p className="font-semibold">{method.expiryDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      {method.brand}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {method.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {!method.isDefault && (
                      <button className="text-sm text-primary-blue hover:text-primary-darkBlue font-medium">
                        Set as Default
                      </button>
                    )}
                    <button className="text-red-600 hover:text-red-700">
                      <DeleteIcon sx={{ fontSize: 20 }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Payment Method Form (Modal) */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Add Payment Method</h2>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Holder Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Type
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue">
                      <option value="credit">Credit Card</option>
                      <option value="debit">Debit Card</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" id="setDefault" className="mr-2" />
                    <label htmlFor="setDefault" className="text-sm text-gray-700">
                      Set as default payment method
                    </label>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <VerifiedUserIcon className="text-blue-600 flex-shrink-0" sx={{ fontSize: 20 }} />
                      <p className="text-xs text-blue-800">
                        Your payment information is encrypted and secure. We never store your CVV.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue"
                    >
                      Add Payment Method
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Accepted Payment Methods */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Accepted Payment Methods</h3>
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 border-2 border-gray-200 rounded-lg">
                <span className="font-semibold text-blue-600">VISA</span>
              </div>
              <div className="px-4 py-2 border-2 border-gray-200 rounded-lg">
                <span className="font-semibold text-orange-600">Mastercard</span>
              </div>
              <div className="px-4 py-2 border-2 border-gray-200 rounded-lg">
                <span className="font-semibold text-blue-500">American Express</span>
              </div>
              <div className="px-4 py-2 border-2 border-gray-200 rounded-lg">
                <span className="font-semibold text-purple-600">UPI</span>
              </div>
              <div className="px-4 py-2 border-2 border-gray-200 rounded-lg">
                <span className="font-semibold text-green-600">Net Banking</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};

export default PaymentMethods;