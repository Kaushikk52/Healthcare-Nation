import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaFilter } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import servicesByAccrediations from "@/data/accrediations";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "@/App.css";

const filters = [
  {
    title: "Saved",
    filterType: "saved",
    options: [{ id: "Saved", text: "Saved" }],
  },
  {
    title: "Sort By",
    filterType: "sortBy",
    options: [
      { id: "relevance", text: "Relevance" },
      { id: "rating", text: "Ratings : High to Low" },
      { id: "reviews", text: "Reviews : High to Low" },
    ],
  },
  {
    title: "Accreditation",
    filterType: "accrediation",
    options: [
      { id: "NABH", text: "NABH", count: 34 },
      { id: "JCI", text: "JCI", count: 16 },
    ],
  },
  {
    title: "Ownership",
    filterType: "ownership",
    options: [
      { id: "Private", text: "Private" },
      { id: "Government", text: "Government" },
    ],
  },
  {
    title: "Specialities",
    filterType: "specialities",
    options: [
      { id: "Eye-care", text: "Eye-care" },
      { id: "Maternity", text: "Maternity" },
    ],
  },
  {
    title: "Corporates",
    filterType: "psu",
    options: [
      { id: "MPT Hospitals", text: "MPT Hospitals" },
      { id: "CGHS Hospitals", text: "CGHS Hospitals" },
      { id: "MJPJAY Hospitals", text: "MJPJAY Hospitals" },
      { id: "PMJAY Hospitals", text: "PMJAY Hospitals" },
      { id: "Railway Hospitals", text: "Railway Hospitals" },
    ],
  },
  {
    title: "Brands",
    filterType: "brands",
    options: [
      { id: "Apollo", text: "Apollo" },
      { id: "Fortis", text: "Fortis" },
      { id: "Max", text: "Max" },
    ],
  },
  {
    title: "Diagnostics",
    filterType: "diagnostics",
    options: [
      { id: "X-Ray", text: "X-Ray" },
      { id: "MRI", text: "MRI" },
      { id: "CT Scan", text: "CT Scan" },
    ],
  },
  {
    title: "Insurance",
    filterType: "insurance",
    options: [
      { id: "ICICI", text: "ICICI" },
      { id: "HDFC", text: "HDFC" },
      { id: "LIC", text: "LIC" },
    ],
  },
  {
    title: "TPA",
    filterType: "tpa",
    options: [
      { id: "Medi Assist", text: "Medi Assist" },
      { id: "MD India", text: "MD India" },
    ],
  },
  {
    title: "Alternative Medicine",
    filterType: "altMed",
    options: [
      { id: "Ayurveda", text: "Ayurveda" },
      { id: "Homeopathy", text: "Homeopathy" },
      { id: "Yoga", text: "Yoga" },
    ],
  },
];

export default function ServiceListing() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const hospitalImgs = import.meta.env.VITE_APP_CLOUDINARY_HOSPITALS;
  const clinicImgs = import.meta.env.VITE_APP_CLOUDINARY_CLINICS;
  const path = import.meta.env.VITE_APP_IMG_URL;
  const [expandedSections, setExpandedSections] = useState(
    filters.map((filter) => filter.title)
  );
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const location = searchParams.get("location");

  const [facilities, setFacilities] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    diagnostics: [],
    specialities: [],
    psu: [],
    accrediation: [],
    concern: [],
    insurance: [],
    tpa: [],
    altMed: [],
    ownership: [],
    sortBy: [],
    saved: false,
  });

  const toggleSection = (sectionTitle) => {
    setExpandedSections((prev) =>
      prev.includes(sectionTitle)
        ? prev.filter((title) => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  useEffect(() => {
    type === "hospitals" ? fetchHospitals() : fetchClinics();
  }, [type]);

  const handleSavedFilter = (saved) => {
      selectedFilters.saved = saved;
    try {
      if (selectedFilters.saved === true){
          type === "hospitals" ? fetchSavedHospitals() : fetchSavedClinics();
      }
    }catch(err){
      console.log(err.message);
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/v1/api/facility/type/hospitals`
      );
      setFacilities(response.data.hospitals);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  const fetchClinics = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/v1/api/facility/type/clinics`
      );
      setFacilities(response.data.clinics);
    } catch (error) {
      console.error("Error fetching clinics:", error);
    }
  };

  const handleFilterToggle = (filterId, filterType) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if(filterType === "saved"){
        fetchSavedHospitals();
      }
      if (filterType === "sortBy") {
        newFilters[filterType] = [filterId];
      } else {
        // newFilters[filterType] = newFilters[filterType].includes(filterId)
        //   ? newFilters[filterType].filter((id) => id !== filterId)
        //   : [...newFilters[filterType], filterId];
      }
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      brands: [],
      diagnostics: [],
      specialities: [],
      psu: [],
      accrediation: [],
      concern: [],
      insurance: [],
      tpa: [],
      altMed: [],
      ownership: [],
      sortBy: [],
      saved: false,
    });
  };

  useEffect(() => {
    applyFilters();
  }, [selectedFilters]);

  const applyFilters = async () => {
    try {
      if (selectedFilters.saved === true) {
          return fetchSavedHospitals();
      }
      const response = await axios.post(`${baseURL}/v1/api/facility/filter`, {
        params: {
          filters: selectedFilters,
          type: type
        }
      
      });
      setFacilities(
        type === "hospitals" ? response.data?.hospitals : response.data.clinics
      );
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const fetchSavedHospitals = async () => {
    try {
      const response = await axios.get(`${baseURL}/v1/api/saved/hospitals`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFacilities(response.data);
    } catch (error) {
      console.error("Error fetching saved hospitals:", error);
    }
  };

  const fetchSavedClinics = async () => {
    setFacilities([]);
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
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 capitalize">
                    {type}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Debug Panel - Uncomment to see selected filters in UI */}
      {/* <div className="max-w-7xl mx-auto px-4 py-3 bg-white mt-4 rounded shadow">
        <h3 className="font-semibold mb-2">Selected Filters:</h3>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
          {JSON.stringify(getSelectedFilters(), null, 2)}
        </pre>
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
                    {section.options.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <div
                          className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors
${
  Array.isArray(selectedFilters[section.filterType]) &&
  selectedFilters[section.filterType].includes(option.id)
    ? "border-blue-500 bg-blue-500"
    : "border-gray-300 group-hover:border-blue-500"
}`}
                        >
                          {Array.isArray(selectedFilters[section.filterType]) &&
                            selectedFilters[section.filterType].includes(
                              option.id
                            ) && (
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
                          checked={
                            Array.isArray(
                              selectedFilters[section.filterType]
                            ) &&
                            selectedFilters[section.filterType].includes(
                              option.id
                            )
                          }
                          onChange={() =>
                            handleFilterToggle(option.id, section.filterType)
                          }
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
                    ))}
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
          <h2 className="text-2xl font-bold capitalize">
            {type} in {location || "Mumbai"}
          </h2>
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
                    {section.options.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <div
                          className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors
                                                      ${
                                                        Array.isArray(
                                                          selectedFilters[
                                                            section.filterType
                                                          ]
                                                        ) &&
                                                        selectedFilters[
                                                          section.filterType
                                                        ].includes(option.id)
                                                          ? "border-blue-500 bg-blue-500"
                                                          : "border-gray-300 group-hover:border-blue-500"
                                                      }`}
                        >
                          {Array.isArray(selectedFilters[section.filterType]) &&
                            selectedFilters[section.filterType].includes(
                              option.id
                            ) && (
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
                          checked={
                            Array.isArray(
                              selectedFilters[section.filterType]
                            ) &&
                            selectedFilters[section.filterType].includes(
                              option.id
                            )
                          }
                          onChange={() =>
                            handleFilterToggle(option.id, section.filterType)
                          }
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
                    ))}
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
                {Object.entries(selectedFilters).flatMap(
                  ([filterType, values]) => {
                    if (filterType === "saved" && values === true) {
                      return [
                        <motion.div
                          key="saved"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700"
                        >
                          <span>Saved</span>
                          <button
                            onClick={() => handleSavedFilter(!selectedFilters.saved)}
                            className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-100"
                          >
                            ×
                          </button>
                        </motion.div>,
                      ];
                    }

                    if (Array.isArray(values)) {
                      return values.map((filterId) => {
                        const filterSection = filters.find(
                          (section) => section.filterType === filterType
                        );
                        const filterOption = filterSection?.options.find(
                          (option) => option.id === filterId
                        );

                        if (!filterOption) return null;

                        return (
                          <motion.div
                            key={`${filterType}-${filterId}`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700"
                          >
                            <span>{filterOption.text}</span>
                            <button
                              onClick={() =>
                                handleFilterToggle(filterId, filterType)
                              }
                              className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-100"
                            >
                              ×
                            </button>
                          </motion.div>
                        );
                      });
                    }

                    return [];
                  }
                )}
              </div>
            </div>
            <hr />

            {/* LIST OF HOSPITALS WITH DETAILS */}
            <div>
              {facilities?.map((detail) => (
                <React.Fragment key={detail.id}>
                  <Link to={`/${type}-details/${detail.id}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-x-4 gap-y-2 mt-6 mb-6 sm:px-2">
                      {/* HOSPITAL IMAGE */}
                      <div className="lg:col-span-4">
                        <Swiper
                          modules={[Navigation, Pagination, A11y]}
                          spaceBetween={50}
                          slidesPerView={1}
                          navigation
                          pagination={{ clickable: true }}
                          draggable={true}
                          onSlideChange={() => console.log("slide change")}
                        >
                          {detail.images.map((image, index) =>
                            type === "hospitals" ? (
                              <SwiperSlide key={index}>
                                <img
                                  src={
                                    hospitalImgs + image || "/placeholder.svg"
                                  }
                                  alt={`${type} Image`}
                                  className="w-full h-auto object-cover aspect-[5/3] rounded-md"
                                />
                              </SwiperSlide>
                            ) : (
                              <SwiperSlide key={index}>
                                <img
                                  src={clinicImgs + image || "/placeholder.svg"}
                                  alt={`${type} Image`}
                                  className="w-full h-auto object-cover aspect-[5/3] rounded-md"
                                />
                              </SwiperSlide>
                            )
                          )}
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
                              {detail.address.street}, {detail.address.city} -{" "}
                              {detail.address.zipCode}
                            </span>
                            <span className="text-sm  text-green-700 capitalize">
                              {`${detail.openDay} - ${detail.closeDay} ${detail.hours} hrs` ||
                                "Open 24 hours"}
                            </span>
                          </div>

                          {/* RATING AND REVIEW COUNT */}
                          <div className="!flex !flex-col !justify-center !text-white !my-1 sm:!my-0 !space-y-0.5 sm:!space-y-1.5 !text-left sm:!text-right">
                            <div className="!flex !justify-center !items-center !bg-[#267e3e] !rounded !py-0.5 !px-0">
                              <span className="!text-base !font-semibold !mr-1 !px-0">
                                {detail.avgRating.toPrecision(2)}
                              </span>
                              <FaStar className="!h-4 !w-4 !mb-0.5 !px-0 !mx-0" />
                            </div>
                            <div className="!text-gray-600">
                              <span className="text-sm">
                                {detail.reviews.length} Reviews
                              </span>
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
                          </div>

                          {/* HOSPITAL ACCREDITATIONS IMAGES & VIEW DETAILS BUTTON */}
                          <div className="flex justify-between items-center">
                            {/* ACCREDITATIONS IMAGES*/}
                            <div className="flex items-center space-x-2">
                              {detail.accreditations?.map((acc, index) => {
                                const accreditation =
                                  servicesByAccrediations.find(
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

                            {/* VIEW DETAILS BUTTON */}
                            <div>
                              <Link
                                to={`/${type}-details/` + detail.id}
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
                  </Link>

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
