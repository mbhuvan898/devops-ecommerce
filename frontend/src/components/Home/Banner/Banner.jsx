// File: frontend/src/components/Banner/Banner.jsx

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import gadgetSale from '../../../assets/images/Banners/gadget-sale.jpg';
import kitchenSale from '../../../assets/images/Banners/kitchen-sale.jpg';
import poco from '../../../assets/images/Banners/poco-m4-pro.webp';
import realme from '../../../assets/images/Banners/realme-9-pro.webp';
import fashionSale from '../../../assets/images/Banners/fashionsale.jpg';
import oppo from '../../../assets/images/Banners/oppo-reno7.webp';

export const PreviousBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <button 
        className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-xl shadow-xl hover:shadow-2xl flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group border border-white/50 hover:border-[#228B22] focus:outline-none focus:ring-2 focus:ring-[#228B22]/50"
        aria-label="Previous slide"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#228B22]/0 to-[#32CD32]/0 group-hover:from-[#228B22]/10 group-hover:to-[#32CD32]/10 transition-all duration-300"></div>
        <ArrowBackIosIcon 
          sx={{ fontSize: "22px", marginLeft: "6px" }} 
          className="text-gray-700 group-hover:text-[#228B22] transition-colors duration-300 relative z-10" 
        />
      </button>
    </div>
  )
}

export const NextBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <button 
        className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-xl shadow-xl hover:shadow-2xl flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group border border-white/50 hover:border-[#228B22] focus:outline-none focus:ring-2 focus:ring-[#228B22]/50"
        aria-label="Next slide"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#228B22]/0 to-[#32CD32]/0 group-hover:from-[#228B22]/10 group-hover:to-[#32CD32]/10 transition-all duration-300"></div>
        <ArrowForwardIosIcon 
          sx={{ fontSize: "22px" }} 
          className="text-gray-700 group-hover:text-[#228B22] transition-colors duration-300 relative z-10" 
        />
      </button>
    </div>
  )
}

const Banner = () => {

  const settings = {
    autoplay: true,
    autoplaySpeed: 4500,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    fade: true,
    cssEase: 'cubic-bezier(0.86, 0, 0.07, 1)',
    appendDots: dots => (
      <div className="custom-dots">
        <ul className="flex items-center justify-center gap-3"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <button 
        className="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-500 hover:w-8 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label={`Go to slide ${i + 1}`}
      ></button>
    )
  };

  const banners = [
    { img: gadgetSale, alt: "Gadget Sale" },
    { img: kitchenSale, alt: "Kitchen Sale" },
    { img: poco, alt: "Poco M4 Pro" },
    { img: fashionSale, alt: "Fashion Sale" },
    { img: realme, alt: "Realme 9 Pro" },
    { img: oppo, alt: "Oppo Reno 7" }
  ];

  return (
    <section className="relative w-full group/banner">
      <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-20">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Decorative background elements */}
          <div className="absolute -inset-8 bg-gradient-to-br from-[#228B22]/5 via-transparent to-[#32CD32]/5 rounded-3xl blur-2xl pointer-events-none opacity-0 group-hover/banner:opacity-100 transition-opacity duration-500"></div>
          
          {/* Banner Container with premium styling */}
          <div className="relative h-56 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] rounded-3xl overflow-hidden shadow-2xl group-hover/banner:shadow-3xl transition-all duration-500">
            
            {/* Premium gradient overlay for better text visibility and depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-black/10 z-10 pointer-events-none group-hover/banner:from-black/40 transition-all duration-500"></div>
            
            {/* Decorative premium border glow */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20 z-10 pointer-events-none group-hover/banner:ring-[#228B22]/40 transition-all duration-500"></div>
            
            {/* Corner accent decorations */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-white/40 rounded-tl-2xl pointer-events-none z-20 group-hover/banner:border-[#228B22]/60 transition-colors duration-500"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-white/40 rounded-br-2xl pointer-events-none z-20 group-hover/banner:border-[#228B22]/60 transition-colors duration-500"></div>
            
            <Slider {...settings} className="h-full banner-slider">
              {banners.map((banner, i) => (
                <div key={i} className="relative h-56 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] focus:outline-none">
                  <img 
                    draggable="false" 
                    className="w-full h-full object-cover" 
                    src={banner.img} 
                    alt={banner.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </Slider>

            {/* Banner indicators container - Modern design */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-black/30 backdrop-blur-xl px-6 py-3 rounded-full hover:bg-black/40 transition-all duration-300">
              {/* Custom dots will be rendered here by Slick */}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;