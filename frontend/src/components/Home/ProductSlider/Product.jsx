// File: frontend/src/components/Product/Product.jsx

import { getDiscount } from '../../../utils/functions';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../actions/wishlistAction';
import { useSnackbar } from 'notistack';

const Product = (props) => {

    const { _id, name, images, ratings, numOfReviews, price, cuttedPrice } = props;

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { wishlistItems } = useSelector((state) => state.wishlist);
    const itemInWishlist = wishlistItems.some((i) => i.product === _id);

    const toggleWishlist = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(_id));
            enqueueSnackbar("Removed from wishlist", { variant: "success" });
        } else {
            dispatch(addToWishlist(_id));
            enqueueSnackbar("Added to wishlist", { variant: "success" });
        }
    };

    const productImage = images?.[0]?.url || "https://via.placeholder.com/300";

    return (
        <div className="
            group relative 
            bg-white/90 backdrop-blur-lg 
            rounded-3xl shadow-md hover:shadow-3xl 
            transition-all duration-500 
            border border-gray-200/70 
            overflow-visible 

            min-w-[300px]      /* WIDER */
            max-w-[320px]      /* WIDER */
            mx-4
        ">

            {/* Discount Badge */}
            {cuttedPrice > price && (
                <div className="absolute top-4 left-4 z-20">
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-500/40 blur-xl rounded-xl"></div>
                        <div className="
                            relative text-xs font-black 
                            bg-gradient-to-br from-red-500 to-orange-500 
                            text-white px-3 py-1.5 rounded-lg shadow-xl
                        ">
                            {getDiscount(price, cuttedPrice)}% OFF
                        </div>
                    </div>
                </div>
            )}

            {/* Wishlist Button */}
            <button
                onClick={toggleWishlist}
                className="
                    absolute top-4 right-4 z-20 
                    w-10 h-10 rounded-full 
                    bg-white/80 backdrop-blur-md shadow-lg 
                    flex items-center justify-center 
                    hover:scale-110 transition-all
                "
            >
                <FavoriteIcon
                    sx={{ fontSize: 22 }}
                    className={itemInWishlist ? "text-red-500 scale-110" : "text-gray-400"}
                />
            </button>

            <Link to={`/product/${_id}`} className="block p-5">

                {/* Product Image */}
                <div className="
                    relative w-full h-56 rounded-2xl overflow-hidden 
                    bg-gradient-to-br from-gray-50 to-gray-200 
                    mb-4
                ">
                    <div className="
                        absolute inset-0 bg-gradient-to-br 
                        from-primary-main/5 to-primary-green/10 
                        opacity-0 group-hover:opacity-100 
                        transition-opacity
                    "></div>

                    <img
                        draggable="false"
                        src={productImage}
                        alt={name}
                        className="
                            w-full h-full object-contain p-4 
                            transition-transform duration-500 
                            group-hover:scale-110
                        "
                    />
                </div>

                {/* Product Title */}
                <h2 className="
                    text-sm font-semibold text-gray-800 
                    group-hover:text-primary-main 
                    transition-colors 
                    line-clamp-2 min-h-[40px]
                ">
                    {name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3 mb-3">
                    <div className="
                        flex items-center gap-1 
                        bg-gradient-to-r from-primary-main to-primary-green 
                        text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md
                    ">
                        <span>{ratings?.toFixed(1) || "0.0"}</span>
                        <StarIcon sx={{ fontSize: 12 }} />
                    </div>

                    <span className="text-xs text-gray-500">
                        ({numOfReviews?.toLocaleString() || 0} reviews)
                    </span>
                </div>

                {/* Pricing Section */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-gray-900">
                            ₹{price?.toLocaleString()}
                        </span>

                        {cuttedPrice > price && (
                            <span className="text-sm text-gray-400 line-through">
                                ₹{cuttedPrice?.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {cuttedPrice > price && (
                        <span className="text-xs font-bold text-green-600">
                            You save ₹{(cuttedPrice - price).toLocaleString()}
                        </span>
                    )}
                </div>

            </Link>

            {/* Hover Accent */}
            <div className="
                h-1 bg-gradient-to-r 
                from-primary-main via-primary-green to-primary-main 
                opacity-0 group-hover:opacity-100 
                transition-all
            " />
        </div>
    );
};

export default Product;
