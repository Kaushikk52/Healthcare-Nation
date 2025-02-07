import React from 'react'
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.css';

import 'aos/dist/aos.css'; 
import AOS from 'aos';

AOS.init({
    duration: 1200, 
});


const healthcareServices = [
    { title: 'Hospitals', image: 'hospitals1.jpg', },
    { title: 'Dialysis Centers', image: 'Dialysis-Centres.jpg', },
    { title: 'Blood/Skin Banks', image: 'Blood-Bank-1.jpg', },
    { title: 'Clinics', image: 'Clinics-1.png', },
    { title: 'Home Care Services', image: 'HomeCare-services1.jpg', },
    { title: 'Patient Transport', image: 'Patient-Transport-1.png', },
    { title: 'Diagnostics', image: 'Diagnostics-img1.jpg', },
    { title: 'Orthotic & Prosthetics', image: 'Orthotics-Prosthetics.jpg', },
]

const popularBrands = [
    { image: 'Brands-In-India/fortis-logo.png', },
    { image: 'Brands-In-India/wockhardt-logo.png', },
    { image: 'Brands-In-India/hcg-logo.png', },
    { image: 'Brands-In-India/max-logo.png', },
    { image: 'Brands-In-India/apollo.png', },
    { image: 'Brands-In-India/paras-logo.png', },
]

const servicesBySpecialities = [
    { id: 1, title: 'General Surgery', image: 'specialities/General-Surgery.jpg', },
    { id: 2, title: 'Eye Care Centres', image: 'Eye-Care-Centres.png', },
    { id: 3, title: 'Pediatric Centres', image: 'Pediatric-Centres1.jpg', },
    { id: 4, title: 'Cardiology', image: 'HomeCare-services2.jpg', },
    { id: 5, title: 'Psychiatry', image: 'specialities/Psychiatry.jpg', },
    { id: 6, title: 'Psysiotherapy', image: 'specialities/Physiotherapy.jpg', },
    { id: 7, title: 'Onco Surgery', image: 'specialities/Onco-Surgery.jpg', },
    { id: 8, title: 'Spine Surgery', image: 'specialities/Spine-Surgery.jpg', },
    { id: 9, title: 'Rheumatology', image: 'specialities/Rheumatology.jpg', },
    { id: 10, title: 'Radiatio oncology', image: 'specialities/Radiatio-oncology.jpg', },


    { id: 11, title: 'Dermatology', image: 'Skincare-Centres1.jpg', },
    { id: 12, title: 'Dietetics', image: 'specialities/Dietetics.jpg', },
    { id: 13, title: "Nephrology", image: 'Kidney-care-Centres.png' },
    { id: 14, title: 'Oncology', image: 'Cancer-Centres.jpg', },
    { id: 15, title: 'Plastic Surgery', image: 'specialities/Plastic-Surgery.jpg', },
    { id: 16, title: 'Pulmonology', image: 'specialities/Pulmonology.jpg', },
    { id: 17, title: 'Occupational therapy', image: 'specialities/Physiotherapy-Occupational-therapy.png', },
    { id: 18, title: 'Pediatric Surgery', image: 'specialities/Pediatric-Surgery.jpg', },
    { id: 19, title: 'Oncology', image: 'specialities/Oncology.jpg', },
    { id: 20, title: 'Obstetrics & Gynecology', image: 'specialities/Obstetrics-Gynecology.jpg', },
    { id: 21, title: 'Neurosurgery', image: 'specialities/Neurosurgery.jpg', },
    { id: 22, title: 'Neurology', image: 'specialities/Neurology.jpg', },
    { id: 23, title: 'Laboratory Services', image: 'specialities/Laboratory-Services.jpg', },
    { id: 24, title: 'Hematology', image: 'specialities/Hematology.jpg', },
    { id: 25, title: 'General Medicine', image: 'specialities/General-Medicine.jpg', },
    { id: 26, title: 'Endocrinology', image: 'specialities/Endocrinology.jpg', },
    { id: 27, title: 'Emergency Care', image: 'specialities/Emergency-Care.jpg', },
    { id: 28, title: 'Ear Nose Throat Surgeon', image: 'specialities/Ear-Nose-Throat-Surgeon.jpg', },
    { id: 29, title: 'Test Tube Baby Centres', image: 'Test-Tube-Baby-Centres1.jpg', },
    { id: 30, title: 'Dentistry', image: 'specialities/Dentistry.jpg', },
    { id: 31, title: 'Critical Care', image: 'specialities/Critical-Care.jpg', },

]

const diagnosticCentres = [
    { title: 'Xray', image: 'Xray2.png', },
    { title: 'MRI', image: 'CTSCAN2.png', },
    { title: 'Sonography', image: 'Sonography1.png', },
    { title: 'Lab/Pathology', image: 'PATHOLOGY1.png', },
    { title: 'CT Scan', image: 'CTSCAN3.png', },
    { title: '2D Echo', image: '2DECHO.png', },
]

const alternativeMedicine = [
    { title: 'Ayurveda Centres', image: 'Alternative-Medicine/Ayurveda-Centres.jpg' },
    { title: 'Homeopathy Centres', image: 'Alternative-Medicine/Homeopathy-Centres.jpg' },
    { title: 'Yoga Centres', image: 'Alternative-Medicine/yoga-center.jpg' },
    { title: 'Naturopathy Centres', image: 'Alternative-Medicine/Naturopathy-Centres.jpg' },
]

const onlineHealthcareServices = [
    { title: 'Online Consultation', image: 'online/Online-Consultation.jpg' },
    { title: 'Remote Patient Monitoring Services', image: 'online/Monitoring-Services.jpg' },
    { title: 'Online Pharmacy & Medical Store', image: 'online/Online-Pharmacy.jpg' },
]

const publicSectorCorporates = [
    { title: 'MPT', image: 'mpt-logo.png', },
    { title: 'CGHS', image: 'cghs-logo.jpg', borderColor: 'border-2 border-green-700' },
    { title: 'MJPJAY', image: 'mjpjay-logo.png', },
    { title: 'ESIC', image: 'esic-logo.png', },
    { title: 'PMJAY', image: 'pmjay-logo2.png', },
    { title: 'Railway', image: 'indian_railway_logo.jpg', },
]

const moreServices = [
    { title: 'Test Tube Baby / IVF Centres', image: 'Test-Tube-Baby-Centres1.jpg', },
    { title: 'Rehabilitation / De Addiction Centres', image: 'De-Addiction.jpg', },
    { title: 'Burns Centres', image: 'Burns-Centres.jpg', },
    { title: 'Hair Transplant Centres', image: 'Hair-Transplant.jpg', },
]

const servicesByAccrediations = [
    { title: 'Organizations Accredited by Joint Commission International', image: 'joint-commision.png', },
    { title: 'Organizations Accredited by National Accreditation Board for Hospitals & Healthcare Providers', image: 'national-accreditations.png', },
    { title: 'Organizations Accredited by Largest Gold Certified Green Hospital', image: 'IGBG-GOLD.jpeg', },
]

const servicesByHealthConcern = [
    { title: 'Depression or Anxiety ?', image: 'Depression-Anxiety1.jpg', },
    { title: 'Pregnant ?', image: 'Pregnant.png', },
    { title: 'Joint Pains ?', image: 'Joint-Pains.png', },
    { title: 'Ear Problems ?', image: 'Ear-Problems.png', },
    { title: 'Digestion Issues ?', image: 'Digestion-Issues.png', },
]

const popularHospitals = [
    { title: 'Saifee Hospital', image: 'SAIFEE-HOSPITAL.png', },
    { title: 'Max Nanavati Hospital', image: 'MAX-NANAVATI-HOSPITAL.png', },
    { title: 'Global Hospital', image: 'GLOBAL-HOSPITAL.png', },
    { title: 'Kokilaben Hospital', image: 'KOKILABEN-HOSPITAL.png', },
]

const chooseYourHealthInsurance = [
    { image: 'icici-logo1.png', bgColor: 'bg-[#f07b2238]', },
    { image: 'Iffco-Tokio-Gen-Insurance-1.png', bgColor: 'bg-[#02a44e42]', },
    { image: 'HDFC-ERGO1.png', bgColor: 'bg-[#e21f253f]', },
    { image: 'bajaj-logo1.png', bgColor: 'bg-[#006db53f]', },
    { image: 'Care_health_insurance_logo-1.png', bgColor: 'bg-[#f8e00844]', },
    { image: 'kotak-logo.png', bgColor: 'bg-[#e21f253f]', },
]

const chooseYourTPA = [
    { image: 'Health-India.png', bgColor: 'bg-[#82c45341]', },
    { image: 'Vidal-Health.png', bgColor: 'bg-[#21989248]', },
    { image: 'rakshaTPA-logo.png', bgColor: 'bg-[#d123233f]', },
    { image: 'MD-India-logo.png', bgColor: 'bg-[#3a4a8c44]', },
    { image: 'medi-assist-logo.png', bgColor: 'bg-[#efd31e3f]', },
    { image: 'med-save-logo.png', bgColor: 'bg-[#ed164f34]', },
]

const healthcareVideos = [
{link: 'https://www.youtube.com/embed/YZ84iQrbYjw?si=mgCWIRNdpW0cOvJ6',},
{link: 'https://www.youtube.com/embed/z2Bbm1Jr0mI?si=dU7ihUF2GeryH-Mt',},
{link: 'https://www.youtube.com/embed/y6N8u4OGgXk?si=CK5WiLzO8SzUoWAO',},
{link: 'https://www.youtube.com/embed/YZ84iQrbYjw?si=mgCWIRNdpW0cOvJ6',},
{link: 'https://www.youtube.com/embed/z2Bbm1Jr0mI?si=dU7ihUF2GeryH-Mt',},
{link: 'https://www.youtube.com/embed/y6N8u4OGgXk?si=CK5WiLzO8SzUoWAO',},
]

const articles = [
    { title: 'The Transformative Power of Early Mornings', text: 'Embracing the Benefits of Waking Up Early', image: 'Articles-img1.png', },
    { title: 'Taming the Appetite', text: 'Harnessing Natural Appetite Suppressants for Weight Control', image: 'Articles-img2.png', },
    { title: 'Dive into Wellness', text: 'The Incredible Benefits of Swimming', image: 'Articles-img3.png', },
]

function Home1() {

    const path = import.meta.env.VITE_APP_IMG_URL;

    return (
        <>

            <div className='max-w-7xl container mx-auto'>

                {/* HEALTHCARE SERVICES SECTION */}
                <div className='!mt-10'>
                    {/* HEALTHCARE SERVICES HEADING AND EXPLORE MORE BUTTON  */}
                    <div className='flex justify-between items-center'>
                        <h3 className='!font-semibold !text-gray-700'>Healthcare Services</h3>
                        <a
                            style={{
                                textDecoration: 'none',
                            }}
                            className='!py-1.5 !px-4 !text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]'
                        >Explore More</a>
                    </div>

                    {/* HEALTHCARE SERVICES GRID IMAGES AND TITLE */}
                    <div className='grid grid-cols-4 gap-x-3 gap-y-2 !mt-5'>
                        {healthcareServices.map((service, index) =>
                            <div
                                key={index}
                                className='group'
                            >
                                <a
                                    style={{ textDecoration: 'none' }}
                                    className='cursor-pointer'
                                >
                                    <img
                                        src={path + service.image}
                                        alt={service.title}
                                        className='rounded-xl aspect-[3/2]'
                                    />
                                    <p className='text-[17px] font-semibold mt-2 text-gray-700 group-hover:text-[#9b2482]'>{service.title}</p>
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* POPULAR HEALTHCARE BRANDS SECTION */}
                <div className='!mt-10'>
                    {/* POPULAR HEALTHCARE BRANDS IN INDIA HEADING AND EXPLORE MORE BUTTON*/}
                    <div className='flex justify-between items-center !mt-10'>
                        <h3 className='!font-semibold !text-gray-700'>Popular Healthcare Brands In India</h3>
                        <a
                            style={{
                                textDecoration: 'none',
                            }}
                            className='!py-1.5 !px-4 !text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]'
                        >Explore More</a>
                    </div>

                    {/* POPULAR HEALTHCARE GRID BRAND IMAGES */}
                    <div className='grid grid-cols-6 gap-3 mt-3'>
                        {popularBrands.map((brand, index) =>
                            <div
                                key={index}
                                className='cursor-pointer'
                            >
                                <a>
                                    <div className="text-center border-2 border-black rounded-full h-39 w-39">
                                        <img src={path + brand.image} alt="brand image" className='rounded-full h-full w-full object-contain' />
                                    </div>

                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* SERVICES BY SPECIALITIES SECTION */}
                <div className='!mt-10'>
                    {/*  SERVICES BY SPECIALITIES HEADING AND EXPLORE MORE BUTTON  */}
                    <div className='flex justify-between items-center'>
                        <h3 className='!font-semibold !text-gray-700'>Services by Specialities</h3>
                        <a
                            style={{
                                textDecoration: 'none',
                            }}
                            className='!py-1.5 !px-4 !text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]'
                        >Explore More</a>
                    </div>

                    {/* SERVICES BY SPECIALITIES SWIPER 1  */}
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, A11y]}
                        spaceBetween={16}
                        slidesPerView={4}
                        loop={true}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        navigation
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

                    >
                        {
                            servicesBySpecialities.slice(0, 10).map((service, index) =>
                                <SwiperSlide key={index} className='slide mt-3'>
                                    <div className="group"  >
                                        <a
                                            style={{ textDecoration: 'none' }}
                                            href="" className=''>
                                            <div className="user-image text-center">
                                                <img
                                                    src={path + service.image}
                                                    alt={service.title}
                                                    className='rounded-xl object-cover aspect-[3/2]'
                                                />
                                            </div>
                                            <div className="text-[17px] font-semibold mt-2 text-gray-700 group-hover:text-[#9b2482]">{service.title} </div>
                                        </a>
                                    </div>
                                </SwiperSlide>
                            )
                        }
                    </Swiper>

                    {/* SERVICES BY SPECIALITIES SWIPER 2  */}
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay, A11y]}
                        spaceBetween={16}
                        slidesPerView={4}
                        loop={true}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        navigation
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
                        className='mt-2'

                    >
                        {
                            servicesBySpecialities.slice(10).map((service, index) =>
                                <SwiperSlide key={index} className='slide mt-3'>
                                    <div className="group"  >
                                        <a
                                            style={{ textDecoration: 'none' }}
                                            href="" className=''>
                                            <div className="user-image text-center">
                                                <img
                                                    src={path + service.image}
                                                    alt={service.title}
                                                    className='rounded-xl object-cover aspect-[3/2]'
                                                />
                                            </div>
                                            <div className="text-[17px] font-semibold mt-2 text-gray-700 group-hover:text-[#9b2482]">{service.title} </div>
                                        </a>
                                    </div>
                                </SwiperSlide>
                            )
                        }
                    </Swiper>

                </div>

                {/* DIAGNOSTIC CENTRES NEAR YOU SECTION */}
                <div className='!mt-10'>
                    {/* DIAGNOSTIC CENTRES NEAR YOU HEADING AND EXPLORE MORE BUTTON  */}
                    <div className='flex justify-between items-center'>
                        <h3 className='!font-semibold !text-gray-700'>Diagnostic Centres Near You</h3>
                        <a
                            style={{
                                textDecoration: 'none',
                            }}
                            className='!py-1.5 !px-4 !text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]'
                        >Explore More</a>
                    </div>

                    {/* DIAGNOSTIC CENTRES NEAR YOU GRID BRAND IMAGES AND TITLES */}
                    <div className='grid grid-cols-6 gap-3 mt-3'>
                        {diagnosticCentres.map((center, index) =>
                            <div
                                key={index}
                                className='group'
                            >
                                <a
                                    style={{ textDecoration: 'none' }}
                                    className='cursor-pointer flex flex-col items-center'
                                >
                                    <div className="text-center rounded-full h-39 w-39 group-hover:shadow-2xl transition-all">
                                        <img src={path + center.image} alt="Diagnostic Centre image" className='rounded-full h-full w-full object-contain' />
                                    </div>
                                    <p className='mt-2 text-[17px] font-semibold mt-2 text-gray-700 group-hover:text-[#9b2482]'>{center.title}</p>

                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* ALTERNATIVE MEDICINE SECTION */}
                <div className='!mt-10'>
                    {/* ALTERNATIVE MEDICINE HEADING AND EXPLORE MORE BUTTON  */}
                    <div className='flex justify-between items-center'>
                        <h3 className='!font-semibold !text-gray-700'>Alternative Medicine</h3>
                        <a
                            style={{
                                textDecoration: 'none',
                            }}
                            className='!py-1.5 !px-4 !text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]'
                        >Explore More</a>
                    </div>

                    {/* ALTERNATIVE MEDICINE GRID IMAGES AND TITLE */}
                    <div className='grid grid-cols-4 gap-x-3 gap-y-2 !mt-5'>
                        {alternativeMedicine.map((item, index) =>
                            <div
                                key={index}
                                className='group'
                            >
                                <a
                                    style={{ textDecoration: 'none' }}
                                    className='cursor-pointer'
                                >
                                    <img
                                        src={path + item.image}
                                        alt={item.title}
                                        className='rounded-xl aspect-[3/2]'
                                    />
                                    <p className='text-[17px] font-semibold mt-2 text-gray-700 group-hover:text-[#9b2482]'>{item.title}</p>
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* ONLINE HEALTHCARE SERVICES SECTION*/}
                <div className='!mt-10'>
                    {/* ONLINE HEALTHCARE SERVICES HEADING AND EXPLORE MORE BUTTON  */}
                    <div className='flex justify-between items-center'>
                        <h3 className='!font-semibold !text-gray-700'>Online Healthcare Services</h3>
                        <a
                            style={{
                                textDecoration: 'none',
                            }}
                            className='!py-1.5 !px-4 !text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]'
                        >Explore More</a>
                    </div>

                    {/*  ONLINE HEALTHCARE SERVICES GRID IMAGES AND TITLE */}
                    <div className='grid grid-cols-3 gap-x-3 gap-y-2 !mt-5'>
                        {onlineHealthcareServices.map((service, index) =>
                            <div
                                key={index}
                                className='group'
                            >
                                <a
                                    style={{ textDecoration: 'none' }}
                                    className='cursor-pointer'
                                >
                                    <img
                                        src={path + service.image}
                                        alt={service.title}
                                        className='rounded-xl aspect-auto'
                                    />
                                    <p className='text-[17px] font-semibold mt-2 text-gray-700 group-hover:text-[#9b2482]'>{service.title}</p>
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* PUBLIC SECTOR CORPORATES SECTION */}
                <div className='!mt-10'>
                    {/* PUBLIC SECTOR CORPORATES HEADING AND EXPLORE MORE BUTTON  */}
                    <div className='flex justify-between items-center'>
                        <h3 className='!font-semibold !text-gray-700'>Public Sector Corporates</h3>
                        <a
                            style={{
                                textDecoration: 'none',
                            }}
                            className='!py-1.5 !px-4 !text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]'
                        >Explore More</a>
                    </div>

                    {/* PUBLIC SECTOR CORPORATES GRID BRAND IMAGES AND TITLES */}
                    <div className='grid grid-cols-6 gap-2 mt-3'>
                        {publicSectorCorporates.map((corporate, index) =>
                            <div
                                key={index}
                                className='group'
                            >
                                <a
                                    style={{ textDecoration: 'none' }}
                                    className='cursor-pointer flex flex-col items-center'
                                >
                                    <div className={`${corporate.borderColor} text-center rounded-full h-36 w-36 transition-all`}>
                                        <img src={path + corporate.image} alt="Diagnostic Centre image" className={` rounded-full h-full w-full object-fit`} />
                                    </div>
                                    <p className='mt-2 text-[17px] font-semibold mt-2 text-gray-700 group-hover:text-[#9b2482]'>{corporate.title}</p>

                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* MORE SERVICES SECTION */}
                <div className='!mt-10'>
                    {/* MORE SERVICES HEADING AND EXPLORE MORE BUTTON  */}
                    <div className='flex justify-between items-center'>
                        <h3 className='!font-semibold !text-gray-700'>More Services</h3>
                        <a
                            style={{
                                textDecoration: 'none',
                            }}
                            className='!py-1.5 !px-4 !text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]'
                        >Explore More</a>
                    </div>

                    {/* MORE SERVICES GRID IMAGES AND TITLE */}
                    <div className='grid grid-cols-4 gap-x-3 gap-y-2 !mt-5'>
                        {moreServices.map((service, index) =>
                            <div
                                key={index}
                                className='group'
                            >
                                <a
                                    style={{ textDecoration: 'none' }}
                                    className='cursor-pointer'
                                >
                                    <img
                                        src={path + service.image}
                                        alt={service.title}
                                        className='rounded-xl aspect-[3/2]'
                                    />
                                    <p className='text-[17px] font-semibold mt-2 text-gray-700 group-hover:text-[#9b2482]'>{service.title}</p>
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* HEALTH CHECKUP IMAGE */}
                <div className="!mt-10 ">
                    <div className="">
                        <img src={path + 'Health-Checkup.jpg'} alt="" className='rounded-xl' />
                    </div>
                </div>

                {/* SERVICES BY ACCREDITATIONS SECTION */}
                <div className='!mt-10'>
                    {/* SERVICES BY ACCREDITATIONS HEADING  */}
                    <div className='flex justify-start items-center'>
                        <h3 className='!font-semibold !text-gray-700'>Services By Accreditations</h3>
                    </div>

                    {/* SERVICES BY ACCREDITATIONS GRID IMAGES AND TITLE */}
                    <div className='grid grid-cols-3 gap-x-3 gap-y-2 !mt-5'>
                        {servicesByAccrediations.map((service, index) =>
                            <div
                                key={index}
                                className='group flex justify-center items-center !shadow-lg rounded-xl !py-1.5'
                            >
                                <div className='h-24 w-full'>
                                    <img
                                        src={path + service.image}
                                        alt={service.title}
                                        className='rounded-full object-contain h-full w-full'
                                    />
                                </div>
                                <div className='pr-4'>
                                    <p className='text-[15px] font-medium mt-2 text-cyan-600'>{service.title}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* SERVICES BY HEALTH CONCERN */}
                <div className='!mt-10'>
                    {/* SERVICES BY HEALTH CONCERN AND EXPLORE MORE BUTTON  */}
                    <div className='flex justify-between items-center'>
                        <h3 className='!font-semibold !text-gray-700'>Services By Health Concern</h3>
                        <a
                            style={{
                                textDecoration: 'none',
                            }}
                            className='!py-1.5 !px-4 !text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]'
                        >Explore More</a>
                    </div>

                    {/* SERVICES BY HEALTH CONCERN GRID IMAGES AND TITLE */}
                    <div className='grid grid-cols-5 gap-x-3 gap-y-2 !mt-5'>
                        {servicesByHealthConcern.map((service, index) =>
                            <div
                                key={index}
                                className='group'
                            >
                                <a
                                    style={{ textDecoration: 'none' }}
                                    className='cursor-pointer'
                                >
                                    <img
                                        src={path + service.image}
                                        alt={service.title}
                                        className='rounded-xl aspect-square'
                                    />
                                    <p className='text-[17px] font-semibold mt-2 !ml-1.5 text-gray-700 group-hover:text-[#9b2482]'>{service.title}</p>
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* POPULAR HOSPITALS IN INDIA */}
                <div className='!mt-10'>
                    {/* POPULAR HOSPITALS IN INDIA AND EXPLORE MORE BUTTON */}
                    <div className='flex justify-between items-center'>
                        <h3 className='!font-semibold !text-gray-700'>Popular Hospitals In India</h3>
                        <a
                            style={{
                                textDecoration: 'none',
                            }}
                            className='!py-1.5 !px-4 !text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]'
                        >Explore More</a>
                    </div>

                    {/* POPULAR HOSPITALS IN INDIA GRID IMAGES AND TITLE */}
                    <div className='grid grid-cols-4 gap-x-3 gap-y-2 !mt-5'>
                        {popularHospitals.map((hospital, index) =>
                            <div
                                key={index}
                                className='group'
                            >
                                <a
                                    style={{ textDecoration: 'none' }}
                                    className='cursor-pointer'
                                >
                                    <img
                                        src={path + hospital.image}
                                        alt={hospital.title}
                                        className='rounded-xl aspect-[3/2]'
                                    />
                                    <p className='text-[17px] font-semibold mt-2 !ml-1.5 text-gray-700 group-hover:text-[#9b2482]'>{hospital.title}</p>
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* CHOOSE YOUR HEALTH INSURANCE */}
                <div className='!mt-10'>
                    {/* CHOOSE YOUR HEALTH INSURANCE AND EXPLORE MORE BUTTON */}
                    <div className='flex justify-between items-center'>
                        <h3 className='!font-semibold !text-gray-700'>Choose Your Health Insurance</h3>
                        <a
                            style={{
                                textDecoration: 'none',
                            }}
                            className='!py-1.5 !px-4 !text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]'
                        >Explore More</a>
                    </div>

                    {/* CHOOSE YOUR HEALTH INSURANCE GRID IMAGES AND TITLE */}
                    <div className='grid grid-cols-6 gap-x-2 gap-y-2 !mt-5'>
                        {chooseYourHealthInsurance.map((insurance, index) =>
                            <div
                                key={index}
                                className={`${insurance.bgColor} flex justify-center items-center rounded-lg`}
                            >
                                <img
                                    src={path + insurance.image}
                                    alt='insurance images'
                                    className='rounded-xl aspect-[3/2] object-contain'
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* CHOOSE YOUR TPA */}
                <div className='!mt-10'>
                    {/* CHOOSE YOUR TPA AND EXPLORE MORE BUTTON */}
                    <div className='flex justify-between items-center'>
                        <h3 className='!font-semibold !text-gray-700'>Choose Your TPA</h3>
                        <a
                            style={{
                                textDecoration: 'none',
                            }}
                            className='!py-1.5 !px-4 !text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]'
                        >Explore More</a>
                    </div>

                    {/* CHOOSE YOUR TPA GRID IMAGES AND TITLE */}
                    <div className='grid grid-cols-6 gap-x-2 gap-y-2 !mt-5'>
                        {chooseYourTPA.map((tpa, index) =>
                            <div
                                key={index}
                                className={`${tpa.bgColor} flex justify-center items-center rounded-lg`}
                            >
                                <img
                                    src={path + tpa.image}
                                    alt='tpa images'
                                    className='rounded-xl aspect-[3/2] object-contain'
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* HEALTHCARE VIDEOS */}
                <div className='!mt-10'>
                    {/* HEALTHCARE VIDEOS HEADING AND EXPLORE MORE BUTTON  */}
                    <div className='flex justify-between items-center'>
                        <h3 className='!font-semibold !text-gray-700'>Healthcare Videos</h3>
                        <a
                            style={{
                                textDecoration: 'none',
                            }}
                            className='!py-1.5 !px-4 !text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]'
                        >Explore More</a>
                    </div>

                    {/* HEALTHCARE VIDEOS GRID VIDEOS */}
                    <div className='grid grid-cols-3 gap-x-3 gap-y-2 !mt-5'>
                        {healthcareVideos.map((video, index) =>
                            <div
                                key={index}
                                className=''
                            >
                                <iframe
                                    width="100%"
                                    height="215"
                                    src={video.link}
                                    title="YouTube video player"
                                    frameborder="0"
                                    class="radius10"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                                </iframe>
                            </div>
                        )}
                    </div>

                </div>

                {/* ARTICLES SECTION*/}
                <div className='!mt-10'>
                    {/* ARTICLES HEADING AND EXPLORE MORE BUTTON  */}
                    <div className='flex justify-between items-center'>
                        <h3 className='!font-semibold !text-gray-700'>Articles</h3>
                        <a
                            style={{
                                textDecoration: 'none',
                            }}
                            className='!py-1.5 !px-4 !text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]'
                        >Explore More</a>
                    </div>

                    {/*  ARTICLES GRID IMAGES AND TITLE */}
                    <div className='grid grid-cols-3 gap-x-3 gap-y-2 !mt-5'>
                        {articles.map((article, index) =>
                            <div
                                key={index}
                                className=''
                            >
                                <a
                                    style={{ textDecoration: 'none' }}
                                    className='cursor-pointer'
                                >
                                    <img
                                        src={path + article.image}
                                        alt='article image'
                                        className='rounded-xl aspect-auto object-contain'
                                    />
                                    <div className='!flex !space-x-1.5 !mt-2'>
                                        <i className='text-black'>in</i>
                                        <p className='font-semibold tracking-wider text-cyan-500'>WELLNESS</p>
                                    </div>
                                    <p className='!flex text-[17px] font-semibold text-gray-700'>{article.title}: {article.text}</p>
                                </a>
                            </div>
                        )}
                    </div>
                </div>

            </div>

        </>

    )
}

export default Home1
