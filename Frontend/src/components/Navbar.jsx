import React, { useState } from 'react'

import { motion } from "framer-motion";

// Icons from react-icons library
import { FaCaretDown } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BiSearchAlt2 } from "react-icons/bi";

const dropdownVariants = {
    open: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.3 } },
    closed: { opacity: 1, y: 0, height: 0, transition: { duration: 0.3 } }
};

const dropdowns = [
    {
        id: 1,
        title: 'Home',
    },
    {
        id: 2,
        title: 'Services',
        icon: FaCaretDown,
        items: [
            { title: 'service 1', },
            { title: 'service 2', },
            { title: 'service 3', },
            { title: 'service 4', },
        ]
    },
    {
        id: 3,
        title: 'Corporates',
        icon: FaCaretDown,
        items: [
            { title: 'service 1', },
            { title: 'service 2', },
            { title: 'service 3', },
            { title: 'service 4', },
        ]
    },
    {
        id: 4,
        title: 'Specialities',
        icon: FaCaretDown,
        items: [
            { title: 'service 1', },
            { title: 'service 2', },
            { title: 'service 3', },
            { title: 'service 4', },
        ]
    },
    {
        id: 5,
        title: 'Diagnostics',
        icon: FaCaretDown,
        items: [
            { title: 'service 1', },
            { title: 'service 2', },
            { title: 'service 3', },
            { title: 'service 4', },
        ]
    },
    {
        id: 6,
        title: 'Health Concerns',
        icon: FaCaretDown,
        items: [
            { title: 'service 1', },
            { title: 'service 2', },
            { title: 'service 3', },
            { title: 'service 4', },
        ]
    },
    {
        id: 7,
        title: 'Insurance',
    },
    {
        id: 8,
        title: 'TPA',
    },
    {
        id: 9,
        title: 'Articles',
    },
]

const locations = [
    'Mumbai',
    'Banglore',
    'Chennai',
    'Delhi',
]

const Navbar = () => {
    const path = import.meta.env.VITE_APP_IMG_URL;

    const [locationDropdownOpen, setlocationDropdownOpen] = useState(false);
    const [navgiationDropdownOpen, setnavgiationDropdownOpen] = useState(null);

    const toggleNavigationDropdown = (id) => {
        setnavgiationDropdownOpen((prev) => (prev === id ? null : id));
    };

    return (
        <>
            <div className='grid grid-cols-11 !items-center !px-2.5 max-h-28 !pt-2.5'>

                {/* LOGO */}
                <div className='col-span-3'>
                    <div className="">
                        <img src={path + 'HealthCare Nation 2.png'} alt="" className="logo-main" />
                    </div>
                </div>

                {/* LOCATION DROPDOWN AND SEARCH BAR */}
                <div className='col-span-5 flex justify-center items-center !space-x-1'>
                    <div className='w-68 bg-[#EDDBE9] relative'>
                        {/* LOCATION DROPDOWN BUTTON */}
                        <button onClick={() => { setlocationDropdownOpen(!locationDropdownOpen), setnavgiationDropdownOpen(false) }} className='w-full !py-2.5 !px-2.5 !flex !justify-between items-center'>
                            <span className='text-lg flex items-center'><FaLocationDot className='w-5 h-5 !mr-1 text-[#9B2482] flex-shrink-0' />Location</span>
                            <FaCaretDown className={`h-5 w-5 flex-shrink-0 transition-transform  ${locationDropdownOpen ? '!rotate-180' : '!rotate-0'}`} />
                        </button>

                        {/* LOCATION DROPDOWN OPENS WHEN LOCATION DROPDOWN BUTTON TOGGLES */}
                        {locationDropdownOpen && (
                            <motion.div
                                className="absolute z-50 bg-white w-full shadow-2xl overflow-hidden p-2"
                                initial="closed"
                                animate={locationDropdownOpen ? "open" : "closed"}
                                variants={dropdownVariants}
                            >
                                {locations.map((location, index) => (
                                    <button key={index} className='py-2 px-4 block w-full text-left hover:bg-gray-50 transition-all duration-150'>{location}</button>
                                ))}
                            </motion.div>
                        )}
                    </div>
                    <div className='bg-[#EDDBE9] w-3xl  !px-2.5 flex justify-start items-center'>
                        <BiSearchAlt2 className='h-7 w-7 text-[#9B2482] flex-shrink-0' />
                        <input type="text" placeholder='search here' className='w-full text-lg !py-3 px-2 outline-none' />
                    </div>
                </div>

                {/* SIGN UP AND SIGN IN */}
                <div className='col-span-3 flex justify-center items-center '>
                    <p>Sign Up</p>
                    <p>|</p>
                    <p>Sign In</p>
                </div>

            </div>

            <hr />

            {/* NAVIGATION DROWDOWNS FOR LARGE SCREENS*/}
            <div className='flex justify-center items-center !my-3'>
                <ul className="flex justify-center items-center gap-6">
                    {dropdowns.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li
                                key={item.id}
                            >
                                <button onClick={() => { toggleNavigationDropdown(item.id), setlocationDropdownOpen(false) }} className='flex items-center gap-x-1 text-base font-semibold'>{item.title}{Icon && <Icon className={`h-4 w-4 !flex-shrink-0 transition-transform ${navgiationDropdownOpen === item.id ? 'rotate-180' : 'rotate-0'}`} />}</button>

                                {/* NAVIGATIONS LINKS DROPDOWN OPENS WHEN CLICK ON NAVIGATON DROPDOWN BUTTON */}
                                {navgiationDropdownOpen === item.id && item.items && (
                                    <motion.div
                                        initial="closed"
                                        animate={navgiationDropdownOpen ? "open" : "closed"}
                                        variants={dropdownVariants}
                                        className="absolute bg-white w-44 z-40 shadow-2xl overflow-hidden mt-2 p-2 -translate-x-4">
                                        {item.items.map((i, index) => (
                                            <a
                                                href='/'
                                                style={{ textDecoration: 'none' }}
                                                key={index} className="p-2 !text-gray-800 hover:!bg-gray-100 w-full cursor-pointer block text-left outline-none">{i.title}</a>
                                        ))}
                                    </motion.div>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default Navbar