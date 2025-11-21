import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Searchbar from './Searchbar';
import logo from '../../../assets/images/logo.png';

import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import SecondaryDropDownMenu from './SecondaryDropDownMenu';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
  const [toggleSecondaryDropDown, setToggleSecondaryDropDown] = useState(false);

  return (
    <header
      className="
        fixed top-0 w-full z-50
        py-1.5
        shadow-lg border-b border-[#174b29]/30
        backdrop-blur-xl
      "
      style={{
        background: "linear-gradient(90deg, #155c2d 0%, #0f4722 100%)",
      }}
    >
      <div className="w-full max-w-screen-xl pl-0 pr-2 sm:pr-3 mx-auto flex justify-between items-center">

        {/* ⭐ LOGO + SEARCH */}
        <div className="flex items-center flex-1 gap-2 -ml-1">

          {/* LOGO */}
          <Link className="flex items-center shrink-0" to="/">
            <img
              draggable="false"
              src={logo}
              alt="Best2Buy Logo"
              className="object-contain"
              style={{
                height: "42px",
                width: "auto",
              }}
            />
          </Link>

          {/* SEARCH BAR */}
          <div className="flex-1 max-w-3xl flex items-center">
            <Searchbar />
          </div>

        </div>

        {/* ⭐ NAVIGATION */}
        <div className="flex items-center gap-3 sm:gap-5 relative ml-3">

          {/* LOGIN / PROFILE */}
          {isAuthenticated === false ? (
            <Link
              to="/login"
              className="
                px-4 py-1.5 
                bg-white text-[#155c2d] 
                font-semibold rounded-md shadow-md
                border border-green-300
                hover:bg-green-50 transition
                whitespace-nowrap text-sm
              "
            >
              Login
            </Link>
          ) : (
            <div
              className="relative flex items-center"
              onMouseEnter={() => setTogglePrimaryDropDown(true)}
              onMouseLeave={() => setTogglePrimaryDropDown(false)}
            >
              <span className="flex items-center text-white font-semibold gap-1 cursor-pointer text-sm whitespace-nowrap">
                {user.name && user.name.split(" ", 1)}
                {togglePrimaryDropDown ? (
                  <ExpandLessIcon sx={{ fontSize: 18 }} />
                ) : (
                  <ExpandMoreIcon sx={{ fontSize: 18 }} />
                )}
              </span>

              <div className="absolute left-0 top-full w-full h-4 bg-transparent"></div>

              {togglePrimaryDropDown && (
                <PrimaryDropDownMenu
                  setTogglePrimaryDropDown={setTogglePrimaryDropDown}
                  user={user}
                />
              )}
            </div>
          )}

          {/* MORE */}
          <div
            className="relative hidden sm:flex items-center"
            onMouseEnter={() => setToggleSecondaryDropDown(true)}
            onMouseLeave={() => setToggleSecondaryDropDown(false)}
          >
            <span className="flex items-center text-white font-semibold gap-1 cursor-pointer text-sm whitespace-nowrap">
              More
              {toggleSecondaryDropDown ? (
                <ExpandLessIcon sx={{ fontSize: 18 }} />
              ) : (
                <ExpandMoreIcon sx={{ fontSize: 18 }} />
              )}
            </span>

            <div className="absolute left-0 top-full w-full h-4 bg-transparent"></div>

            {toggleSecondaryDropDown && (
              <SecondaryDropDownMenu
                setToggleSecondaryDropDown={setToggleSecondaryDropDown}
              />
            )}
          </div>

          {/* CART */}
          <Link
            to="/cart"
            className="relative flex items-center text-white font-semibold gap-1.5 text-sm whitespace-nowrap"
          >
            <ShoppingCartIcon sx={{ fontSize: 20 }} />

            {cartItems.length > 0 && (
              <div className="
                absolute -top-2 left-3 w-4 h-4 
                bg-orange-500 text-white text-[10px] 
                rounded-full flex items-center justify-center
                font-bold shadow-xl
              ">
                {cartItems.length}
              </div>
            )}
            Cart
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
