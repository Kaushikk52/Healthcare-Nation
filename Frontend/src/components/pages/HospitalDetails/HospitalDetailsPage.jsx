import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Icons
import { IoIosStar } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdOutlineDirections } from "react-icons/md";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { BsBookmarkCheck, BsBookmark } from "react-icons/bs";

// Tippy React
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

// Main Images
import Main_Hospital_Image from "/Images/hospital-details/main-images/main-hospital-image.png";
import Patint_Room from "/Images/hospital-details/main-images/patient-room.jpg";
import Hallway from "/Images/hospital-details/main-images/hallway.jpg";

import servicesByAccrediations from "@/data/accrediations";

// Dynamic Content Components imports
import Description from "../../Description";
import Photos from "../../Photos";
import Videos from "../../Videos";
import Reviews from "../../Reviews.tsx";
import { useParams } from "react-router-dom";
import axios from "axios";

import ReviewModal from "../../ReviewModal";
import { motion, AnimatePresence } from "framer-motion";

const HospitalDetailsPage = () => {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const hospitalImgs = import.meta.env.VITE_APP_CLOUDINARY_HOSPITALS;
  const clinicImgs = import.meta.env.VITE_APP_CLOUDINARY_CLINICS;
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 425);
  const [activeTabButton, setActiveTabButton] = useState("description");
  const [hospital, setHospital] = useState({});
  const [saved, setSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  const { id, type } = useParams();

  useEffect(() => {
      getHospitalDetails(id);
  }, [id]);

  const handleAddRating = () => {
    console.log("parent component updated");
    getHospitalDetails(id);
  };

  const getHospitalDetails = async (id) => {
    try {
      const response = await axios.get(`${baseURL}/v1/api/facility/id/${id}`);
      const data = response.data.facility;
      // console.log(data);
      setHospital(data);
      setSaved(data.isSaved);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success(`URL copied to clipboard!`, {
          position: "bottom-right",
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error(`Failed to copy URL`, {
          position: "bottom-right",
          duration: 3000,
        });
      });
  };

  const handleDirection = () => {
    const hospitalAddress = `${hospital.name} ${hospital.address.street},${hospital.address.landmark} ,${hospital.address.city} - ${hospital.address.zipCode}`;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const start = `${latitude},${longitude}`; // User's current location
          const end = encodeURIComponent(hospitalAddress); // Destination
          const mapsUrl = `https://www.google.com/maps/dir/${start}/${end}`;
          window.open(mapsUrl, "_blank");
        },
        (error) => {
          toast.error("Failed to get your location. Please enable GPS.", {
            position: "bottom-right",
            duration: 3000,
          });
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  const saveHospital = async (hospitalId) => {
    try {
      const response = await axios.post(
        `${baseURL}/v1/api/saved/${hospitalId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data.message;
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeSavedHospital = async (hospitalId) => {
    return await axios.delete(`${baseURL}/v1/api/saved/${hospitalId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  const handleSave = async () => {
    if (saved) {
      await removeSavedHospital(id);
      setSaved(false);
    } else {
      await saveHospital(id);
      setSaved(true);
    }
    // setSaved(!saved);
  };

  useEffect(() => {
    const handleResize = () => setIsWideScreen(window.innerWidth >= 425);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const buttons = [
    {
      title: "Add Review",
      icon: <MdEdit className="!text-pink-400 !h-5 !w-5" />,
      onClick: () => { 
        token ? setIsModalOpen(true) :  toast.error(`Login is Required`, {
          position: "bottom-right",
          duration: 3000,
        });
      },
    },
    {
      title: "Direction",
      icon: <MdOutlineDirections className="!text-pink-400 !h-5 !w-5" />,
      onClick: handleDirection,
    },
    {
      title: saved ? "Saved" : "Save",
      icon: saved ? (
        <BsBookmarkCheck className="text-pink-400 h-5 w-5 transition-transform duration-200 scale-110" />
      ) : (
        <BsBookmark className="text-pink-400 h-5 w-5 transition-transform duration-200 hover:scale-110" />
      ),
      onClick: handleSave,
      Bold: "",
    },
    {
      title: "Share",
      icon: <FaRegShareFromSquare className="!text-pink-400 !h-5 !w-5" />,
      onClick: handleCopyUrl,
    },
  ];

  const tabButtons = [
    {
      id: "description",
      component: (
        <Description details={hospital} phones={hospital.phoneNumbers} />
      ),
      title: "Description",
      marginX: "!mr-2",
      paddingX: "!pr-1 min-[425px]:!pr-2",
    },
    {
      id: "photos",
      component: <Photos images={hospital.images} type={type} />,
      title: "Photos",
      marginX: "!mx-2",
      paddingX: "!px-1 min-[425px]:!px-2",
    },
    {
      id: "videos",
      component: <Videos videos={hospital.videos} />,
      title: "Videos",
      marginX: "!mx-2",
      paddingX: "!px-1 min-[425px]:!px-2",
    },
    {
      id: "reviews",
      component: (
        <Reviews
          id={hospital.id}
          avgRating={hospital.avgRating?.toPrecision(2)}
          addRating={handleAddRating}
          ratings={hospital.ratings}
        />
      ),
      title: "Reviews",
      marginX: "!mx-2",
      paddingX: "!px-1 min-[425px]:!px-2",
    },
  ];

  return (
    <div className="lg:max-w-5xl xl:max-w-6xl !mx-auto !px-4">
      {/* Breadcrumbs */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <a
                    href="#"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 capitalize"
                  >
                    {"Mumbai"}
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 capitalize">
                    {type}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* New Conditional Rendering Grid */}
      <div className="!grid !grid-cols-12 !gap-2 sm:!gap-4 lg:!gap-3 !py-4 ">
        {/* Main Image */}
        <div
          className={`col-span-12 ${
            hospital.images?.length === 1 ? "lg:col-span-12" : "lg:col-span-8"
          }`}
        >
          <img
            src={type !== "hospitals-details"? clinicImgs + hospital.images?.[0]  : hospitalImgs + hospital.images?.[0]}
            alt="main hospital"
            className="h-[240px] min-[425px]:h-[280px] sm:h-[380px] lg:h-[510px] w-full rounded-sm object-cover"
          />
        </div>
        {/* Conditional Grid for Other Images */}
        {hospital.images?.length > 1 && (
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-0 col-span-12 lg:col-span-4 lg:flex lg:flex-col lg:justify-between lg:space-y-4">
            {/* First Additional Image */}
            <div>
              <img
                 src={type !== "hospitals-details"? clinicImgs + hospital.images?.[1]  : hospitalImgs + hospital.images?.[1]}
                alt="Patient Room"
                className="h-full w-full object-cover object-center rounded-sm"
              />
            </div>

            {/* Show the third image only if there are 3 or more images */}
            <div className="relative h-full w-full">
              {hospital.images?.length >= 4 ? (
                <div
                  style={{
                    backgroundImage: `url(${
                      type !== "hospitals-details"? clinicImgs + hospital.images?.[2]  : hospitalImgs + hospital.images?.[2]
                    })`,
                  }}
                  className="relative h-full w-full bg-cover bg-center rounded-sm"
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center text-white text-2xl">
                      <p>+</p>
                      <p>{hospital.images?.length - 3} more</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {hospital.images?.length > 2 && (
                    <img
                    src={type !== "hospitals-details"? clinicImgs + hospital.images?.[2]  : hospitalImgs + hospital.images?.[2]}
                      alt="Hallway"
                      className="h-full w-full object-cover object-center rounded-sm"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}

      </div>

      
    {/* Title & Contents */}
    <div className="!flex !flex-col !items-start sm:!flex-row sm:!justify-between sm:!items-start !py-2 sm:!py-0">
        {/* Left Side */}
        <div className="!flex !flex-col !justify-center !space-y-1.5">
          <span className="!text-2xl lg:!text-4xl !font-medium !text-wrap">
            {hospital.name}
          </span>
          {/* <span className='!text-md lg:!text-xl !font-medium text-gray-600'>Andheri, Mumbai</span> */}
          <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 text-balance">
                  {hospital.address?.street}, {hospital.address?.landmark}, {hospital.address?.city}{" "}
                  - {hospital.address?.zipCode}
                  {/* 
                  Rao Saheb, Achutrao Patwardhan Marg, Four Bungalows, Andheri
                  West, Mumbai, Maharashtra 400053 */}
                </span>
          <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 !text-md !text-[#74c365] capitalize">

          {hospital.openDay} - {hospital.closeDay}{" "}
          {hospital.hours} Hrs
          </span>

        </div>

        {/* Right Side  */}
        <div className="!flex !flex-col !justify-center !text-white !my-2 sm:!my-0 !space-y-0.5 sm:!space-y-1.5 !text-left sm:!text-right">
          <div className="!flex !justify-center !items-center !bg-[#267e3e] !rounded !py-0.5 !px-0">
            <span className="!text-xl !font-semibold !mr-1 !px-0">
              {hospital.avgRating?.toPrecision(2)}
            </span>
            <IoIosStar className="!h-5 !w-5 !mb-0.5 !px-0 !mx-0" />
          </div>
          <div className="!text-gray-600">
            <span>{hospital.reviews?.length} Reviews</span>
          </div>
        </div>
      </div>


      {/* Buttons & Rounded Images*/}
      <div className="!flex !flex-col sm:!flex-row !items-start sm:!items-center sm:!space-y-0 !space-y-5 !justify-between !pb-4 sm:!py-4">
        {/* Left Side for Buttons */}
        <div className="!flex !items-center !space-x-2 min-[425px]:!space-x-1 md:!space-x-2">
          {buttons.map((btn, index) => (
            <Tippy key={index} content={btn.title}>
              <button
                onClick={btn.onClick}
                key={index}
                className={`!flex !justify-center !items-center !gap-x-[5px] !text-xs sm:!text-sm md:!text-base !border-2 !border-gray-300 !py-2 !px-5 min-[425px]:!px-2 md:!px-4 !rounded ${btn.Color} ${btn.Bold} `}
              >
                {btn.icon} {isWideScreen && btn.title}
              </button>
            </Tippy>
          ))}
          <AnimatePresence>
            {isModalOpen && (
              <ReviewModal
                onClose={() => setIsModalOpen(false)}
                id={hospital.id}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Right Side for Rounded Images */}
        <div className="!flex !space-x-1.5 md:!space-x-2">
          {hospital.accreditations?.map((acc, index) => {
            const accreditation = servicesByAccrediations.find(
              (item) => item.title === acc
            );
            const accImg = accreditation?.image; // Get the image

            // Only render image if accImg is available
            return (
              <>
                <img
                  key={index}
                  src={`/Images/${accImg}`}
                  alt={accImg}
                  className="!h-14 !w-14 md:!h-14 md:!w-14 !object-cover !object-center !rounded-full"
                />
              </>
            );
          })}
        </div>
      </div>

      {/* Dynamic Section */}

      <div className="!flex !flex-col !py-2 md:!py-0.5">
        {/* For Tab Buttons */}
        <div className="!flex !items-center !justify-start !border-b-2">
          {tabButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveTabButton(btn.id)}
              className={` ${btn.marginX} ${
                btn.paddingX
              } !pt-1 !pb-3 !text-xs sm:!text-base md:!text-lg !font-semibold !transition-all !duration-150 !ease-in-out ${
                activeTabButton === btn.id
                  ? "!text-gray-900 !border-b-[6px] !border-gray-700 !rounded-sm"
                  : "!border-b-[6px] !border-transparent !text-gray-500"
              } `}
            >
              {btn.title}
            </button>
          ))}
        </div>

        {/* For Contents */}
        <div className="">
          {tabButtons.map((btn) =>
            activeTabButton === btn.id ? btn.component : null
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailsPage;
