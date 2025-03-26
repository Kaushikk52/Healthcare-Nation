import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaStar, FaFilter } from "react-icons/fa"
import { Link, useSearchParams, useNavigate, useLocation } from "react-router-dom"
import { X, ChevronDown } from "lucide-react"
import axios from "axios"


import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, A11y } from "swiper/modules"

import servicesByAccrediations from "@/data/accrediations"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import "@/App.css"

// Import the getFiltersByType utility at the top of your file
import { getFiltersByType } from "./getFiltersByType"

interface FilterOption {
  id: string
  text: string
  count?: number
}

interface FilterSection {
  title: string
  filterType: string
  options: FilterOption[]
}

interface Address {
  street: string
  city: string
  zipCode: string
}

interface Review {
  id: string
  // Add other review properties as needed
}

interface Facility {
  id: string
  name: string
  address: Address
  openDay: string
  closeDay: string
  hours: string
  avgRating: number
  reviews: Review[]
  accreditations: string[]
  images: string[]
  // Add other facility properties as needed
}

interface SelectedFilters {
  brands: string[]
  diagnostics: string[]
  specialities: string[]
  psu: string[]
  accreditations: string[]
  concerns: string[]
  insurance: string[]
  tpa: string[]
  altMed: string[]
  ownership: string[]
  sortBy: string[]
  saved: boolean
}

// Add props interface to accept location and searchQuery
interface ServiceListingProps {
  facilityType?: string
  locationParam?: string
  searchQuery?: string
}

export default function ServiceListing({ facilityType, locationParam, searchQuery }: ServiceListingProps) {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL
  const hospitalImgs = import.meta.env.VITE_APP_CLOUDINARY_HOSPITALS
  const clinicImgs = import.meta.env.VITE_APP_CLOUDINARY_CLINICS
  const path = import.meta.env.VITE_APP_IMG_URL
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  const prevlocation = useLocation();
  const prevSearchParams = new URLSearchParams(prevlocation.search);

  // Get type and location from URL params as fallback
  const typeFromUrl = searchParams.get("type")
  const locationFromUrl = searchParams.get("location")
  const searchFromUrl = searchParams.get("search")

  const insuranceFromUrl = searchParams.get("insurance")
  const psuFromUrl = searchParams.get("psu")
  const diagnosticsFromUrl = searchParams.get("diagnostics");

  // Use props if provided, otherwise fall back to URL params
  const type = typeFromUrl || prevSearchParams.get("type")
  // const type = typeFromUrl || ""
  const location = locationParam || locationFromUrl
  const search = searchQuery || searchFromUrl

  const [facilities, setFacilities] = useState<Facility[]>([])
  const [filterOpen, setFilterOpen] = useState<boolean>(false)
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
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
  })

  // Replace the filters constant with a state variable
  const [filters, setFilters] = useState<FilterSection[]>([])

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionTitle) ? prev.filter((title) => title !== sectionTitle) : [...prev, sectionTitle],
    )
  }

  // Update filters when URL parameters change
  useEffect(() => {
    // Check if insurance or PSU parameters exist in the URL
    if (insuranceFromUrl || psuFromUrl || diagnosticsFromUrl) {
      setSelectedFilters((prev) => {
        // Create a new object to avoid mutation
        const newFilters = { ...prev }

        // Update insurance filter if it exists in URL
        if (insuranceFromUrl) {
          newFilters.insurance = [insuranceFromUrl]
        }

        // Update PSU filter if it exists in URL
        if (psuFromUrl) {
          newFilters.psu = [psuFromUrl]
        }

        if (diagnosticsFromUrl) {
          newFilters.diagnostics = [diagnosticsFromUrl]
        }

        return newFilters
      })
    }
  }, [insuranceFromUrl, psuFromUrl,diagnosticsFromUrl, searchParams])

  // Separate useEffect for applying filters and setting filter options
  useEffect(() => {
    applyFilters()
    setFilters(getFiltersByType(type))
  }, [type, location, search, selectedFilters])

  // Update the handleSavedFilter function to use the type
  const handleSavedFilter = (saved: boolean) => {
    setSelectedFilters((prev) => ({ ...prev, saved }))
    try {
      if (saved === true) {
        if (type === "hospitals") {
          fetchSavedHospitals()
        } else if (type === "clinics") {
          fetchSavedClinics()
        } else {
          fetchSavedFacilities(type)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleFilterToggle = (filterId: string, filterType: string) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters }
      if (filterType === "saved") {
        newFilters.saved = !newFilters.saved
        if (newFilters.saved) {
          if (type === "hospitals") {
            fetchSavedHospitals()
          } else {
            fetchSavedFacilities(type)
          }
        }
      } else if (filterType === "sortBy") {
        newFilters[filterType as keyof SelectedFilters] = [filterId] as any
      } else {
        const filterArray = newFilters[filterType as keyof SelectedFilters] as string[]
        if (Array.isArray(filterArray)) {
          if (filterArray.includes(filterId)) {
            ;(newFilters[filterType as keyof SelectedFilters] as string[]) = filterArray.filter((id) => id !== filterId)
          } else {
            ;(newFilters[filterType as keyof SelectedFilters] as string[]) = [...filterArray, filterId]
          }
        }
      }
      return newFilters
    })
  }

  const clearAllFilters = () => {
    // Reset selected filters
    setSelectedFilters({
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
    })

    // Update URL params - keep only the type parameter
    const newParams = new URLSearchParams()
    if (typeFromUrl) {
      newParams.append("type", typeFromUrl)
    }

    // Use setSearchParams to update the URL
    setSearchParams(newParams)
  }

  // Build query parameters dynamically with repeated parameters for arrays
  const buildQueryParams = (): string => {
    const params = new URLSearchParams()

    // Add location and search query if they exist
    location && params.append("location", location)
    search && params.append("search", search)

    // Don't include saved in the query params as it uses a different API
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (key === "saved") return

      if (Array.isArray(value) && value.length > 0) {
        if (key === "sortBy") {
          // sortBy is a single value
          params.append(key, value[0])
        } else {
          // For arrays, join values with commas
          params.append(key, value.join(","))
        }
      }
    })

    return params.toString()
  }

  // Update the applyFilters function to use dynamic property access and include location/search
  const applyFilters = async () => {
    try {
      if (selectedFilters.saved === true) {
        return type === "hospitals" ? fetchSavedHospitals() : fetchSavedClinics()
      }

      const queryString = buildQueryParams()
      let url = ``
      if (type === "hospitals" || type === "clinics") {
        url = `${baseURL}/v1/api/facility/filter?type=${type}`
        if (queryString !== "") {
          url = `${baseURL}/v1/api/facility/filter?type=${type}&${queryString}`
        }
      } else {
        url = `${baseURL}/v1/api/${type}/filter?`
        if (queryString !== "") {
          url = `${baseURL}/v1/api/${type}/filter?${queryString}`
        }
      }

      console.log("Filter URL:", url) // For debugging

      const response = await axios.get(url)

      // Dynamically access the array based on the facility type
      let filteredResults = response.data[type] || []

      console.log(response.data[`${type}`], type)

      // Apply client-side sorting if sortBy is selected
      if (selectedFilters.sortBy.length > 0) {
        const sortType = selectedFilters.sortBy[0]
        if (sortType === "rating") {
          filteredResults = sortByRating(filteredResults)
        } else if (sortType === "reviews") {
          filteredResults = sortByReviews(filteredResults)
        }
        // 'relevance' sorting is handled by the API or remains as is
      }
      setFacilities(filteredResults)
    } catch (error) {
      console.error("Error applying filters:", error)
    }
  }

  const detailsUrl = (id) => {
    if (type === "hospitals" || type === "clinics") {
      return `/${type}-details/${id}`
    } else {
      return `/services/${type}/${id}`
    }
  }

  // Add these utility functions for sorting
  const sortByRating = (facilities: Facility[]) => {
    return [...facilities].sort((a, b) => b.avgRating - a.avgRating)
  }

  const sortByReviews = (facilities: Facility[]) => {
    return [...facilities].sort((a, b) => b.reviews.length - a.reviews.length)
  }

  const fetchSavedHospitals = async () => {
    try {
      const response = await axios.get(`${baseURL}/v1/api/saved/hospitals`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setFacilities(response.data)
    } catch (error) {
      console.error("Error fetching saved hospitals:", error)
    }
  }

  const fetchSavedClinics = async () => {
    try {
      const response = await axios.get(`${baseURL}/v1/api/saved/clinics`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setFacilities(response.data)
    } catch (error) {
      console.error("Error fetching saved hospitals:", error)
    }
  }

  const fetchSavedFacilities = async (facilityType: string | null) => {
    if (!facilityType) return

    try {
      const response = await axios.get(`${baseURL}/v1/api/saved/${facilityType}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setFacilities(response.data)
    } catch (error) {
      console.error(`Error fetching saved ${facilityType}:`, error)
      setFacilities([])
    }
  }

  return (
    <div className="relative bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
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
                  <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 capitalize">
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
                  <button onClick={clearAllFilters} className="text-blue-500 text-sm hover:text-blue-600">
                    Clear all
                  </button>
                  <button onClick={() => setFilterOpen(false)} className="text-gray-500 hover:text-gray-700">
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
                        expandedSections.includes(section.title) ? "transform rotate-180" : ""
                      }`}
                    />
                  </h3>
                  <div className={`space-y-2 ${expandedSections.includes(section.title) ? "" : "hidden"}`}>
                    {section.options.map((option) => (
                      <label key={option.id} className="flex items-center space-x-3 cursor-pointer group">
                        <div
                          className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors
${
  Array.isArray(selectedFilters[section.filterType as keyof SelectedFilters]) &&
  (selectedFilters[section.filterType as keyof SelectedFilters] as string[]).includes(option.id)
    ? "border-blue-500 bg-blue-500"
    : "border-gray-300 group-hover:border-blue-500"
}`}
                        >
                          {Array.isArray(selectedFilters[section.filterType as keyof SelectedFilters]) &&
                            (selectedFilters[section.filterType as keyof SelectedFilters] as string[]).includes(
                              option.id,
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
                            Array.isArray(selectedFilters[section.filterType as keyof SelectedFilters]) &&
                            (selectedFilters[section.filterType as keyof SelectedFilters] as string[]).includes(
                              option.id,
                            )
                          }
                          onChange={() => handleFilterToggle(option.id, section.filterType)}
                        />
                        <span className="flex-1 text-gray-700">{option.text}</span>
                        {option.count && <span className="text-gray-400 text-sm">({option.count})</span>}
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
            {type || "Health Facilities"} in {location || "Mumbai"}
            {searchQuery && <span className="ml-2 text-lg font-normal text-gray-600">Search: "{searchQuery}"</span>}
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
                <button onClick={clearAllFilters} className="text-blue-500 text-sm hover:text-blue-600">
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
                        expandedSections.includes(section.title) ? "transform rotate-180" : ""
                      }`}
                    />
                  </h3>
                  <div className={`space-y-2 ${expandedSections.includes(section.title) ? "" : "hidden"}`}>
                    {section.options.map((option) => (
                      <label key={option.id} className="flex items-center space-x-3 cursor-pointer group">
                        <div
                          className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors
                                                      ${
                                                        Array.isArray(
                                                          selectedFilters[section.filterType as keyof SelectedFilters],
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
                          {Array.isArray(selectedFilters[section.filterType as keyof SelectedFilters]) &&
                            (selectedFilters[section.filterType as keyof SelectedFilters] as string[]).includes(
                              option.id,
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
                            Array.isArray(selectedFilters[section.filterType as keyof SelectedFilters]) &&
                            (selectedFilters[section.filterType as keyof SelectedFilters] as string[]).includes(
                              option.id,
                            )
                          }
                          onChange={() => handleFilterToggle(option.id, section.filterType)}
                        />
                        <span className="flex-1 text-gray-700">{option.text}</span>
                        {option.count && <span className="text-gray-400 text-sm">({option.count})</span>}
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
                {Object.entries(selectedFilters).flatMap(([filterType, values]) => {
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
                        {/* <button
                          onClick={() => handleSavedFilter(!selectedFilters.saved)}
                          className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-100"
                        >
                          ×
                        </button> */}
                      </motion.div>,
                    ]
                  }

                  if (Array.isArray(values) && values.length > 0) {
                    return values.map((filterId) => {
                      const filterSection = filters.find((section) => section.filterType === filterType)
                      const filterOption = filterSection?.options.find((option) => option.id === filterId)

                      if (!filterOption) return null

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
                            onClick={() => handleFilterToggle(filterId, filterType)}
                            className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-100"
                          >
                            ×
                          </button>
                        </motion.div>
                      )
                    })
                  }

                  return []
                })}
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
                            type === "clinics" ? (
                              <SwiperSlide key={index}>
                                <img
                                  src={hospitalImgs + image || "/placeholder.svg"}
                                  alt={`${type} Image`}
                                  className="w-full h-auto object-cover aspect-[5/3] rounded-md"
                                />
                              </SwiperSlide>
                            ) : (
                              <SwiperSlide key={index}>
                                <img
                                  src={hospitalImgs + image || "/placeholder.svg"}
                                  alt={`${type} Image`}
                                  className="w-full h-auto object-cover aspect-[5/3] rounded-md"
                                />
                              </SwiperSlide>
                            ),
                          )}
                        </Swiper>
                      </div>

                      {/* HOSPITAL DETAILS  */}
                      <div className="lg:col-span-6 flex flex-col justify-between">
                        {/* HOSPITAL NAME, LOCATION, RATING & REVIEWS COUNT*/}
                        <div className="flex justify-between items-start space-x-2">
                          {/* NAME AND LOCATION */}
                          <div className="flex flex-col w-10/12">
                            <span className="line-clamp-1 text-lg min-[425px]:text-2xl sm:text-2xl lg:text-2xl xl:text-2xl font-bold text-gray-700">
                              {detail.name}
                            </span>
                            <span className="text-sm min-[425px]:text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-gray-700">
                              {detail.address.street}, {detail.address.city} - {detail.address.zipCode}
                            </span>
                            <span className="text-sm  text-green-700 capitalize">
                              {`${detail.openDay} - ${detail.closeDay} ${detail.hours} hrs` || "Open 24 hours"}
                            </span>
                          </div>

                          {/* RATING AND REVIEW COUNT */}
                          <div className="w-2/12 !flex !flex-col !justify-center !text-white !my-1 sm:!my-0 !space-y-0.5 sm:!space-y-1.5 !text-left sm:!text-right">
                            {detail.reviews && (
                              <>
                                <div className="!flex !justify-center !items-center !bg-[#267e3e] !rounded !py-0.5 !px-0">
                                  <span className="!text-base !font-semibold !mr-1 !px-0">
                                    {detail.avgRating?.toPrecision(2)}
                                  </span>
                                  <FaStar className="!h-4 !w-4 !mb-0.5 !px-0 !mx-0" />
                                </div>

                                <div className="!text-gray-600">
                                  <span className="text-sm">{detail.reviews?.length} Reviews</span>
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
                                const accreditation = servicesByAccrediations.find((item) => item.title === acc)
                                const accImg = accreditation?.image // Get the image

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
                                )
                              })}
                            </div>

                            {/* VIEW DETAILS BUTTON */}
                            <div>
                              <Link
                                // to={`/${type}-details/` + detail.id}
                                to={detailsUrl(detail.id)}
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
  )
}