import React from 'react'
import { Link, Outlet } from 'react-router-dom';

function ServiceListing() {
    const path = import.meta.env.VITE_APP_IMG_URL;


    return (
        <>


            <div className="container">Home / Mumbai / Pediatric Hospital</div>

            <div >
                <img src={path + 'demo/pediatric-banner2.jpg'} alt="" className="img-fluid" style={{ backgroundSize: "cover", height: "300px", width: "100%" }} />
            </div>


            <div className="container">
                <div className="mt-3 sev-listing-headline">Pediatric Hospitals in Mumbai</div>

                <div className="details-container">
                    <div className="row">
                        {/* Offcanvas for Small Screens start */}
                        <div
                            className="offcanvas offcanvas-start"
                            tabIndex="-1"
                            id="filterOffcanvas"
                            aria-labelledby="filterOffcanvasLabel"
                        >
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="filterOffcanvasLabel">
                                    Filter Box
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close text-reset"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="offcanvas-body">
                                {/* Content of your filter-box goes here */}
                                <div className="filter-box">
                                    <div className="filter-innerbox ps-2">
                                        <form action="">
                                            <span className="text14">
                                                <b className='text18'> No of beds </b> <br />
                                                <input type="checkbox" id="a" name="a" value="a" />

                                                <label htmlFor="a" className='mb-0'>Less then 50 Beds.. </label>
                                                <br />
                                                <input type="checkbox" id="b" name="b" value="b" />
                                                <label htmlFor="b" className='mb-0'>100 to 300 </label>
                                                <br />
                                                <input type="checkbox" id="c" name="c" value="c" />
                                                <label htmlFor="c" className='mb-0'> More than 300 </label>
                                                <br />
                                                <br />
                                            </span>

                                            <span className="text14">
                                                <b className='text18'> Accreditation</b> <br />
                                                <input type="checkbox" id="d" name="d" value="d" />
                                                <label htmlFor="d" className='mb-0'> NABH</label>
                                                <br />
                                                <input type="checkbox" id="e" name="e" value="e" />
                                                <label htmlFor="e" className='mb-0'>JCI </label>
                                                <br />
                                                <br />
                                            </span>

                                            <span className="text14">
                                                <b className='text18'> Ownership </b> <br />
                                                <input type="checkbox" id="f" name="f" value="f" />
                                                <label htmlFor="f" className='mb-0'> Private</label>
                                                <br />
                                                <input type="checkbox" id="g" name="g" value="g" />
                                                <label htmlFor="g" className='mb-0'>Government </label>
                                                <br />
                                                <br />
                                            </span>

                                            <span className="text14">
                                                <b className='text18'> Speciality </b> <br />
                                                <input
                                                    type="checkbox"
                                                    id="Eye-care"
                                                    name="Eye-care"
                                                    value="Eye-care"
                                                />
                                                <label htmlFor="Eye-care" className='mb-0'>Eye-care</label>
                                                <br />
                                                <input
                                                    type="checkbox"
                                                    id="Maternity"
                                                    name="Maternity"
                                                    value="Maternity"
                                                />
                                                <label htmlFor="Maternity">Maternity </label>
                                                <br />
                                                <br />

                                            </span>

                                            <span className="text14">
                                                <b className='text18'> Speciality </b> <br />
                                                <input
                                                    type="checkbox"
                                                    id="Eye-care"
                                                    name="Eye-care"
                                                    value="Eye-care"
                                                />
                                                <label htmlFor="Eye-care" className='mb-0'>Eye-care</label>
                                                <br />
                                                <input
                                                    type="checkbox"
                                                    id="Maternity"
                                                    name="Maternity"
                                                    value="Maternity"
                                                />
                                                <label htmlFor="Maternity">Maternity </label>
                                                <br />
                                                <br />

                                            </span>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Offcanvas Trigger Button for Small Screens */}
                        <button
                            className="btn d-md-none"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#filterOffcanvas"
                            aria-controls="filterOffcanvas"
                        >
                            Filter <i className="fa-solid fa-caret-down"></i>
                        </button>

                        {/* Offcanvas for Small Screens end */}

                        {/* Filter Box for Large Screens */}
                        <div className="col-xl-3 col-lg-3 col-md-3 filter-box1">
                            <div className="d-flex justify-content-between filter-clear-all-btn">
                                <div className="">Filters</div>

                                <button className="clear-all-btn">Clear All</button>

                            </div>
                            <div className="horizontal-line2 mb-3"></div>

                            {/* filter-innerbox start */}
                            <div className="filter-innerbox pt-2 ps-1 mt-1">
                                <form action="">
                                    <span className="text14">
                                        <b className='text18'> No of beds </b> <br />
                                        <input type="checkbox" id="a" name="a" value="a" />

                                        <label htmlFor="a" className='mb-0'>Less then 50 Beds </label>
                                        <br />
                                        <input type="checkbox" id="b" name="b" value="b" />
                                        <label htmlFor="b" className='mb-0'>100 to 300 </label>
                                        <br />
                                        <input type="checkbox" id="c" name="c" value="c" />
                                        <label htmlFor="c" className='mb-0'> More than 300 </label>
                                        <br />
                                        <br />
                                    </span>

                                    <span className="text14">
                                        <b className='text18'> Accreditation</b> <br />
                                        <input type="checkbox" id="d" name="d" value="d" />
                                        <label htmlFor="d" className='mb-0'> NABH</label>
                                        <br />
                                        <input type="checkbox" id="e" name="e" value="e" />
                                        <label htmlFor="e" className='mb-0'>JCI </label>
                                        <br />
                                        <br />
                                    </span>

                                    <span className="text14">
                                        <b className='text18'> Ownership </b> <br />
                                        <input type="checkbox" id="f" name="f" value="f" />
                                        <label htmlFor="f" className='mb-0'> Private</label>
                                        <br />
                                        <input type="checkbox" id="g" name="g" value="g" />
                                        <label htmlFor="g" className='mb-0'>Government </label>
                                        <br />
                                        <br />
                                    </span>

                                    <span className="text14">
                                        <b className='text18'> Specialities </b> <br />
                                        <input
                                            type="checkbox"
                                            id="Eye-care"
                                            name="Eye-care"
                                            value="Eye-care"
                                        />
                                        <label htmlFor="Eye-care" className='mb-0'>Eye-care</label>
                                        <br />
                                        <input
                                            type="checkbox"
                                            id="Maternity"
                                            name="Maternity"
                                            value="Maternity"
                                        />
                                        <label htmlFor="Maternity">Maternity </label>
                                        <br />
                                        <br />

                                    </span>

                                    <span className="text14">
                                        <b className='text18'> Corporates</b> <br />
                                        <input
                                            type="checkbox"
                                            id="Eye-care"
                                            name="Eye-care"
                                            value="Eye-care"
                                        />
                                        <label htmlFor="Eye-care" className='mb-0'>MPT Hospitals</label>
                                        <br />
                                        <input
                                            type="checkbox"
                                            id="Maternity"
                                            name="Maternity"
                                            value="Maternity"
                                        />
                                        <label htmlFor="Maternity" className='mb-0'>CGHS Hospitals </label>
                                        <br />
                                        <input
                                            type="checkbox"
                                            id="Maternity"
                                            name="Maternity"
                                            value="Maternity"
                                        />
                                        <label htmlFor="Maternity" className='mb-0'>MJPJAY Hospitals </label>
                                        <br />
                                        <input
                                            type="checkbox"
                                            id="Maternity"
                                            name="Maternity"
                                            value="Maternity"
                                        />
                                        <label htmlFor="Maternity" className='mb-0'>PMJAY Hospitals </label>
                                        <br />
                                        <input
                                            type="checkbox"
                                            id="Maternity"
                                            name="Maternity"
                                            value="Maternity"
                                        />
                                        <label htmlFor="Maternity" className='mb-0'>Railway Hospitals </label>
                                        <br />






                                    </span>

                                </form>
                            </div>
                            {/* filter-innerbox end */}
                        </div>
                        {/* filer box end */}

                        {/* Product Box for Large Screens */}
                        <div className="col-xl-9 col-lg-9 col-md-12 product-box">
                            <div className=" d-flex justify-content-between">
                                <div className="d-flex gap-2">
                                    {/* <input type="checkbox" className="btn-check" id="btn-check-outlined" autocomplete="off"/>
                                <label className="btn  btn-outline-primary" for="btn-check-outlined">Single toggle</label> */}
                                    <button className='filter-check-btn'>NABH</button>
                                    <button className='filter-check-btn'>Private</button>
                                </div>


                                <div className="sort-by-btn-main-container">
                                    <label for="cars" className='mb-0'>Sort by:</label>
                                    <select name="cars" id="cars" className='sort-select-box'>
                                        <option value="recommended">recommended</option>
                                        <option value="ABC">ABC</option>
                                        <option value="opel">PQR</option>
                                        <option value="audi">XYZ</option>
                                    </select>
                                </div>
                            </div>

                            <div className="horizontal-line2 mb-3"></div>

                            {/* product box inner-container start */}
                            <div className="product-inner-container">
                                <div className="row g-3">
                                    <div className="col-md-5">
                                        <img
                                            src={path + "demo/Kokliaben-hospital.jpeg"}
                                            alt=""
                                            className="img-fluid rounded sevr-listing-img"
                                        />
                                    </div>
                                    <div className="col-md-5 col-7 d-flex flex-column justify-content-between">
                                        <div className="">
                                            <h5 className="homepage-section-heading mb-0">Kokilaben Hospital</h5>
                                            <div className='semi-head1 mt-0'>Andheri, Mumbai</div>
                                        </div>


                                        <div className="">
                                            <p className='mb-0 text14'><b> 323 Beds</b></p>
                                            <p className='mb-0 text14'><b>Multispeciality Hospital</b></p>
                                            <div className="d-flex gap-2 mt-2">
                                                <img src={path + 'national-accreditations.png'} alt="" className='img-fluid pro-listing-logo' />
                                                <img src={path + "joint-commision.png"} alt="" className='img-fluid pro-listing-logo' />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-md-2 col-5 text-center d-flex justify-content-end">
                                        <div className="text-end d-flex flex-column justify-content-between">

                                            <div className=" text-end">
                                                <div className="d-flex justify-content-end ">
                                                    <span className="me-1 text-success " >4.8</span>
                                                    <i className="fa-solid fa-star text-success"></i>
                                                    <i className="fa-solid fa-star text-success"></i>
                                                    <i className="fa-solid fa-star text-success"></i>
                                                    <i className="fa-solid fa-star text-success"></i>
                                                    <i className="fa-solid fa-star text-success"></i>
                                                </div>
                                                <div className="reviews text-end">59 Reviews</div>
                                            </div>
                                            <div className="">
                                                <div className="text14 mb-3"><i className="fa-solid fa-phone me-1"></i> View Number </div>
                                                <button className="view-details-btn mb-2"> View Details</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* product box inner-container end */}

                            <div className="horizontal-line"></div>

                            {/* product box inner-container start */}
                            <div className="product-inner-container">
                                <div className="row g-3">
                                    <div className="col-md-5">
                                        <img
                                            src={path + "demo/hiranandani-hospital.jpeg"}
                                            alt=""
                                            className="img-fluid rounded sevr-listing-img"
                                        />
                                    </div>
                                    <div className="col-md-5 col-7 d-flex flex-column justify-content-between">
                                        <div className="">
                                            <h5 className="homepage-section-heading mb-0">Hiranandani Hospital</h5>
                                            <div className='semi-head1 mt-0'>Powai, Mumbai</div>
                                        </div>


                                        <div className="">
                                            <p className='mb-0 text14'><b> 323 Beds</b></p>
                                            <p className='mb-0 text14'><b>Multispeciality Hospital</b></p>
                                            <div className="d-flex gap-2 mt-2">
                                                <img src={path + 'national-accreditations.png'} alt="" className='img-fluid pro-listing-logo' />
                                                <img src={path + "joint-commision.png"} alt="" className='img-fluid pro-listing-logo' />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-md-2 col-5 text-center d-flex justify-content-end">
                                        <div className="text-end d-flex flex-column justify-content-between">

                                            <div className=" text-end">
                                                <div className="d-flex justify-content-end ">
                                                    <span className="me-1 text-success " >4.8</span>
                                                    <i className="fa-solid fa-star text-success"></i>
                                                    <i className="fa-solid fa-star text-success"></i>
                                                    <i className="fa-solid fa-star text-success"></i>
                                                    <i className="fa-solid fa-star text-success"></i>
                                                    <i className="fa-solid fa-star text-success"></i>
                                                </div>
                                                <div className="reviews text-end">59 Reviews</div>
                                            </div>
                                            <div className="">
                                                <div className="text14 mb-3"><i className="fa-solid fa-phone me-1"></i> View Number </div>
                                                <button className="view-details-btn mb-2"> View Details</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* product box inner-container end */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default ServiceListing;