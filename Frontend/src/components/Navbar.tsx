import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { User, Menu, X } from "lucide-react"
import AuthPopup from "./Auth/AuthPopup"
import { BiSearchAlt2 } from "react-icons/bi"
import { FaCaretDown } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import axios from "axios"
import _ from "lodash"
import { jwtDecode } from "jwt-decode"
import toast from "react-hot-toast"

const DropdownLink = ({
  href,
  title,
  onClick,
  filterType,
  filterValue,
}: {
  href: string
  title: string
  onClick?: () => void
  filterType?: string
  filterValue?: string
}) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (e) => {
    if (filterType && filterValue) {
      e.preventDefault()

      // Get current type from URL or use a default
      const currentType = searchParams.get("type") || "hospitals"

      // Create new params with current type and the new filter
      const newParams = new URLSearchParams()
      newParams.set("type", currentType)
      newParams.set(filterType, filterValue)

      // Navigate to listing page with the new params
      navigate({
        pathname: "/listing",
        search: newParams.toString(),
      })

      if (onClick) onClick()
    } else if (onClick) {
      onClick()
    }
  }

  return (
    <Link to={href} className={`text-gray-800 block py-2 px-4 rounded w-full text-left`} onClick={handleClick}>
      {title}
    </Link>
  )
}

export default function Navbar() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL
  const [searchParams, setSearchParams] = useSearchParams()
  const newParams = new URLSearchParams(searchParams)
  const location = useLocation()
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    token: "",
  })

  const [query, setQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("")
  const [navDropdownOpen, setNavDropdownOpen] = useState(null)
  const [toggle, setToggle] = useState(false)
  const path = import.meta.env.VITE_APP_IMG_URL
  const [navigateTo, setNavigateTo] = useState("")

  // Update the navigation array to use dynamic type parameters
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
        { title: "Hospitals", path: "/listing?type=hospitals" },
        { title: "Dialysis Centres", path: "/listing?type=dialysis" },
        { title: "Blood / Skin Banks", path: "/listing?type=bank" },
        { title: "Clinics", path: "/listing?type=clinics" },
        { title: "Home Care Services", path: "/listing?type=homecare" },
        { title: "Patient Transports", path: "/listing?type=transport" },
        { title: "Diagnostics", path: "/listing?type=diagnostics" },
        { title: "Orthotic & Prosthetics", path: "/listing?type=orthotics" },
        { title: "Medical Equipment on rent", path: "/listing?type=equipment" },
        { title: "NGOs", path: "/listing?type=ngo" },
        { title: "Startup & Companies", path: "/listing?type=startup" },
      ],
    },
    {
      id: 3,
      title: "Corporates",
      icon: FaCaretDown,
      items: [
        { title: "MPT", filterType: "psu", filterValue: "MPT" },
        { title: "CGHS", filterType: "psu", filterValue: "CGHS" },
        { title: "MJPJAY", filterType: "psu", filterValue: "MJPJAY" },
        { title: "ESIC", filterType: "psu", filterValue: "ESIC" },
        { title: "PMJAY", filterType: "psu", filterValue: "PMJAY" },
        { title: "Railway", filterType: "psu", filterValue: "Railway" },
      ],
    },
    {
      id: 5,
      title: "Diagnostics",
      icon: FaCaretDown,
      items: [
        { title: "Xray", filterType: "diagnostics", filterValue: "Xray" },
        { title: "MRI", filterType: "diagnostics", filterValue: "MRI" },
        { title: "Sonography", filterType: "diagnostics", filterValue: "Sonography" },
        { title: "Lab/Pathology", filterType: "diagnostics", filterValue: "Lab/Pathology" },
        { title: "CT Scan", filterType: "diagnostics", filterValue: "CT Scan" },
        { title: "2D Echo", filterType: "diagnostics", filterValue: "2D Echo" },
        { title: "EEG/EMG/NCV", filterType: "diagnostics", filterValue: "EEG/EMG/NCV" },
        { title: "Holter Monitor", filterType: "diagnostics", filterValue: "Holter Monitor" },
        { title: "Sleep Study", filterType: "diagnostics", filterValue: "Sleep Study" },
        { title: "Mammography", filterType: "diagnostics", filterValue: "Mammography" },
        { title: "Pulmonary Function Test", filterType: "diagnostics", filterValue: "Pulmonary Function Test" },
      ],
    },
    {
      id: 6,
      title: "Health Concerns",
      icon: FaCaretDown,
      items: [
        { title: "Depression or Anxiety ?", filterType: "concerns", filterValue: "Depression or Anxiety ?" },
        { title: "Pregnant ?", filterType: "concerns", filterValue: "Pregnant ?" },
        { title: "Joint Pains ?", filterType: "concerns", filterValue: "Joint Pains ?" },
        { title: "Ear Problems ?", filterType: "concerns", filterValue: "Ear Problems ?" },
        { title: "Digestion Issues ?", filterType: "concerns", filterValue: "Digestion Issues ?" },
        { title: "Tooth Ache ?", filterType: "concerns", filterValue: "Tooth Ache ?" },
        { title: "Persistent Coughing ?", filterType: "concerns", filterValue: "Persistent Coughing ?" },
        { title: "Urinary Problems ?", filterType: "concerns", filterValue: "Urinary Problems ?" },
        { title: "Eye Problems ?", filterType: "concerns", filterValue: "Eye Problems ?" },
      ],
    },
    {
      id: 7,
      title: "Insurance",
      icon: FaCaretDown,
      items: [
        { title: "ICICI Lombard", filterType: "insurance", filterValue: "ICICI Lombard" },
        { title: "IFFFCO Tokio", filterType: "insurance", filterValue: "IFFCO-TOKIO" },
        { title: "HDFC Ergo", filterType: "insurance", filterValue: "HDFC ERGO" },
        { title: "Bajaj Allianz", filterType: "insurance", filterValue: "BAJAJ Allianz" },
        { title: "Care", filterType: "insurance", filterValue: "Care" },
        { title: "Kotak", filterType: "insurance", filterValue: "Kotak" },
      ],
    },
    {
      id: 8,
      title: "TPA",
      icon: FaCaretDown,
      items: [
        { title: "Health India", filterType: "tpa", filterValue: "Health India" },
        { title: "Vidal Health", filterType: "tpa", filterValue: "Vidal Health" },
        { title: "Raksha TPA", filterType: "tpa", filterValue: "Raksha TPA" },
        { title: "MD India", filterType: "tpa", filterValue: "MD India" },
        { title: "Medi Assist", filterType: "tpa", filterValue: "Medi Assist" },
        { title: "Med Save India", filterType: "tpa", filterValue: "MedSave India" },
      ],
    },
  ]

  const handleEmpty = () => {
    const search = searchParams.get("search")
    const location = searchParams.get("location");
    console.log("location", location)
    if (location === null || location === "") {
      setSelectedLocation("")
    } else {
      setSelectedLocation(location)
    }

    if (search === null || search === "") {
      setQuery("")
    } else {
      setQuery(search)
    }
  }

  useEffect(()=>{
    handleEmpty();
  },[searchParams])

  const handleLocationChange = (event) => {
    const locationValue = event.target.value
    setSelectedLocation(locationValue)

    const newParams = new URLSearchParams(searchParams)
    if (locationValue !== "") {
      newParams.set("location", locationValue)
    } else if(locationValue === ""){
      newParams.delete("location")
      setSelectedLocation("")
    }

    // Combine navigation and search params in one call
    if (location.pathname !== "/listing") {
      navigate(
        {
          pathname: "/listing",
          search: newParams.toString(),
        },
        { replace: true },
      )
      // console.log("navigated to listing page ...")
    } else {
      // Only update search params if already on listing page
      setSearchParams(newParams, { replace: true })
    }
  }
  
  // Handle search input
  const handleSearch = useCallback(
    _.debounce((searchText) => {
      const newParams = new URLSearchParams(searchParams)
      if (searchText !== "") {
        newParams.set("search", searchText)
      } else {
        newParams.delete("search")
      }

      if (location.pathname !== "/listing") {
        navigate(
          {
            pathname: "/listing",
            search: newParams.toString(),
          },
          { replace: true },
        )
        // console.log("navigated to listing page ...")
      } else {
        setSearchParams(newParams, { replace: true })
      }
    }, 500),
    [searchParams, location.pathname, navigate],
  )

  useEffect(() => {
    newParams.delete("location")
    newParams.delete("search")
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(`${baseURL}/v1/api/user/principal`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      if (response.status === 401) {
        setCurrentUser(null)
        localStorage.removeItem("token")
      }
      setCurrentUser(response.data.users)
    } catch (err) {
      console.log(err)
    }
  }

  const locations = ["Mumbai", "Ahmedabad","Bangalore", "Chennai","Hyderabad", "Delhi"]

  const [mobileDropdowns, setMobileDropdowns] = useState({})
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    setToggle(false)
  })

  const toggleNavDropdown = (id) => {
    if (window.innerWidth <= 768) {
      setMobileDropdowns((prev) => ({ ...prev, [id]: !prev[id] }))
    } else {
      setNavDropdownOpen((prev) => (prev === id ? null : id))
    }
  }

  const dropdownVariants = {
    open: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.3 } },
    closed: { opacity: 0, y: -10, height: 0, transition: { duration: 0.3 } },
  }

    const isTokenExpired = (token) => {
      if(!token) return true; // Treat missing token as expired
      try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now(); // Convert exp to milliseconds
      }catch(err){
        console.log(err.message);
        return true;
      }
    }

  const checkIfLogin = (route: string) => {

    const token = localStorage.getItem("token");
    const isExpired = isTokenExpired(token);
    if(isExpired) {
      localStorage.removeItem("token");
      toast.error("Login is required");
    }else {
      getUser();
    }

    // console.log("check if login", route, token);
    setNavigateTo(route)
    // console.log(route, toggle, token);
    if (token !== null && !toggle) {
      //user logged in and no popup
      navigate(route)
    } else if (token !== null && toggle === true) {
      //user logged in and still popup
      setToggle(false) // toggle not visible
    } else if (token === null) {
      //user not logged in
      setToggle(true) // toggle visible
    }
  }

  // Handle input change and pass to debounced function
  const handleChange = (event) => {
    setQuery(event.target.value)
    handleSearch(event.target.value)
  }

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
            <img src={path + "HealthCare Nation 2.png" || "/placeholder.svg"} alt="Logo" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Location dropdown and search bar (desktop) */}
        <div className="hidden md:flex items-center space-x-4 flex-grow justify-center">
          <div className="relative p-1 rounded-md flex items-center space-x-1 h-12 w-full max-w-2xl">
            <div className="px-3 bg-[#EDDBE9] md:w-1/3 lg:w-3/12 xl:w-4/12 flex items-center h-full rounded-l-md">
              <FaLocationDot className="w-5 h-5 text-[#9B2482] flex-shrink-0 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <select
                className={`w-full bg-transparent py-2 pl-10 h-full text-base font-semibold ${
                  selectedLocation ? "text-black" : "text-gray-400"
                } cursor-pointer outline-none`}
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

            <div className="bg-[#EDDBE9] md:w-8/12 lg:w-7/12 xl:w-[350px] flex items-center px-3 h-full rounded-r-md">
              <BiSearchAlt2 className="h-6 w-6 text-[#9B2482] flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={handleChange}
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
            onClick={() =>
              currentUser?.role == "ROLE_USER"
                ? checkIfLogin("/")
                : currentUser?.role == "ROLE_ADMIN"
                  ? checkIfLogin("/dashboard/hospital/add")
                  : checkIfLogin("/")
            }
          >
            <User className="h-6 w-6" />
            {localStorage.getItem("token") && currentUser ? (
              <span>Welcome {currentUser?.firstName} !</span>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop navigation */}
      <div className="hidden md:flex justify-center items-center my-0 mb-0 border-t border-b border-gray-200 py-0">
        <ul className="flex justify-center items-start space-x-4">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id} className="relative group">
                <button
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => {
                    if (item.path) navigate(item.path)
                  }}
                  className={`${
                    location.pathname === item.path ? "text-[#9B2482]" : "text-gray-700"
                  } flex items-center font-semibold cursor-pointer relative py-3`}
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
                    className="absolute bg-white overflow-hidden w-max z-40 shadow-2xl mt-0 p-2 -translate-x-4"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.items.map((i, index) => (
                      <DropdownLink
                        key={index}
                        href={i.path || "#"}
                        title={i.title}
                        filterType={i.filterType}
                        filterValue={i.filterValue}
                        onClick={() => setHoveredItem(null)}
                      />
                    ))}
                  </motion.div>
                )}
              </li>
            )
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
                <img src={path + "HealthCare Nation 2.png" || "/placeholder.svg"} alt="Logo" className="h-10 w-auto" />
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-gray-800">
                <X size={24} />
              </button>
            </div>

            <div className="p-4">
              {navigation.map((item) => {
                const Icon = item.icon
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
                            filterType={i.filterType}
                            filterValue={i.filterValue}
                            onClick={() => setIsMobileMenuOpen(false)}
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}