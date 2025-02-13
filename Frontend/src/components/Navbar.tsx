import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCaretDown, FaBars, FaTimes } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BiSearchAlt2 } from "react-icons/bi";
import { User } from "lucide-react";
import AuthPopup from "./Auth/AuthPopup";

const dropdownVariants = {
  open: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.3 } },
  closed: { opacity: 0, y: -10, height: 0, transition: { duration: 0.3 } },
};

const locations = ["Mumbai", "Bangalore", "Chennai", "Delhi"];

const Navbar = () => {
  const path = import.meta.env.VITE_APP_IMG_URL;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [navDropdownOpen, setNavDropdownOpen] = useState(null);
  const [navigateTo, setNavigateTo] = useState("");
  const [openToggle, setOpenToggle] = useState(false);
  const navigate = useNavigate();

  const dropdownVariants = {
    open: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.3 } },
    closed: { opacity: 1, y: 0, height: 0, transition: { duration: 0.3 } },
  };

  const dropdowns = [
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
        { title: "Hospitals", path: "/service-listing" },
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
    // {
    //     id: 4,
    //     title: 'Specialities',
    //     icon: FaCaretDown,
    //     items: [
    //         { title: 'service 1', },
    //         { title: 'service 2', },
    //         { title: 'service 3', },
    //         { title: 'service 4', },
    //     ]
    // },
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
      path: "/",
    },
    {
      id: 8,
      title: "TPA",
      path: "/",
    },
    {
      id: 9,
      title: "Articles",
      path: "/",
    },
  ];

  const locations = ["Mumbai", "Banglore", "Chennai", "Delhi"];

  const toggleNavDropdown = (id) => {
    setNavDropdownOpen((prev) => (prev === id ? null : id));
  };

  const checkIfLogin = (route) => {
    const token = localStorage.getItem("token");
    setNavigateTo(route);
    if (token) {
      navigate(route);
    } else {
      setOpenToggle(true);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow-md">
        <div>
          <img src={path + "HealthCare Nation 2.png"} alt="" className="h-10" />
        </div>
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <div className="hidden lg:flex gap-6">
          <button onClick={() => checkIfLogin("/dashboard/add-property")}>
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="lg:hidden bg-white shadow-md p-4"
        >
          <div className="flex justify-between items-center my-3">
            <ul className="!flex !justify-center !items-center !gap-6">
              {dropdowns.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={item.path}
                      onClick={() => {
                        toggleNavDropdown(item.id),
                          setLocationDropdownOpen(false);
                      }}
                      className="!flex !items-center !gap-x-1 !text-base !font-semibold !text-gray-700 !cursor-pointer"
                    >
                      {item.title}
                      {Icon && (
                        <Icon
                          className={`!h-4 !w-4 !flex-shrink-0 !transition-transform ${
                            navDropdownOpen === item.id
                              ? "!rotate-180"
                              : "!rotate-0"
                          }`}
                        />
                      )}
                    </Link>

                    {/* NAVIGATIONS LINKS DROPDOWN OPENS WHEN CLICK ON NAVIGATON DROPDOWN BUTTON */}
                    {navDropdownOpen === item.id && item.items && (
                      <motion.div
                        initial="closed"
                        animate={navDropdownOpen ? "open" : "closed"}
                        variants={dropdownVariants}
                        className="!absolute !bg-white !w-48 !z-40 !shadow-2xl !overflow-hidden !mt-2 !p-2 !-translate-x-4"
                      >
                        {item.items.map((i, index) => (
                          <Link
                            onClick={() => setNavDropdownOpen(false)}
                            to={i.path}
                            style={{ textDecoration: "none" }}
                            key={index}
                            className="!p-2 !text-gray-800 hover:!bg-gray-100 !w-full !cursor-pointer !block !text-sm !text-left !outline-none"
                          >
                            {i.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            onClick={() => checkIfLogin("/dashboard/add-property")}
            className="flex items-center gap-2"
          >
            <User className="h-6 w-6" />
          </button>
        </motion.div>
      )}

      <div className="hidden lg:flex justify-center items-center my-3">
        <ul className="!flex !justify-center !items-center !gap-6">
          {dropdowns.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={item.path}
                  onClick={() => {
                    toggleNavDropdown(item.id), setLocationDropdownOpen(false);
                  }}
                  className="!flex !items-center !gap-x-1 !text-base !font-semibold !text-gray-700 !cursor-pointer"
                >
                  {item.title}
                  {Icon && (
                    <Icon
                      className={`!h-4 !w-4 !flex-shrink-0 !transition-transform ${
                        navDropdownOpen === item.id
                          ? "!rotate-180"
                          : "!rotate-0"
                      }`}
                    />
                  )}
                </Link>

                {/* NAVIGATIONS LINKS DROPDOWN OPENS WHEN CLICK ON NAVIGATON DROPDOWN BUTTON */}
                {navDropdownOpen === item.id && item.items && (
                  <motion.div
                    initial="closed"
                    animate={navDropdownOpen ? "open" : "closed"}
                    variants={dropdownVariants}
                    className="!absolute !bg-white !w-48 !z-40 !shadow-2xl !overflow-hidden !mt-2 !p-2 !-translate-x-4"
                  >
                    {item.items.map((i, index) => (
                      <Link
                        onClick={() => setNavDropdownOpen(false)}
                        to={i.path}
                        style={{ textDecoration: "none" }}
                        key={index}
                        className="!p-2 !text-gray-800 hover:!bg-gray-100 !w-full !cursor-pointer !block !text-sm !text-left !outline-none"
                      >
                        {i.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <AuthPopup popup={openToggle} navigateTo={navigateTo} />
    </>
  );
};

export default Navbar;
