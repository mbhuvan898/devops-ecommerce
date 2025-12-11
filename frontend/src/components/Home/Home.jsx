import { useEffect } from 'react';
import Categories from '../Layouts/Categories';
import DealSlider from './DealSlider/DealSlider';
import ProductSlider from './ProductSlider/ProductSlider';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts } from '../../actions/productAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
import { Link } from 'react-router-dom';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LockIcon from '@mui/icons-material/Lock';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StarIcon from '@mui/icons-material/Star';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LaptopIcon from '@mui/icons-material/Laptop';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Home = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
  }, [dispatch, error, enqueueSnackbar]);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment:
        'Amazing shopping experience! Fast delivery and great quality products. The customer service team went above and beyond to help me.',
      avatar: 'SJ',
      verified: true,
    },
    {
      name: 'Michael Chen',
      rating: 5,
      comment:
        "Best prices I've found online. The variety is incredible and everything arrived perfectly packaged. Highly recommend!",
      avatar: 'MC',
      verified: true,
    },
    {
      name: 'Emma Williams',
      rating: 5,
      comment:
        'Love shopping here! The website is easy to use, checkout is smooth, and I always find exactly what I need. Will definitely shop again!',
      avatar: 'EW',
      verified: true,
    },
  ];

  // TRUST FEATURES
  const features = [
    {
      title: 'Fast & Reliable Delivery',
      desc: 'Get your orders delivered quickly with real-time tracking and trusted courier partners.',
      icon: <LocalShippingIcon sx={{ fontSize: 30 }} />,
      bg: 'bg-green-50',
      color: 'from-[#228B22] to-[#32CD32]',
    },
    {
      title: '100% Secure Payments',
      desc: 'Your transactions are protected with industry-standard encryption and secure payment gateways.',
      icon: <LockIcon sx={{ fontSize: 30 }} />,
      bg: 'bg-emerald-50',
      color: 'from-[#1e7e34] to-[#2e7d32]',
    },
    {
      title: 'Easy Returns & Refunds',
      desc: 'Hassle-free returns and quick refunds on eligible products with a simple process.',
      icon: <RestartAltIcon sx={{ fontSize: 30 }} />,
      bg: 'bg-lime-50',
      color: 'from-[#32CD32] to-[#A7F3D0]',
    },
    {
      title: 'Quality Assured Products',
      desc: 'Every product is quality-checked so you always get the best value for your money.',
      icon: <VerifiedUserIcon sx={{ fontSize: 30 }} />,
      bg: 'bg-teal-50',
      color: 'from-[#0f766e] to-[#14b8a6]',
    },
  ];

  return (
    <>
      <MetaData title="Best2Buy - Online Shopping for Mobiles, Electronics, Fashion & More | Best Deals & Offers" />

      <main className="flex flex-col bg-white min-h-screen overflow-hidden">
        {/* HERO BANNER SECTION - Green Theme */}
        {/* HERO BANNER SECTION - Premium White Theme */}
<section className="relative bg-white overflow-hidden">

  {/* Soft Apple-Style Grey Blobs */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#f2f2f2] rounded-full blur-3xl opacity-60"></div>
    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#ececec] rounded-full blur-3xl opacity-50"></div>
    <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
  </div>

  {/* Soft Grid Pattern */}
  <div
    className="absolute inset-0 opacity-[0.08] pointer-events-none"
    style={{
      backgroundImage:
        'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
      backgroundSize: '50px 50px',
    }}
  ></div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* LEFT CONTENT */}
      <div className="space-y-8">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gray-100 px-5 py-2 rounded-full border border-gray-300 text-gray-600 text-sm font-semibold">
          <span className="h-2 w-2 bg-green-400 rounded-full animate-ping"></span>
          New Collections Arrived
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight">
          Upgrade Your Everyday
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-300">
            Shop Smarter
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
          Premium quality, exclusive offers, and fast delivery — everything you need in one seamless shopping experience.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link to="/products">
            <button className="px-8 py-4 bg-green-600 text-white font-bold rounded-xl shadow-md hover:bg-green-700 hover:scale-[1.03] transition-all">
              Start Shopping
            </button>
          </Link>

          <button className="px-8 py-4 bg-white text-gray-800 font-bold rounded-xl border border-gray-300 shadow-sm hover:bg-gray-100 transition-all">
            View Offers
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-12 pt-6">
          {[
            { value: "40K+", label: "Products" },
            { value: "900K+", label: "Happy Users" },
            { value: "24/7", label: "Support" },
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-black text-gray-900">{stat.value}</div>
              <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — NEW PREMIUM CARD */}
      <div className="hidden lg:flex justify-center items-center relative">

        {/* Soft floating shadow behind card */}
        <div className="absolute top-6 right-6 w-64 h-64 bg-[#f3f3f3] rounded-3xl blur-xl opacity-60"></div>

        {/* Main Glass Card */}
        <div className="relative w-full max-w-sm bg-white/60 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-10">

          {/* Icon */}
          <div className="text-7xl mb-4 flex justify-center">
            ⚡
          </div>

          {/* Title */}
          <h3 className="text-3xl font-black text-gray-900 text-center mb-2 tracking-tight">
            Exclusive Deals
          </h3>

          {/* Subtitle */}
          <p className="text-gray-600 text-lg text-center mb-6">
            Save big with daily special offers.
          </p>

          {/* Button */}
          <div className="flex justify-center">
            <Link to="/products">
              <button className="px-8 py-3 bg-black text-white rounded-xl font-bold shadow-md hover:bg-gray-800 hover:scale-[1.04] transition-all">
                Explore Now
              </button>
            </Link>
          </div>

        </div>
      </div>

    </div>
  </div>

  {/* Wave Separator */}
  <div className="absolute bottom-0 left-0 right-0">
    <svg className="w-full h-24 sm:h-32" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
      <path
        d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32V120H0Z"
        fill="white"
      />
    </svg>
  </div>

</section>


        <Categories />

        {/* FLASH DEALS SECTION */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-green-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-[#228B22] to-[#32CD32] rounded-lg animate-pulse shadow-lg">
                    <LocalOfferIcon className="text-white" sx={{ fontSize: 24 }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-black text-[#228B22] uppercase tracking-widest">Flash Sale</span>
                      <span className="px-2 py-0.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded animate-pulse shadow-md">
                        Live
                      </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">Today&apos;s Hot Deals</h2>
                  </div>
                </div>
                <p className="text-gray-600 text-lg font-medium flex items-center gap-2">
                  <AccessTimeIcon sx={{ fontSize: 20 }} className="text-[#228B22]" />
                  Hurry! Limited time offers
                </p>
              </div>
              <Link to="/products">
                <button className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white font-bold rounded-xl hover:from-[#1a6b1a] hover:to-[#228B22] transition-all shadow-lg hover:shadow-xl">
                  <span>View All</span>
                  <ArrowForwardIcon className="group-hover:translate-x-1 transition-transform" sx={{ fontSize: 20 }} />
                </button>
              </Link>
            </div>

            <DealSlider title={''} />
          </div>
        </section>

        
        

        {/* TRUST FEATURES - Green Theme */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-3">
              <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <VerifiedUserIcon className="text-[#228B22]" sx={{ fontSize: 18 }} />
                <span className="text-sm font-bold text-[#228B22] uppercase tracking-wide">Our Guarantee</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-gray-900">Why Choose Best2Buy?</h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Your satisfaction is our top priority</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100"
                >
                  {/* Gradient Background on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                  ></div>

                  <div className="relative space-y-4">
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${feature.bg} group-hover:scale-110 transition-all shadow-sm`}
                    >
                      <div className="text-[#228B22]">{feature.icon}</div>
                    </div>

                    <div>
                      <h4 className="font-black text-gray-900 text-lg mb-2">{feature.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RECOMMENDED PRODUCTS */}
        {!loading && (
          <section className="py-16 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-[#228B22] to-[#32CD32] rounded-lg shadow-lg">
                      <TrendingUpIcon className="text-white" sx={{ fontSize: 24 }} />
                    </div>
                    <div>
                      <span className="block text-sm font-black text-[#228B22] uppercase tracking-widest mb-1">
                        Curated For You
                      </span>
                      <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">Recommended Products</h2>
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg font-medium">Handpicked based on your preferences</p>
                </div>
              </div>

              <ProductSlider title={''} tagline={''} />
            </div>
          </section>
        )}

        {/* TESTIMONIALS */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-200 rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                <FavoriteIcon className="text-red-500" sx={{ fontSize: 18 }} />
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Customer Love</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900">What Our Customers Say</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Join over 1 million happy shoppers worldwide</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-14">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                          idx === 0
                            ? 'from-[#228B22] to-[#32CD32]'
                            : idx === 1
                            ? 'from-[#1e7e34] to-[#2e7d32]'
                            : 'from-[#32CD32] to-[#228B22]'
                        } flex items-center justify-center text-white font-black text-xl shadow-lg`}
                      >
                        {testimonial.avatar}
                      </div>
                      {testimonial.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#228B22] rounded-full flex items-center justify-center border-2 border-white">
                          <VerifiedUserIcon className="text-white" sx={{ fontSize: 14 }} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 text-lg mb-1">{testimonial.name}</div>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarIcon key={i} className="text-yellow-400" sx={{ fontSize: 18 }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">"{testimonial.comment}"</p>
                </div>
              ))}
            </div>

            {/* Enhanced Trust Stats */}
            <div className="flex flex-wrap justify-center gap-12 pt-8 border-t border-gray-200">
              {[
                { value: '4.9', label: 'Average Rating', icon: <StarIcon className="text-yellow-400" /> },
                { value: '50K+', label: '5-Star Reviews', icon: <FavoriteIcon className="text-red-500" /> },
                { value: '98%', label: 'Satisfaction', icon: <VerifiedUserIcon className="text-[#228B22]" /> },
              ].map((stat, idx) => (
                <div key={idx} className="text-center group cursor-default">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {stat.icon}
                    <div className="text-4xl font-black text-gray-900 group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRENDING PRODUCTS */}
        {!loading && (
          <section className="py-16 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 space-y-4">
                <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-200">
                  <span className="text-2xl animate-pulse">🔥</span>
                  <span className="text-sm font-bold text-orange-600 uppercase tracking-wide">Hot Right Now</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900">Trending This Week</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Discover what&apos;s popular with shoppers like you
                </p>
              </div>

              <ProductSlider title={''} tagline={''} />
            </div>
          </section>
        )}

        {/* CTA BANNER */}
        {/* CTA BANNER */}
<section className="relative py-20 bg-green-600 overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: 'radial-gradient(circle at 30% 50%, white 2px, transparent 2px)',
      backgroundSize: '60px 60px',
    }}></div>
    <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-700 rounded-full filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/25 shadow-lg hover:bg-white/20 transition-all">
      <ShoppingBagIcon sx={{ fontSize: 20 }} />
      <span className="text-sm font-bold uppercase tracking-wide">Limited Time Offer</span>
    </div>

    <h2 className="text-4xl sm:text-6xl font-black mb-6 leading-tight">
      Get 20% OFF
      <br />
      <span className="text-yellow-300">Your First Order!</span>
    </h2>

    <p className="text-xl sm:text-2xl text-green-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
      Sign up today and receive an exclusive discount on your first purchase. Limited time only!
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link to="/register">
        <button className="group px-10 py-5 bg-white text-green-600 font-black rounded-xl hover:bg-green-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 text-lg flex items-center gap-3">
          <span>Sign Up Now</span>
          <ArrowForwardIcon className="group-hover:translate-x-1 transition-transform" />
        </button>
      </Link>
      <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all shadow-xl text-lg">
        Learn More
      </button>
    </div>

    <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-green-800 font-bold text-xs">✓</span>
        </div>
        <span className="font-medium">No credit card required</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-green-800 font-bold text-xs">✓</span>
        </div>
        <span className="font-medium">Cancel anytime</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-green-800 font-bold text-xs">✓</span>
        </div>
        <span className="font-medium">Instant access</span>
      </div>
    </div>
  </div>
</section>

      </main>

      {/* ENHANCED ANIMATION STYLES */}
      <style>{`
        @keyframes blob {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
          }
          25% { 
            transform: translate(20px, -50px) scale(1.1); 
          }
          50% { 
            transform: translate(-20px, 20px) scale(0.9); 
          }
          75% { 
            transform: translate(50px, 30px) scale(1.05); 
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(6deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(6deg); 
          }
        }
        
        @keyframes float-delayed {
          0%, 100% { 
            transform: translateY(0px) rotate(-6deg); 
          }
          50% { 
            transform: translateY(-25px) rotate(-6deg); 
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% { 
            transform: translateY(0); 
          }
          50% { 
            transform: translateY(-10px); 
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-blob {
          animation: blob 20s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #228B22, #2e7d32);
          border-radius: 6px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #1a6b1a, #1b5e20);
        }

        ::selection {
          background-color: #32CD32;
          color: white;
        }

        ::-moz-selection {
          background-color: #32CD32;
          color: white;
        }
      `}</style>
    </>
  );
};

export default Home;
