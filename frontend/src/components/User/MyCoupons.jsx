// src/components/User/MyCoupons.jsx
import React, { useState } from 'react';
import MetaData from '../Layouts/MetaData';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const MyCoupons = () => {
  const [activeCoupons] = useState([
    {
      id: 1,
      code: 'WELCOME20',
      discount: '20% OFF',
      description: 'Get 20% off on your first purchase',
      minOrder: 500,
      maxDiscount: 200,
      validUntil: 'Dec 31, 2024',
      isActive: true
    },
    {
      id: 2,
      code: 'FLAT500',
      discount: '₹500 OFF',
      description: 'Flat ₹500 off on orders above ₹2000',
      minOrder: 2000,
      maxDiscount: 500,
      validUntil: 'Nov 30, 2024',
      isActive: true
    },
    {
      id: 3,
      code: 'SAVE15',
      discount: '15% OFF',
      description: 'Save 15% on all electronics',
      minOrder: 1000,
      maxDiscount: 300,
      validUntil: 'Dec 15, 2024',
      isActive: true
    }
  ]);

  const [expiredCoupons] = useState([
    {
      id: 4,
      code: 'SUMMER25',
      discount: '25% OFF',
      description: 'Summer sale discount',
      minOrder: 800,
      maxDiscount: 400,
      validUntil: 'Oct 31, 2024',
      isActive: false
    },
    {
      id: 5,
      code: 'FIRST100',
      discount: '₹100 OFF',
      description: 'First time user discount',
      minOrder: 500,
      maxDiscount: 100,
      validUntil: 'Sep 30, 2024',
      isActive: false
    }
  ]);

  const [copiedCode, setCopiedCode] = useState(null);
  const [showExpired, setShowExpired] = useState(false);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CouponCard = ({ coupon }) => (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${
      !coupon.isActive ? 'opacity-60' : ''
    }`}>
      <div className="relative">
        {/* Discount Badge */}
        <div className={`${
          coupon.isActive 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
            : 'bg-gray-400'
        } text-white p-4`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-1">{coupon.discount}</div>
              <div className="text-sm opacity-90">Use code: {coupon.code}</div>
            </div>
            <LocalOfferIcon sx={{ fontSize: 48 }} className="opacity-50" />
          </div>
        </div>

        {/* Dotted Line Effect */}
        <div className="relative h-4 bg-white">
          <div className="absolute -top-2 left-0 w-4 h-4 bg-gray-50 rounded-full"></div>
          <div className="absolute -top-2 right-0 w-4 h-4 bg-gray-50 rounded-full"></div>
          <div className="absolute top-1/2 left-0 right-0 border-t-2 border-dashed border-gray-300"></div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-700 mb-3">{coupon.description}</p>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <span>• Minimum order: ₹{coupon.minOrder}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>• Maximum discount: ₹{coupon.maxDiscount}</span>
          </div>
          <div className="flex items-center gap-2">
            <AccessTimeIcon sx={{ fontSize: 16 }} />
            <span>Valid until: {coupon.validUntil}</span>
          </div>
        </div>

        {coupon.isActive ? (
          <button
            onClick={() => copyToClipboard(coupon.code)}
            className="w-full py-2 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue transition-all flex items-center justify-center gap-2 font-medium"
          >
            {copiedCode === coupon.code ? (
              <>
                <CheckCircleIcon sx={{ fontSize: 20 }} />
                Copied!
              </>
            ) : (
              <>
                <ContentCopyIcon sx={{ fontSize: 20 }} />
                Copy Code
              </>
            )}
          </button>
        ) : (
          <div className="w-full py-2 bg-gray-200 text-gray-600 rounded-md text-center font-medium">
            Expired
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <MetaData title="My Coupons" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <LocalOfferIcon className="text-primary-blue" sx={{ fontSize: 32 }} />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Coupons</h1>
                <p className="text-sm text-gray-600">
                  {activeCoupons.length} active coupon{activeCoupons.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-800 mb-3">How to use coupons:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-blue text-white rounded-full flex items-center justify-center font-semibold text-xs">1</span>
                <span>Copy your coupon code</span>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-blue text-white rounded-full flex items-center justify-center font-semibold text-xs">2</span>
                <span>Add items to cart</span>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-blue text-white rounded-full flex items-center justify-center font-semibold text-xs">3</span>
                <span>Apply code at checkout</span>
              </div>
            </div>
          </div>

          {/* Active Coupons */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Active Coupons</h2>
            {activeCoupons.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <LocalOfferIcon className="text-gray-300 mx-auto mb-4" sx={{ fontSize: 80 }} />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No active coupons</h3>
                <p className="text-gray-600">
                  Check back later for exciting offers and discounts!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} />
                ))}
              </div>
            )}
          </div>

          {/* Expired Coupons Toggle */}
          <div className="mb-4">
            <button
              onClick={() => setShowExpired(!showExpired)}
              className="text-primary-blue hover:text-primary-darkBlue font-medium flex items-center gap-2"
            >
              {showExpired ? '▼' : '▶'} View Expired Coupons ({expiredCoupons.length})
            </button>
          </div>

          {/* Expired Coupons */}
          {showExpired && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Expired Coupons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {expiredCoupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} />
                ))}
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              💡 <strong>Note:</strong> Coupons cannot be combined with other offers. 
              Only one coupon can be used per order. Terms and conditions apply.
            </p>
          </div>

        </div>
      </main>
    </>
  );
};

export default MyCoupons;