import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaFilter, FaChevronDown } from "react-icons/fa";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { DualRangeSlider } from "@/components/ui/DualRangeSlider";
import { X, ChevronDown } from "lucide-react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "@/App.css";

const filters = [
  // {
  //   title: "No of beds",
  //   type: "slider",
  //   range: [0, 500],
  //   step: 50,
  // },
  {
    title:"Saved",
    options:[
      {id:"Saved", text:"Saved"}
    ]
  },
  {title:"Sort By",
    options: [
      {id:"relevance", text:"Relevance"},
      {id:"rating", text:"High to Low"},
      {id:"reviews", text:"High to Low"}
    ]
  },
  {
    title: "Accreditation",
    options: [
      { id: "NABH", text: "NABH", count: 34 },
      { id: "JCI", text: "JCI", count: 16 },
    ],
  },
  {
    title: "Ownership",
    options: [
      { id: "Private", text: "Private" },
      { id: "Government", text: "Government" },
    ],
  },
  {
    title: "Specialities",
    options: [
      { id: "Eye-care", text: "Eye-care" },
      { id: "Maternity", text: "Maternity" },
    ],
  },
  {
    title: "Corporates",
    options: [
      { id: "MPT Hospitals", text: "MPT Hospitals" },
      { id: "CGHS Hospitals", text: "CGHS Hospitals" },
      { id: "MJPJAY Hospitals", text: "MJPJAY Hospitals" },
      { id: "PMJAY Hospitals", text: "PMJAY Hospitals" },
      { id: "Railway Hospitals", text: "Railway Hospitals" },
    ],
  }
];

export default function ServiceListing() {
  const hospitalImgs = import.meta.env.VITE_APP_CLOUDINARY_HOSPITALS;
  const clinicImgs = import.meta.env.VITE_APP_CLOUDINARY_CLINICS;
  const [searchParams] = useSearchParams();
  const  type = searchParams.get("type");
  const location = searchParams.get("location");
  const [facilities, setFacilities] = useState([]);

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [bedRange, setBedRange] = useState([0, 500]);
  const [expandedSections, setExpandedSections] = useState(filters.map((filter) => filter.title));
  const [bedRangeInput, setBedRangeInput] = useState({ min: "0", max: "500" });
  const path = import.meta.env.VITE_APP_IMG_URL;

  const toggleSection = (sectionTitle) => {
    setExpandedSections((prev) =>
      prev.includes(sectionTitle)
        ? prev.filter((title) => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const handleBedRangeInput = (type, value) => {
    const numValue = Number.parseInt(value) || 0;
    if (type === "min" && numValue <= Number.parseInt(bedRangeInput.max)) {
      setBedRangeInput((prev) => ({ ...prev, min: value }));
      setBedRange([numValue, Number.parseInt(bedRangeInput.max)]);
    } else if (
      type === "max" &&
      numValue >= Number.parseInt(bedRangeInput.min)
    ) {
      setBedRangeInput((prev) => ({ ...prev, max: value }));
      setBedRange([Number.parseInt(bedRangeInput.min), numValue]);
    }
  };

  useEffect(() => {
    (type) === "hospitals" ? getHospitals() : getClinics();
  }, [type]);

  const getHospitals = async () => {
    try{
      const response = await axios.get(`http://localhost:8081/v1/api/facility/type/${type}`);
      const data = await response.data.hospitals;
      // console.log(data);
      setFacilities(data);
    }catch(err){
      console.log(err.message);
    }
  }

  const getClinics =async () => {
    try{
      const response = await axios.get(`http://localhost:8081/v1/api/facility/type/${type}`);
      const data = await response.data.clinics;
      // console.log(data);
      setFacilities(data);
    }catch(err){
      console.log(err.message);
    }
  }


  const handleFilterToggle = (filterId, filterType) => {
    if (filterType === "slider") {
      // Handle slider separately if needed
      return;
    }
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <div className="relative bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
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
                    {location || "Mumbai"}
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
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    Pediatric Hospital
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Banner */}
      {/* <div className="relative h-48 md:h-64 lg:h-96 overflow-hidden">
        <img
          src={path + "demo/pediatric-banner2.jpg"}
          alt="Pediatric Hospital Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            Pediatric Hospitals in Mumbai
          </h1>
        </div>
      </div> */}

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFilterOpen(false)}
          >
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={clearAllFilters}
                    className="text-blue-500 text-sm hover:text-blue-600"
                  >
                    Clear all
                  </button>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {/* Filter Content */}
              {filters.map((section, idx) => (
                <div key={idx} className="mb-6">
                  <h3
                    className="text-lg font-medium mb-3 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection(section.title)}
                  >
                    {section.title}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expandedSections.includes(section.title)
                          ? "transform rotate-180"
                          : ""
                      }`}
                    />
                  </h3>
                  <div
                    className={`space-y-2 ${
                      expandedSections.includes(section.title) ? "" : "hidden"
                    }`}
                  >
                    {section.type === "slider" ? (
                      <div className="px-2 py-4">
                        <div className="flex gap-4 mb-4">
                          <div className="flex-1">
                            <label className="text-sm text-gray-600">Min</label>
                            <input
                              type="number"
                              value={bedRangeInput.min}
                              onChange={(e) =>
                                handleBedRangeInput("min", e.target.value)
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                              min="0"
                              max={bedRangeInput.max}
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-sm text-gray-600">Max</label>
                            <input
                              type="number"
                              value={bedRangeInput.max}
                              onChange={(e) =>
                                handleBedRangeInput("max", e.target.value)
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                              min={bedRangeInput.min}
                              max="500"
                            />
                          </div>
                        </div>
                        <Slider
                          value={bedRange}
                          max={500}
                          min={0}
                          step={50}
                          onValueChange={(value) => {
                            setBedRange(value);
                            setBedRangeInput({
                              min: value[0].toString(),
                              max: value[1].toString(),
                            });
                          }}
                        />
                        <div className="flex justify-between mt-2 text-sm text-gray-600">
                          <span>{bedRange[0]} beds</span>
                          <span>{bedRange[1]} beds</span>
                        </div>
                      </div>
                    ) : (
                      section.options.map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center space-x-3 cursor-pointer group"
                        >
                          <div
                            className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors
                                                      ${
                                                        selectedFilters.includes(
                                                          option.id
                                                        )
                                                          ? "border-blue-500 bg-blue-500"
                                                          : "border-gray-300 group-hover:border-blue-500"
                                                      }`}
                          >
                            {selectedFilters.includes(option.id) && (
                              <motion.svg
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-3 h-3 text-white"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                                />
                              </motion.svg>
                            )}
                          </div>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedFilters.includes(option.id)}
                            onChange={() => handleFilterToggle(option.id)}
                          />
                          <span className="flex-1 text-gray-700">
                            {option.text}
                          </span>
                          {option.count && (
                            <span className="text-gray-400 text-sm">
                              ({option.count})
                            </span>
                          )}
                        </label>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold capitalize">Hospitals in {location || "Mumbai"}</h2>
              <button
                onClick={() => setFilterOpen(true)}
                className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <FaFilter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
        <div className="flex gap-6">
          {/* Desktop Filters */}
          <div className="hidden md:block w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-blue-500 text-sm hover:text-blue-600"
                >
                  Clear all
                </button>
              </div>
              {filters.map((section, idx) => (
                <div key={idx} className="mb-6">
                  <h3
                    className="text-lg font-medium mb-3 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection(section.title)}
                  >
                    {section.title}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expandedSections.includes(section.title)
                          ? "transform rotate-180"
                          : ""
                      }`}
                    />
                  </h3>
                  <div
                    className={`space-y-2 ${
                      expandedSections.includes(section.title) ? "" : "hidden"
                    }`}
                  >
                    {section.type === "slider" ? (
                      <div className="px-2 py-4">
                        <div className="flex gap-4 mb-4">
                          <div className="flex-1">
                            <label className="text-sm text-gray-600">Min</label>
                            <input
                              type="number"
                              value={bedRangeInput.min}
                              onChange={(e) =>
                                handleBedRangeInput("min", e.target.value)
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                              min="0"
                              max={bedRangeInput.max}
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-sm text-gray-600">Max</label>
                            <input
                              type="number"
                              value={bedRangeInput.max}
                              onChange={(e) =>
                                handleBedRangeInput("max", e.target.value)
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                              min={bedRangeInput.min}
                              max="500"
                            />
                          </div>
                        </div>
                        <DualRangeSlider
                          value={bedRange}
                          max={500}
                          min={0}
                          step={50}
                          onValueChange={(value) => {
                            setBedRange(value);
                            setBedRangeInput({
                              min: value[0].toString(),
                              max: value[1].toString(),
                            });
                          }}
                        />
                        <div className="flex justify-between mt-2 text-sm text-gray-600">
                          <span>{bedRange[0]} beds</span>
                          <span>{bedRange[1]} beds</span>
                        </div>
                      </div>
                    ) : (
                      section.options.map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center space-x-3 cursor-pointer group"
                        >
                          <div
                            className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors
                                                      ${
                                                        selectedFilters.includes(
                                                          option.id
                                                        )
                                                          ? "border-blue-500 bg-blue-500"
                                                          : "border-gray-300 group-hover:border-blue-500"
                                                      }`}
                          >
                            {selectedFilters.includes(option.id) && (
                              <motion.svg
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-3 h-3 text-white"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                                />
                              </motion.svg>
                            )}
                          </div>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedFilters.includes(option.id)}
                            onChange={() => handleFilterToggle(option.id)}
                          />
                          <span className="flex-1 text-gray-700">
                            {option.text}
                          </span>
                          {option.count && (
                            <span className="text-gray-400 text-sm">
                              ({option.count})
                            </span>
                          )}
                        </label>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Hospital Listings */}
          <div className="flex-1">
            {/* Applied Filters and Sort */}
            <div className="flex justify-between items-center mb-6 sm:px-2">
              {/* Applied Filters */}
              <div className="flex flex-wrap gap-2">
                {bedRange[0] !== 0 || bedRange[1] !== 500 ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700"
                  >
                    <span>{`${bedRange[0]} - ${bedRange[1]} beds`}</span>
                    <button
                      onClick={() => {
                        setBedRange([0, 500]);
                        setBedRangeInput({ min: "0", max: "500" });
                      }}
                      className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-100"
                    >
                      ×
                    </button>
                  </motion.div>
                ) : null}
                {selectedFilters.map((filterId) => {
                  const filterOption = filters
                    .flatMap((section) => section.options || [])
                    .find((option) => option?.id === filterId);

                  if (!filterOption) return null;

                  return (
                    <motion.div
                      key={filterId}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700"
                    >
                      <span>{filterOption.text}</span>
                      <button
                        onClick={() => handleFilterToggle(filterId)}
                        className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-100"
                      >
                        ×
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <hr />

            {/* LIST OF HOSPITALS WITH DETAILS */}
            <div>
              {facilities?.map((detail) => (
                <React.Fragment key={detail.id}>
                  <div className="grid grid-cols-1 lg:grid-cols-10 gap-x-4 gap-y-2 mt-6 mb-6 sm:px-2">
                    {/* HOSPITAL IMAGE */}
                    <div className="lg:col-span-4">
                      <Swiper
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSlideChange={() => console.log("slide change")}
                      >
                        {detail.images.map((image, index) => (
                          (type === "hospitals")  ?
                          <SwiperSlide key={index}>
                            <img
                              src={hospitalImgs + image || "/placeholder.svg"}
                              alt={`${type} Image`}
                              className="w-full h-auto object-cover aspect-[5/3] rounded-md"
                            />
                          </SwiperSlide>
                          :<SwiperSlide key={index}>
                          <img
                            src={clinicImgs + image || "/placeholder.svg"}
                            alt={`${type} Image`}
                            className="w-full h-auto object-cover aspect-[5/3] rounded-md"
                          />
                        </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>

                    {/* HOSPITAL DETAILS  */}
                    <div className="lg:col-span-6 flex flex-col justify-between">
                      {/* HOSPITAL NAME, LOCATION, RATING & REVIEWS COUNT*/}
                      <div className="flex justify-between items-start space-x-2">
                        {/* NAME AND LOCATION */}
                        <div className="flex flex-col">
                          <span className="line-clamp-1 text-lg min-[425px]:text-2xl sm:text-2xl lg:text-2xl xl:text-2xl font-bold text-gray-700">
                            {detail.name}
                          </span>
                          <span className="text-sm min-[425px]:text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-gray-700">
                            {detail.address.street}, {detail.address.city} - {detail.address.zipCode}
                          </span>
                          <span className="text-sm  text-green-700 capitalize">
                            { `${detail.openDay} - ${detail.closeDay} ${detail.hours} hrs`  ||"Open 24 hours"}
                          </span>
                        </div>

                        {/* RATING AND REVIEW COUNT */}
                        <div className="!flex !flex-col !justify-center !text-white !my-1 sm:!my-0 !space-y-0.5 sm:!space-y-1.5 !text-left sm:!text-right">
                          <div className="!flex !justify-center !items-center !bg-[#267e3e] !rounded !py-0.5 !px-0">
                            <span className="!text-base !font-semibold !mr-1 !px-0">
                              {detail.avgRating}
                            </span>
                            <FaStar className="!h-4 !w-4 !mb-0.5 !px-0 !mx-0" />
                          </div>
                          <div className="!text-gray-600">
                            <span className="text-sm">{detail.reviews.length} Reviews</span>
                          </div>
                        </div>
                      </div>

                      {/* SECOND ELEMENT FOR FLEX-COL JUSTIFY-BETWEEN */}
                      <div className="flex flex-col space-y-2.5">
                        {/* HOSPITAL BEDS COUNT, TYPE & CONTACT NO */}
                        <div className="flex justify-between items-end">
                          {/* BEDS COUNT AND TYPE */}
                          <div className="flex flex-col">
                            {/* <span className="text-sm min-[425px]:text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-gray-700">
                              {detail.beds} Beds
                            </span> */}
                            
                          </div>

                          {/* CONTACT NO */}
                          {/* <div className="flex items-center">
                            <FaPhoneAlt className="min-[425px]:h-4 min-[425px]:w-4 mr-1 min-[425px]:mr-2 flex-shrink-0" />
                            <span className="text-sm min-[425px]:text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-gray-700">
                              {detail.contactNo}
                            </span>
                          </div> */}
                        </div>

                        {/* HOSPITAL ACCREDITATIONS IMAGES & VIEW DETAILS BUTTON */}
                        <div className="flex justify-between items-center">
                          {/* ACCREDITATIONS IMAGES*/}
                          <div className="flex items-center space-x-2">
                            {detail.accreditations.map((acc, index) => (
                              <img
                                key={index}
                                src={path + acc || "/placeholder.svg"}
                                alt="accreditation image"
                                className="h-12 w-12 rounded-full"
                              />
                            ))}
                          </div>

                          {/* VIEW DETAILS BUTTON */}
                          <div>
                            <Link
                                          to={"/hospital-details-page"}
                                          style={{
                                            textDecoration: "none",
                                          }}
                                          className="!py-1.5 !px-2 min-[425px]:!px-4 !text-center !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
                                        >
                                         View Details
                                        </Link>



                         
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr key={`hr-${detail.id}`} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
