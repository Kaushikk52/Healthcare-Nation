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

import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';

AOS.init({
    duration: 1200, // Optional: set the duration for animations in milliseconds
});







const data = [
    {
        id: 1,
        name: "Organ Transplant Centres",
        marks: 625,
        img: 'Organ-Transplant-Centres.png'
    },
    {
        id: 2,
        name: "Eye Care Centres",
        marks: 825,
        img: 'Eye-Care-Centres.png'
    },
    {
        id: 3,
        name: "Pediatric Centres",
        marks: 225,
        img: 'Pediatric-Centres1.jpg'
    },
    {
        id: 4,
        name: "Heart Care Centres",
        marks: 258,
        img: 'HomeCare-services2.jpg'
    },
    {
        id: 5,
        name: "Organ Transplant Centres",
        marks: 625,
        img: 'Organ-Transplant-Centres.png'
    },
    {
        id: 6,
        name: "Eye Care Centres",
        marks: 825,
        img: 'Eye-Care-Centres.png'
    },


]


const data1 = [
    {
        id: 1,
        name: "Skin Care Centres",
        img: 'Skincare-Centres1.jpg'
    },
    {
        id: 2,
        name: "Test Tube Baby Centres",
        img: 'Test-Tube-Baby-Centres1.jpg'
    },
    {
        id: 3,
        name: "Kidney Care Centres",
        img: 'Kidney-care-Centres.png'
    },
    {
        id: 4,
        name: "Cancer Care Centres",
        img: 'Cancer-Centres.jpg'
    },
    {
        id: 5,
        name: "Skin Care Centres",
        img: 'Skincare-Centres1.jpg'
    },
    {
        id: 6,
        name: "Test Tube Baby Centres",
        img: 'Test-Tube-Baby-Centres1.jpg'
    },


]




function Home1() {
    // const path = "src/assets/Images/";
    const path = import.meta.env.VITE_APP_IMG_URL;





    return (
        <>



            <div className="container margin-top3">




                {/* <div className="row d-flex justify-content-between">
                    <div className="col-md-6 col-8">
                        <h2 className='homepage-section-heading'>Healthcare Services</h2>
                        <div className="home-page-semi-head">Private online consultations with verified doctors in all specialists</div>


                    </div>

                    <div className="col-md-3 col-4 text-end d-flex justify-content-end align-items-center">
                        <a href="" className=' btn-small'>Explore  <span className='explore-more-btn-phone'>More</span></a>
                    </div>

                </div> */}


                <div className="row d-flex justify-content-between">
                    <div className="col-md-6 col-8">
                        <h2 className='homepage-section-heading'>Healthcare Services</h2>
                        {/* <div className="home-page-semi-head">Private online consultations with verified doctors in all specialists</div> */}


                    </div>


                    <div className="col-md-3 col-4 text-end d-flex justify-content-end align-items-center">

                        <a href="" className=' btn-small'>Explore  <span className='explore-more-btn-phone'>More</span></a>

                    </div>

                </div>



                <div className="row  g-3 mt-1">
                    <div className="col-md-3 col-6 "  >
                        <a href="" className='a-links'>
                            <div className="">
                                <img src={path + "hospitals1.jpg"} alt="" className='img-fluid services-img' />
                            </div>

                            <p className='semi-head1 ps-2 mb-0'>Hospitals</p>
                        </a>
                    </div>
                    <div className="col-md-3 col-6"  >
                        <a href="" className='a-links'>
                            <div className="">
                                <img src={path + "Dialysis-Centres.jpg"} alt="" className='img-fluid services-img' />
                            </div>

                            <p className='semi-head1  ps-2 mb-0'>Dialysis Centres</p>
                        </a>
                    </div>

                    <div className="col-md-3 col-6 "  >
                        <a href="" className='a-links'>
                            <div className="">
                                <img src={path + "Blood-Bank-1.jpg"} alt="" className='img-fluid services-img' />
                            </div>

                            <p className='semi-head1  ps-2 mb-0'>Blood / Skin Banks</p>
                        </a>
                    </div>
                    <div className="col-md-3 col-6 "  >
                        <a href="" className='a-links'>
                            <div className="">
                                <img src={path + "Clinics-1.png"} alt="" className='img-fluid services-img' />
                            </div>

                            <p className='semi-head1  ps-2 mb-0'>Clinics</p>
                        </a>
                    </div>
                    <div className="col-md-3 col-6 "   data-aos-delay="400">
                        <a href="" className='a-links'>
                            <div className="">
                                <img src={path + "HomeCare-services1.jpg"} alt="" className='img-fluid services-img' />
                            </div>

                            <p className='semi-head1 ps-2 mb-0'>Home Care Services</p>
                        </a>
                    </div>
                    <div className="col-md-3 col-6 "   data-aos-delay="400">
                        <a href="" className='a-links'>
                            <div className="">
                                <img src={path + "Patient-Transport-1.png"} alt="" className='img-fluid services-img' />
                            </div>

                            <p className='semi-head1 ps-2 mb-0'>Patient Transport</p>
                        </a>
                    </div>
                    <div className="col-md-3 col-6 "   data-aos-delay="500">
                        <a href="" className='a-links'>
                            <div className="">
                                <img src={path + "Diagnostics-img1.jpg"} alt="" className='img-fluid services-img' />
                            </div>

                            <p className='semi-head1  ps-2 mb-0'>Diagnostics</p>
                        </a>
                    </div>
                    <div className="col-md-3 col-6 "   data-aos-delay="500">
                        <a href="" className='a-links'>
                            <div className="">
                                <img src={path + "Donate.jpg"} alt="" className='img-fluid services-img' />
                            </div>

                            <p className='semi-head1  ps-2 mb-0'>Financial Help for Treatment</p>
                        </a>
                    </div>


                </div>
            </div>




            {/* Public Sector Corporates start */}

            <div className="container margin-top3">
                <div className="row d-flex justify-content-between">
                    <div className="col-md-6 col-8">
                        <h2 className='homepage-section-heading'>Public Sector Corporates</h2>
                        {/* <div className="home-page-semi-head">Private online consultations with verified doctors in all specialists</div> */}


                    </div>

                    <div className="col-md-3 col-4 text-end d-flex  justify-content-end align-items-center">
                        <a href="" className=' btn-small'>Explore  <span className='explore-more-btn-phone'>More</span></a>
                    </div>

                </div>

                <div className="row Public-Sector-Corporates-container g-2 mt-2">

                    <div className="col-md-2 col-6 text-center">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "mpt-logo.png"} alt="" className='img-fluid' />
                            </div>
                            <p className='mb-0 mt-2 semi-head1'>MPT</p>
                            <p className='semi-head1 mt-0'>Hospitals</p>
                        </a>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "cghs-logo.jpg"} alt="" className='img-fluid cghs-logo' />
                            </div>
                            <p className='mb-0 mt-2 semi-head1'>CGHS</p>
                            <p className='semi-head1 mt-0'>Hospitals</p>
                        </a>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "mjpjay-logo.png"} alt="" className='img-fluid' />
                            </div>
                            <p className='mb-0 mt-2 semi-head1'>MJPJAY</p>
                            <p className='semi-head1 mt-0'>Hospitals</p>
                        </a>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "esic-logo.png"} alt="" className='img-fluid' />
                            </div>
                            <p className='mb-0 mt-2 semi-head1'>ESIC</p>
                            <p className='semi-head1 mt-0'>Hospitals</p>
                        </a>
                    </div>

                    <div className="col-md-2 col-6 text-center">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "pmjay-logo2.png"} alt="" className='img-fluid' />
                            </div>
                            <p className='mb-0 mt-2 semi-head1'>PMJAY</p>
                            <p className='semi-head1 mt-0'>Hospitals</p>
                        </a>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "indian_railway_logo.jpg"} alt="" className='img-fluid ' />
                            </div>
                            <p className='mb-0 mt-2 semi-head1'>Railway </p>
                            <p className='semi-head1 mt-0'>Hospitals</p>


                        </a>
                    </div>





                </div>
            </div>




            {/* Public Sector Corporates End */}


            {/* swiper 1  */}

            <div className='container margin-top3'>


                <div className="row d-flex justify-content-between">
                    <div className="col-md-6 col-8">
                        <h2 className='homepage-section-heading'>Services by Specialities</h2>
                        {/* <div className="home-page-semi-head">Private online consultations with verified doctors in all specialists</div> */}


                    </div>

                    <div className="col-md-3 col-4 text-end d-flex  justify-content-end align-items-center">
                        <a href="" className=' btn-small'>Explore  <span className='explore-more-btn-phone'>More</span></a>
                    </div>

                </div>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, A11y]}
                    spaceBetween={16}
                    slidesPerView={4}
                    loop={true}
                    // centeredSlides={true}
                    // grabCursor={true}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    navigation
                    // ={{
                    //   nextEl: '.swiper-button-next',
                    // }}
                    autoplay={{ delay: 10000 }}
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
                            <SwiperSlide key={user.id} className='slide mt-3'>
                                <div className="slide-content"  >
                                    <a href="" className='a-links'>
                                        <div className="user-image text-center">
                                            <img src={path + user.img} alt="" className='my-img services-img img-fluid' />
                                        </div>
                                        <div className="semi-head1 mt-1">{user.name} </div>
                                    </a>


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
                    spaceBetween={16}
                    slidesPerView={4}
                    loop={true}
                    // centeredSlides={true}
                    // grabCursor={true}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    navigation
                    // ={{
                    //   nextEl: '.swiper-button-next',
                    // }}
                    autoplay={{ delay: 10000 }}
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
                                <div className="slide-content"  >
                                    <a href="" className='a-links'>
                                        <div className="user-image text-center">
                                            <img src={path + user.img} alt="" className='my-img services-img img-fluid' />
                                        </div>
                                        <div className="semi-head1 mt-2">{user.name}</div>
                                    </a>


                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>



            </div>



            <div className="container margin-top3">
                <div className="row">
                    <div className="col-md-6"   data-aos-delay="300">
                        <div className="">
                            <img src={path + 'Healthcare-Companies-Startups.jpg'} alt="" className='img-fluid rsdius10' />
                        </div>
                        <p className='semi-head1  ps-2'>Healthcare Companies & Startups</p>
                    </div>
                    <div className="col-md-6"   data-aos-delay="300">
                        <div className="">
                            <img src={path + 'Health-Checkup-Near-You2.jpg'} alt="" className='img-fluid rsdius10' />
                        </div>
                        <p className='semi-head1  ps-2'>Health Checkup Near You</p>
                    </div>
                </div>
            </div>





            {/* service by accreditations start */}


            <div className='container margin-top3'>
                <div className="row d-flex justify-content-between">
                    <div className="col-md-6 col-8">
                        <h2 className='homepage-section-heading'>Services By Accreditations</h2>
                        {/* <div className="home-page-semi-head">Private online consultations with verified doctors in all specialists</div> */}


                    </div>

                  

                </div>


                <div className="">
                    <div className="row mt-2 Services-Accreditations-container ">
                        <div className="col-md-6 col-lg-4 ">
                            <div className="d-flex  accreditations-inner-box">

                                <div className="">
                                    <img src={path + 'joint-commision.png'} alt="" className='' />
                                </div>
                                <div className="d-flex align-items-center p-2">
                                    <div className="">
                                        <p className='  mb-0'>  Organization Accredited by</p>
                                        <p className='  mb-0'>  Joint Commission International</p>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className="col-md-6 col-lg-4 ">
                            <div className="d-flex  accreditations-inner-box">

                                <div className="">
                                    <img src={path + 'national-accreditations.png'} alt="" className='' />
                                </div>
                                <div className="d-flex align-items-center ps-2">
                                    <div className="">
                                        <p className='  mb-0'>  National Accreditation Board for Hospitals & Healthcare Providers</p>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 ">
                            <div className="d-flex  accreditations-inner-box acc-inner-box3">

                                <div className="">
                                    <img src={path + 'IGBG-GOLD.jpeg'} alt="" className='' />
                                </div>
                                <div className="d-flex align-items-center p-2">
                                    <div className="">
                                        <p className='  mb-0'>  Largest Gold Certified</p>
                                        <p className='  mb-0'>  Green Hospital in Mumbai</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>


                </div>
            </div>

            {/* service by sccreditations end */}

            {/* Sort by specialist start  */}

            {/* <div className="container margin-top3">

                <h2 className='homepage-section-heading'>Sort by specialist</h2>



                <div className="row  g-3 mt-2">
                    <div className="col-md-3 col-6 "  >
                        <div className="">
                            <img src={path + "Organ-Transplant-Centres.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>Organ Transplant Centres</p>
                    </div>
                    <div className="col-md-3 col-6"  >
                        <div className="">
                            <img src={path + "Eye-Care-Centres.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>Eye Care Centres</p>
                    </div>

                    <div className="col-md-3 col-6 "  >
                        <div className="">
                            <img src={path + "Pediatric-Centres.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>Pediatric Centres</p>
                    </div>
                    <div className="col-md-3 col-6 "  >
                        <div className="">
                            <img src={path + "Heart-Care-Centres.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>Heartn Care Centres</p>
                    </div>
                    <div className="col-md-3 col-6 "   data-aos-delay="400">
                        <div className="">
                            <img src={path + "Skincare-Centres.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>Skincare Centres</p>
                    </div>
                    <div className="col-md-3 col-6 "   data-aos-delay="400">
                        <div className="">
                            <img src={path + "Test-Tube-Baby-Centres.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>Test Tube Baby Centres</p>
                    </div>
                    <div className="col-md-3 col-6 "   data-aos-delay="500">
                        <div className="">
                            <img src={path + "Kidney-care-Centres.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>Kidney care Centres</p>
                    </div>
                    <div className="col-md-3 col-6 "   data-aos-delay="500">
                        <div className="">
                            <img src={path + "Cancer-Care-Centres.png"} alt="" className='img-fluid' />
                        </div>

                        <p className='semi-head1 mt-1 ps-2'>Cancer Care Centres</p>
                    </div>


                </div>
            </div> */}



            {/* Sort by specialist End  */}





            {/* Diagnostic  Centres Near You start  */}



            <div className="container margin-top3">
                <div className="row d-flex justify-content-between">
                    <div className="col-md-6 col-8">
                        <h2 className='homepage-section-heading'>Diagnostics  Centres Near You</h2>
                        {/* <div className="home-page-semi-head">Private online consultations with verified doctors in all specialists</div> */}


                    </div>

                    <div className="col-md-3 col-4 text-end d-flex  justify-content-end align-items-center">
                        <a href="" className=' btn-small'>Explore  <span className='explore-more-btn-phone'>More</span></a>
                    </div>

                </div>



                <div className="row Public-Sector-Corporates-container g-2 mt-2">
                    <div className="col-md-2 col-6 text-center">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "Xray2.png"} alt="" className='img-fluid border-hover' />
                            </div>

                            <p className='semi-head1 mt-2'>Xray  </p>
                        </a>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "CTSCAN2.png"} alt="" className='img-fluid border-hover' />
                            </div>
                            <p className='semi-head1 mt-2'>MRI</p>
                        </a>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "SONOGRAPHY.png"} alt="" className='img-fluid border-hover' />
                            </div>

                            <p className='semi-head1 mt-2'>Sonography</p>
                        </a>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "PATHOLOGY.png"} alt="" className='img-fluid border-hover' />
                            </div>

                            <p className='semi-head1 mt-2'>Pathology</p>
                        </a>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "CTSCAN3.png"} alt="" className='img-fluid border-hover' />
                            </div>

                            <p className='semi-head1 mt-2'>CT Scan</p>
                        </a>
                    </div>
                    <div className="col-md-2 col-6 text-center">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "2DECHO.png"} alt="" className='img-fluid border-hover' />
                            </div>

                            <p className='semi-head1 mt-2'>2D Echo</p>
                        </a>
                    </div>

                </div>
            </div>



            {/* Diagnostic  Centres Near You End  */}



            <div className="container margin-top3 ">
                <div className="">
                    <img src={path + 'medical-equipment.jpeg'} alt="" className='img-fluid border-r-10' />
                </div>
            </div>


            {/* Services By Health Concern start  */}

            <div className="container margin-top3">


                <div className="row d-flex justify-content-between">
                    <div className="col-md-6 col-8">
                        <h2 className='homepage-section-heading'>Services By Health Concern</h2>
                        {/* <div className="home-page-semi-head">Private online consultations with verified doctors in all specialists</div> */}


                    </div>

                    <div className="col-md-3 col-4 text-end d-flex  justify-content-end align-items-center">
                        <a href="" className=' btn-small'>Explore  <span className='explore-more-btn-phone'>More</span></a>
                    </div>

                </div>

                <div className="d-flex  Services-By-Health-Concern mt-4"   data-aos-delay="300">
                    <div className=" text-center">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "Depression-Anxiety.jpg"} alt="" className='img-fluid' />
                            </div>

                            <p className='semi-head1 mt-2'>Depression or Anxiety ? </p>
                        </a>
                    </div>
                    <div className=" text-center px-3">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "Pregnant.png"} alt="" className='img-fluid' />
                            </div>
                            <p className='semi-head1 mt-2'>Pregnant ?</p>
                        </a>
                    </div>
                    <div className=" text-center">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "Joint-Pains.png"} alt="" className='img-fluid' />
                            </div>

                            <p className='semi-head1 mt-2'>Joint Pains ?</p>
                        </a>
                    </div>
                    <div className=" text-center px-3">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "Ear-Problems.png"} alt="" className='img-fluid' />
                            </div>

                            <p className='semi-head1 mt-2'>Ear Problems ?</p>
                        </a>
                    </div>
                    <div className=" text-center">
                        <a href="" className='a-links'>
                            <div className="text-center">
                                <img src={path + "Digestion-Issues.png"} alt="" className='img-fluid' />
                            </div>

                            <p className='semi-head1 mt-2'>Digestion Issues ? </p>
                        </a>
                    </div>



                </div>


            </div>



            {/* Services By Health Concern End  */}


            {/* Top Hospitals In Mumbai start  */}


            <div className="container margin-top3">



                <div className="row d-flex justify-content-between">
                    <div className="col-md-6 col-8">
                        <h2 className='homepage-section-heading'>Popular Hospitals In Mumbai</h2>
                        {/* <div className="home-page-semi-head">Private online consultations with verified doctors in all specialists</div> */}


                    </div>

                    <div className="col-md-3 col-4 text-end d-flex  justify-content-end align-items-center">
                        <a href="" className=' btn-small'>Explore  <span className='explore-more-btn-phone'>More</span></a>
                    </div>

                </div>


                <div className="row g-3  mt-1">

                    <div className="col-md-3 col-6"   data-aos-delay="600">
                        <a href="" className='a-links'>
                            <div className="">
                                <img src={path + "SAIFEE-HOSPITAL.png"} alt="" className='img-fluid services-img' />
                            </div>

                            <p className='semi-head1  ps-2'> Saifee Hospital</p>
                        </a>
                    </div>

                    <div className="col-md-3 col-6"   data-aos-delay="700">
                        <a href="" className='a-links'>
                            <div className="">
                                <img src={path + "MAX-NANAVATI-HOSPITAL.png"} alt="" className='img-fluid services-img' />
                            </div>

                            <p className='semi-head1  ps-2'> Max Nanavati Hospital </p>
                        </a>
                    </div>

                    <div className="col-md-3 col-6"   data-aos-delay="800">
                        <a href="" className='a-links'>
                            <div className="">
                                <img src={path + "GLOBAL-HOSPITAL.png"} alt="" className='img-fluid services-img' />
                            </div>

                            <p className='semi-head1  ps-2'> Global Hospital</p>
                        </a>
                    </div>

                    <div className="col-md-3 col-6"   data-aos-delay="900">
                        <a href="" className='a-links'>
                            <div className="">
                                <img src={path + "KOKILABEN-HOSPITAL.png"} alt="" className='img-fluid services-img' />
                            </div>

                            <p className='semi-head1  ps-2'> Kokilaben Hospital</p>
                        </a>
                    </div>


                </div>

            </div>



            {/* Top Hospitals In Mumbai End  */}


















            {/* Health Insurance Empanelments start  */}

            <div className="container margin-top3">

                <div className="row d-flex justify-content-between">
                    <div className="col-md-6 col-8">
                        <h2 className='homepage-section-heading'>Choose Your Health Insurance</h2>
                        {/* <div className="home-page-semi-head">Private online consultations with verified doctors in all specialists</div> */}


                    </div>

                    <div className="col-md-3 col-4 text-end d-flex  justify-content-end align-items-center">
                        <a href="" className=' btn-small'>Explore  <span className='explore-more-btn-phone'>More</span></a>
                    </div>

                </div>

                <div className="row g-2 mt-2 phone-scroll">
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center icici-logo-box">
                            <img src={path + 'icici-logo1.png'} alt="" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center iffco-logo-box">
                            <img src={path + 'Iffco-Tokio-Gen-Insurance-1.png'} alt="" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center hdfc-logo-box">
                            <img src={path + 'HDFC-ERGO1.png'} alt="" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center bajaj-logo-box">
                            <img src={path + 'bajaj-logo1.png'} alt="" className='img-fluid' />
                        </div>
                    </div>

                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center care-logo-box">
                            <img src={path + 'Care_health_insurance_logo-1.png'} alt="" className='img-fluid' />
                        </div>
                    </div>

                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center kotak-logo-box">
                            <img src={path + 'kotak-logo.png'} alt="" className='img-fluid' />
                        </div>
                    </div>

                </div>


            </div>

            {/* Health Insurance Empanelments start  */}


            {/* TPA Empanelments start  */}
            <div className="container margin-top3">

                <div className="row d-flex justify-content-between">
                    <div className="col-md-6 col-8">
                        <h2 className='homepage-section-heading'>Choose Your TPA</h2>
                        {/* <div className="home-page-semi-head">Private online consultations with verified doctors in all specialists</div> */}


                    </div>

                    <div className="col-md-3 col-4 text-end d-flex justify-content-end align-items-center">
                        <a href="" className=' btn-small'>Explore  <span className='explore-more-btn-phone'>More</span></a>
                    </div>

                </div>

                <div className="row g-2 mt-2 phone-scroll">
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center health-india-logo-box">
                            <img src={path + 'Health-India.png'} alt="" className='img-fluid ' />
                        </div>
                    </div>
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center vidal-health-logo-box">
                            <img src={path + 'Vidal-Health.png'} alt="" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center raksha-logo-box">
                            <img src={path + 'rakshaTPA-logo.png'} alt="" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center md-india-logo-box">
                            <img src={path + 'MD-India-logo.png'} alt="" className='img-fluid tpa-logo' />
                        </div>
                    </div>


                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center medi-assist-logo-box">
                            <img src={path + 'medi-assist-logo.png'} alt="" className='img-fluid' />
                        </div>
                    </div>

                    <div className="col-md-2 col-6">
                        <div className="Health-Insurance-logo-box d-flex justify-content-center align-items-center med-save-logo-box">
                            <img src={path + 'med-save-logo.png'} alt="" className='img-fluid' />
                        </div>
                    </div>

                </div>


            </div>


            {/* TPA Empanelments End  */}




            {/* Articles start  */}


            <div className="container margin-top3">



                <div className="row d-flex justify-content-between">
                    <div className="col-md-6 col-8">
                        <h2 className='homepage-section-heading'>Articles</h2>
                        {/* <div className="home-page-semi-head">Private online consultations with verified doctors in all specialists</div> */}



                    </div>

                    <div className="col-md-3 col-4 text-end d-flex justify-content-end align-items-center">
                        <a href="" className=' btn-small'>Explore  <span className='explore-more-btn-phone'>More</span></a>
                    </div>

                </div>

                <div className="row mt-3">
                    <div className="col-md-4 pe-1">
                        <div className="">
                            <img src={path + 'Articles-img1.png'} alt="" className='img-fluid' />
                        </div>
                        <p className='mb-0  mt-3 text-center'> <i>in</i> <span className='wellness'>WELLNESS</span></p>
                        <p className=' mb-0  semi-head1 text-center'>The Transformative Power of Early Mornings:
                            Embracing the Benefits of Waking Up Early
                        </p>
                    </div>
                    <div className="col-md-4 pe-1">
                        <div className="">
                            <img src={path + 'Articles-img2.png'} alt="" className='img-fluid' />
                        </div>
                        <p className='mb-0  mt-3 text-center'> <i>in</i> <span className='wellness'>WELLNESS</span></p>
                        <p className=' mb-0  semi-head1 text-center'>Taming the Appetite: Harnessing Natural
                            Appetite Suppressants for Weight Control

                        </p>
                    </div>
                    <div className="col-md-4 pe-1">
                        <div className="">
                            <img src={path + 'Articles-img3.png'} alt="" className='img-fluid' />
                        </div>
                        <p className='mb-0  mt-3 text-center'> <i>in</i> <span className='wellness'>WELLNESS</span></p>
                        <p className=' mb-0  semi-head1 text-center'>Dive into Wellness: The Incredible Benifits of Swimming

                        </p>
                    </div>
                    {/* <div className="col-md-4 ">
                        <div className="">
                            <img src={path + 'Articles-img3.png'} alt="" className='img-fluid' />
                        </div>

                        <p className='mb-0 mt-2 article-para'>Dive into Wellness: The Incredible
                            Benefits of Swimming

                        </p>
                    </div> */}
                </div>

            </div>







            {/* Articles End  */}



























        </>

    )
}

export default Home1
