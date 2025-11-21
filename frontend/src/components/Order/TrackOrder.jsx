// C:\Users\BHUVAN M\Downloads\newone\project\frontend\src\components\Order\TrackOrder.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../Layouts/MetaData';
import TrackStepper from './TrackStepper';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SearchIcon from '@mui/icons-material/Search';
import { getOrderDetails } from '../../actions/orderAction';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.orderDetails);

  const handleTrack = (e) => {
    e.preventDefault();
    
    if (!orderId.trim()) {
      alert('Please enter an order ID');
      return;
    }

    // Dispatch action to fetch order details
    dispatch(getOrderDetails(orderId));
    setSearched(true);
  };

  // Get active step for TrackStepper based on order status
  const getActiveStep = (status) => {
    switch (status) {
      case 'Processing':
        return 0;
      case 'Shipped':
        return 1;
      case 'Delivered':
        return 2;
      default:
        return 0;
    }
  };

  return (
    <>
      <MetaData title="Track Your Order" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-blue to-blue-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <LocalShippingIcon sx={{ fontSize: 60 }} className="mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Order</h1>
            <p className="text-xl text-blue-100">
              Enter your order ID to get real-time tracking information
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          
          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order ID *
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your order ID"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <SearchIcon sx={{ fontSize: 20 }} />
                  {loading ? 'Searching...' : 'Track Order'}
                </button>
              </div>
            </form>
            
            <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
              <p className="text-sm text-gray-500">
                💡 You can find your order ID in the confirmation email or in your orders page
              </p>
              <button
                onClick={() => navigate('/orders')}
                className="text-sm text-primary-blue hover:text-primary-darkBlue font-medium"
              >
                View All Orders →
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-blue mx-auto mb-4"></div>
              <p className="text-gray-600">Searching for your order...</p>
            </div>
          )}

          {/* Error State */}
          {searched && error && !loading && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-red-500 text-6xl mb-4">❌</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Not Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find an order with ID: <strong>{orderId}</strong>
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Please check your order ID and try again, or contact customer support for assistance.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-2 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue transition-all"
              >
                Contact Support
              </button>
            </div>
          )}

          {/* Tracking Results */}
          {searched && order && !loading && !error && (
            <div className="space-y-6">
              
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order ID</p>
                    <p className="font-semibold text-gray-800">{order._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order Date</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Current Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      order.orderStatus === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Tracking Timeline using TrackStepper */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Status</h2>
                <TrackStepper 
                  activeStep={getActiveStep(order.orderStatus)}
                  orderStatus={order.orderStatus}
                />
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.orderItems && order.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-all">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-primary-blue">₹{order.totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              {order.shippingInfo && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
                  <div className="text-gray-700">
                    <p className="font-semibold mb-2">{order.user?.name || 'N/A'}</p>
                    <p>{order.shippingInfo.address}</p>
                    <p>
                      {order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.pincode}
                    </p>
                    <p className="mt-2">Phone: {order.shippingInfo.phoneNo}</p>
                  </div>
                </div>
              )}

              {/* Payment Info */}
              {order.paymentInfo && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                      <p className="font-semibold text-gray-800">
                        {order.paymentInfo.type || 'Card Payment'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        order.paymentInfo.status === 'succeeded' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.paymentInfo.status === 'succeeded' ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Help Section */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-3">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  If you have any questions about your order or delivery, our customer support 
                  team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-6 py-2 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue transition-all text-center"
                  >
                    Contact Support
                  </button>
                  <button
                    onClick={() => navigate(`/order/${order._id}`)}
                    className="px-6 py-2 bg-white text-primary-blue border-2 border-primary-blue rounded-md hover:bg-primary-blue hover:text-white transition-all text-center"
                  >
                    View Full Order Details
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
    </>
  );
};

export default TrackOrder;