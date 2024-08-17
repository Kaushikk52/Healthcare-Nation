import React from 'react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ServiceListing from './Services/ServiceListing';


function MyNav() {
    // const path = "src/assets/Images/";

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    const handleServicesClick = (e) => {
        if (isMobile) {
            e.preventDefault(); // Prevent navigation on mobile view
            setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
            if(isDropdownOpen){
                navigate('/ServiceListing');
            }
        } else {
            navigate('/ServiceListing');
        }
    };


    const path = import.meta.env.VITE_APP_IMG_URL;
    return (
        <>
            <div className="nav1 pt-2 container-fluid">
                <div className="d-flex row justify-content-evenly">
                    <div className="col-md-2">
                        <img src={path + 'HealthCare Nation 2.png'} alt="" className="logo-main" />
                    </div>

                    <div className="col-md-7 m-auto">
                        <div className="row justify-content-center">
                            <div className="col-3 background-first me-1 p-1 text14 search-bar-laptop">
                                <span>
                                    <img src={path + 'location.png'} alt="" height="15px" className="ms-2 me-2" />
                                </span>
                                <div className="dropdown d-inline">
                                    <a className="btn dropdown-toggle p-0" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        Location
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li><a className="dropdown-item" href="#">Mumbai</a></li>
                                        <li><a className="dropdown-item" href="#">Delhi</a></li>
                                        <li><a className="dropdown-item" href="#">Ahmedabad</a></li>
                                        <li><a className="dropdown-item" href="#">Bangalore</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-8 p-0 background-first search-bar-laptop">
                                <span>
                                    <img src={path + 'search.png'} alt="" height="15px" className="ms-2" />
                                </span>
                                <input type="text" placeholder="search here" className="background-first p-1 text14 inp ps-2" id="myInput" name="myCountry" />
                            </div>
                        </div>

                    </div>

                    <div className="col-md-2 d-flex align-self-center justify-content-center">
                        <div className="signupin-box text-center p-1 sign-laptop">
                            <a href="#" className='singupa'>Sign Up</a> |
                            <a href="#" className='singupa'> Sign In</a>
                        </div>
                    </div>
                </div>

                {/* phone view */}
                <div className="d-flex ">
                    <div className="col-3 background-first me-1 p-1 text14 serach-bar-phone"> <span className="">
                        <img src={path + 'location.png'} alt="" height="15px" className="ms-2 me-2 " /></span>
                        <div className="dropdown d-inline">
                            <a className="btn  dropdown-toggle p-0" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
                                aria-expanded="false">

                            </a>

                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li><a className="dropdown-item" href="#">Mumbai</a></li>
                                <li><a className="dropdown-item" href="#">Delhi</a></li>
                                <li><a className="dropdown-item" href="#">Ahmedabad</a></li>
                                <li><a className="dropdown-item" href="#">Bangalore</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-9  p-0 background-first serach-bar-phone">
                        <span className="d-flex vadhiya">
                            <img src={path + 'search.png'} alt="" height="15px" className="ms-2" /> <input type="text"
                                placeholder="search here" className="background-first p-1 text14 inp" /></span>

                    </div>

                </div>




                <div className="horizontal-line"></div>
            </div>


            {/* navbar start  */}

            <nav className="navbar navbar-expand-lg navbar-light py-0 px-3 sticky1">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img src={path + 'HealthCare Nation 2.png'} alt="" className="logo-phone" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse my-navbar" id="navbarSupportedContent">

                        <ul className="navbar-nav m-auto mb-2 mb-lg-0 p-2 ">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link  " aria-current="page" href="#">Home</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink to='/services' className="nav-link navlink1" >Services</NavLink>
                            </li> */}
                            <li>
                                <div className="nav-item dropdown nav-dropdown">
                                    <NavLink
                                        to='/ServiceListing'
                                        className="nav-link navlink1 dropdown-toggle"
                                        onClick={handleServicesClick}
                                    >
                                        Services
                                    </NavLink>
                                    <div
                                        className={`dropdown-menu bg-light rounded-0 rounded-bottom m-0 ${isDropdownOpen ? 'show' : ''}`}
                                    >
                                        <a href="https://www.youtube.com/" className="dropdown-item">Hospitals</a>
                                        <a href="/" className="dropdown-item">Dialysis Centres</a>
                                        <a href="/" className="dropdown-item">Blood / Skin Banks</a>
                                        <a href="/" className="dropdown-item">Clinics</a>
                                        <a href="/" className="dropdown-item">Home Care Services</a>
                                        <a href="/" className="dropdown-item">Patient Transports</a>
                                        <a href="/" className="dropdown-item">Diagnostics</a>
                                        <a href="/" className="dropdown-item">Financial Help for Treatment</a>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="nav-item dropdown nav-dropdown">
                                    <NavLink to='/services' className="nav-link navlink1 dropdown-toggle" >
                                        Corporates
                                    </NavLink>
                                    <div className="dropdown-menu bg-light rounded-0 rounded-bottom m-0">
                                        <a href="/" class="dropdown-item">MPT Hospitals</a>
                                        <a href="/" class="dropdown-item">CGHS Hospitals</a>
                                        <a href="/" class="dropdown-item">MJPJAY Hospitals</a>
                                        <a href="/" class="dropdown-item">ESIC Hospitals</a>
                                        <a href="/" class="dropdown-item">PMJAY Hospitals</a>
                                        <a href="/" class="dropdown-item">Railway Hospitals</a>
                                    </div>
                                </div>
                            </li>


                            <li>
                                <div className="nav-item dropdown nav-dropdown">
                                    <NavLink to='/services' className="nav-link navlink1 dropdown-toggle" >
                                        Specialities
                                    </NavLink>
                                    <div className="dropdown-menu bg-light rounded-0 rounded-bottom m-0">
                                        <a href="/" class="dropdown-item">Organ Transplant Centres</a>
                                        <a href="/" class="dropdown-item">Eye Care Centres</a>
                                        <a href="/" class="dropdown-item">Pediatric Centres</a>
                                        <a href="/" class="dropdown-item">Heart Care Centres</a>
                                        <a href="/" class="dropdown-item">Skin Care Centres</a>
                                        <a href="/" class="dropdown-item">Test Tube Baby Centres</a>
                                        <a href="/" class="dropdown-item">Kidney Care Centres</a>
                                        <a href="/" class="dropdown-item">Cancer Care Centres</a>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className="nav-item dropdown nav-dropdown">
                                    <NavLink to='/services' className="nav-link navlink1 dropdown-toggle" >
                                        Diagnostics
                                    </NavLink>
                                    <div className="dropdown-menu bg-light rounded-0 rounded-bottom m-0">
                                        <a href="/" class="dropdown-item">Xray</a>
                                        <a href="/" class="dropdown-item">MRI</a>
                                        <a href="/" class="dropdown-item">Sonography</a>
                                        <a href="/" class="dropdown-item">Pathology</a>
                                        <a href="/" class="dropdown-item">CT Scan</a>
                                        <a href="/" class="dropdown-item">2D Echo</a>
                                    </div>
                                </div>
                            </li>


                            <li>
                                <div className="nav-item dropdown nav-dropdown">
                                    <NavLink to='/services' className="nav-link navlink1 dropdown-toggle" >
                                        Health Concerns
                                    </NavLink>
                                    <div className="dropdown-menu bg-light rounded-0 rounded-bottom m-0">
                                        <a href="/" class="dropdown-item">Depression or Anxiety ?</a>
                                        <a href="/" class="dropdown-item">Pregnant ?</a>
                                        <a href="/" class="dropdown-item">Joint Pains ?</a>
                                        <a href="/" class="dropdown-item">Ear Problems ?</a>
                                        <a href="/" class="dropdown-item">Digestion Issues ?</a>

                                    </div>
                                </div>
                            </li>







                            <li className="nav-item">
                                <a className="nav-link navlink1" href="#">Insurance</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link navlink1" href="#">TPA</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link navlink1" href="#">Articles</a>
                            </li>
                            <div className="singupin-box text-center p-1 sign-phone">
                                <a href="" className='singupa'>Sign Up</a><a href="" className='singupa'> Sign In</a>
                            </div>


                        </ul>

                    </div>

                    {/* <a className=" patient-right-link pe-2 ">Patient Rights & Responsibilities</a> */}



                </div>

            </nav>





        </>
    );
}

export default MyNav;
