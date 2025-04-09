import { useState, useEffect } from "react";
import toast from "react-hot-toast";

//Icons
import { IoIosStar } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdOutlineDirections } from "react-icons/md";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { BsBookmarkCheck, BsBookmark } from "react-icons/bs";

// Tippy React
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import servicesByAccrediations from "@/data/accrediations";

// Dynamic Content Components imports
import Description from "../../Description";
import Photos from "../../Photos";
import Videos from "../../Videos";
import Reviews from "../../Reviews";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import ReviewModal from "../../ReviewModal";
import { motion, AnimatePresence } from "framer-motion";

const ServiceDetailsPage = () => {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const hospitalImgs = import.meta.env.VITE_APP_CLOUDINARY_HOSPITALS;
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 425);
  const [activeTabButton, setActiveTabButton] = useState("description");
  const [service, setService] = useState<any>({});
  const [saved, setSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id, type } = useParams();

  useEffect(() => {
    getServiceDetails(id);
  }, [id]);

  const handleAddRating = () => {
    console.log("parent component updated");
    getServiceDetails(id);
  };

  const getServiceDetails = async (id) => {
    try {
      const response = await axios.get(`${baseURL}/v1/api/${type}/id/${id}`);
      const data = response.data[type];
      console.log("type & resData serv",  type, data);
      setService(data);
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
    const clinicAddress = `${service.name} ${service.address.street},${service.address.landmark} ${service.address.city}, ${service.address.state} - ${service.address.zipCode}`;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const start = `${latitude},${longitude}`; // User's current location
          const end = encodeURIComponent(clinicAddress); // Destination
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

  const saveService = async (id) => {
    try {
      const response = await axios.post(
        `${baseURL}/v1/api/saved/${type}/${id}`,
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

  const removeSavedService = async (id) => {
    return await axios.delete(`${baseURL}/v1/api/saved/${type}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  const handleSave = async () => {
    if (saved) {
      await removeSavedService(id);
      setSaved(false);
    } else {
      await saveService(id);
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
        setIsModalOpen(true);
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
        <Description details={service} phones={service.phoneNumbers} />
      ),
      title: "Description",
      marginX: "!mr-2",
      paddingX: "!pr-1 min-[425px]:!pr-2",
    },
    {
      id: "photos",
      component: <Photos images={service.images} type={type} />,
      title: "Photos",
      marginX: "!mx-2",
      paddingX: "!px-1 min-[425px]:!px-2",
    },
    {
      id: "videos",
      component: <Videos videos={service.videos} />,
      title: "Videos",
      marginX: "!mx-2",
      paddingX: "!px-1 min-[425px]:!px-2",
    },
    {
      id: "reviews",
      component: (
        <Reviews
          id={service.id}
          type={type}
          avgRating={service.avgRating?.toPrecision(2)}
          addRating={handleAddRating} ratings={service.ratings} />
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
            service.images?.length === 1 ? "lg:col-span-12" : "lg:col-span-8"
          } `}
        >
          <img
            src={hospitalImgs + service.images?.[0]}
            alt="main service"
            className="h-[240px] min-[425px]:h-[280px] sm:h-[380px] lg:h-[510px] w-full rounded-sm object-cover"
          />
        </div>
        {/* Conditional Grid for Other Images */}
        {service.images?.length > 1 && (
          <div className="h-full grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-0 col-span-12 lg:col-span-4 lg:flex lg:flex-col lg:justify-between lg:space-y-4">
            {/* First Additional Image */}
            <div>
              <img
                src={hospitalImgs + service.images?.[1]}
                alt="Patient Room"
                className="min-h-[160px] max-h-[160px] md:min-h-[220px] md:max-h-[220px] lg:min-h-[247px] lg:max-h-[247px] border w-full object-cover object-center rounded-sm"
              />
            </div>

            {/* Show the third image only if there are 3 or more images */}
            <div className="relative min-h-[160px] max-h-[160px] md:min-h-[220px] md:max-h-[220px] lg:min-h-[247px] lg:max-h-[247px] w-full">
              {service.images?.length >= 4 ? (
                <div
                  style={{
                    backgroundImage: `url(${
                      hospitalImgs + service.images?.[2]
                    })`,
                  }}
                  className="relative h-full w-full bg-cover bg-center rounded-sm"
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center text-white text-2xl">
                      <p>+</p>
                      <p>{service.images?.length - 3} more</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {service.images?.length > 2 && (
                    <img
                      src={hospitalImgs + service.images?.[2]}
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
            {service.name}
          </span>
          {/* <span className='!text-md lg:!text-xl !font-medium text-gray-600'>Andheri, Mumbai</span> */}
          <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 text-balance">
            {service.address?.street}, {service.address?.landmark}{" "}{service.address?.city}{" "}
            {service.address?.state}- {service.address?.zipCode}
            {/* 
                  Rao Saheb, Achutrao Patwardhan Marg, Four Bungalows, Andheri
                  West, Mumbai, Maharashtra 400053 */}
          </span>
          <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 !text-md !text-[#74c365] capitalize">
            {service.openDay} - {service.closeDay} {service.hours} Hrs
          </span>
        </div>

         {/* Right Side  */}
         <div className="!flex !flex-col !justify-center !text-white !my-2 sm:!my-0 !space-y-0.5 sm:!space-y-1.5 !text-left sm:!text-right">
          <div className="!flex !justify-center !items-center !bg-[#267e3e] !rounded !py-0.5 !px-0">
            <span className="!text-xl !font-semibold !mr-1 !px-0">
              {service.avgRating?.toPrecision(2)}
            </span>
            <IoIosStar className="!h-5 !w-5 !mb-0.5 !px-0 !mx-0" />
          </div>
          <div className="!text-gray-600">
            <span>{service.reviews?.length} Reviews</span>
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
                className={`!flex !justify-center !items-center !gap-x-[5px] !text-xs sm:!text-sm md:!text-base !border-2 !border-gray-300 !py-2 !px-5 min-[425px]:!px-2 md:!px-4 !rounded  ${btn.Bold} `}
              >
                {btn.icon} {isWideScreen && btn.title}
              </button>
            </Tippy>
          ))}
          <AnimatePresence>
            {isModalOpen && (
              <ReviewModal
                onClose={() => setIsModalOpen(false)}
                id={service.id}
                type={type}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Right Side for Rounded Images */}
        <div className="!flex !space-x-1.5 md:!space-x-2">
          {service.accreditations?.map((acc, index) => {
            const accreditation = servicesByAccrediations.find(
              (item) => item.title === acc
            );

            if (!accreditation || !accreditation.image) return null; // Skip if no accreditation or image

            return (
              <Link
                key={index} // Moved key to the correct element
                to={`/listing?type=${type.replace(
                  "-details",
                  ""
                )}&accreditations=${encodeURIComponent(accreditation.title)}`}
              >
                <img
                  src={`/Images/${accreditation.image}`} // Corrected to use accreditation.image
                  alt={accreditation.title || "Accreditation"}
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

export default ServiceDetailsPage;
