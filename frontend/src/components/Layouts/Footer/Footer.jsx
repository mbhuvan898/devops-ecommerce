import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { footerLinks } from '../../../config/navigationConfig';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"));
  }, [location]);


  return (
    <>
      {!adminRoute && (
          <>
          {/* Main Footer */}
          <footer className="w-full bg-white border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
              {/* Footer Links Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {/* Brand Info */}
                <div className="col-span-2 sm:col-span-1 lg:col-span-1">
                  <h2 className="text-2xl font-bold text-primary-blue mb-4">Best2Buy</h2>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    Your trusted online marketplace for quality products at the best prices.
                  </p>

                  {/* Contact Info */}
                  <div className="flex flex-col gap-3">
                    <a
                      href="mailto:support@best2buy.com"
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary-blue transition-colors group"
                    >
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <EmailIcon sx={{ fontSize: 16 }} className="text-primary-blue" />
                      </div>
                      <span>support@best2buy.com</span>
                    </a>

                    <a
                      href="tel:1800-123-4567"
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary-blue transition-colors group"
                    >
                      <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                        <PhoneIcon sx={{ fontSize: 16 }} className="text-green-600" />
                      </div>
                      <span>1800-123-4567</span>
                    </a>

                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <LocationOnIcon sx={{ fontSize: 16 }} className="text-purple-600" />
                      </div>
                      <span>
                        123 Commerce Street,
                        <br />
                        New York, NY 10001
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Links Sections */}
                {footerLinks.map((section, i) => (
                  <div key={i}>
                    <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">
                      {section.title}
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {section.links.map((link, j) => (
                        <li key={j}>
                          <Link
                            to={link.redirect}
                            className="text-sm text-gray-600 hover:text-primary-blue hover:translate-x-1 inline-block transition-all"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Newsletter Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Subscribe to Our Newsletter
                    </h3>
                    <p className="text-sm text-gray-600">
                      Get the latest updates on new products and upcoming sales
                    </p>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent w-full md:w-72"
                    />
                    <button className="px-6 py-3 bg-primary-blue text-white font-medium rounded-lg hover:bg-blue-600 transition-all whitespace-nowrap shadow-md hover:shadow-lg">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t pt-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Copyright */}
                  <p className="text-sm text-gray-600">
                    © {new Date().getFullYear()} {" "}
                    <span className="text-primary-blue font-semibold">Best2Buy</span>. All rights reserved.
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 mr-2">Follow Us:</span>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-all text-gray-600"
                    >
                      <FacebookIcon sx={{ fontSize: 18 }} />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 bg-gray-100 hover:bg-sky-500 hover:text-white rounded-lg flex items-center justify-center transition-all text-gray-600"
                    >
                      <TwitterIcon sx={{ fontSize: 18 }} />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 bg-gray-100 hover:bg-pink-600 hover:text-white rounded-lg flex items-center justify-center transition-all text-gray-600"
                    >
                      <InstagramIcon sx={{ fontSize: 18 }} />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 bg-gray-100 hover:bg-red-600 hover:text-white rounded-lg flex items-center justify-center transition-all text-gray-600"
                    >
                      <YouTubeIcon sx={{ fontSize: 18 }} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
      </footer>
      </>
    )}
    </>
  );
};

export default Footer;
