import { Link, useNavigate } from 'react-router-dom';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../../actions/userAction';

const navMenu = [
    {
        icon: <EqualizerIcon />,
        label: "Dashboard",
        ref: "/admin/dashboard",
    },
    {
        icon: <ShoppingBagIcon />,
        label: "Orders",
        ref: "/admin/orders",
    },
    {
        icon: <InventoryIcon />,
        label: "Products",
        ref: "/admin/products",
    },
    {
        icon: <AddBoxIcon />,
        label: "Add Product",
        ref: "/admin/new_product",
    },
    {
        icon: <GroupIcon />,
        label: "Users",
        ref: "/admin/users",
    },
    {
        icon: <ReviewsIcon />,
        label: "Reviews",
        ref: "/admin/reviews",
    },
    {
        icon: <AccountBoxIcon />,
        label: "My Profile",
        ref: "/account",
    },
    {
        icon: <LogoutIcon />,
        label: "Logout",
    },
];

const Sidebar = ({ activeTab, setToggleSidebar }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        navigate("/login");
    }

    return (
        <aside className="sidebar z-10 sm:z-0 block min-h-screen fixed left-0 pb-14 max-h-screen w-3/4 sm:w-1/5 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-x-hidden border-r border-gray-700 shadow-2xl">
            {/* User Profile Card */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl shadow-lg my-4 mx-3.5">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl font-bold border-2 border-white">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex flex-col gap-0 flex-1">
                    <span className="font-semibold text-base">{user.name}</span>
                    <span className="text-blue-100 text-xs">{user.email}</span>
                </div>
                <button 
                    onClick={() => setToggleSidebar(false)} 
                    className="sm:hidden bg-white/20 backdrop-blur-sm ml-auto rounded-full w-9 h-9 flex items-center justify-center hover:bg-white/30 transition-all"
                >
                    <CloseIcon fontSize="small" />
                </button>
            </div>

            {/* Navigation Menu */}
            <div className="flex flex-col w-full gap-1 my-8 px-3">
                {navMenu.map((item, index) => {
                    const { icon, label, ref } = item;
                    return (
                        <div key={index}>
                            {label === "Logout" ? (
                                <button 
                                    onClick={handleLogout} 
                                    className="w-full hover:bg-red-600/20 hover:border-l-4 hover:border-red-500 flex gap-3 items-center py-3 px-4 font-medium rounded-lg transition-all duration-200 group"
                                >
                                    <span className="group-hover:scale-110 transition-transform">{icon}</span>
                                    <span>{label}</span>
                                </button>
                            ) : (
                                <Link 
                                    to={ref} 
                                    className={`${
                                        activeTab === index 
                                            ? "bg-blue-600/30 border-l-4 border-blue-400 shadow-lg" 
                                            : "hover:bg-gray-700/50 hover:border-l-4 hover:border-gray-500"
                                    } flex gap-3 items-center py-3 px-4 font-medium rounded-lg transition-all duration-200 group`}
                                >
                                    <span className="group-hover:scale-110 transition-transform">{icon}</span>
                                    <span>{label}</span>
                                </Link>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Developer Credit Card */}
            <div className="flex flex-col gap-2 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow-lg mb-6 mt-28 mx-3.5 overflow-hidden border border-gray-700">
                <h5 className="text-gray-300 text-sm">Developed with ❤️ by:</h5>
                <div className="flex flex-col gap-0">
                    <a 
                        href="https://www.linkedin.com/in/jigar-sable" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="font-semibold text-base hover:text-blue-400 transition-colors"
                    >
                        mbhuvan
                    </a>
                    <a 
                        href="mailto:jigarsable21@gmail.com" 
                        className="text-gray-400 text-xs hover:text-blue-400 transition-colors"
                    >
                        mbhuvn898@gmail.com
                    </a>
                </div>
            </div>
        </aside>
    )
};

export default Sidebar;