import React from 'react';



function MyNav() {
    // const path = "src/assets/Images/";
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
                                <input type="text" placeholder="search here" className="background-first p-1 text14 inp" id="myInput" name="myCountry" />
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
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav m-auto mb-2 mb-lg-0 p-2">
                            <li className="nav-item">
                                <a className="nav-link active " aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link navlink1" href="#">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link navlink1" href="#">Speciality Centres</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link navlink1" href="#">Therapies</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link navlink1" href="#">Corporates</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link navlink1" href="#">FAQs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link navlink1" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link navlink1" href="#">Contact</a>
                            </li>
                            <div className="singupin-box text-center p-1 sign-phone">
                                <a href="" className='singupa'>Sign Up</a><a href="" className='singupa'> Sign In</a>
                            </div>



                        </ul>

                    </div>
                    <a className=" patient-right-link pe-2">Patient Rights & Responsibilities</a>
                </div>
              
            </nav>





        </>
    );
}

export default MyNav;
