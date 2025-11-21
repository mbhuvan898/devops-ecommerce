import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProducts } from '../../actions/productAction';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import Product from './Product';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StarIcon from '@mui/icons-material/Star';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import MetaData from '../Layouts/MetaData';
import { useLocation } from 'react-router-dom';

const Products = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const location = useLocation();

    const [price, setPrice] = useState([0, 200000]);
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [brand, setBrand] = useState("");
    const [productType, setProductType] = useState("");
    const [ratings, setRatings] = useState(0);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    // filter toggles
    const [priceToggle, setPriceToggle] = useState(true);
    const [brandToggle, setBrandToggle] = useState(true);
    const [ratingsToggle, setRatingsToggle] = useState(true);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // Dynamic brands based on category/subcategory
    const [availableBrands, setAvailableBrands] = useState([]);

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
    const keyword = params.keyword;

    // Override resultPerPage to show more products
    const itemsPerPage = 24; // Increased to 24

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    }

    const clearFilters = () => {
        setPrice([0, 200000]);
        setCategory("");
        setSubcategory("");
        setBrand("");
        setProductType("");
        setRatings(0);
        window.history.pushState({}, '', '/products');
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const categoryParam = queryParams.get('category');
        const subcategoryParam = queryParams.get('subcategory');
        const brandParam = queryParams.get('brand');
        const productTypeParam = queryParams.get('productType');

        if (categoryParam) {
            setCategory(categoryParam);
        } else {
            setCategory("");
        }

        if (subcategoryParam) {
            setSubcategory(subcategoryParam);
        } else {
            setSubcategory("");
        }

        if (brandParam) {
            setBrand(brandParam);
        } else {
            setBrand("");
        }

        if (productTypeParam) {
            setProductType(productTypeParam);
        } else {
            setProductType("");
        }

        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getProducts(keyword, categoryParam || "", subcategoryParam || "", brandParam || "", productTypeParam || "", price, ratings, currentPage));
    }, [dispatch, keyword, location.search, price, ratings, currentPage, error, enqueueSnackbar]);

    // Update available brands based on current category/subcategory/productType
    useEffect(() => {
        // Brand mapping based on category, subcategory, and productType
        const brandMapping = {
            "Mobiles": {
                "Smartphones": {
                    "Android": ["Samsung", "OnePlus", "Xiaomi", "Redmi", "Vivo", "Oppo", "Realme", "Motorola"],
                    "iPhone": ["Apple"],
                    "default": ["Samsung", "Apple", "OnePlus", "Xiaomi", "Redmi", "Vivo", "Oppo"]
                },
                "Accessories": {
                    "Chargers": ["Samsung", "Apple", "Mi", "Anker", "Belkin"],
                    "Cables": ["Apple", "Anker", "AmazonBasics", "Samsung"],
                    "Cases": ["Spigen", "OtterBox", "UAG", "Generic", "Ringke"],
                    "default": ["Samsung", "Apple", "Generic", "Mi", "Anker"]
                },
                "default": ["Samsung", "Apple", "OnePlus", "Xiaomi", "Generic"]
            },
            "Fashion": {
                "Men": {
                    "Shirts": ["Allen Solly", "Van Heusen", "Peter England", "Louis Philippe"],
                    "T-Shirts": ["Nike", "Adidas", "Puma", "H&M", "Zara"],
                    "Jeans": ["Levi's", "Wrangler", "Lee", "Pepe Jeans"],
                    "Shoes": ["Nike", "Adidas", "Bata", "Woodland", "Puma"],
                    "Watches": ["Fossil", "Timex", "Casio", "Titan"],
                    "default": ["Allen Solly", "Levi's", "Bata", "Van Heusen"]
                },
                "Women": {
                    "Sarees": ["FabIndia", "Biba", "W", "Manyavar"],
                    "Kurtis": ["Libas", "Biba", "W", "Global Desi"],
                    "Tops": ["H&M", "Zara", "Forever 21", "Vero Moda"],
                    "Dresses": ["H&M", "Zara", "Forever 21", "Mango"],
                    "Jewellery": ["Tanishq", "Mia by Tanishq", "Giva"],
                    "default": ["Libas", "FabIndia", "H&M", "Biba"]
                },
                "Kids": {
                    "default": ["Mothercare", "FirstCry", "Hopscotch", "United Colors of Benetton"]
                },
                "default": ["Allen Solly", "Libas", "Levi's", "Bata", "FabIndia", "H&M"]
            },
            "Electronics": {
                "Laptops": {
                    "Gaming": ["Dell", "Asus", "MSI", "Acer", "HP"],
                    "Business": ["HP", "Dell", "Lenovo", "Apple", "Asus"],
                    "2-in-1": ["HP", "Dell", "Lenovo", "Microsoft"],
                    "default": ["Dell", "HP", "Asus", "Lenovo", "Acer"]
                },
                "Cameras": {
                    "DSLR": ["Canon", "Nikon", "Sony"],
                    "Mirrorless": ["Sony", "Canon", "Fujifilm", "Olympus"],
                    "Action Cameras": ["GoPro", "DJI", "Sony"],
                    "default": ["Canon", "Sony", "Nikon"]
                },
                "Audio": {
                    "Headphones": ["Sony", "JBL", "Boat", "Bose", "Sennheiser"],
                    "Speakers": ["JBL", "Boat", "Sony", "Bose", "Marshall"],
                    "Soundbars": ["Sony", "Samsung", "JBL", "Bose"],
                    "default": ["Sony", "JBL", "Boat", "Bose"]
                },
                "default": ["Dell", "Sony", "HP", "Canon", "JBL", "Boat", "Asus"]
            },
            "Home": {
                "Kitchen": {
                    "Cookware": ["Prestige", "Hawkins", "Pigeon", "Meyer"],
                    "Appliances": ["Philips", "Prestige", "Bajaj", "Morphy Richards"],
                    "default": ["Prestige", "Philips", "Hawkins"]
                },
                "default": ["Prestige", "Philips"]
            },
            "Appliances": {
                "Televisions": {
                    "Smart TVs": ["Samsung", "LG", "Sony", "Mi", "OnePlus"],
                    "LED TVs": ["Samsung", "LG", "Sony", "Panasonic"],
                    "Android TVs": ["Mi", "OnePlus", "Sony", "TCL"],
                    "default": ["Samsung", "LG", "Sony", "Mi"]
                },
                "Washing Machines": {
                    "Front Load": ["LG", "Samsung", "Bosch", "IFB"],
                    "Top Load": ["Whirlpool", "LG", "Samsung", "Godrej"],
                    "default": ["LG", "Samsung", "Whirlpool"]
                },
                "Refrigerators": {
                    "Single Door": ["Whirlpool", "Samsung", "LG", "Godrej"],
                    "Double Door": ["Samsung", "LG", "Whirlpool", "Haier"],
                    "default": ["Samsung", "LG", "Whirlpool"]
                },
                "default": ["Samsung", "LG", "Whirlpool"]
            },
            "Furniture": {
                "Living Room": {
                    "Sofas": ["Urban Ladder", "Pepperfry", "IKEA", "Durian"],
                    "default": ["Urban Ladder", "IKEA", "Pepperfry"]
                },
                "Bedroom": {
                    "Beds": ["HomeTown", "Urban Ladder", "IKEA", "Godrej Interio"],
                    "default": ["HomeTown", "Urban Ladder", "IKEA"]
                },
                "Office": {
                    "Chairs": ["Green Soul", "Featherlite", "IKEA", "Godrej"],
                    "Desks": ["IKEA", "Urban Ladder", "Wakefit"],
                    "default": ["Green Soul", "IKEA", "Urban Ladder"]
                },
                "default": ["Urban Ladder", "HomeTown", "IKEA", "Green Soul"]
            },
            "Beauty,Toys & more": {
                "Beauty & Grooming": {
                    "Makeup": ["Lakme", "Maybelline", "L'Oreal", "MAC", "Nykaa"],
                    "Perfumes": ["Fogg", "Wild Stone", "Engage", "Skinn"],
                    "default": ["Lakme", "Maybelline", "L'Oreal"]
                },
                "Toys & Games": {
                    "Soft Toys": ["Disney", "Hamleys", "Archies"],
                    "Action Figures": ["Hot Wheels", "Hasbro", "Marvel"],
                    "Puzzles": ["Ravensburger", "Funskool"],
                    "Board Games": ["LEGO", "Hasbro", "Mattel", "Funskool"],
                    "default": ["LEGO", "Hot Wheels", "Hasbro"]
                },
                "default": ["Lakme", "LEGO", "Maybelline", "Hot Wheels"]
            },
            "Grocery": {
                "Fruits & Vegetables": {
                    "Fresh Fruits": ["Fresh Farms", "Fresho", "Mother Dairy"],
                    "default": ["Fresh Farms", "Fresho"]
                },
                "Snacks & Beverages": {
                    "Chips": ["Lays", "Kurkure", "Bingo", "Haldiram's"],
                    "Soft Drinks": ["Coca-Cola", "Pepsi", "Sprite", "Thums Up"],
                    "Biscuits": ["Britannia", "Parle", "Sunfeast", "Oreo"],
                    "default": ["Lays", "Coca-Cola", "Britannia"]
                },
                "Essentials": {
                    "Detergents": ["Tide", "Ariel", "Surf Excel", "Wheel"],
                    "default": ["Tide", "Ariel"]
                },
                "default": ["Fresh Farms", "Lays", "Coca-Cola", "Britannia", "Tide"]
            }
        };

        let brands = [];

        if (category && brandMapping[category]) {
            if (subcategory && brandMapping[category][subcategory]) {
                if (productType && brandMapping[category][subcategory][productType]) {
                    brands = brandMapping[category][subcategory][productType];
                } else if (brandMapping[category][subcategory].default) {
                    brands = brandMapping[category][subcategory].default;
                } else {
                    brands = Object.values(brandMapping[category][subcategory]).flat();
                }
            } else if (brandMapping[category].default) {
                brands = brandMapping[category].default;
            }
        }

        const uniqueBrands = [...new Set(brands)];
        setAvailableBrands(uniqueBrands.length > 0 ? uniqueBrands : ['Samsung', 'Apple', 'Dell', 'Sony', 'Prestige', 'LG']);
    }, [category, subcategory, productType]);

    const FilterSection = () => (
        <div className="flex flex-col gap-0 overflow-hidden">
            {/* price slider filter */}
            <div className="border-b border-gray-100">
                <button
                    onClick={() => setPriceToggle(!priceToggle)}
                    className="w-full flex justify-between items-center px-6 py-4 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent transition-all duration-300 group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#228B22] to-[#32CD32] flex items-center justify-center shadow-lg">
                            <TuneIcon sx={{ fontSize: 20, color: 'white' }} />
                        </div>
                        <span className="font-bold text-sm uppercase text-gray-800 tracking-wide">Price Range</span>
                    </div>
                    <div className="transform transition-transform duration-300" style={{ transform: priceToggle ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <ExpandMoreIcon sx={{ fontSize: 24, color: "#228B22" }} />
                    </div>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${priceToggle ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-6">
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            min={0}
                            max={200000}
                            sx={{
                                color: '#228B22',
                                height: 8,
                                '& .MuiSlider-thumb': {
                                    backgroundColor: '#fff',
                                    border: '3px solid #228B22',
                                    width: 24,
                                    height: 24,
                                    boxShadow: '0 4px 12px rgba(34, 139, 34, 0.3)',
                                    '&:hover, &.Mui-focusVisible': {
                                        boxShadow: '0 0 0 10px rgba(34, 139, 34, 0.16)',
                                    },
                                    '&:before': {
                                        boxShadow: 'none',
                                    },
                                },
                                '& .MuiSlider-track': {
                                    background: 'linear-gradient(90deg, #228B22 0%, #32CD32 100%)',
                                    border: 'none',
                                    height: 8,
                                },
                                '& .MuiSlider-rail': {
                                    backgroundColor: '#e5e7eb',
                                    height: 8,
                                },
                                '& .MuiSlider-valueLabel': {
                                    backgroundColor: '#228B22',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                },
                            }}
                        />

                        <div className="flex gap-3 items-center mt-6">
                            <div className="flex-1 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#228B22]/10 to-[#32CD32]/10 rounded-xl blur-sm"></div>
                                <div className="relative bg-white border-2 border-[#228B22] px-4 py-3 rounded-xl text-center">
                                    <span className="text-xs text-gray-500 block mb-1">Min</span>
                                    <span className="text-lg font-bold text-gray-900">₹{price[0].toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="w-8 h-0.5 bg-gradient-to-r from-[#228B22] to-[#32CD32] rounded-full"></div>
                            <div className="flex-1 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#32CD32]/10 to-[#228B22]/10 rounded-xl blur-sm"></div>
                                <div className="relative bg-white border-2 border-[#228B22] px-4 py-3 rounded-xl text-center">
                                    <span className="text-xs text-gray-500 block mb-1">Max</span>
                                    <span className="text-lg font-bold text-gray-900">₹{price[1].toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* brand filter */}
            <div className="border-b border-gray-100">
                <button
                    onClick={() => setBrandToggle(!brandToggle)}
                    className="w-full flex justify-between items-center px-6 py-4 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent transition-all duration-300 group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#228B22] to-[#32CD32] flex items-center justify-center shadow-lg">
                            <FilterListIcon sx={{ fontSize: 20, color: 'white' }} />
                        </div>
                        <div className="text-left">
                            <span className="font-bold text-sm uppercase text-gray-800 tracking-wide block">Brands</span>
                            <span className="text-xs text-gray-500">{availableBrands.length} available</span>
                        </div>
                    </div>
                    <div className="transform transition-transform duration-300" style={{ transform: brandToggle ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <ExpandMoreIcon sx={{ fontSize: 24, color: "#228B22" }} />
                    </div>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${brandToggle ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-6 max-h-80 overflow-y-auto premium-scrollbar">
                        {availableBrands.length > 0 ? (
                            <FormControl className="w-full">
                                <RadioGroup
                                    value={brand}
                                    onChange={(e) => {
                                        setBrand(e.target.value);
                                        const params = new URLSearchParams(location.search);
                                        params.set('brand', e.target.value);
                                        window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
                                    }}
                                >
                                    {availableBrands.map((brandName, idx) => (
                                        <label 
                                            key={idx}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent cursor-pointer transition-all duration-300 group"
                                        >
                                            <Radio 
                                                value={brandName}
                                                size="small" 
                                                sx={{ 
                                                    color: '#d1d5db',
                                                    '&.Mui-checked': { 
                                                        color: '#228B22',
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 24,
                                                    },
                                                }} 
                                            />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-[#228B22] transition-colors">
                                                {brandName}
                                            </span>
                                        </label>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <FilterListIcon sx={{ fontSize: 32, color: '#9ca3af' }} />
                                </div>
                                <p className="text-sm text-gray-500">No brands available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ratings filter */}
            <div>
                <button
                    onClick={() => setRatingsToggle(!ratingsToggle)}
                    className="w-full flex justify-between items-center px-6 py-4 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent transition-all duration-300 group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#228B22] to-[#32CD32] flex items-center justify-center shadow-lg">
                            <StarIcon sx={{ fontSize: 20, color: 'white' }} />
                        </div>
                        <span className="font-bold text-sm uppercase text-gray-800 tracking-wide">Customer Ratings</span>
                    </div>
                    <div className="transform transition-transform duration-300" style={{ transform: ratingsToggle ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <ExpandMoreIcon sx={{ fontSize: 24, color: "#228B22" }} />
                    </div>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${ratingsToggle ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-6">
                        <FormControl className="w-full">
                            <RadioGroup
                                value={ratings}
                                onChange={(e) => setRatings(e.target.value)}
                            >
                                {[4, 3, 2, 1].map((rating) => (
                                    <label 
                                        key={rating}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent cursor-pointer transition-all duration-300 group"
                                    >
                                        <Radio 
                                            value={rating}
                                            size="small" 
                                            sx={{ 
                                                color: '#d1d5db',
                                                '&.Mui-checked': { 
                                                    color: '#228B22',
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 24,
                                                },
                                            }} 
                                        />
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white px-3 py-1 rounded-lg shadow-md">
                                                <span className="text-sm font-bold">{rating}</span>
                                                <StarIcon sx={{ fontSize: 14 }} />
                                            </div>
                                            <span className="text-sm text-gray-600 font-medium">& above</span>
                                        </div>
                                    </label>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <MetaData title="All Products | Best2Buy" />
            <MinCategory />

            <main className="w-full mt-14 sm:mt-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex gap-6">
                        
                        {/* Desktop Sidebar */}
                        <aside className="hidden lg:block w-80 flex-shrink-0">
                            <div className="sticky top-20 space-y-6">
                                {/* Filter Header */}
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                                    <div className="bg-gradient-to-r from-[#228B22] to-[#32CD32] px-6 py-5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                                    <TuneIcon sx={{ fontSize: 26, color: 'white' }} />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-bold text-white">Filters</h2>
                                                    <p className="text-xs text-white/80">Refine your search</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={clearFilters}
                                                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl text-xs font-bold transition-all duration-300 border border-white/30 hover:scale-105"
                                            >
                                                Clear All
                                            </button>
                                        </div>
                                    </div>

                                    {/* Active Filters */}
                                    {(category || subcategory || brand || productType || ratings > 0) && (
                                        <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
                                            <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Active Filters</p>
                                            <div className="flex flex-wrap gap-2">
                                                {category && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white text-xs rounded-full font-semibold shadow-md">
                                                        {category}
                                                        <CloseIcon 
                                                            sx={{ fontSize: 14 }} 
                                                            className="cursor-pointer hover:scale-125 transition-transform"
                                                            onClick={() => setCategory("")}
                                                        />
                                                    </span>
                                                )}
                                                {subcategory && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white text-xs rounded-full font-semibold shadow-md">
                                                        {subcategory}
                                                        <CloseIcon 
                                                            sx={{ fontSize: 14 }} 
                                                            className="cursor-pointer hover:scale-125 transition-transform"
                                                            onClick={() => setSubcategory("")}
                                                        />
                                                    </span>
                                                )}
                                                {brand && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white text-xs rounded-full font-semibold shadow-md">
                                                        {brand}
                                                        <CloseIcon 
                                                            sx={{ fontSize: 14 }} 
                                                            className="cursor-pointer hover:scale-125 transition-transform"
                                                            onClick={() => setBrand("")}
                                                        />
                                                    </span>
                                                )}
                                                {productType && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white text-xs rounded-full font-semibold shadow-md">
                                                        {productType}
                                                        <CloseIcon 
                                                            sx={{ fontSize: 14 }} 
                                                            className="cursor-pointer hover:scale-125 transition-transform"
                                                            onClick={() => setProductType("")}
                                                        />
                                                    </span>
                                                )}
                                                {ratings > 0 && (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white text-xs rounded-full font-semibold shadow-md">
                                                        {ratings}★+
                                                        <CloseIcon 
                                                            sx={{ fontSize: 14 }} 
                                                            className="cursor-pointer hover:scale-125 transition-transform"
                                                            onClick={() => setRatings(0)}
                                                        />
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <FilterSection />
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                            {/* Results Header */}
                            {!loading && products?.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                                {category || "All Products"}
                                            </h1>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <span className="font-semibold text-[#228B22]">{filteredProductsCount}</span>
                                                <span>products found</span>
                                                {subcategory && (
                                                    <>
                                                        <span className="text-gray-400">•</span>
                                                        <span className="font-medium">{subcategory}</span>
                                                    </>
                                                )}
                                                {productType && (
                                                    <>
                                                        <span className="text-gray-400">•</span>
                                                        <span className="font-medium">{productType}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Mobile Filter Button */}
                                        <button
                                            onClick={() => setMobileFilterOpen(true)}
                                            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                                        >
                                            <TuneIcon sx={{ fontSize: 20 }} />
                                            Filters
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* No Products Found */}
                            {!loading && products?.length === 0 && (
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
                                    <div className="max-w-md mx-auto">
                                        <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-3">No Products Found</h2>
                                        <p className="text-gray-600 mb-6">We couldn't find any products matching your filters. Try adjusting your search criteria.</p>
                                        
                                        {(category || subcategory || brand || productType || price[0] > 0 || price[1] < 200000 || ratings > 0) && (
                                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
                                                <p className="text-sm font-semibold text-gray-700 mb-3">Active Filters:</p>
                                                <div className="flex flex-wrap gap-2 justify-center">
                                                    {category && <span className="px-3 py-1 bg-[#228B22] text-white text-xs rounded-full">{category}</span>}
                                                    {subcategory && <span className="px-3 py-1 bg-[#228B22] text-white text-xs rounded-full">{subcategory}</span>}
                                                    {brand && <span className="px-3 py-1 bg-[#228B22] text-white text-xs rounded-full">{brand}</span>}
                                                    {productType && <span className="px-3 py-1 bg-[#228B22] text-white text-xs rounded-full">{productType}</span>}
                                                    {(price[0] > 0 || price[1] < 200000) && (
                                                        <span className="px-3 py-1 bg-[#228B22] text-white text-xs rounded-full">
                                                            ₹{price[0].toLocaleString()} - ₹{price[1].toLocaleString()}
                                                        </span>
                                                    )}
                                                    {ratings > 0 && <span className="px-3 py-1 bg-[#228B22] text-white text-xs rounded-full">{ratings}★+</span>}
                                                </div>
                                            </div>
                                        )}
                                        
                                        <button 
                                            onClick={clearFilters}
                                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Clear All Filters
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Products Grid */}
                            {loading ? (
                                <Loader />
                            ) : (
                                products?.length > 0 && (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-8">
                                            {products.map((product) => (
                                                <Product {...product} key={product._id} />
                                            ))}
                                        </div>

                                        {/* Pagination */}
                                        {filteredProductsCount > itemsPerPage && (
                                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                                <Pagination
                                                    count={Math.ceil(filteredProductsCount / itemsPerPage)}
                                                    page={currentPage}
                                                    onChange={(e, val) => setCurrentPage(val)}
                                                    size="large"
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        '& .MuiPaginationItem-root': {
                                                            color: '#228B22',
                                                            fontWeight: 700,
                                                            fontSize: '1rem',
                                                            minWidth: '44px',
                                                            height: '44px',
                                                            borderRadius: '12px',
                                                            border: '2px solid transparent',
                                                            transition: 'all 0.3s ease',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(34, 139, 34, 0.1)',
                                                                transform: 'translateY(-2px)',
                                                                borderColor: '#228B22',
                                                            },
                                                        },
                                                        '& .Mui-selected': {
                                                            background: 'linear-gradient(135deg, #228B22 0%, #32CD32 100%) !important',
                                                            color: 'white',
                                                            boxShadow: '0 4px 16px rgba(34, 139, 34, 0.4)',
                                                            border: '2px solid #228B22 !important',
                                                            '&:hover': {
                                                                background: 'linear-gradient(135deg, #1a7a1a 0%, #228B22 100%) !important',
                                                                transform: 'translateY(-2px)',
                                                            },
                                                        },
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Sidebar */}
                {mobileFilterOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div 
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setMobileFilterOpen(false)}
                        />
                        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto animate-slide-in">
                            <div className="sticky top-0 z-10 bg-gradient-to-r from-[#228B22] to-[#32CD32] px-6 py-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <TuneIcon sx={{ fontSize: 26, color: 'white' }} />
                                        <h2 className="text-xl font-bold text-white">Filters</h2>
                                    </div>
                                    <button 
                                        onClick={() => setMobileFilterOpen(false)}
                                        className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all"
                                    >
                                        <CloseIcon sx={{ fontSize: 24, color: 'white' }} />
                                    </button>
                                </div>
                            </div>
                            <FilterSection />
                            <div className="p-6">
                                <button
                                    onClick={() => {
                                        setMobileFilterOpen(false);
                                    }}
                                    className="w-full py-4 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Global Styles */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-in {
                    from {
                        transform: translateX(100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }

                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }

                .product-card {
                    animation: fadeInUp 0.6s ease-out backwards;
                }

                .product-card:nth-child(1) { animation-delay: 0.05s; }
                .product-card:nth-child(2) { animation-delay: 0.1s; }
                .product-card:nth-child(3) { animation-delay: 0.15s; }
                .product-card:nth-child(4) { animation-delay: 0.2s; }
                .product-card:nth-child(5) { animation-delay: 0.25s; }

                .premium-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }

                .premium-scrollbar::-webkit-scrollbar-track {
                    background: linear-gradient(to bottom, #f3f4f6, #e5e7eb);
                    border-radius: 10px;
                }

                .premium-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #228B22, #32CD32);
                    border-radius: 10px;
                    transition: all 0.3s;
                }

                .premium-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #1a7a1a, #228B22);
                }

                * {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
            `}</style>
        </>
    );
};

export default Products;