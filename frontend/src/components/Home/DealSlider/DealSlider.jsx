// File: frontend/src/components/DealSlider/DealSlider.jsx

import Product from './Product';
import { Link } from 'react-router-dom';
import { offerProducts } from '../../../utils/constants';
import { getRandomProducts } from '../../../utils/functions';

const DealSlider = ({ title }) => {
    const products = getRandomProducts(offerProducts, 12);

    // Define different card sizes for masonry layout
    const cardSizes = [
        'tall',      // 0
        'wide',      // 1
        'normal',    // 2
        'normal',    // 3
        'tall',      // 4
        'wide',      // 5
        'normal',    // 6
        'tall',      // 7
        'normal',    // 8
        'wide',      // 9
        'normal',    // 10
        'normal'     // 11
    ];

    return (
        <section className="bg-white w-full rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-[#228B22]/30 transition-all duration-500 group relative">
            
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #228B22 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
            }}></div>

            {/* Header Section */}
            <div className="relative flex px-6 py-6 justify-between items-center bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-100">
                {/* Decorative accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#228B22] to-[#32CD32] group-hover:w-2 transition-all duration-300"></div>
                
                <div className="ml-3 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#228B22] to-[#32CD32] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900">{title}</h1>
                        <p className="text-sm text-gray-600 font-medium">Handpicked deals just for you</p>
                    </div>
                </div>
                
                <Link to="/products" className="px-6 py-3 rounded-full bg-[#228B22] hover:bg-[#1a6b1a] text-white text-sm font-bold transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 flex items-center gap-2">
                    View All
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            {/* Pinterest-style Masonry Grid */}
            <div className="relative p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 auto-rows-auto">
                    
                    {products.map((item, i) => {
                        const size = cardSizes[i];
                        
                        // Define grid span classes based on size
                        let gridClass = '';
                        let heightClass = '';
                        
                        if (size === 'tall') {
                            gridClass = 'md:row-span-2';
                            heightClass = 'h-80 md:h-full';
                        } else if (size === 'wide') {
                            gridClass = 'md:col-span-2';
                            heightClass = 'h-64';
                        } else {
                            gridClass = '';
                            heightClass = 'h-64';
                        }

                        return (
                            <div key={i} className={`${gridClass} group`}>
                                <Link 
                                    to="/products" 
                                    className={`flex flex-col gap-3 p-4 bg-white rounded-2xl border-2 border-gray-100 hover:border-[#228B22] hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer relative overflow-hidden ${heightClass}`}
                                >
                                    {/* Decorative background on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#228B22]/0 to-[#228B22]/0 group-hover:from-[#228B22]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
                                    
                                    {/* Offer Badge */}
                                    {item.offer && (
                                        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                                            {item.offer}
                                        </div>
                                    )}

                                    {/* Wishlist Icon */}
                                    <div className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:bg-[#228B22] group/fav z-10">
                                        <svg className="w-4 h-4 text-gray-700 group-hover/fav:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>

                                    {/* Product Image */}
                                    <div className={`relative ${size === 'tall' ? 'flex-1' : 'h-40'} rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center`}>
                                        <img 
                                            draggable="false" 
                                            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" 
                                            src={item.image} 
                                            alt={item.name} 
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="relative space-y-2">
                                        {/* Product Name */}
                                        <h2 className={`font-bold ${size === 'wide' ? 'text-base' : 'text-sm'} text-gray-900 line-clamp-2 group-hover:text-[#228B22] transition-colors`}>
                                            {item.name}
                                        </h2>
                                        
                                        {/* Tag */}
                                        {item.tag && (
                                            <span className="text-xs text-gray-500 font-medium block">
                                                {item.tag}
                                            </span>
                                        )}

                                        {/* Shop Now Button - appears on hover for wide cards */}
                                        {size === 'wide' && (
                                            <button className="w-full mt-2 py-2 bg-[#228B22] hover:bg-[#1a6b1a] text-white rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center justify-center gap-2 shadow-md">
                                                Shop Now
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>

                                    {/* Quick View Icon - appears on hover for normal/tall cards */}
                                    {size !== 'wide' && (
                                        <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:bg-[#228B22] group/icon">
                                            <svg className="w-4 h-4 text-gray-700 group-hover/icon:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    )}
                                </Link>
                            </div>
                        );
                    })}

                </div>

                {/* Bottom Info Cards */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border-2 border-gray-100 hover:border-[#228B22] transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#228B22]/10 flex items-center justify-center">
                                <svg className="w-5 h-5 text-[#228B22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-medium">Flash Sale</div>
                                <div className="text-sm font-bold text-gray-900">Ends Today</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border-2 border-gray-100 hover:border-[#228B22] transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#228B22]/10 flex items-center justify-center">
                                <svg className="w-5 h-5 text-[#228B22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-medium">Best Price</div>
                                <div className="text-sm font-bold text-gray-900">Guaranteed</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border-2 border-gray-100 hover:border-[#228B22] transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#228B22]/10 flex items-center justify-center">
                                <svg className="w-5 h-5 text-[#228B22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-medium">Top Rated</div>
                                <div className="text-sm font-bold text-gray-900">4.5★ & Above</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border-2 border-gray-100 hover:border-[#228B22] transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#228B22]/10 flex items-center justify-center">
                                <svg className="w-5 h-5 text-[#228B22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-medium">Verified</div>
                                <div className="text-sm font-bold text-gray-900">Authentic</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                @media (min-width: 768px) {
                    .grid {
                        grid-auto-flow: dense;
                    }
                }
            `}</style>
        </section>
    );
};

export default DealSlider;