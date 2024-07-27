import React from 'react'
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.css';
import '../App.css'
// import myimg from './Nirav_Vadhiya_img.jpeg'




const data = [
    {
        id: 1,
        name: "Hospitals",
        marks: 625,
        img: 'services-hospitals.png'
    },
    {
        id: 2,
        name: "Dialysis Center",
        marks: 825,
        img: 'Dialysis-Centres-1.png'
    },
    {
        id: 3,
        name: "Blood Bank",
        marks: 225,
        img: 'Blood-Bank-1.png'
    },
    {
        id: 4,
        name: "Clinics",
        marks: 258,
        img: 'Clinics-1.png'
    },
    {
        id: 5,
        name: "Dialysis Center",
        marks: 285,
        img: 'services-hospitals.png'
    },
    {
        id: 6,
        name: "Blood Bank",
        marks: 250,
        img: 'DialysisCenter-services.png'
    },


]


const data1 = [
    {
        id: 1,
        name: "Home Care",
        img: 'HomeCare-services.png'
    },
    {
        id: 2,
        name: "Transport",
        img: 'Patient-Transport-1.png'
    },
    {
        id: 3,
        name: "Diagnostics",
        img: 'Diagnostics-services.png'
    },
    {
        id: 4,
        name: "Orthotic & Prosthetics",
        img: 'OrthoticPros-services.png'
    },
    {
        id: 5,
        name: "Home Care",
        img: 'services-hospitals.png'
    },
    {
        id: 6,
        name: "Transport",
        img: 'DialysisCenter-services.png'
    },


]




function Home1() {
    const path = "src/assets/Images/";


    return (
        <>


            {/* swiper 1  */}

            <div className='container margin-top3'>
                <h2 className="homepage-section-heading">Common Health Concerns</h2>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, A11y]}
                    spaceBetween={20}
                    slidesPerView={4}
                    loop={true}
                    // centeredSlides={true}
                    // grabCursor={true}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    navigation
                    // ={{
                    //   nextEl: '.swiper-button-next',
                    // }}
                    autoplay={{ delay: 5000 }}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                        },
                        520: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1000: {
                            slidesPerView: 4,
                        },
                    }}
                    // pagination={{ clickable: true }}
                    // scrollbar={{ draggable: true }}
                    // onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >


                    {
                        data.map(user => (
                            <SwiperSlide key={user.id} className='slide'>
                                <div className="slide-content">
                                    <div className="user-image text-center">
                                        <img src={path + user.img} alt="" className='my-img img-fluid' />
                                    </div>
                                    <div className="semi-head1 mt-1">{user.name} </div>


                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>



            </div>


            {/* swiper 2  */}


            <div className='container mt-4'>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay, A11y]}
                    spaceBetween={20}
                    slidesPerView={4}
                    loop={true}
                    // centeredSlides={true}
                    // grabCursor={true}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    navigation
                    // ={{
                    //   nextEl: '.swiper-button-next',
                    // }}
                    autoplay={{ delay: 4000 }}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                        },
                        520: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1000: {
                            slidesPerView: 4,
                        },
                    }}
                    // pagination={{ clickable: true }}
                    // scrollbar={{ draggable: true }}
                    // onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >


                    {
                        data1.map(user => (
                            <SwiperSlide key={user.id} className='slide'>
                                <div className="slide-content">
                                    <div className="user-image text-center">
                                        <img src={path + user.img} alt="" className='my-img img-fluid' />
                                    </div>
                                    <div className="semi-head1 mt-2">{user.name}</div>


                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>



            </div>


            {/* Public Sector Corporates start */}

            <div className="container margin-top3">
                <div className="row d-flex justify-content-between">
                    <div className="col-md-6 col-8">
                        <h2 className='homepage-section-heading'>Public Sector Corporates</h2>


                    </div>

                    <div className="col-md-1 col-3">
                        <a href="" className='alink'>View all</a>
                    </div>

                </div>

                <div className="row Public-Sector-Corporates-container g-2 mt-2">
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "indian_railway_logo.jpg"} alt="" className='img-fluid' />
                        </div>
                        <p className='mb-0 mt-2 semi-head1'>MPT</p>
                        <p className='semi-head1'>Hospitals</p>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "pmjay-logo.png"} alt="" className='img-fluid' />
                        </div>
                        <p className='mb-0 mt-2 semi-head1'>MPT</p>
                        <p className='semi-head1'>Hospitals</p>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "cghs-logo.jpg"} alt="" className='img-fluid' />
                        </div>
                        <p className='mb-0 mt-2 semi-head1'>MPT</p>
                        <p className='semi-head1'>Hospitals</p>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "esic-logo.png"} alt="" className='img-fluid' />
                        </div>
                        <p className='mb-0 mt-2 semi-head1'>MPT</p>
                        <p className='semi-head1'>Hospitals</p>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "mjpjay-logo.png"} alt="" className='img-fluid' />
                        </div>
                        <p className='mb-0 mt-2 semi-head1'>MPT</p>
                        <p className='semi-head1'>Hospitals</p>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "cghs-logo.jpg"} alt="" className='img-fluid' />
                        </div>
                        <p className='mb-0 mt-2 semi-head1'>MPT</p>
                        <p className='semi-head1'>Hospitals</p>
                    </div>

                </div>
            </div>




            {/* Public Sector Corporates End */}


            {/* Sort by specialist start  */}

            <div className="container margin-top3">

                <h2 className='homepage-section-heading'>Public Sector Corporates</h2>



                <div className="row  g-3 mt-2">
                    <div className="col-md-3 col-6">
                        <div className="">
                            <img src={path + "Organ-Transplant-Centres.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>Hospitals</p>
                    </div>
                    <div className="col-md-3 col-6 ">
                        <div className="">
                            <img src={path + "Eye-Care-Centres.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>Eye Care Centres</p>
                    </div>

                    <div className="col-md-3 col-6 ">
                        <div className="">
                            <img src={path + "Pediatric-Centres.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>Pediatric Centres</p>
                    </div>
                    <div className="col-md-3 col-6 ">
                        <div className="">
                            <img src={path + "Heart-Care-Centres.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>Heartn Care Centres</p>
                    </div>
                    <div className="col-md-3 col-6 ">
                        <div className="">
                            <img src={path + "Skincare-Centres.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>Skincare Centres</p>
                    </div>
                    <div className="col-md-3 col-6 ">
                        <div className="">
                            <img src={path + "Test-Tube-Baby-Centres.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>Test Tube Baby Centres</p>
                    </div>
                    <div className="col-md-3 col-6 ">
                        <div className="">
                            <img src={path + "Kidney-care-Centres.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>Kidney care Centres</p>
                    </div>
                    <div className="col-md-3 col-6 ">
                        <div className="">
                            <img src={path + "Cancer-Care-Centres.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>Cancer Care Centres</p>
                    </div>


                </div>
            </div>



            {/* Sort by specialist End  */}


            <div className="container margin-top3">
                <div className="row">
                    <div className="col-md-6">
                        <div className="">
                            <img src={path + 'Healthcare-Companies-Startups.png'} alt="" className='img-fluid' />
                        </div>
                        <p className='semi-head1 mt-1 ps-2'>Healthcare Companies Startups</p>
                    </div>
                    <div className="col-md-6">
                        <div className="">
                            <img src={path + 'Health-Checkup-near-you.png'} alt="" className='img-fluid' />
                        </div>
                        <p className='semi-head1 mt-1 ps-2'>Health-Checkup-near-you</p>
                    </div>
                </div>
            </div>



            {/* Diagnostic  Centres Near You start  */}



            <div className="container margin-top3">
                <div className="row d-flex justify-content-between">
                    <div className="col-md-6 col-8">
                        <h2 className='homepage-section-heading'>Diagnostic  Centres Near You</h2>


                    </div>

                    <div className="col-md-1 col-3">
                        <a href="" className='alink'>View all</a>
                    </div>

                </div>

                <div className="row Public-Sector-Corporates-container g-2 mt-2">
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "Xray.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-2'>Xray  </p>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "MRI.png"} alt="" className='img-fluid' />
                        </div>
                        <p className='semi-head1 mt-2'>MRI</p>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "SONOGRAPHY.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-2'>SONOGRAPHY</p>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "PATHOLOGY.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-2'>PATHOLOGY</p>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "CTSCAN.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-2'>CT SCAN</p>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "2DECHO.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-2'>2DECHO</p>
                    </div>

                </div>
            </div>



            {/* Diagnostic  Centres Near You End  */}



            <div className="container margin-top3">
                <div className="">
                    <img src={path + 'medical-equipment.png'} alt="" className='img-fluid' />
                </div>
            </div>


            {/* Services By Health Concern start  */}

            <div className="container margin-top3">
                <h2 className='homepage-section-heading '>Services By Health Concern</h2>

                <div className="row  g-2 mt-3 Services-By-Health-Concern justify-content-evenly">
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "Depression-Anxiety.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-2'>Depression Anxiety  </p>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "Pregnant.png"} alt="" className='img-fluid' />
                        </div>
                        <p className='semi-head1 mt-2'>Pregnant</p>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "Joint-Pains.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-2'>Joint Pains</p>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "Ear-Problems.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-2'>Ear Problems</p>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <div className="text-center">
                            <img src={path + "Digestion-Issues.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-2'>Digestion Issues</p>
                    </div>


                </div>


            </div>



            {/* Services By Health Concern End  */}


            {/* Top Hospitals In Mumbai start  */}


            <div className="container margin-top3">

                <h2 className='homepage-section-heading'>Top Hospitals In Mumbai</h2>


                <div className="row g-3 mt-2 ">

                    <div className="col-md-3 col-6">
                        <div className="">
                            <img src={path + "SAIFEE-HOSPITAL.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>SAIFEE HOSPITAL</p>
                    </div>

                    <div className="col-md-3 col-6">
                        <div className="">
                            <img src={path + "MAX-NANAVATI-HOSPITAL.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>MAX NANAVATI HOSPITAL</p>
                    </div>

                    <div className="col-md-3 col-6">
                        <div className="">
                            <img src={path + "GLOBAL-HOSPITAL.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>GLOBAL HOSPITAL</p>
                    </div>

                    <div className="col-md-3 col-6">
                        <div className="">
                            <img src={path + "KOKILABEN-HOSPITAL.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>KOKILABEN HOSPITAL</p>
                    </div>


                </div>

            </div>



            {/* Top Hospitals In Mumbai End  */}




            {/* Health Insurance Empanelments start  */}

            <div className="container margin-top3">

                <h2 className='homepage-section-heading'>Health Insurance Empanelments</h2>

                <div className="row g-2 mt-2 phone-scroll">
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center">
                            <img src={path + 'Care_health_insurance_logo-1.png'} alt="" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center">
                            <img src={path + 'Iffco-Tokio-Gen-Insurance-1.png'} alt="" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center">
                            <img src={path + 'Care_health_insurance_logo-1.png'} alt="" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center">
                            <img src={path + 'Care_health_insurance_logo-1.png'} alt="" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center">
                            <img src={path + 'Care_health_insurance_logo-1.png'} alt="" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center">
                            <img src={path + 'Care_health_insurance_logo-1.png'} alt="" className='img-fluid' />
                        </div>
                    </div>

                </div>


            </div>


            {/* Health Insurance Empanelments start  */}


            {/* TPA Empanelments start  */}


            <div className="container margin-top3">

                <h2 className='homepage-section-heading'>TPA Empanelments</h2>

                <div className="row g-2 mt-2 phone-scroll">
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center">
                            <img src={path + 'Health-India.png'} alt="" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center">
                            <img src={path + 'Vidal-Health.png'} alt="" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center">
                            <img src={path + 'Care_health_insurance_logo-1.png'} alt="" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center">
                            <img src={path + 'Care_health_insurance_logo-1.png'} alt="" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center">
                            <img src={path + 'Care_health_insurance_logo-1.png'} alt="" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center">
                            <img src={path + 'Care_health_insurance_logo-1.png'} alt="" className='img-fluid' />
                        </div>
                    </div>

                </div>


            </div>


            {/* TPA Empanelments End  */}




            {/* Articles start  */}


            <div className="container margin-top3">

                <h2 className='homepage-section-heading text-center'>Articles</h2>

                <div className="row">
                    <div className="col-md-4">
                        <div className="">
                            <img src={path + 'Articles-img1.png'} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mb-0 mt-2'>The Transformative Power of Early Mornings:
                            Embracing the Benefits of Waking Up Early
                        </p>
                    </div>
                    <div className="col-md-4">
                        <div className="">
                            <img src={path + 'Articles-img2.png'} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mb-0 mt-2'>Taming the Appetite: Harnessing Natural
                            Appetite Suppressants for Weight Control

                        </p>
                    </div>
                    <div className="col-md-4">
                        <div className="">
                            <img src={path + 'Articles-img3.png'} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mb-0 mt-2'>Dive into Wellness: The Incredible
                            Benefits of Swimming

                        </p>
                    </div>
                </div>

            </div>




            {/* Articles End  */}



    


           



      
















        </>

    )
}

export default Home1
