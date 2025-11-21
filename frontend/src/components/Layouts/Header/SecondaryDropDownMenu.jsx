import React from 'react';
import { Link } from 'react-router-dom';
import { secondaryMenuItems } from '../../../config/navigationConfig';

const SecondaryDropDownMenu = ({ setToggleSecondaryDropDown }) => {

    return (
        <div
            className="absolute w-60 right-0 top-full bg-white shadow-2xl rounded overflow-hidden z-[9999]"
            onMouseEnter={() => setToggleSecondaryDropDown(true)}
            onMouseLeave={() => setToggleSecondaryDropDown(false)}
        >
            {secondaryMenuItems.map((item, i) => (
                <Link
                    key={i}
                    className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 last:border-b-0"
                    to={item.redirect}
                >
                    <span className="text-primary-blue">{item.icon}</span>
                    {item.title}
                </Link>
            ))}
        </div>
    );
};

export default SecondaryDropDownMenu;
