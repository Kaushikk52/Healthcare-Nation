"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Menu, X } from "lucide-react";
import AuthPopup from "./Auth/AuthPopup";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const DropdownLink = ({
  href,
  title,
  onClick,
}: {
  href: string;
  title: string;
  onClick?: () => void;
}) => (
  <Link
    to={href}
    className={`text-gray-800 block py-2 px-4 rounded w-full text-left`}
    onClick={onClick}
  >
    {title}
  </Link>
);

export default function Navbar() {
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [navDropdownOpen, setNavDropdownOpen] = useState(null);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const path = import.meta.env.VITE_APP_IMG_URL;
  const [navigateTo, setNavigateTo] = useState("");

  const navigation = [
    {
      id: 1,
      title: "Home",
      path: "/",
    },
    {
      id: 2,
      title: "Services",
      icon: FaCaretDown,
      items: [
        { title: "Hospitals", path: "/listing" },
        { title: "Dialysis Centres" },
        { title: "Blood / Skin Banks" },
        { title: "Clinics" },
        { title: "Home Care Services" },
        { title: "Patient Transports" },
        { title: "Diagnostics" },
        { title: "Financial Help for Treatment" },
      ],
    },
    {
      id: 3,
      title: "Corporates",
      icon: FaCaretDown,
      items: [
        { title: "MPT Hospitals" },
        { title: "CGHS Hospitals" },
        { title: "MJPJAY Hospitals" },
        { title: "ESIC Hospitals" },
        { title: "PMJAY Hospitals" },
        { title: "Railway Hospitals" },
      ],
    },
    {
      id: 5,
      title: "Diagnostics",
      icon: FaCaretDown,
      items: [
        { title: "Xray" },
        { title: "MRI" },
        { title: "Sonography" },
        { title: "Pathology" },
        { title: "CT Scan" },
        { title: "2D Echo" },
      ],
    },
    {
      id: 6,
      title: "Health Concerns",
      icon: FaCaretDown,
      items: [
        { title: "Depression or Anxiety ?" },
        { title: "Pregnant ?" },
        { title: "Joint Pains ?" },
        { title: "Ear Problems ?" },
        { title: "Digestion Issues ?" },
      ],
    },
    {
      id: 7,
      title: "Insurance",
      path: "#",
    },
    {
      id: 8,
      title: "TPA",
      path: "#",
    },
  ];

  // Handle location change
  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
    if (location) {
      navigate(`/listing?location=${location.toLowerCase()}`);
    }
  };

  const locations = ["Mumbai", "Bangalore", "Chennai", "Delhi"];

  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    setToggle(false);
  });

  const toggleNavDropdown = (id) => {
    if (window.innerWidth <= 768) {
      setMobileDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
    } else {
      setNavDropdownOpen((prev) => (prev === id ? null : id));
    }
  };

  const dropdownVariants = {
    open: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.3 } },
    closed: { opacity: 0, y: -10, height: 0, transition: { duration: 0.3 } },
  };

  const checkIfLogin = (route: string) => {
    const token = localStorage.getItem("token");
    setNavigateTo(route);
    console.log(route, toggle, token);
    if (token !== null && !toggle) {
      //user logged in and no popup
      navigate(route); //
    } else if (token !== null && toggle === true) {
      //user logged in and still popup
      setToggle(false); // toggle not visible
    } else if (token === null) {
      //user not logged in
      setToggle(true); // toggle visible
    }
  };

  return (
    <nav className="w-full bg-white px-3 pt-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between space-x-4">
        {/* Logo and mobile menu button */}
        <div className="flex items-center space-x-4">
          <button
            className="text-gray-600 hover:text-gray-800 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="flex items-center">
            <img
              src={path + "HealthCare Nation 2.png" || "/placeholder.svg"}
              alt="Logo"
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Location dropdown and search bar (desktop) */}
        <div className="hidden md:flex items-center space-x-4 flex-grow justify-center">
          <div className="relative p-1 rounded-md flex items-center space-x-1 h-12 w-full max-w-2xl">
            <div className="px-3 bg-[#EDDBE9] md:w-1/3 lg:w-3/12 xl:w-4/12 flex items-center h-full rounded-l-md">
              <FaLocationDot className="w-5 h-5 text-[#9B2482] flex-shrink-0 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <select
                className={`w-full bg-transparent py-2 pl-10 h-full text-base font-semibold ${selectedLocation ? 'text-black' : 'text-gray-400'} cursor-pointer outline-none`}
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <option value="" disabled>
                  Select Location
                </option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-[#EDDBE9] md:w-8/12 lg:w-7/12 xl:w-7/12 flex items-center px-3 h-full rounded-r-md">
              <BiSearchAlt2 className="h-6 w-6 text-[#9B2482] flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full text-lg py-2 px-2 outline-none bg-[#EDDBE9] h-full"
              />
            </div>
          </div>
        </div>

        {/* Authentication buttons */}
        <div className="">
          <AuthPopup popup={toggle} navigateTo={navigateTo} />
          <button
            className="!flex !items-center space-x-2"
            onClick={() => checkIfLogin("/dashboard/hospital")}
          >
            <User className="h-6 w-6" />
            <span>Sign in </span>
          </button>
        </div>
      </div>


      {/* Desktop navigation */}
      <div className="hidden md:flex justify-center items-center my-3 mb-0 border-t border-b border-gray-200 py-2">
        <ul className="flex justify-center items-start space-x-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="relative group">
                <button
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => {
                    if (item.path) navigate(item.path);
                  }}
                  className={`${
                    location.pathname === item.path
                      ? "text-[#9B2482]"
                      : "text-gray-700"
                  } flex items-center font-semibold cursor-pointer relative`}
                >
                  {item.title}
                  {Icon && (
                    <Icon
                      className={`ml-1 h-4 w-4 flex-shrink-0 transition-transform ${
                        hoveredItem === item.id ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  )}
                  {hoveredItem === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9B2482]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>

                {item.items && (
                  <motion.div
                    initial="closed"
                    animate={hoveredItem === item.id ? "open" : "closed"}
                    variants={dropdownVariants}
                    className="absolute bg-white overflow-hidden w-48 z-40 shadow-2xl mt-2 p-2 -translate-x-4"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.items.map((i, index) => (
                      <DropdownLink
                        key={index}
                        href={i.path || "#"}
                        title={i.title}
                        onClick={() => setHoveredItem(null)}
                      />
                    ))}
                  </motion.div>
                )}
              </li>
            );
          })}
        </ul>
      </div>


      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <Link to="/" className="flex items-center">
                <img
                  src={path + "HealthCare Nation 2.png" || "/placeholder.svg"}
                  alt="Logo"
                  className="h-10 w-auto"
                />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="mb-4">
                    <button
                      onClick={() => toggleNavDropdown(item.id)}
                      className="flex items-center justify-between w-full py-2 text-lg font-semibold text-gray-800 hover:text-gray-600"
                    >
                      <span>{item.title}</span>
                      {Icon && (
                        <Icon
                          className={`h-4 w-4 flex-shrink-0 transition-transform ${
                            mobileDropdowns[item.id] ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                    {mobileDropdowns[item.id] && item.items && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        variants={dropdownVariants}
                        className="mt-2 ml-5 space-y-2"
                      >
                        {item.items.map((i) => (
                          <DropdownLink
                            key={i.title}
                            href={i.path || "#"}
                            title={i.title}
                            onClick={() => setIsMobileMenuOpen(false)}
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
