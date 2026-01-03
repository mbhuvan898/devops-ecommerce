import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../../actions/userAction';
import { primaryMenuItems, NAV_LINKS } from '../../../config/navigationConfig';

const PrimaryDropDownMenu = ({ setTogglePrimaryDropDown, user }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        setTogglePrimaryDropDown(false);
    };

    return (
        <div
            className="absolute w-60 left-0 top-full bg-white shadow-2xl rounded overflow-hidden z-[9999]"
            onMouseEnter={() => setTogglePrimaryDropDown(true)}
            onMouseLeave={() => setTogglePrimaryDropDown(false)}
        >
            {/* ✅ SAFE ADMIN CHECK */}
            {user?.role === "admin" && (
                <Link
                    className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50"
                    to="/admin/dashboard"
                >
                    <DashboardIcon sx={{ fontSize: 18 }} className="text-primary-blue" />
                    Admin Dashboard
                </Link>
            )}

            <Link
                className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50"
                to={NAV_LINKS.ACCOUNT}
            >
                <AccountCircleIcon sx={{ fontSize: 18 }} className="text-primary-blue" />
                My Profile
            </Link>

            {primaryMenuItems.map((item, i) => (
                <Link
                    key={i}
                    className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50"
                    to={item.redirect}
                >
                    <span className="text-primary-blue">{item.icon}</span>
                    {item.title}
                    {item.showCounter && (
                        <span className="ml-auto mr-3 bg-gray-100 p-0.5 px-2 text-gray-600 rounded text-xs">
                            {wishlistItems.length}
                        </span>
                    )}
                </Link>
            ))}

            <div
                className="pl-3 py-3.5 flex gap-3 items-center hover:bg-gray-50 cursor-pointer"
                onClick={handleLogout}
            >
                <PowerSettingsNewIcon sx={{ fontSize: 18 }} className="text-primary-blue" />
                Logout
            </div>
        </div>
    );
};

export default PrimaryDropDownMenu;
