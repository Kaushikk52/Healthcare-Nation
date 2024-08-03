import React from 'react'

function Footer() {
// const path = "src/assets/Images/";
const path = import.meta.env.VITE_APP_IMG_URL;
    return (
        <div>
            <div className="container-fluid background-Second " >

                <div className="container margin-top3 text-white footer-container py-5">

                    <div className="row">
                        <div className="col-md-6 col-lg-6 col-xl-2 col-6">
                            {/* <div className="">
                                <img src={path + 'HCN-white-logo.png'} alt="" className='img-fluid' />
                            </div> */}
                             <p>Quick Links</p>
                            <ul>
                              
                                <li><a href="">Home</a></li>
                                <li><a href="">About Us</a></li>
                                <li><a href="">Our Services</a></li>
                                <li><a href="">Speciality Centres</a></li>
                                <li><a href="">Therapies</a></li>
                                <li><a href="">Corporates</a></li>
                                <li><a href="">FAQs</a></li>
                                <li><a href="">Contact</a></li>

                            </ul>

                        </div>
                        <div className="col-md-6  col-xl-2 col-6">
                            <p>Healthcare Services</p>
                            <ul>
                                <li><a href="">Hospitals</a></li>
                                <li><a href="">Dialysis Center</a></li>
                                <li><a href="">Blood Bank</a></li>
                                <li><a href="">Clinics</a></li>
                                <li><a href="">Home Care</a></li>
                                <li><a href="">Transport</a></li>
                                <li><a href="">Diagnostics</a></li>
                                <li><a href="">Get Financial Help</a></li>

                            </ul>
                        </div>
                        <div className="col-md-6  col-xl-2 col-6">
                            <p>Sort by specialist</p>
                            <ul>
                           
                                <li><a href="">Organ Transplant Centres</a></li>
                                <li><a href="">Eye Care Centres</a></li>
                                <li><a href="">Pediatric Centres</a></li>
                                <li><a href="">Heartn Care Centres</a></li>
                                <li><a href="">Skincare Centres</a></li>
                                <li><a href="">Test Tube Baby Centres</a></li>
                                <li><a href="">Kidney care Centres</a></li>
                                <li><a href="">Cancer Care Centres</a></li>

                            </ul>
                        </div>
                        <div className="col-md-6  col-xl-2 col-6">
                            <p>Diagnostic Centres</p>
                            <ul>
                                <li><a href="">Xray </a></li>
                                <li><a href="">MRI</a></li>
                                <li><a href="">Sonography</a></li>
                                <li><a href="">Pathology</a></li>
                                <li><a href="">CT Scan</a></li>
                                <li><a href="">2D Echo</a></li>
                               

                            </ul>
                        </div>
                        <div className="col-md-6  col-xl-2 col-6">
                            <p>Health Concern</p>
                            <ul>
                                <li><a href="">Depression Anxiety </a></li>
                                <li><a href="">Pregnant</a></li>
                                <li><a href="">Joint Pains</a></li>
                                <li><a href="">Ear Problems</a></li>
                                <li><a href="">Digestion Issues</a></li>
                           

                            </ul>
                        </div>
                        <div className="col-md-6  col-xl-2 col-6">
                            <p>Social</p>
                            <ul>
                                <li><a href="">facebook</a></li>
                                <li><a href="">YouTube</a></li>
                                <li><a href="">Twitter</a></li>
                              

                            </ul>
                        </div>





                    </div>


                    <div className="row">
                        <div className="col-12 text-center">
                              <div className="mt-5 pt-3">
                                <img src={path + 'HCN-white-logo.png'} alt="" className='img-fluid' />
                            </div>
                            <p className='mt-2'>Copyright © 2024, Healthcare Nation . All rights reserved.</p>
                        </div>
                    </div>



                </div>

            </div>

        </div>
    )
}

export default Footer
