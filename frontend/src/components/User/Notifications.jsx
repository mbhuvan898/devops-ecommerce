// src/components/User/Notifications.jsx
import React, { useState } from 'react';
import MetaData from '../Layouts/MetaData';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FilterListIcon from '@mui/icons-material/FilterList';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #ORD123456 has been delivered successfully.',
      time: '2 hours ago',
      read: false,
      icon: <ShoppingBagIcon />
    },
    {
      id: 2,
      type: 'promo',
      title: 'Special Offer!',
      message: 'Get 20% off on your next purchase. Use code SAVE20',
      time: '5 hours ago',
      read: false,
      icon: <LocalOfferIcon />
    },
    {
      id: 3,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #ORD123455 has been shipped and will arrive soon.',
      time: '1 day ago',
      read: true,
      icon: <ShoppingBagIcon />
    },
    {
      id: 4,
      type: 'account',
      title: 'Profile Updated',
      message: 'Your profile information has been updated successfully.',
      time: '2 days ago',
      read: true,
      icon: <AccountCircleIcon />
    },
    {
      id: 5,
      type: 'promo',
      title: 'Flash Sale Alert',
      message: 'Limited time offer! Up to 50% off on electronics.',
      time: '3 days ago',
      read: true,
      icon: <LocalOfferIcon />
    },
    {
      id: 6,
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order #ORD123454 has been confirmed and is being processed.',
      time: '4 days ago',
      read: true,
      icon: <ShoppingBagIcon />
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getTypeColor = (type) => {
    switch (type) {
      case 'order':
        return 'bg-blue-100 text-blue-600';
      case 'promo':
        return 'bg-green-100 text-green-600';
      case 'account':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to delete all notifications?')) {
      setNotifications([]);
    }
  };

  return (
    <>
      <MetaData title="Notifications" />
      
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <NotificationsIcon className="text-primary-blue" sx={{ fontSize: 32 }} />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
                <p className="text-sm text-gray-600">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 text-primary-blue hover:bg-blue-50 rounded-md transition-all flex items-center gap-2 font-medium"
                >
                  <DoneAllIcon sx={{ fontSize: 20 }} />
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-all flex items-center gap-2 font-medium"
                >
                  <DeleteIcon sx={{ fontSize: 20 }} />
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center gap-2 overflow-x-auto">
              <FilterListIcon className="text-gray-600 flex-shrink-0" />
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md transition-all whitespace-nowrap ${
                  filter === 'all' 
                    ? 'bg-primary-blue text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-md transition-all whitespace-nowrap ${
                  filter === 'unread' 
                    ? 'bg-primary-blue text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('order')}
                className={`px-4 py-2 rounded-md transition-all whitespace-nowrap ${
                  filter === 'order' 
                    ? 'bg-primary-blue text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setFilter('promo')}
                className={`px-4 py-2 rounded-md transition-all whitespace-nowrap ${
                  filter === 'promo' 
                    ? 'bg-primary-blue text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Promotions
              </button>
              <button
                onClick={() => setFilter('account')}
                className={`px-4 py-2 rounded-md transition-all whitespace-nowrap ${
                  filter === 'account' 
                    ? 'bg-primary-blue text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Account
              </button>
            </div>
          </div>

          {/* Notifications List */}
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <NotificationsIcon className="text-gray-300 mx-auto mb-4" sx={{ fontSize: 80 }} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No notifications</h3>
              <p className="text-gray-600">
                {filter === 'unread' 
                  ? "You're all caught up!"
                  : filter === 'all'
                  ? "You don't have any notifications yet."
                  : `No ${filter} notifications found.`
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                  className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer ${
                    !notification.read ? 'border-l-4 border-primary-blue' : ''
                  }`}
                >
                  <div className="p-4">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full ${getTypeColor(notification.type)} flex items-center justify-center`}>
                        {notification.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="flex-shrink-0 w-2 h-2 bg-primary-blue rounded-full mt-1"></span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <DeleteIcon sx={{ fontSize: 20 }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Settings Link */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-800 mb-3">
              Want to customize your notification preferences?
            </p>
            <a
              href="/settings"
              className="inline-block px-6 py-2 bg-primary-blue text-white rounded-md hover:bg-primary-darkBlue transition-all font-medium"
            >
              Go to Settings
            </a>
          </div>

        </div>
      </main>
    </>
  );
};

export default Notifications;