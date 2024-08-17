import React from 'react'
import { Link, Outlet } from 'react-router-dom';

function ServiceListing() {
    const path = import.meta.env.VITE_APP_IMG_URL;
    return (
        <>

            <div>
                <img src={path + 'banner-new1.jpg'} alt="" className='img-fluid' />
            </div>




            <div className="container margin-top3">
                <div className="row d-flex justify-content-between">
                    <div className="col-md-6 col-8">
                        <h2 className='homepage-section-heading'>Healthcare Services</h2>
                        {/* <div className="home-page-semi-head">Private online consultations with verified doctors in all specialists</div> */}


                    </div>


                    <div className="col-md-3 col-4 text-end d-flex justify-content-end align-items-center">

                        <a href="" className=' btn-small'>Explore  <span className='explore-more-btn-phone'>More</span></a>

                    </div>

                </div>


                <div className="row g-3 mt-1">
                  <Outlet/>
                </div>
            </div>
        </>


    )
}

export default ServiceListing
