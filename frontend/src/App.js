// frontend/src/App.js - 100% CORRECT VERSION

import { useEffect } from 'react';
// import './App.css';  // Comment out if file doesn't exist
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/userAction';

// Layout Components
import Header from './components/Layouts/Header/Header';
import Footer from './components/Layouts/Footer/Footer';
import NotFound from './components/NotFound';

// Home & Products
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';

// Cart & Checkout Flow
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import OrderConfirm from './components/Cart/OrderConfirm';
import Payment from './components/Cart/Payment';
import OrderSuccess from './components/Cart/OrderSuccess';

// User Authentication
import Login from './components/User/Login';
import Register from './components/User/Register';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';

// User Account
import Account from './components/User/Account';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';

// User Sub-pages
import Settings from './components/User/Settings';
import Addresses from './components/User/Addresses';
import PaymentMethods from './components/User/PaymentMethods';
import MyReviews from './components/User/MyReviews';
import MyCoupons from './components/User/MyCoupons';
import OrderHistory from './components/User/OrderHistory';
import Notifications from './components/User/Notifications';

// Orders
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import TrackOrder from './components/Order/TrackOrder';

// Wishlist
import Wishlist from './components/Wishlist/Wishlist';

// Info Pages
import HelpCenter from './components/Pages/HelpCenter';
import AboutUs from './components/Pages/AboutUs';
import ContactUs from './components/Pages/ContactUs';
import PrivacyPolicy from './components/Pages/PrivacyPolicy';
import Terms from './components/Pages/Terms';
import ReturnPolicy from './components/Pages/ReturnPolicy';
import SecurityPage from './components/Pages/SecurityPage';
import Careers from './components/Pages/Careers';
import Blog from './components/Pages/Blog';
import ShippingInfo from './components/Pages/ShippingInfo';
import ReturnsRefunds from './components/Pages/ReturnsRefunds';

// Admin Components
import Dashboard from './components/Admin/Dashboard';
import MainData from './components/Admin/MainData'; // Keep MainData if it's used elsewhere or for other dashboard tabs
import OrderTable from './components/Admin/OrderTable';
import UpdateOrder from './components/Admin/UpdateOrder';
import ProductTable from './components/Admin/ProductTable';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import UserTable from './components/Admin/UserTable';
import UpdateUser from './components/Admin/UpdateUser';
import ReviewsTable from './components/Admin/ReviewsTable';

// Route Protection
import ProtectedRoute from './Routes/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user && user.role === "admin" && !isAdminRoute) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, user, navigate, isAdminRoute]);

  // Disable right click
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      {!isAdminRoute && <Header />}
      <Routes>
        {/* ==================== PUBLIC ROUTES ==================== */}
        
        {/* Home & Products */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* Information Pages - PUBLIC */}
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/shipping-info" element={<ShippingInfo />} />
        <Route path="/returns-refunds" element={<ReturnsRefunds />} />

        {/* Cart - Can view without login */}
        <Route path="/cart" element={<Cart />} />

        {/* ==================== PROTECTED USER ROUTES ==================== */}
        
        {/* Account Management */}
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/account/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        <Route path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
        
        {/* Account Sub-pages */}
        <Route path="/account/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>} />
        <Route path="/account/payments" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
        <Route path="/account/reviews" element={<ProtectedRoute><MyReviews /></ProtectedRoute>} />
        <Route path="/account/coupons" element={<ProtectedRoute><MyCoupons /></ProtectedRoute>} />
        <Route path="/account/history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
        <Route path="/account/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

        {/* Orders */}
        <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path="/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
        <Route path="/track-order" element={<ProtectedRoute><TrackOrder /></ProtectedRoute>} />

        {/* Wishlist */}
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />

        {/* Checkout Process - CORRECT FLOW */}
        <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
        <Route path="/order/confirm" element={<ProtectedRoute><OrderConfirm /></ProtectedRoute>} />
        <Route path="/process/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/order/success" element={<OrderSuccess />} />


        {/* ==================== ADMIN ROUTES ==================== */}
        
        <Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute isAdmin={true}>
      <Dashboard activeTab={0}>
        <MainData />  {/* or SummaryCards, depending on your repo */}
      </Dashboard>
    </ProtectedRoute>
  }
/>

        
        {/* Orders Management */}
        <Route path="/admin/orders" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <OrderTable />
            </Dashboard>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/order/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <UpdateOrder />
            </Dashboard>
          </ProtectedRoute>
        } />
        
        {/* Products Management */}
        <Route path="/admin/products" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <ProductTable />
            </Dashboard>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/new_product" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={3}>
              <NewProduct />
            </Dashboard>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/product/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <UpdateProduct />
            </Dashboard>
          </ProtectedRoute>
        } />
        
        {/* Users Management */}
        <Route path="/admin/users" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={4}>
              <UserTable />
            </Dashboard>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/user/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={4}>
              <UpdateUser />
            </Dashboard>
          </ProtectedRoute>
        } />
        
        {/* Reviews Management */}
        <Route path="/admin/reviews" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={5}>
              <ReviewsTable />
            </Dashboard>
          </ProtectedRoute>
        } />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
