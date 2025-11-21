import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { clearErrors, getProductDetails, getSimilarProducts, newReview } from '../../actions/productAction';
import { NextBtn, PreviousBtn } from '../Home/Banner/Banner';
import ProductSlider from '../Home/ProductSlider/ProductSlider';
import Loader from '../Layouts/Loader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CachedIcon from '@mui/icons-material/Cached';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import ShareIcon from '@mui/icons-material/Share';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import { addItemsToCart } from '../../actions/cartAction';
import { getDeliveryDate, getDiscount } from '../../utils/functions';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [selectedImage, setSelectedImage] = useState(0);

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    const productId = params.id;
    const itemInWishlist = wishlistItems.some((i) => i.product === productId);
    const itemInCart = cartItems.some((i) => i.product === productId);

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(productId));
            enqueueSnackbar("Removed From Wishlist", { variant: "success" });
        } else {
            dispatch(addToWishlist(productId));
            enqueueSnackbar("Added To Wishlist", { variant: "success" });
        }
    }

    const reviewSubmitHandler = () => {
        if (rating === 0 || !comment.trim()) {
            enqueueSnackbar("Please provide rating and comment", { variant: "error" });
            return;
        }
        const formData = new FormData();
        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", productId);
        dispatch(newReview(formData));
        setOpen(false);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(productId));
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    }

    const handleDialogClose = () => {
        setOpen(!open);
    }

    const goToCart = () => {
        navigate('/cart');
    }

    const buyNow = () => {
        addToCartHandler();
        navigate('/shipping');
    }

    const shareProduct = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: `Check out ${product.name}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            enqueueSnackbar("Link copied to clipboard", { variant: "success" });
        }
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (reviewError) {
            enqueueSnackbar(reviewError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(productId));
    }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

    useEffect(() => {
        dispatch(getSimilarProducts(product?.category));
    }, [dispatch, product?.category]);

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={product.name} />
                    <MinCategory />
                    
                    <main className="mt-12 sm:mt-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
                        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                                <Link to="/" className="hover:text-[#228B22]">Home</Link>
                                <span>/</span>
                                <Link to="/products" className="hover:text-[#228B22]">Products</Link>
                                <span>/</span>
                                <span className="text-gray-900 font-medium">{product.category}</span>
                            </div>

                            {/* Main Product Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                                
                                {/* Left - Image Gallery */}
                                <div className="space-y-4">
                                    <div className="sticky top-20">
                                        {/* Main Image */}
                                        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 p-8 group">
                                            {/* Stock Badge */}
                                            {product.stock > 0 && product.stock <= 10 && (
                                                <div className="absolute top-6 left-6 z-20">
                                                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-xl animate-pulse">
                                                        Only {product.stock} left!
                                                    </div>
                                                </div>
                                            )}

                                            {/* Discount Badge */}
                                            {product.cuttedPrice > product.price && (
                                                <div className="absolute top-6 right-6 z-20">
                                                    <div className="bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white text-sm font-black px-4 py-2 rounded-full shadow-xl">
                                                        {getDiscount(product.price, product.cuttedPrice)}% OFF
                                                    </div>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="absolute top-20 right-6 z-20 flex flex-col gap-3">
                                                <button 
                                                    onClick={addToWishlistHandler}
                                                    className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 group/wishlist"
                                                >
                                                    <FavoriteIcon 
                                                        className={`${itemInWishlist ? "text-red-500" : "text-gray-400 group-hover/wishlist:text-red-500"} transition-colors`}
                                                    />
                                                </button>
                                                <button 
                                                    onClick={shareProduct}
                                                    className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 group/share"
                                                >
                                                    <ShareIcon className="text-gray-400 group-hover/share:text-[#228B22] transition-colors" />
                                                </button>
                                            </div>

                                            {/* Image Slider */}
                                            <div className="h-[500px] flex items-center justify-center">
                                                {product.images && product.images.length > 0 ? (
                                                    <Slider {...settings} className="w-full">
                                                        {product.images.map((item, i) => (
                                                            <div key={i}>
                                                                <img 
                                                                    draggable="false" 
                                                                    className="w-full h-[500px] object-contain group-hover:scale-105 transition-transform duration-500" 
                                                                    src={item.url} 
                                                                    alt={`${product.name} ${i + 1}`}
                                                                />
                                                            </div>
                                                        ))}
                                                    </Slider>
                                                ) : (
                                                    <img 
                                                        draggable="false" 
                                                        className="w-full h-[500px] object-contain" 
                                                        src="https://via.placeholder.com/500?text=No+Image" 
                                                        alt={product.name}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        {/* Thumbnail Images */}
                                        {product.images && product.images.length > 1 && (
                                            <div className="flex gap-3 overflow-x-auto pb-2">
                                                {product.images.map((item, i) => (
                                                    <div 
                                                        key={i}
                                                        onClick={() => setSelectedImage(i)}
                                                        className={`flex-shrink-0 w-24 h-24 rounded-xl border-2 cursor-pointer overflow-hidden transition-all duration-300 ${
                                                            selectedImage === i ? 'border-[#228B22] shadow-lg scale-105' : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                    >
                                                        <img 
                                                            src={item.url} 
                                                            alt={`thumb ${i + 1}`}
                                                            className="w-full h-full object-contain p-2"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right - Product Details */}
                                <div className="space-y-6">
                                    {/* Product Title & Rating */}
                                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h1 className="text-3xl font-black text-gray-900 mb-3 leading-tight">
                                                    {product.name}
                                                </h1>
                                                
                                                {/* Rating */}
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="flex items-center gap-2 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white px-4 py-2 rounded-xl shadow-lg">
                                                        <span className="text-lg font-bold">
                                                            {product.ratings ? product.ratings.toFixed(1) : '0.0'}
                                                        </span>
                                                        <StarIcon sx={{ fontSize: '20px' }} />
                                                    </div>
                                                    <span className="text-gray-600 font-medium">
                                                        {product.numOfReviews} Reviews
                                                    </span>
                                                </div>

                                                {/* Brand */}
                                                {product.brand && (
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className="text-sm text-gray-500">Brand:</span>
                                                        <div className="flex items-center gap-2">
                                                            {product.brand.logo && (
                                                                <img 
                                                                    src={product.brand.logo.url} 
                                                                    alt={product.brand.name}
                                                                    className="h-8 object-contain"
                                                                />
                                                            )}
                                                            <span className="font-bold text-gray-900">{product.brand.name}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Price Section */}
                                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6">
                                            <p className="text-sm text-[#228B22] font-bold mb-2">💰 Special Price</p>
                                            <div className="flex items-baseline gap-3 mb-2">
                                                <span className="text-4xl font-black text-gray-900">
                                                    ₹{product.price?.toLocaleString()}
                                                </span>
                                                {product.cuttedPrice > product.price && (
                                                    <>
                                                        <span className="text-xl text-gray-500 line-through">
                                                            ₹{product.cuttedPrice?.toLocaleString()}
                                                        </span>
                                                        <span className="text-lg text-[#228B22] font-bold">
                                                            Save ₹{(product.cuttedPrice - product.price).toLocaleString()}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600">Inclusive of all taxes</p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-4 mb-6">
                                            {product.stock > 0 ? (
                                                <>
                                                    <button 
                                                        onClick={itemInCart ? goToCart : addToCartHandler}
                                                        className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-black py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                                                    >
                                                        <ShoppingCartIcon />
                                                        {itemInCart ? "GO TO CART" : "ADD TO CART"}
                                                    </button>
                                                    <button
                                                       onClick={buyNow}
                                                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-extrabold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 hover:from-green-600 hover:to-green-700 active:scale-95"
                                                    > 
                                                     < FlashOnIcon className="animate-pulse" />
                                                       BUY NOW
                                                    </button>
 
                                                </>
                                            ) : (
                                                <button 
                                                    disabled
                                                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-black py-4 rounded-xl shadow-xl cursor-not-allowed opacity-75"
                                                >
                                                    OUT OF STOCK
                                                </button>
                                            )}
                                        </div>

                                        {/* Delivery Info */}
                                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                                    <LocalShippingIcon className="text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">Fast Delivery</p>
                                                    <p className="text-sm text-gray-600">Get it by {getDeliveryDate()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Offers Section */}
                                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
                                        <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#228B22] to-[#32CD32] flex items-center justify-center">
                                                <LocalOfferIcon className="text-white" sx={{ fontSize: '20px' }} />
                                            </div>
                                            Available Offers
                                        </h2>
                                        <div className="space-y-4">
                                            {[
                                                "Get 15% instant discount on first purchase",
                                                "No cost EMI available on orders above ₹5,000",
                                                "Extra 5% off with Best2Buy SuperCoins"
                                            ].map((offer, i) => (
                                                <div key={i} className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                                                    <LocalOfferIcon className="text-[#228B22] flex-shrink-0" sx={{ fontSize: '20px' }} />
                                                    <p className="text-sm text-gray-700 font-medium">{offer}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Trust Badges */}
                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { icon: <VerifiedUserIcon />, text: `${product.warranty || 1} Year Warranty`, color: 'from-blue-500 to-cyan-500' },
                                            { icon: <CachedIcon />, text: '7 Days Return', color: 'from-purple-500 to-pink-500' },
                                            { icon: <SecurityIcon />, text: '100% Secure', color: 'from-green-500 to-emerald-500' }
                                        ].map((badge, i) => (
                                            <div key={i} className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200 text-center hover:scale-105 transition-transform">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center mx-auto mb-2`}>
                                                    <span className="text-white">{badge.icon}</span>
                                                </div>
                                                <p className="text-xs font-bold text-gray-700">{badge.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Product Details Sections */}
                            <div className="space-y-6">
                                
                                {/* Highlights */}
                                {product.highlights && product.highlights.length > 0 && (
                                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
                                        <h2 className="text-2xl font-black text-gray-900 mb-6">Key Features</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {product.highlights.map((highlight, i) => (
                                                <div key={i} className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                                                    <CheckCircleIcon className="text-[#228B22] flex-shrink-0 mt-0.5" />
                                                    <p className="text-gray-700">{highlight}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Description */}
                                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
                                    <h2 className="text-2xl font-black text-gray-900 mb-6">Product Description</h2>
                                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                                </div>

                                {/* Specifications */}
                                {product.specifications && product.specifications.length > 0 && (
                                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
                                        <h2 className="text-2xl font-black text-gray-900 mb-6">Specifications</h2>
                                        <div className="space-y-3">
                                            {product.specifications.map((spec, i) => (
                                                <div key={i} className="flex items-start py-4 border-b border-gray-100 last:border-0">
                                                    <p className="w-1/3 text-gray-600 font-medium">{spec.title}</p>
                                                    <p className="flex-1 text-gray-900">{spec.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Reviews Section */}
                                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h2 className="text-2xl font-black text-gray-900 mb-2">Ratings & Reviews</h2>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-2 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white px-4 py-2 rounded-xl">
                                                    <span className="text-2xl font-bold">
                                                        {product.ratings ? product.ratings.toFixed(1) : '0.0'}
                                                    </span>
                                                    <StarIcon />
                                                </div>
                                                <span className="text-gray-600">
                                                    Based on {product.numOfReviews} reviews
                                                </span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={handleDialogClose}
                                            className="bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                                        >
                                            Write Review
                                        </button>
                                    </div>

                                    {/* Review Dialog */}
                                    <Dialog
                                        open={open}
                                        onClose={handleDialogClose}
                                        maxWidth="sm"
                                        fullWidth
                                    >
                                        <DialogTitle className="border-b bg-gradient-to-r from-gray-50 to-white">
                                            <span className="text-xl font-bold">Submit Your Review</span>
                                        </DialogTitle>
                                        <DialogContent className="mt-4">
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                                        Your Rating
                                                    </label>
                                                    <Rating
                                                        onChange={(e) => setRating(e.target.value)}
                                                        value={rating}
                                                        size='large'
                                                        precision={0.5}
                                                    />
                                                </div>
                                                <TextField
                                                    label="Your Review"
                                                    multiline
                                                    rows={4}
                                                    fullWidth
                                                    variant="outlined"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                />
                                            </div>
                                        </DialogContent>
                                        <DialogActions className="p-4 bg-gray-50">
                                            <button 
                                                onClick={handleDialogClose}
                                                className="px-6 py-2 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-100 transition-all"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={reviewSubmitHandler}
                                                className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white font-bold shadow-lg hover:shadow-xl transition-all"
                                            >
                                                Submit Review
                                            </button>
                                        </DialogActions>
                                    </Dialog>

                                    {/* Reviews List */}
                                    <div className="space-y-4 mt-6">
                                        {product.reviews && product.reviews.length > 0 ? (
                                            <>
                                                {(viewAll ? product.reviews : product.reviews.slice(-3)).reverse().map((rev, i) => (
                                                    <div key={i} className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100">
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div>
                                                                <Rating value={rev.rating} readOnly size="small" precision={0.5} />
                                                                <p className="text-sm text-gray-600 font-medium mt-1">by {rev.name}</p>
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-700 leading-relaxed">{rev.comment}</p>
                                                    </div>
                                                ))}
                                                {product.reviews.length > 3 && (
                                                    <button 
                                                        onClick={() => setViewAll(!viewAll)}
                                                        className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 font-bold rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all"
                                                    >
                                                        {viewAll ? "Show Less Reviews" : `View All ${product.reviews.length} Reviews`}
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <div className="text-center py-12">
                                                <p className="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Similar Products */}
                            <div className="mt-12">
                                <div className="text-center mb-8">
                                    <h2 className="text-4xl font-black text-gray-900 mb-2">You May Also Like</h2>
                                    <p className="text-gray-600">Similar products based on category</p>
                                </div>
                                <ProductSlider title={"Similar Products"} tagline={"Based on the category"} />
                            </div>

                        </div>
                    </main>
                </>
            )}
        </>
    );
};

export default ProductDetails;