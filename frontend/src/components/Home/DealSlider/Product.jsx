// File: frontend/src/components/DealSlider/Product.jsx

import { Link } from 'react-router-dom';

const Product = ({ image, name, offer, tag }) => {
    return (
        <Link 
            to="/products" 
            className="group flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border-2 border-gray-100 hover:border-[#228B22] hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer relative overflow-hidden h-full"
        >
            {/* Decorative background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#228B22]/0 to-[#228B22]/0 group-hover:from-[#228B22]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
            
            {/* Offer Badge */}
            {offer && (
                <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    {offer}
                </div>
            )}

            {/* Product Image */}
            <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                <img 
                    draggable="false" 
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" 
                    src={image} 
                    alt={name} 
                />
            </div>

            {/* Product Info */}
            <div className="relative w-full space-y-2 text-center">
                {/* Product Name */}
                <h2 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-[#228B22] transition-colors px-2">
                    {name}
                </h2>
                
                {/* Tag */}
                {tag && (
                    <span className="text-xs text-gray-500 font-medium block">
                        {tag}
                    </span>
                )}

                {/* Shop Now Button - appears on hover */}
                <button className="w-full mt-2 py-2 bg-[#228B22] hover:bg-[#1a6b1a] text-white rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center justify-center gap-2 shadow-md">
                    Shop Now
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </button>
            </div>

            {/* Quick View Icon - appears on hover */}
            <div className="absolute bottom-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:bg-[#228B22] group/icon">
                <svg className="w-4 h-4 text-gray-700 group-hover/icon:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </div>
        </Link>
    );
};

export default Product;