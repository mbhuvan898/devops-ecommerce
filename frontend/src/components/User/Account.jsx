import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import MetaData from "../Layouts/MetaData";
import Loader from "../Layouts/Loader";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import ReviewsIcon from "@mui/icons-material/Reviews";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HistoryIcon from "@mui/icons-material/History";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Account = () => {
  const { user, loading } = useSelector((state) => state.user);

  const [orderCount, setOrderCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // ✅ Fetch total orders and wishlist count
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get user orders
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/orders/me",
          { withCredentials: true }
        );
        setOrderCount(data.orders?.length || 0);
      } catch (error) {
        console.error("❌ Failed to fetch order count:", error.response?.data || error.message);
      }

      try {
        // If wishlist endpoint exists, fetch it here
        const wishlistRes = await axios.get(
          "http://localhost:4000/api/v1/wishlist",
          { withCredentials: true }
        );
        setWishlistCount(wishlistRes.data.wishlist?.length || 0);
      } catch (error) {
        console.warn("⚠️ Wishlist endpoint not found or not implemented yet.");
      }
    };

    fetchStats();
  }, []);

  const quickLinks = [
    {
      title: "My Orders",
      description: "View and track your orders",
      icon: <ShoppingBagIcon sx={{ fontSize: 40 }} />,
      link: "/orders",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Wishlist",
      description: "View your saved items",
      icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
      link: "/wishlist",
      color: "bg-red-100 text-red-600",
    },
    {
      title: "My Addresses",
      description: "Manage delivery addresses",
      icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
      link: "/account/addresses",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Payment Methods",
      description: "Manage payment options",
      icon: <PaymentIcon sx={{ fontSize: 40 }} />,
      link: "/account/payments",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "My Reviews",
      description: "View and manage reviews",
      icon: <ReviewsIcon sx={{ fontSize: 40 }} />,
      link: "/account/reviews",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "My Coupons",
      description: "Available offers and coupons",
      icon: <LocalOfferIcon sx={{ fontSize: 40 }} />,
      link: "/account/coupons",
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Order History",
      description: "Complete order history",
      icon: <HistoryIcon sx={{ fontSize: 40 }} />,
      link: "/account/history",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Notifications",
      description: "View all notifications",
      icon: <NotificationsIcon sx={{ fontSize: 40 }} />,
      link: "/account/notifications",
      color: "bg-pink-100 text-pink-600",
    },
  ];

  return (
    <>
      <MetaData title="My Account" />
      {loading ? (
        <Loader />
      ) : (
        <main className="w-full mt-20 min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-primary-blue to-blue-600 text-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  {user.avatar && user.avatar.url ? (
                    <img
                      src={user.avatar.url}
                      alt={user.name}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-white flex items-center justify-center">
                      <AccountCircleIcon className="text-primary-blue" sx={{ fontSize: 80 }} />
                    </div>
                  )}
                  <Link
                    to="/account/update"
                    className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all"
                  >
                    <EditIcon className="text-primary-blue" sx={{ fontSize: 20 }} />
                  </Link>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <div className="space-y-2 text-blue-100">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <EmailIcon sx={{ fontSize: 18 }} />
                      <span>{user.email}</span>
                    </div>
                    {user.phoneNo && (
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <PhoneIcon sx={{ fontSize: 18 }} />
                        <span>{user.phoneNo}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <CalendarMonthIcon sx={{ fontSize: 18 }} />
                      <span>
                        Joined{" "}
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col gap-3">
                  <Link
                    to="/account/update"
                    className="px-6 py-2 bg-white text-primary-blue rounded-md hover:bg-gray-100 transition-all flex items-center gap-2 font-medium"
                  >
                    <EditIcon sx={{ fontSize: 18 }} />
                    Edit Profile
                  </Link>
                  <Link
                    to="/password/update"
                    className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-md hover:bg-white hover:text-primary-blue transition-all flex items-center gap-2 font-medium"
                  >
                    <LockIcon sx={{ fontSize: 18 }} />
                    Change Password
                  </Link>
                  <Link
                    to="/settings"
                    className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-md hover:bg-white hover:text-primary-blue transition-all flex items-center gap-2 font-medium"
                  >
                    <SettingsIcon sx={{ fontSize: 18 }} />
                    Settings
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Access</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickLinks.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 group"
                  >
                    <div
                      className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-primary-blue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Account Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl font-bold text-primary-blue mb-2">
                  {orderCount}
                </div>
                <p className="text-gray-600">Total Orders</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">
                  {wishlistCount}
                </div>
                <p className="text-gray-600">Wishlist Items</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {user.reviews?.length || 0}
                </div>
                <p className="text-gray-600">Reviews Written</p>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Full Name</p>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email Address</p>
                  <p className="font-semibold text-gray-800">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Account Status</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    Active
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Account Type</p>
                  <p className="font-semibold text-gray-800 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Account;
