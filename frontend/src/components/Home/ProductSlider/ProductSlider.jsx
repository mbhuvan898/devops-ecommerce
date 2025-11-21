import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getRandomProducts } from '../../../utils/functions';
import Product from './Product';

const ProductSlider = ({ title = "Featured", tagline = "" }) => {

    const { loading, products } = useSelector((state) => state.products);

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3.3, // keep 3.3 to fit max-w-7xl and show wider cards
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2400,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 3 } },
            { breakpoint: 1024, settings: { slidesToShow: 2.2 } },
            { breakpoint: 768, settings: { slidesToShow: 1.5 } },
            { breakpoint: 480, settings: { slidesToShow: 1.1 } }
        ]
    };

    return (
        <section className="bg-white/80 backdrop-blur-xl w-full rounded-3xl shadow-xl overflow-visible border border-gray-200/80 transition-all duration-500 group my-6">
            <div className="relative flex px-8 py-6 justify-between items-center bg-gradient-to-r from-white/90 to-emerald-50/40 backdrop-blur-md border-b border-gray-100">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-main to-primary-green"></div>

                <div className="flex flex-col gap-1 ml-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-main to-primary-green flex items-center justify-center shadow-lg">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-black text-primary-main tracking-tight">{title}</h1>
                    </div>
                    <p className="text-sm text-gray-600 font-medium ml-14">{tagline}</p>
                </div>

                <Link to="/products" className="bg-gradient-to-r from-primary-main to-primary-green text-sm font-bold text-white px-6 py-3 rounded-full shadow-lg transition-all uppercase tracking-wide">View All</Link>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-primary-main border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-500 font-medium">Loading products…</p>
                    </div>
                </div>
            ) : (
                <div className="px-6 py-8 bg-gradient-to-br from-white to-emerald-50/30">
                    <Slider {...settings}>
                        {products && getRandomProducts(products, 16).map((product) => (
                            <Product {...product} key={product._id} />
                        ))}
                    </Slider>
                </div>
            )}
        </section>
    );
};

export default ProductSlider;
