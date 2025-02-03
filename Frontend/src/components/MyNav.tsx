import {useEffect} from "react";
import { useState } from "react";
import {  NavLink, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import AuthPopup from "./Auth/AuthPopup";
import { FaCaretDown } from "react-icons/fa";

function MyNav() {
  // const path = "src/assets/Images/";

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navigateTo, setNavigateTo] = useState("");
  const [openToggle, setOpenToggle] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navigate = useNavigate();

  const navigation = {
    main: [
      { name: "Home", href: "/" },
      {
        name: "Services",
        href: "/services",
        items: [
          "Hospitals",
          "Dialysis Centres",
          "Blood / Skin Banks",
          "Clinics",
          "Home Care Services",
          "Patient Transports",
          "Diagnostics",
          "Financial Help for Treatment",
        ],
      },
      {
        name: "Corporates",
        href: "/corporates",
        items: [
          "MPT Hospitals",
          "CGHS Hospitals",
          "MJPJAY Hospitals",
          "ESIC Hospitals",
          "PMJAY Hospitals",
          "Railway Hospitals",
        ],
      },
      {
        name: "Specialities",
        href: "/specialities",
        items: [
          "Organ Transplant Centres",
          "Eye Care Centres",
          "Pediatric Centres",
          "Heart Care Centres",
          "Skin Care Centres",
          "Test Tube Baby Centres",
          "Kidney Care Centres",
          "Cancer Care Centres",
        ],
      },
      {
        name: "Diagnostics",
        href: "/diagnostics",
        items: ["Xray", "MRI", "Sonography", "Pathology", "CT Scan", "2D Echo"],
      },
      {
        name: "Health Concerns",
        href: "/health-concerns",
        items: ["Depression or Anxiety ?", "Pregnant ?", "Joint Pains ?", "Ear Problems ?", "Digestion Issues ?"],
      },
      { name: "Insurance", href: "/insurance" },
      { name: "TPA", href: "/tpa" },
      { name: "Articles", href: "/articles" },
    ],
  }

  useEffect(() => {
    setOpenToggle(false);
  });

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener("resize", handleResize);

  const handleServicesClick = (e:any) => {
    if (isMobile) {
      e.preventDefault(); // Prevent navigation on mobile view
      setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
      if (isDropdownOpen) {
        navigate("/Services");
      }
    } else {
      navigate("/Services");
    }
  };

  const checkIfLogin = (route: string) => {
    const token = localStorage.getItem("token");
    console.log("checking...");
    console.log("token", token);
    setNavigateTo(route);
    if (token !== null && openToggle === false) {
      //user logged in and no popup
      navigate(route);
    } else if (token !== null && openToggle === true) {
      //user logged in and still popup
      setOpenToggle(false);
    } else if (token === null) {
      //user not logged in
      setOpenToggle(true);
    }
  };

  const path = import.meta.env.VITE_APP_IMG_URL;
  return (
    <>
      <div className="nav1 pt-2 container-fluid">
        <div className="d-flex row justify-content-evenly">
          <div className="col-md-2">
            <img
              src={path + "HealthCare Nation 2.png"}
              alt=""
              className="logo-main"
            />
          </div>

          <div className="col-md-7 m-auto">
            <div className="row justify-content-center">
              <div className="col-3 background-first me-1 p-1 text14 search-bar-laptop">
                <span>
                  <img
                    src={path + "location.png"}
                    alt=""
                    height="15px"
                    className="ms-2 me-2"
                  />
                </span>
                <div className="dropdown d-inline">
                  <a
                    className="btn dropdown-toggle p-0"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Location
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Mumbai
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Delhi
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Ahmedabad
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Bangalore
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-8 p-0 background-first search-bar-laptop">
                <span>
                  <img
                    src={path + "search.png"}
                    alt=""
                    height="15px"
                    className="ms-2"
                  />
                </span>
                <input
                  type="text"
                  placeholder="search here"
                  className="background-first p-1 text14 inp ps-2"
                  id="myInput"
                  name="myCountry"
                />
              </div>
            </div>
          </div>

            
          <div className="col-md-2 d-flex align-self-center justify-content-center">
            <div className="signupin-box text-center p-1 sign-laptop">
              <AuthPopup popup={openToggle} navigateTo={navigateTo} />
              <button onClick={() => checkIfLogin("/dashboard/add-property")}>
                <User />
              </button>
            </div>
          </div>
        </div>

        {/* phone view */}
        <div className="d-flex ">
          <div className="col-3 background-first me-1 p-1 text14 serach-bar-phone">
            {" "}
            <span className="">
              <img
                src={path + "location.png"}
                alt=""
                height="15px"
                className="ms-2 me-2 "
              />
            </span>
            <div className="dropdown d-inline">
              <a
                className="btn  dropdown-toggle p-0"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></a>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <a className="dropdown-item" href="#">
                    Mumbai
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Delhi
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Ahmedabad
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Bangalore
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-9  p-0 background-first serach-bar-phone">
            <span className="d-flex vadhiya">
              <img
                src={path + "search.png"}
                alt=""
                height="15px"
                className="ms-2"
              />{" "}
              <input
                type="text"
                placeholder="search here"
                className="background-first p-1 text14 inp"
              />
            </span>
          </div>
        </div>
        <div className="horizontal-line"></div>
      </div>

      {/* navbar start  */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl container px-4">
          <nav className="flex justify-center items-center">
            {navigation.main.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink
                  to={item.href}
                  style={{
                    color: "black",
                    textDecoration: "none",
                    
                  }}
                  className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 outline-none"
                >
                 {item.name}
                  {item.items && (
                    <FaCaretDown />
                    // <svg className="ml-1 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    // </svg>
                  )}
                </NavLink>

                {/* Dropdown Menu */}
                {item.items && activeDropdown === item.name && (
                  <div className="absolute left-0 top-full z-10 w-56 bg-white shadow-lg">
                    <div className="py-1">
                      {item.items.map((subItem) => (
                        <a key={subItem} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          {subItem}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

export default MyNav;
