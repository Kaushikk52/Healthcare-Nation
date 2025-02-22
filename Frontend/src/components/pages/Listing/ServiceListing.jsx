import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaFilter, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { X, ChevronDown } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "@/App.css";

const filters = [
  {
    title: "No of beds",
    type: "slider",
    range: [0, 500],
    step: 50,
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
  },
];

const hospitalDetails = [
  {
    id: 1,
    hName: "Kokilaben Hospital",
    images: [
      "demo/Kokliaben-hospital.jpeg",
      "demo/Kokliaben-hospital.jpeg"
    ],
    location: "Andheri",
    city: "Mumbai",
    beds: "323",
    type: "Multispeciality Hospital",
    accreditations: ["national-accreditations.png", "joint-commision.png"],
    rating: "4.8",
    reviews: "59",
    contactNo: "+91 1234567890",
  },
  {
    id: 2,
    hName: "Hiranandani Hospital",
    images: [
      "demo/hiranandani-hospital.jpeg",
      "demo/hiranandani-hospital.jpeg"

    ],
    location: "Powai",
    city: "Mumbai",
    beds: "323",
    type: "Multispeciality Hospital",
    accreditations: ["national-accreditations.png", "joint-commision.png"],
    rating: "4.8",
    reviews: "59",
    contactNo: "+91 1234567890",
  },
];

const sortOptions = [
  { value: "relevance", prefix: "", label: "Relevance" },
  { value: "rating", prefix: "Ratings: ", label: "High to Low" },
  { value: "reviews", prefix: "Reviews: ", label: "High to Low" },
];

export default function ServiceListing() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
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
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-green-600"
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
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-green-600 md:ml-2"
                  >
                    Mumbai
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
      <div className="relative h-48 md:h-64 lg:h-96 overflow-hidden">
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
      </div>

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
                    className="text-green-500 text-sm hover:text-green-600"
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
                                                          ? "border-green-500 bg-green-500"
                                                          : "border-gray-300 group-hover:border-green-500"
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
        <div className="flex gap-6">
          {/* Desktop Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-green-500 text-sm hover:text-green-600"
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
                                                          ? "border-green-500 bg-green-500"
                                                          : "border-gray-300 group-hover:border-green-500"
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Hospitals in Mumbai</h2>
              <button
                onClick={() => setFilterOpen(true)}
                className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <FaFilter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>

            {/* Applied Filters and Sort */}
            <div className="flex justify-between items-center mb-6 sm:px-2">
              {/* Applied Filters */}
              <div className="flex flex-wrap gap-2">
                {bedRange[0] !== 0 || bedRange[1] !== 500 ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-sm text-green-700"
                  >
                    <span>{`${bedRange[0]} - ${bedRange[1]} beds`}</span>
                    <button
                      onClick={() => {
                        setBedRange([0, 500]);
                        setBedRangeInput({ min: "0", max: "500" });
                      }}
                      className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-green-100"
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
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-sm text-green-700"
                    >
                      <span>{filterOption.text}</span>
                      <button
                        onClick={() => handleFilterToggle(filterId)}
                        className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-green-100"
                      >
                        ×
                      </button>
                    </motion.div>
                  );
                })}
                {(selectedFilters.length > 0 ||
                  bedRange[0] !== 0 ||
                  bedRange[1] !== 500) && (
                  <button
                    onClick={() => {
                      clearAllFilters();
                      setBedRange([0, 500]);
                      setBedRangeInput({ min: "0", max: "500" });
                    }}
                    className="text-sm text-green-600 hover:text-green-700 hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="relative ml-auto">
                <button
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className="flex items-center justify-between w-32 md:w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span>
                    <span className="phone-none">Sort by:</span>{" "}
                    {
                      sortOptions.find((option) => option.value === sortBy)
                        ?.label
                    }
                  </span>
                  <FaChevronDown
                    className={`ml-2 h-5 w-5 text-gray-400 ${
                      sortDropdownOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {sortDropdownOpen && (
                  <div className="absolute z-10 w-32 md:w-48 mt-1 bg-white shadow-lg rounded-md py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          sortBy === option.value
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setSortBy(option.value);
                          setSortDropdownOpen(false);
                        }}
                      >
                        <span className="phone-none">{option.prefix}</span>
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <hr />

            {/* LIST OF HOSPITALS WITH DETAILS */}
            <div>
              {hospitalDetails.map((detail) => (
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
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log("slide change")}
                      >
                        {detail.images.map((image, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={path + image || "/placeholder.svg"}
                              alt="Hospital Image"
                              className="w-full h-auto object-cover"
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
                          <span className="line-clamp-1 text-lg min-[425px]:text-2xl sm:text-3xl lg:text-2xl xl:text-3xl font-bold text-gray-700">
                            {detail.hName}
                          </span>
                          <span className="text-sm min-[425px]:text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-gray-700">
                            {detail.location}, {detail.city}
                          </span>
                        </div>

                        {/* RATING AND REVIEW COUNT */}
                        <div className="flex flex-col items-end">
                          <div className="flex items-center">
                            <span className="text-base min-[425px]:text-lg mt-1 sm:text-lg mr-1 text-[#28A745]">
                              {detail.rating}
                            </span>
                            {Array(5)
                              .fill()
                              .map((_, index) => (
                                <FaStar
                                  key={index}
                                  className="text-[#28A745] min-[425px]:h-4 min-[425px]:w-4 sm:w-5 sm:h-5 lg:h-4 lg:w-4 xl:h-5 xl:w-5 flex-shrink-0"
                                />
                              ))}
                          </div>
                          <span className="text-sm min-[425px]:text-base sm:text-base lg:text-sm xl:text-base text-gray-500">
                            {detail.reviews} Reviews
                          </span>
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
                            <span className="text-sm min-[425px]:text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-gray-700">
                              {detail.type}
                            </span>
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
                              className="py-2 px-4 sm:py-2 sm:px-8 lg:py-2 lg:px-4 xl:py-2 xl:px-8 border text-gray-700 border-black font-semibold rounded transition-all duration-150 hover:bg-gray-800 hover:text-white"
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
