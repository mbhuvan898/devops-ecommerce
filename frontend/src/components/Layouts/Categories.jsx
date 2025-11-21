import mobiles from '../../assets/images/Categories/phone.png';
import fashion from '../../assets/images/Categories/fashion.png';
import electronics from '../../assets/images/Categories/electronics.png';
import home from '../../assets/images/Categories/home.png';
import appliances from '../../assets/images/Categories/appliances.png';
import furniture from '../../assets/images/Categories/furniture.png';
import beauty from '../../assets/images/Categories/beauty.png';
import grocery from '../../assets/images/Categories/grocery.png';
import { Link } from 'react-router-dom';

const catNav = [
  { name: "Mobiles", icon: mobiles, description: "Latest smartphones & accessories" },
  { name: "Fashion", icon: fashion, description: "Trending styles for everyone" },
  { name: "Electronics", icon: electronics, description: "Tech essentials & gadgets" },
  { name: "Home", icon: home, description: "Beautiful home décor" },
  { name: "Appliances", icon: appliances, description: "Smart home appliances" },
  { name: "Furniture", icon: furniture, description: "Comfort meets style" },
  { name: "Beauty, Toys & more", icon: beauty, description: "Beauty, toys & lifestyle" },
  { name: "Grocery", icon: grocery, description: "Fresh & organic products" },
];

const Categories = () => {
  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 bg-white relative overflow-hidden">
      {/* subtle green blobs */}
      <div className="absolute -left-20 -top-16 w-72 h-72 rounded-full bg-primary-accent/6 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-16 w-72 h-72 rounded-full bg-primary-green/6 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary-accent/10 px-4 py-2 rounded-full mb-4 border border-primary-accent/20">
            <span className="text-lg">🛍️</span>
            <span className="font-semibold text-primary-main text-xs uppercase tracking-wider">Shop by category</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight">Explore Our Collections</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Discover amazing products across categories — curated for quality and value.</p>

          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-primary-main to-primary-accent" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {catNav.map((item, idx) => (
            <Link
              key={idx}
              to={`/products?category=${encodeURIComponent(item.name)}`}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition transform hover:-translate-y-2 border border-gray-100"
              aria-label={`Browse ${item.name}`}
            >
              {/* unified brand hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-main to-primary-accent opacity-0 group-hover:opacity-8 transition-opacity duration-400" />

              <div className="relative p-5 sm:p-6 flex flex-col items-center text-center min-h-[170px] justify-center">
                <div className="relative mb-4 sm:mb-6">
                  <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition duration-300" style={{ background: 'linear-gradient(135deg,#1A4314, #4CAF50)' }} />

                  <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-inner">
                    <img
                      src={item.icon}
                      alt={item.name}
                      draggable="false"
                      className="h-12 w-12 sm:h-16 sm:w-16 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-main group-hover:to-primary-accent transition-colors duration-300">
                  {item.name}
                </h3>

                <p className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </p>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1A4314,#4CAF50)' }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-main to-primary-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary-main text-white font-semibold rounded-full shadow hover:shadow-xl transition transform hover:-translate-y-1"
          >
            View All Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
