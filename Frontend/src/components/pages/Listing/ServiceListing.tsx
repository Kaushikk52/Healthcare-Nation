import { AnimatePresence, motion } from "framer-motion";
import { FaStar, FaFilter } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import servicesByAccrediations from "@/data/accrediations";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "@/App.css";

// Import the getFiltersByType utility at the top of your file
import { getFiltersByType } from "./getFiltersByType";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterOption {
  id: string;
  text: string;
  count?: number;
}

interface FilterSection {
  title: string;
  filterType: string;
  options: FilterOption[];
}

interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface Review {
  id: string;
  // Add other review properties as needed
}

interface Facility {
  id: string;
  name: string;
  address: Address;
  openDay: string;
  closeDay: string;
  hours: string;
  avgRating: number;
  reviews: Review[];
  accreditations: string[];
  images: string[];
}

interface SelectedFilters {
  brands: string[];
  diagnostics: string[];
  specialities: string[];
  psu: string[];
  accreditations: string[];
  concerns: string[];
  insurance: string[];
  tpa: string[];
  altMed: string[];
  ownership: string[];
  sortBy: string[];
  saved: boolean;
}

export default function ServiceListing() {
  const latestRequestId = useRef(0);
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const hospitalImgs = import.meta.env.VITE_APP_CLOUDINARY_HOSPITALS;
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<any[]>([]);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterSection[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Helper function to format time in 12-hour format
  const formatTime = (time24: string): string => {
    const [hourStr, minuteStr] = time24.split(":");
    const hour24 = Number.parseInt(hourStr, 10);

    let hour12 = hour24 % 12;
    if (hour12 === 0) hour12 = 12;
    const period = hour24 < 12 ? "AM" : "PM";

    return `${hour12}:${minuteStr} ${period}`;
  };

  // Flag to prevent infinite loops when updating state
  const isUpdatingFilters = useRef(false);
  const isUpdatingParams = useRef(false);

  // Track previous location and search values
  const prevLocationRef = useRef<string | null>(null);
  const prevSearchRef = useRef<string | null>(null);

  const initialSelectedFilters: SelectedFilters = {
    brands: [],
    diagnostics: [],
    specialities: [],
    psu: [],
    accreditations: [],
    concerns: [],
    insurance: [],
    tpa: [],
    altMed: [],
    ownership: [],
    sortBy: [],
    saved: false,
  };

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    initialSelectedFilters
  );
  const [params, setParams] = useSearchParams();

  const location = params.get("location");
  const search = params.get("search");
  const type = params.get("type") || "hospitals";

  // Function to update URL parameters based on selected filters
  const updateUrlParams = () => {
    // Skip if we're currently updating filters from params
    if (isUpdatingFilters.current) return;

    // Set flag to prevent infinite loop
    isUpdatingParams.current = true;

    const newParams = new URLSearchParams();

    // Always keep the type parameter
    if (type) {
      newParams.set("type", type);
    }

    // Keep location and search if they exist
    if (location) {
      newParams.set("location", location);
    }

    if (search) {
      newParams.set("search", search);
    }

    // Add all selected filters to URL parameters
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (key === "saved") {
        // Include saved=true in URL params when it's selected
        if (value === true) {
          newParams.set("saved", "true");
        }
        return;
      }

      if (Array.isArray(value) && value.length > 0) {
        // For arrays with multiple values, join with commas
        newParams.set(key, value.join(","));
      }
    });

    // Update URL without reloading the page
    setParams(newParams);

    // Reset flag after a short delay to ensure state updates have completed
    setTimeout(() => {
      isUpdatingParams.current = false;
    }, 0);
  };

  // Function to parse URL parameters and set selected filters
  const setFiltersFromParams = () => {
    // Skip if we're currently updating params from filters
    if (isUpdatingParams.current) return;

    // Set flag to prevent infinite loop
    isUpdatingFilters.current = true;

    const newFilters = { ...initialSelectedFilters };
    let filtersChanged = false;

    // Check for saved parameter
    const savedParam = params.get("saved");
    if (savedParam === "true") {
      newFilters.saved = true;
      filtersChanged = true;
    }

    // Check all possible filter parameters in the URL
    const filterTypes = [
      "brands",
      "diagnostics",
      "specialities",
      "psu",
      "accreditations",
      "concerns",
      "insurance",
      "tpa",
      "altMed",
      "ownership",
      "sortBy",
    ];

    filterTypes.forEach((filterType) => {
      const paramValue = params.get(filterType);
      if (paramValue) {
        // Split comma-separated values into array
        newFilters[filterType as keyof SelectedFilters] = paramValue.split(
          ","
        ) as any;
        filtersChanged = true;
      }
    });

    // Only update state if filters have changed
    if (filtersChanged) {
      setSelectedFilters(newFilters);
    }

    // Reset flag after a short delay to ensure state updates have completed
    setTimeout(() => {
      isUpdatingFilters.current = false;
    }, 0);
  };

  const clearAllFilters = () => {
    // Reset selected filters
    setSelectedFilters(initialSelectedFilters);

    // Update URL params - keep only the type parameter
    const newParams = new URLSearchParams();
    if (type) {
      newParams.set("type", type);
    }
    // Update URL
    setParams(newParams);
    // getFacilities()
  };

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionTitle)
        ? prev.filter((title) => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const handleFilterToggle = (filterId: string, filterType: string) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (filterType === "saved") {
        newFilters.saved = !newFilters.saved;
        // Remove the special handling for saved filter
        // if (newFilters.saved) {
        //   handleSavedFilter(true)
        // }
      } else if (filterType === "sortBy") {
        // Handle sortBy as radio buttons - either select the new option or clear if clicking the same one
        const currentSortBy = newFilters.sortBy[0];
        if (currentSortBy === filterId) {
          // If clicking the same option, clear it
          newFilters.sortBy = [];
        } else {
          // Otherwise select the new option
          newFilters.sortBy = [filterId];
        }
      } else {
        const filterArray = newFilters[
          filterType as keyof SelectedFilters
        ] as string[];
        if (Array.isArray(filterArray)) {
          if (filterArray.includes(filterId)) {
            (newFilters[filterType as keyof SelectedFilters] as string[]) =
              filterArray.filter((id) => id !== filterId);
          } else {
            (newFilters[filterType as keyof SelectedFilters] as string[]) = [
              ...filterArray,
              filterId,
            ];
          }
        }
      }
      return newFilters;
    });
  };

  const detailsUrl = (id: string) => {
    if (type === "hospitals" || type === "clinics") {
      return `/${type}-details/${id}`;
    } else if (
      type === "dialysis" ||
      type === "ivf" ||
      type === "burns" ||
      type === "hairTransplant" ||
      type === "checkup" ||
      type === "rehabilitation"
    ) {
      return `/center/${type}/${id}`;
    } else {
      return `/services/${type}/${id}`;
    }
  };

  const buildQuery = () => {
    const query = new URLSearchParams();

    // Add location and search if they exist
    location && query.append("location", location);
    search && query.append("search", search);

    // Add saved filter to query if it's true
    if (selectedFilters.saved) {
      query.append("saved", "true");
    }

    // Add all selected filters to the query EXCEPT sortBy
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (key === "saved" || key === "sortBy") return; // Skip saved and sortBy filters

      if (Array.isArray(value) && value.length > 0) {
        // For arrays with multiple values, join with commas
        query.append(key, value.join(","));
      }
    });

    return query;
  };

  // const getFacilities = async () => {
  //   try {
  //     let url = ``
  //     const queryString = buildQuery()
  //     if (type === "hospitals" || type === "clinics") {
  //       if (queryString.size > 0) {
  //         url = `${baseURL}/v1/api/facility/filter?type=${type}&${queryString}`
  //       } else {
  //         url = `${baseURL}/v1/api/facility/filter?type=${type}`
  //       }
  //     } else if (
  //       type === "dialysis" ||
  //       type === "ivf" ||
  //       type === "burns" ||
  //       type === "hairTransplant" ||
  //       type === "checkup" ||
  //       type === "rehabilitation"
  //     ) {
  //       if (queryString.size > 0) {
  //         url = `${baseURL}/v1/api/center/filter?type=${type}&${queryString}`
  //       } else {
  //         url = `${baseURL}/v1/api/center/filter?type=${type}`
  //       }
  //     } else {
  //       if (queryString.size > 0) {
  //         url = `${baseURL}/v1/api/${type}/filter?${queryString}`
  //       } else {
  //         url = `${baseURL}/v1/api/${type}/filter`
  //       }
  //     }
  //     const response = await axios.get(url)
  //     const data = response.data[type] || []
  //     if (response.data[type].length === 0) {
  //       setFacilities([])
  //     } else {
  //       setFacilities(data)
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const getFacilities = async () => {
    try {
      // Generate a unique ID for this request
      const currentRequestId = latestRequestId.current + 1;
      latestRequestId.current = currentRequestId;

      let url = ``;
      const queryString = buildQuery();
      if (type === "hospitals" || type === "clinics") {
        if (queryString.size > 0) {
          url = `${baseURL}/v1/api/facility/filter?type=${type}&${queryString}`;
        } else {
          url = `${baseURL}/v1/api/facility/filter?type=${type}`;
        }
      } else if (
        type === "dialysis" ||
        type === "ivf" ||
        type === "burns" ||
        type === "hairTransplant" ||
        type === "checkup" ||
        type === "rehabilitation"
      ) {
        if (queryString.size > 0) {
          url = `${baseURL}/v1/api/center/filter?type=${type}&${queryString}`;
        } else {
          url = `${baseURL}/v1/api/center/filter?type=${type}`;
        }
      } else {
        if (queryString.size > 0) {
          url = `${baseURL}/v1/api/${type}/filter?${queryString}`;
        } else {
          url = `${baseURL}/v1/api/${type}/filter`;
        }
      }

      const response = await axios.get(url);

      // Only update state if this is still the latest request
      if (currentRequestId === latestRequestId.current) {
        const data = response.data[type] || [];
        if (response.data[type].length === 0) {
          setFacilities([]);
        } else {
          setFacilities(data);
        }
      } else {
        // console.log('Ignoring stale response from older request')
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Add these utility functions for sorting
  const sortByRating = (facilities: any[]) => {
    return [...facilities].sort((a, b) => b.avgRating - a.avgRating);
  };

  const sortByReviews = (facilities: any[]) => {
    return [...facilities].sort((a, b) => b.reviews.length - a.reviews.length);
  };

  const handleSavedFilter = (saved: boolean) => {
    try {
      if (saved === true) {
        if (type === "hospitals") {
          fetchSavedHospitals();
        } else if (type === "clinics") {
          fetchSavedClinics();
        } else {
          fetchSavedFacilities(type);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSavedHospitals = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/v1/api/saved?type=medical&facilityType=hospitals`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFacilities(response.data);
    } catch (error) {
      console.error("Error fetching saved hospitals:", error);
    }
  };

  const fetchSavedClinics = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/v1/api/saved?type=medical&facilityType=clinics`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFacilities(response.data);
    } catch (error) {
      console.error("Error fetching saved hospitals:", error);
    }
  };

  const fetchSavedFacilities = async (facilityType: string | null) => {
    if (!facilityType) return;

    try {
      const response = await axios.get(
        `${baseURL}/v1/api/saved?type=${facilityType}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFacilities(response.data);
    } catch (error) {
      console.error(`Error fetching saved ${facilityType}:`, error);
      setFacilities([]);
    }
  };

  const getTitleName = (type) => {
    const title = "Health Facilities";
    switch (type) {
      case "dialysis":
        return "dialysis centers";
      case "ivf":
        return "Test Tube Baby / IVF Centers";
      case "rehabilitation":
        return "Rehabilitation / De Addiction Centers";
      case "burns":
        return "Burns Centers";
      case "hairTransplant":
        return "Hair Transplant Centers";
      case "checkup":
        return "Health Checkup Centers";
      case "bank":
        return "Blood/Skin Banks";
      case "transport":
        return "Patient Transport";
      case "orthotics":
        return "Orthotics & Prosthetics";
      case type:
        return type;
      default:
        return title;
    }
  };

  // Initialize filters based on facility type
  useEffect(() => {
    const baseFilters = getFiltersByType(type);
    setFilters(baseFilters);
  }, [type, isLoggedIn]);

  // Set filters from URL parameters when params change
  useEffect(() => {
    setFiltersFromParams();
  }, [params]);

  // Check if location or search has changed
  useEffect(() => {
    // Check if location or search has changed
    if (
      location !== prevLocationRef.current ||
      search !== prevSearchRef.current
    ) {
      // Update refs
      prevLocationRef.current = location;
      prevSearchRef.current = search;

      // Call API if location or search has changed
      if (!selectedFilters.saved) {
        getFacilities();
      }
    }
  }, [location, search]);

  // Update URL parameters when selected filters change
  useEffect(() => {
    updateUrlParams();

    // Apply client-side sorting if sortBy is selected
    if (selectedFilters.sortBy.length > 0) {
      const sortType = selectedFilters.sortBy[0];
      setFacilities((prev) => {
        const sorted = [...prev];
        if (sortType === "rating") return sortByRating(sorted);
        if (sortType === "reviews") return sortByReviews(sorted);
        return sorted;
      });
    }

    // Call getFacilities for all filter changes including saved
    if (selectedFilters.sortBy.length == 0) {
      getFacilities();
    }
  }, [selectedFilters]);

  // Fetch facilities on initial load and when type changes
  useEffect(() => {
    if (selectedFilters.sortBy.length == 0) {
      getFacilities();
    }
    // Reset location and search refs when type changes
    prevLocationRef.current = location;
    prevSearchRef.current = search;
  }, [type]);

  return (
    <div className="relative min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
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
              {location && (
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
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 capitalize">
                      {location}
                    </span>
                  </div>
                </li>
              )}

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
                    {type || "Health Facilities"}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
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
                    onClick={() => {
                      clearAllFilters();
                      getFacilities();
                    }}
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
                    {section.filterType === "sortBy"
                      ? // Radio button style for sortBy
                        section.options.map((option) => (
                          <label
                            key={option.id}
                            className="flex items-center space-x-3 cursor-pointer group"
                          >
                            <div
                              className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors
      ${
        selectedFilters.sortBy[0] === option.id
          ? "border-blue-500"
          : "border-gray-300 group-hover:border-blue-500"
      }`}
                            >
                              {selectedFilters.sortBy[0] === option.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-2.5 h-2.5 bg-blue-500 rounded-full"
                                />
                              )}
                            </div>
                            <input
                              type="radio"
                              className="hidden"
                              checked={selectedFilters.sortBy[0] === option.id}
                              onChange={() =>
                                handleFilterToggle(
                                  option.id,
                                  section.filterType
                                )
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
                        ))
                      : section.filterType === "saved"
                      ? // Special handling for saved filter (boolean value)
                        section.options.map((option) => (
                          <label
                            key={option.id}
                            className="flex items-center space-x-3 cursor-pointer group"
                          >
                            <div
                              className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors
          ${
            selectedFilters.saved
              ? "border-blue-500 bg-blue-500"
              : "border-gray-300 group-hover:border-blue-500"
          }`}
                            >
                              {selectedFilters.saved && (
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
                              checked={selectedFilters.saved}
                              onChange={() =>
                                handleFilterToggle(option.id, "saved")
                              }
                            />
                            <span className="flex-1 text-gray-700">
                              {option.text}
                            </span>
                          </label>
                        ))
                      : // Regular checkbox for other filters
                        section.options.map((option) => (
                          <label
                            key={option.id}
                            className="flex items-center space-x-3 cursor-pointer group"
                          >
                            <div
                              className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors
${
  Array.isArray(selectedFilters[section.filterType as keyof SelectedFilters]) &&
  (
    selectedFilters[section.filterType as keyof SelectedFilters] as string[]
  ).includes(option.id)
    ? "border-blue-500 bg-blue-500"
    : "border-gray-300 group-hover:border-blue-500"
}`}
                            >
                              {Array.isArray(
                                selectedFilters[
                                  section.filterType as keyof SelectedFilters
                                ]
                              ) &&
                                (
                                  selectedFilters[
                                    section.filterType as keyof SelectedFilters
                                  ] as string[]
                                ).includes(option.id) && (
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
                                  selectedFilters[
                                    section.filterType as keyof SelectedFilters
                                  ]
                                ) &&
                                (
                                  selectedFilters[
                                    section.filterType as keyof SelectedFilters
                                  ] as string[]
                                ).includes(option.id)
                              }
                              onChange={() =>
                                handleFilterToggle(
                                  option.id,
                                  section.filterType
                                )
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
            {getTitleName(type) || "Health Facilities"}{" "}
            {location && `in ${location}`}
            {search && (
              <span className="ml-2 text-lg font-normal text-gray-600">
                Search: "{search}"
              </span>
            )}
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
                  onClick={() => {
                    clearAllFilters();
                    getFacilities();
                  }}
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
                    {section.filterType === "sortBy"
                      ? // Radio button style for sortBy
                        section.options.map((option) => (
                          <label
                            key={option.id}
                            className="flex items-center space-x-3 cursor-pointer group"
                          >
                            <div
                              className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors
      ${
        selectedFilters.sortBy[0] === option.id
          ? "border-blue-500"
          : "border-gray-300 group-hover:border-blue-500"
      }`}
                            >
                              {selectedFilters.sortBy[0] === option.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-2.5 h-2.5 bg-blue-500 rounded-full"
                                />
                              )}
                            </div>
                            <input
                              type="radio"
                              className="hidden"
                              checked={selectedFilters.sortBy[0] === option.id}
                              onChange={() =>
                                handleFilterToggle(
                                  option.id,
                                  section.filterType
                                )
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
                        ))
                      : section.filterType === "saved"
                      ? // Special handling for saved filter (boolean value)
                        section.options.map((option) => (
                          <label
                            key={option.id}
                            className="flex items-center space-x-3 cursor-pointer group"
                          >
                            <div
                              className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors
          ${
            selectedFilters.saved
              ? "border-blue-500 bg-blue-500"
              : "border-gray-300 group-hover:border-blue-500"
          }`}
                            >
                              {selectedFilters.saved && (
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
                              checked={selectedFilters.saved}
                              onChange={() =>
                                handleFilterToggle(option.id, "saved")
                              }
                            />
                            <span className="flex-1 text-gray-700">
                              {option.text}
                            </span>
                          </label>
                        ))
                      : // Regular checkbox for other filters
                        section.options.map((option) => (
                          <label
                            key={option.id}
                            className="flex items-center space-x-3 cursor-pointer group"
                          >
                            <div
                              className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors
                                                    ${
                                                      Array.isArray(
                                                        selectedFilters[
                                                          section.filterType as keyof SelectedFilters
                                                        ]
                                                      ) &&
                                                      (
                                                        selectedFilters[
                                                          section.filterType as keyof SelectedFilters
                                                        ] as string[]
                                                      ).includes(option.id)
                                                        ? "border-blue-500 bg-blue-500"
                                                        : "border-gray-300 group-hover:border-blue-500"
                                                    }`}
                            >
                              {Array.isArray(
                                selectedFilters[
                                  section.filterType as keyof SelectedFilters
                                ]
                              ) &&
                                (
                                  selectedFilters[
                                    section.filterType as keyof SelectedFilters
                                  ] as string[]
                                ).includes(option.id) && (
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
                                  selectedFilters[
                                    section.filterType as keyof SelectedFilters
                                  ]
                                ) &&
                                (
                                  selectedFilters[
                                    section.filterType as keyof SelectedFilters
                                  ] as string[]
                                ).includes(option.id)
                              }
                              onChange={() =>
                                handleFilterToggle(
                                  option.id,
                                  section.filterType
                                )
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
                            onClick={() => handleFilterToggle("saved", "saved")}
                            className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-100"
                          >
                            ×
                          </button>
                        </motion.div>,
                      ];
                    }

                    if (Array.isArray(values) && values.length > 0) {
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
              <ScrollArea className="h-[780px]">
                {facilities?.map((detail) => (
                  <React.Fragment key={detail.id}>
                    <Link to={detailsUrl(detail.id)}>
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
                              type === "clinics" ? (
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
                                    src={
                                      hospitalImgs + image || "/placeholder.svg"
                                    }
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
                            <div className="flex flex-col w-10/12 mt-[-5px]">
                              <span className="line-clamp-1 text-lg min-[425px]:text-2xl sm:text-2xl lg:text-2xl xl:text-2xl font-bold text-gray-700">
                                {detail.name}
                              </span>
                              <span className="text-sm min-[425px]:text-base sm:text-lg lg:text-base xl:text-lg font-base text-gray-700">
                                {detail.address?.city}, {detail.address?.state}
                              </span>
                              <span className="text-sm text-green-700 capitalize">
                                {detail.fromTime === detail.toTime
                                  ? `${detail.openDay} - ${detail.closeDay} Open 24 hours`
                                  : `${detail.openDay} - ${
                                      detail.closeDay
                                    } ${formatTime(
                                      detail.fromTime
                                    )} - ${formatTime(detail.toTime)}`}
                              </span>
                            </div>

                            {/* RATING AND REVIEW COUNT */}
                            <div className="w-2/12 !flex !flex-col !justify-center !text-white !my-1 sm:!my-0 !space-y-0.5 sm:!space-y-1.5 !text-center sm:!text-center">
                              {detail.reviews && (
                                <>
                                  <div className="!flex !justify-center !items-center !bg-[#267e3e] !rounded !py-0.5 !px-0">
                                    <span className="!text-base !font-semibold !mr-1 !px-0">
                                      {detail.avgRating
                                        ? detail.avgRating?.toPrecision(2)
                                        : `0.0`}
                                    </span>
                                    <FaStar className="!h-4 !w-4 !mb-0.5 !px-0 !mx-0" />
                                  </div>

                                  <div className="!text-gray-600">
                                    <span className="text-sm">
                                      {detail.reviews?.length} Reviews
                                    </span>
                                  </div>
                                </>
                              )}
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
                                  to={detailsUrl(detail.id)}
                                  style={{
                                    textDecoration: "none",
                                  }}
                                  className="!py-1.5 !px-2 min-[425px]:!px-4 !text-center !text-[10px] min-[425px]:!text-base !rounded-[5px] !border border-[#2277b2] !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
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
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
