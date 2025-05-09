import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { MdOutlineDirections } from "react-icons/md";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import { IoMdClose, IoIosStar } from "react-icons/io";

// Tippy React
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import servicesByAccrediations from "@/data/accrediations";

// Dynamic Content Components imports
import Description from "@/components/Description.jsx";
import Photos from "@/components/Photos";
import Videos from "@/components/Videos";
import Reviews from "@/components/Reviews";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ReviewModal from "@/components/ReviewModal";
import { motion, AnimatePresence } from "framer-motion";

export default function CenterDetailsPage() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const hospitalImgs = import.meta.env.VITE_APP_CLOUDINARY_HOSPITALS;
  const navigate = useNavigate();
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 425);
  const [activeTabButton, setActiveTabButton] = useState("description");
  const [center, setCenter] = useState({});
  const [saved, setSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [previewImage, setPreviewImage] = useState(null);

  const { id, type } = useParams();

  useEffect(() => {
    getCenterDetails(id);
  }, [id]);

  const handleAddRating = () => {
    console.log("parent component updated");
    getCenterDetails(id);
  };

  const getCenterDetails = async (id) => {
    try {
      const response = await axios.get(`${baseURL}/v1/api/center/id/${id}`);
      const data = response.data.center;
      // console.log(data);
      setCenter(data);
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
    const address = `${center.address?.street}, ${center.address?.landmark} ${center.address?.city} 
                  ${center.address?.state} - ${center.address?.zipCode}`;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const start = `${latitude},${longitude}`; // User's current location
          const end = encodeURIComponent(address); // Destination
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
        `${baseURL}/v1/api/saved/center/${hospitalId}`,
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
    return await axios.delete(`${baseURL}/v1/api/saved/center/${hospitalId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  // Helper function to format time in 12-hour format
  function formatTime(time24) {
    if (!time24 || typeof time24 !== "string" || !time24.includes(":")) {
      return "Invalid time";
    }

    const [hourStr, minuteStr] = time24.split(":");
    const hour24 = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (isNaN(hour24) || isNaN(minute)) {
      return "Invalid time";
    }

    let hour12 = hour24 % 12;
    if (hour12 === 0) hour12 = 12;

    const period = hour24 < 12 ? "AM" : "PM";
    const paddedMinute = String(minute).padStart(2, "0");

    return `${hour12}:${paddedMinute} ${period}`;
  }

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
        token
          ? setIsModalOpen(true)
          : toast.error(`Login is Required`, {
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
        <BsBookmarkCheckFill className="text-pink-400 h-5 w-5 transition-transform duration-200 scale-110" />
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
      component: <Description details={center} phones={center.phoneNumbers} />,
      title: "Description",
      marginX: "!mr-2",
      paddingX: "!pr-1 min-[425px]:!pr-2",
    },
    {
      id: "photos",
      component: <Photos images={center.images} type={type} />,
      title: "Photos",
      marginX: "!mx-2",
      paddingX: "!px-1 min-[425px]:!px-2",
    },
    {
      id: "videos",
      component: <Videos videos={center.videos} />,
      title: "Videos",
      marginX: "!mx-2",
      paddingX: "!px-1 min-[425px]:!px-2",
    },
    {
      id: "reviews",
      component: (
        <Reviews
          id={center.id}
          type={type}
          avgRating={center.avgRating?.toPrecision(2)}
          addRating={handleAddRating}
          ratings={center.ratings}
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
                <Link
                  to={`/`}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Home
                </Link>
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
                  <Link
                    to={`/listing?type=${type}`}
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 capitalize"
                  >
                    {center.address?.state || "Mumbai"}
                  </Link>
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
                    {center.name}
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
        <div className={`col-span-12 ${center.images?.length === 1 ? "lg:col-span-12" : "lg:col-span-8"}`}>
          <img
            src={hospitalImgs + center.images?.[0] || "/placeholder.svg"}
            alt="main hospital"
            className={`h-[505px] ${center.images?.length === 1 ? "w-full" : "w-auto"} mx-auto rounded-sm object-cover cursor-pointer`}
            onClick={() => setPreviewImage(hospitalImgs + center.images?.[0])}
          />
        </div>
        {/* Conditional Grid for Other Images */}
        {center.images?.length > 1 && (
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-0 col-span-12 lg:col-span-4 lg:flex lg:flex-col lg:justify-between lg:space-y-4">
            {/* First Additional Image */}
            <div>
              <img
                src={hospitalImgs + center.images?.[1] || "/placeholder.svg"}
                alt="Patient Room"
                className="h-[245px] w-full object-cover object-center rounded-sm cursor-pointer"
                onClick={() =>setPreviewImage(hospitalImgs + center.images?.[1])}
              />
            </div>

            {/* Show the third image only if there are 3 or more images */}
            <div className="relative h-full w-full">
              {center.images?.length >= 4 ? (
                <div
                  onClick={() => setActiveTabButton("photos")}
                  style={{
                    backgroundImage:  `url(${
                      hospitalImgs + center.images?.[2]
                    })`,
                  }}
                  className="relative h-[245px] w-full bg-cover bg-center rounded-sm"
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center text-white text-2xl">
                      <p>+</p>
                      <p>{center.images?.length - 3} more</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {center.images?.length > 2 && (
                    <img
                      src={hospitalImgs + center.images?.[2] || "/placeholder.svg"}
                      alt="Hallway"
                      className="h-[245px] w-full object-cover object-center rounded-sm cursor-pointer"
                      onClick={() =>setPreviewImage(hospitalImgs + center.images?.[2])}
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
            {center.name}
          </span>
          {/* <span className='!text-md lg:!text-xl !font-medium text-gray-600'>Andheri, Mumbai</span> */}
          <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 text-balance">
            {center.address?.city}, {center.address?.state}
            {/* 
                  Rao Saheb, Achutrao Patwardhan Marg, Four Bungalows, Andheri
                  West, Mumbai, Maharashtra 400053 */}
          </span>
          <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 !text-md !text-[#74c365] capitalize">
            {center.fromTime === center.toTime
              ? `${center.openDay} - ${center.closeDay} Open 24 hours`
              : `${center.openDay} - ${center.closeDay} ${formatTime(
                  center.fromTime
                )} - ${formatTime(center.toTime)}`}
          </span>
        </div>

        {/* Right Side  */}
        <div className="!flex !flex-col !justify-center !text-white !my-2 sm:!my-0 !space-y-0.5 sm:!space-y-1.5 !text-left sm:!text-right">
          <div className="!flex !justify-center !items-center !bg-[#267e3e] !rounded !py-0.5 !px-0">
            <span className="!text-xl !font-semibold !mr-1 !px-0">
              {center.avgRating ? center.avgRating?.toPrecision(2) : `0.0`}
            </span>
            <IoIosStar className="!h-5 !w-5 !mb-0.5 !px-0 !mx-0" />
          </div>
          <div className="!text-gray-600">
            <span>{center.reviews?.length} Reviews</span>
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
                id={center.id}
                type={type}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Right Side for Rounded Images */}
        <div className="!flex !space-x-1.5 md:!space-x-2">
          {center.accreditations?.map((acc, index) => {
            const accreditation = servicesByAccrediations.find(
              (item) => item.title === acc
            );
            const accImg = accreditation?.image; // Get the image
            const accTitle = accreditation?.title;

            // Only render image if accImg is available
            return (
              <Link
                key={index}
                to={`/listing?type=${type.replace(
                  "-details",
                  ""
                )}&accreditations=${accTitle}`}
              >
                <img
                  src={`/Images/${accImg}`}
                  alt={accImg}
                  className="!h-14 !w-14 md:!h-14 md:!w-14 !object-cover !object-center !rounded-full"
                />
              </Link>
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
                  ? "!text-gray-900 !border-b-[6px] !border-[#9B2482] !rounded-sm"
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

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
            onClick={() => setPreviewImage(null)}
          >
            <div className="relative max-w-4xl w-full max-h-[90vh]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewImage(null);
                }}
                className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
              >
                <IoMdClose className="w-6 h-6" />
              </button>
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                src={previewImage}
                alt="Preview"
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
