// src/config/navigationConfig.js

import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import PolicyIcon from '@mui/icons-material/Policy';
import SecurityIcon from '@mui/icons-material/Security';
import DescriptionIcon from '@mui/icons-material/Description';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import ReviewsIcon from '@mui/icons-material/Reviews';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HistoryIcon from '@mui/icons-material/History';

// Centralized navigation configuration
export const NAV_LINKS = {
  // Account related pages
  ACCOUNT: '/account',
  SETTINGS: '/settings',
  MY_ORDERS: '/orders',
  WISHLIST: '/wishlist',
  ADDRESSES: '/account/addresses',
  PAYMENTS: '/account/payments',
  REVIEWS: '/account/reviews',
  COUPONS: '/account/coupons',
  ORDER_HISTORY: '/account/history',
  NOTIFICATIONS: '/account/notifications',

  // Help & Support
  HELP: '/help',
  CONTACT: '/contact',
  TRACK_ORDER: '/track-order',

  // Company Info
  ABOUT: '/about',
  CAREERS: '/careers',
  BLOG: '/blog',

  // Policies
  PRIVACY_POLICY: '/privacy-policy',
  TERMS: '/terms',
  RETURN_POLICY: '/return-policy',
  SECURITY: '/security',
  
  // Other
  SHIPPING_INFO: '/shipping-info',  // Info page, not checkout
  RETURNS_REFUNDS: '/returns-refunds',
};

// Primary dropdown menu items (User menu)
export const primaryMenuItems = [
  {
    title: "My Orders",
    icon: <ShoppingBagIcon sx={{ fontSize: "18px" }} />,
    redirect: NAV_LINKS.MY_ORDERS,
  },
  {
    title: "Wishlist",
    icon: <FavoriteIcon sx={{ fontSize: "18px" }} />,
    redirect: NAV_LINKS.WISHLIST,
    showCounter: true, // Special flag for wishlist
  },
  {
    title: "My Addresses",
    icon: <LocationOnIcon sx={{ fontSize: "18px" }} />,
    redirect: NAV_LINKS.ADDRESSES,
  },
  {
    title: "Payment Methods",
    icon: <PaymentIcon sx={{ fontSize: "18px" }} />,
    redirect: NAV_LINKS.PAYMENTS,
  },
  {
    title: "My Reviews",
    icon: <ReviewsIcon sx={{ fontSize: "18px" }} />,
    redirect: NAV_LINKS.REVIEWS,
  },
  {
    title: "My Coupons",
    icon: <LocalOfferIcon sx={{ fontSize: "18px" }} />,
    redirect: NAV_LINKS.COUPONS,
  },
  {
    title: "Order History",
    icon: <HistoryIcon sx={{ fontSize: "18px" }} />,
    redirect: NAV_LINKS.ORDER_HISTORY,
  },
  {
    title: "Notifications",
    icon: <NotificationsIcon sx={{ fontSize: "18px" }} />,
    redirect: NAV_LINKS.NOTIFICATIONS,
  },
];

// Secondary dropdown menu items (More menu)
export const secondaryMenuItems = [
  {
    title: "Account Settings",
    icon: <SettingsIcon sx={{ fontSize: "18px" }} />,
    redirect: NAV_LINKS.SETTINGS,
  },
  {
    title: "Help Center",
    icon: <HelpOutlineIcon sx={{ fontSize: "18px" }} />,
    redirect: NAV_LINKS.HELP,
  },
  {
    title: "About Us",
    icon: <InfoIcon sx={{ fontSize: "18px" }} />,
    redirect: NAV_LINKS.ABOUT,
  },
  {
    title: "Contact Us",
    icon: <ContactSupportIcon sx={{ fontSize: "18px" }} />,
    redirect: NAV_LINKS.CONTACT,
  },
  {
    title: "Privacy Policy",
    icon: <SecurityIcon sx={{ fontSize: "18px" }} />,
    redirect: NAV_LINKS.PRIVACY_POLICY,
  },
  {
    title: "Terms & Conditions",
    icon: <PolicyIcon sx={{ fontSize: "18px" }} />,
    redirect: NAV_LINKS.TERMS,
  },
  {
    title: "Return Policy",
    icon: <DescriptionIcon sx={{ fontSize: "18px" }} />,
    redirect: NAV_LINKS.RETURN_POLICY,
  },
];

// Footer link sections
export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      {
        name: "About Us",
        redirect: NAV_LINKS.ABOUT,
      },
      {
        name: "Contact Us",
        redirect: NAV_LINKS.CONTACT,
      },
      {
        name: "Careers",
        redirect: NAV_LINKS.CAREERS,
      },
      {
        name: "Blog",
        redirect: NAV_LINKS.BLOG,
      },
    ]
  },
  {
    title: "Customer Service",
    links: [
      {
        name: "Help Center",
        redirect: NAV_LINKS.HELP,
      },
      {
        name: "Track Order",
        redirect: NAV_LINKS.TRACK_ORDER,
      },
      {
        name: "Returns & Refunds",
        redirect: NAV_LINKS.RETURNS,
      },
      {
        name: "Shipping Info",
        redirect: NAV_LINKS.SHIPPING,
      },
    ]
  },
  {
    title: "Policies",
    links: [
      {
        name: "Privacy Policy",
        redirect: NAV_LINKS.PRIVACY_POLICY,
      },
      {
        name: "Terms of Service",
        redirect: NAV_LINKS.TERMS,
      },
      {
        name: "Return Policy",
        redirect: NAV_LINKS.RETURN_POLICY,
      },
      {
        name: "Security",
        redirect: NAV_LINKS.SECURITY,
      },
    ]
  }
];

export default {
  NAV_LINKS,
  primaryMenuItems,
  secondaryMenuItems,
  footerLinks,
};