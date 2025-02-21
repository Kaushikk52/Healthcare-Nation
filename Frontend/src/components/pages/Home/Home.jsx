import React from "react";
import { Link } from "react-router-dom";

// Data
import popularBrands from "@/data/brands.js";
import servicesBySpecialities from "@/data/servicesBySpecialities";
import clinics from "@/data/clinics";

import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";

import "aos/dist/aos.css";
import AOS from "aos";

AOS.init({
  duration: 1200,
});

const healthcareServices = [
  { title: "Hospitals", image: "hospitals1.jpg" },
  { title: "Dialysis Centers", image: "Dialysis-Centres.jpg" },
  { title: "Blood/Skin Banks", image: "Blood-Bank-1.jpg" },
  { title: "Clinics", image: "Clinics-1.png" },
  { title: "Home Care Services", image: "HomeCare-services1.jpg" },
  { title: "Patient Transport", image: "Patient-Transport-1.png" },
  { title: "Diagnostics", image: "Diagnostics-img1.jpg" },
  { title: "Orthotic & Prosthetics", image: "Orthotics-Prosthetics.jpg" },
];

const diagnosticCentres = [
  { title: "Xray", image: "Xray2.png" },
  { title: "MRI", image: "CTSCAN2.png" },
  { title: "Sonography", image: "Sonography1.png" },
  { title: "Lab/Pathology", image: "PATHOLOGY1.png" },
  { title: "CT Scan", image: "CTSCAN3.png" },
  { title: "2D Echo", image: "2DECHO.png" },
];

const alternativeMedicine = [
  {
    title: "Ayurveda Centres",
    image: "Alternative-Medicine/Ayurveda-Centres.jpg",
  },
  {
    title: "Homeopathy Centres",
    image: "Alternative-Medicine/Homeopathy-Centres.jpg",
  },
  { title: "Yoga Centres", image: "Alternative-Medicine/yoga-center.jpg" },
  {
    title: "Naturopathy Centres",
    image: "Alternative-Medicine/Naturopathy-Centres.jpg",
  },
];

const onlineHealthcareServices = [
  { title: "Online Consultation", image: "online/Online-Consultation.jpg" },
  {
    title: "Remote Patient Monitoring Services",
    image: "online/Monitoring-Services.jpg",
  },
  {
    title: "Online Pharmacy & Medical Store",
    image: "online/Online-Pharmacy.jpg",
  },
];

const publicSectorCorporates = [
  { title: "MPT Hospitals", image: "mpt-logo.png" },
  {
    title: "CGHS Hospitals",
    image: "cghs-logo.jpg",
    borderColor: "border-2 border-green-700",
  },
  { title: "MJPJAY Hospitals", image: "mjpjay-logo.png" },
  { title: "ESIC Hospitals", image: "esic-logo.png" },
  { title: "PMJAY Hospitals", image: "pmjay-logo2.png" },
  { title: "Railway Hospitals", image: "indian_railway_logo.jpg" },
];

const moreServices = [
  {
    title: "Test Tube Baby / IVF Centres",
    image: "Test-Tube-Baby-Centres1.jpg",
  },
  { title: "Rehabilitation / De Addiction Centres", image: "De-Addiction.jpg" },
  { title: "Burns Centres", image: "Burns-Centres.jpg" },
  { title: "Hair Transplant Centres", image: "Hair-Transplant.jpg" },
];

const servicesByAccrediations = [
  {
    title: "Organizations Accredited by Joint Commission International",
    image: "joint-commision.png",
  },
  {
    title:
      "Organizations Accredited by National Accreditation Board for Hospitals & Healthcare Providers",
    image: "national-accreditations.png",
  },
  {
    title: "Organizations Accredited by Largest Gold Certified Green Hospital",
    image: "IGBG-GOLD.jpeg",
  },
];

const servicesByHealthConcern = [
  { title: "Depression or Anxiety ?", image: "Depression-Anxiety1.jpg" },
  { title: "Pregnant ?", image: "Pregnant.png" },
  { title: "Joint Pains ?", image: "Joint-Pains.png" },
  { title: "Ear Problems ?", image: "Ear-Problems.png" },
  { title: "Digestion Issues ?", image: "Digestion-Issues.png" },
];

const popularHospitals = [
  { title: "Saifee Hospital", image: "SAIFEE-HOSPITAL.png" },
  { title: "Max Nanavati Hospital", image: "MAX-NANAVATI-HOSPITAL.png" },
  { title: "Global Hospital", image: "GLOBAL-HOSPITAL.png" },
  { title: "Kokilaben Hospital", image: "KOKILABEN-HOSPITAL.png" },
];

const chooseYourHealthInsurance = [
  { image: "icici-logo1.png", bgColor: "bg-[#f07b2238]" },
  { image: "Iffco-Tokio-Gen-Insurance-1.png", bgColor: "bg-[#02a44e42]" },
  { image: "HDFC-ERGO1.png", bgColor: "bg-[#e21f253f]" },
  { image: "bajaj-logo1.png", bgColor: "bg-[#006db53f]" },
  { image: "Care_health_insurance_logo-1.png", bgColor: "bg-[#f8e00844]" },
  { image: "kotak-logo.png", bgColor: "bg-[#e21f253f]" },
];

const chooseYourTPA = [
  { image: "Health-India.png", bgColor: "bg-[#82c45341]" },
  { image: "Vidal-Health.png", bgColor: "bg-[#21989248]" },
  { image: "rakshaTPA-logo.png", bgColor: "bg-[#d123233f]" },
  { image: "MD-India-logo.png", bgColor: "bg-[#3a4a8c44]" },
  { image: "medi-assist-logo.png", bgColor: "bg-[#efd31e3f]" },
  { image: "med-save-logo.png", bgColor: "bg-[#ed164f34]" },
];

const healthcareVideos = [
  { link: "https://www.youtube.com/embed/YZ84iQrbYjw?si=mgCWIRNdpW0cOvJ6" },
  { link: "https://www.youtube.com/embed/z2Bbm1Jr0mI?si=dU7ihUF2GeryH-Mt" },
  { link: "https://www.youtube.com/embed/y6N8u4OGgXk?si=CK5WiLzO8SzUoWAO" },
  { link: "https://www.youtube.com/embed/YZ84iQrbYjw?si=mgCWIRNdpW0cOvJ6" },
  { link: "https://www.youtube.com/embed/z2Bbm1Jr0mI?si=dU7ihUF2GeryH-Mt" },
  { link: "https://www.youtube.com/embed/y6N8u4OGgXk?si=CK5WiLzO8SzUoWAO" },
];

const articles = [
  {
    title: "The Transformative Power of Early Mornings",
    text: "Embracing the Benefits of Waking Up Early",
    image: "Articles-img1.png",
  },
  {
    title: "Taming the Appetite",
    text: "Harnessing Natural Appetite Suppressants for Weight Control",
    image: "Articles-img2.png",
  },
  {
    title: "Dive into Wellness",
    text: "The Incredible Benefits of Swimming",
    image: "Articles-img3.png",
  },
];

function Home() {
  const path = import.meta.env.VITE_APP_IMG_URL;

  return (
    <>
      <div className="!max-w-7xl !mx-auto !px-4">
        {/* HEALTHCARE SERVICES SECTION */}
        <div className="!mt-10">
          {/* HEALTHCARE SERVICES HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-start !space-x-2">
            <h3 className="!text-lg min-[425px]:!text-2xl !font-semibold !text-gray-700 !px-1">
              {" "}
              Healthcare Services
            </h3>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
              }}
              className="!py-1.5 !px-2 min-[425px]:!px-4 !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
            >
              Explore More
            </Link>
          </div>

          {/* HEALTHCARE SERVICES GRID IMAGES AND TITLE */}
          <div className="!gap-x-3.5 !gap-y-3 !mt-4">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, A11y]}
              spaceBetween={16}
              slidesPerView={4}
              loop={true}
              navigation
              autoplay={{ delay: 10000 }}
              breakpoints={{
                0: { slidesPerView: 1 },
                520: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {healthcareServices.map((service, index) => (
                <SwiperSlide key={index}>
                  <div className="group">
                    <a
                      href="#"
                      aria-label={service.title}
                      className="!cursor-pointer"
                    >
                      <img
                        src={path + service.image}
                        alt={service.title}
                        className="!rounded-lg !h-48 min-[375px]:!h-52 min-[425px]:!h-64 sm:!h-52 md:!h-60 lg:!h-40 xl:!h-52 !w-full object-cover"
                      />
                      <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-base xl:!text-lg !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                        {service.title}
                      </p>
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* POPULAR HEALTHCARE BRANDS SECTION */}
        <div className="!mt-10">
          {/* POPULAR HEALTHCARE BRANDS IN INDIA HEADING AND EXPLORE MORE BUTTON*/}
          <div className="flex justify-between items-start !mt-10">
            <h3 className="!text-lg  min-[425px]:!text-2xl !font-semibold !text-gray-700 !px-1">
              Popular Healthcare Brands In India
            </h3>
            <Link
              to={"/brands-in-india"}
              style={{
                textDecoration: "none",
              }}
              className="!py-1.5 !px-2 min-[425px]:!px-4 !text-center !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
            >
              Explore More
            </Link>
          </div>

          {/* POPULAR HEALTHCARE GRID BRAND IMAGES */}
          <div className="!grid !grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-6 xl:!grid-cols-6 !gap-x-3.5 !gap-y-3.5 md:!gap-y-6 !mt-4 sm:!mt-6">
            {popularBrands.slice(0, 6).map((brand, index) => (
              <div key={index} className="!cursor-pointer mx-auto">
                <a href="#" aria-label={brand.name}>
                  <div className="!text-center !border-2 border-black !rounded-full">
                    <img
                      src={path + brand.image}
                      alt={brand.name}
                      className="rounded-full !h-32 !w-32 min-[425px]:!h-36 min-[425px]:!w-36 sm:!h-36 sm:!w-36 md:!h-40 md:!w-40 lg:!h-36 lg:!w-36 xl:!h-44 xl:!w-44 object-contain"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* SERVICES BY SPECIALITIES SECTION */}
        <div className="!mt-10">
          {/*  SERVICES BY SPECIALITIES HEADING AND EXPLORE MORE BUTTON */}
          <div className="flex justify-between items-start !mt-14">
            <h3 className="!text-lg min-[425px]:!text-2xl !font-semibold !text-gray-700 !px-1">
              Specialities
            </h3>
            <Link
              to={"/services"}
              style={{
                textDecoration: "none",
              }}
              className="!py-1.5 !px-2 min-[425px]:!px-4 !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
            >
              Explore More
            </Link>
          </div>

          {/* SERVICES BY SPECIALITIES SWIPER 1  */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            spaceBetween={16}
            slidesPerView={4}
            loop={true}
            // pagination={{ clickable: true, dynamicBullets: true }}
            navigation
            autoplay={{ delay: 10000 }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              520: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {servicesBySpecialities.slice(0, 10).map((service, index) => (
              <SwiperSlide key={index} className="!mt-6">
                <div className="group">
                  <a style={{ textDecoration: "none" }} href="" className="">
                    <div className="!text-center">
                      <img
                        src={path + service.image}
                        alt={service.title}
                        className="!rounded-xl !object-cover !w-full !aspect-[3/2]"
                      />
                    </div>
                    <p className="!text-base sm:!text-lg font-semibold mt-2 text-gray-700 group-hover:text-[#9b2482] !px-1">
                      {service.title}{" "}
                    </p>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* SERVICES BY SPECIALITIES SWIPER 2  */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            spaceBetween={16}
            slidesPerView={4}
            loop={true}
            // pagination={{ clickable: true, dynamicBullets: true }}
            navigation
            autoplay={{ delay: 10000 }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              520: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="!mt-0"
          >
            {servicesBySpecialities.slice(10).map((service, index) => (
              <SwiperSlide key={index} className="!mt-4">
                <div className="group">
                  <a style={{ textDecoration: "none" }} href="" className="">
                    <div className="user-image text-center">
                      <img
                        src={path + service.image}
                        alt={service.title}
                        className="!rounded-xl !object-cover !w-full !aspect-[3/2]"
                      />
                    </div>
                    <p className="!text-base sm:!text-lg font-semibold mt-2 text-gray-700 group-hover:text-[#9b2482] !px-1">
                      {service.title}{" "}
                    </p>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* DIAGNOSTIC CENTRES NEAR YOU SECTION */}
        <div className="!mt-10">
          {/* DIAGNOSTIC CENTRES NEAR YOU HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-start !mt-10">
            <h3 className="!text-lg  min-[425px]:!text-2xl !font-semibold !text-gray-700 !px-1">
              Diagnostic Centres Near You
            </h3>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
              }}
              className="!py-1.5 !px-2 min-[425px]:!px-4 !text-center !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
            >
              Explore More
            </Link>
          </div>

          {/* DIAGNOSTIC CENTRES NEAR YOU GRID BRAND IMAGES AND TITLES */}
          <div className="!grid !grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-6 xl:!grid-cols-6 !gap-x-3.5 !gap-y-3.5 md:!gap-y-6 !mt-4 sm:!mt-6">
            {diagnosticCentres.map((center, index) => (
              <div key={index} className="group">
                <a
                  style={{ textDecoration: "none" }}
                  className="!cursor-pointer !mx-auto !flex !flex-col !items-center"
                >
                  <div className="!text-center !rounded-full group-hover:!shadow-2xl !transition-all">
                    <img
                      src={path + center.image}
                      alt="Diagnostic Centre image"
                      className="rounded-full !h-32 !w-32 min-[425px]:!h-36 min-[425px]:!w-36 sm:!h-36 sm:!w-36 md:!h-40 md:!w-40 lg:!h-36 lg:!w-36 xl:!h-44 xl:!w-44 !object-contain"
                    />
                  </div>
                  <p className="!text-base  min-[425px]:!text-lg sm:!text-lg lg:!text-base xl:!text-lg !text-center sm:!text-center !font-semibold !mt-2 !px-0 !text-gray-700 group-hover:!text-[#9b2482]">
                    {center.title}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ALTERNATIVE MEDICINE SECTION */}
        <div className="!mt-10">
          {/* ALTERNATIVE MEDICINE HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-start !mt-10">
            <h3 className="text-lg min-[425px]:!text-2xl !font-semibold !text-gray-700 !px-1">
              Alternative Medicine
            </h3>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
              }}
              className="!py-1.5 !px-2 min-[425px]:!px-4 !text-center !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
            >
              Explore More
            </Link>
          </div>

          {/* ALTERNATIVE MEDICINE GRID IMAGES AND TITLE */}
          <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 xl:!grid-cols-4 !gap-x-3.5 !gap-y-3 !mt-4">
            {alternativeMedicine.map((item, index) => (
              <div key={index} className="group">
                <a
                  style={{ textDecoration: "none" }}
                  className="!cursor-pointer"
                >
                  <img
                    src={path + item.image}
                    alt={item.title}
                    className="!rounded-lg !h-48 min-[375px]:!h-52 min-[425px]:!h-64 sm:!h-52 md:!h-60 lg:!h-40 xl:!h-52 !w-full !aspect-[3/2] !object-fit"
                  />
                  <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-base xl:!text-lg !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                    {item.title}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ONLINE HEALTHCARE SERVICES SECTION*/}
        <div className="!mt-10">
          {/* ONLINE HEALTHCARE SERVICES HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-center">
            <h3 className="!text-lg min-[425px]:!text-2xl !font-semibold !text-gray-700 !px-1">
              Online Healthcare Services
            </h3>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
              }}
              className="!py-1.5 !px-2 min-[425px]:!px-4 !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
            >
              Explore More
            </Link>
          </div>

          {/*  ONLINE HEALTHCARE SERVICES GRID IMAGES AND TITLE */}
          <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-3 !gap-x-3.5 !gap-y-3 !mt-4">
            {onlineHealthcareServices.map((service, index) => (
              <div key={index} className="group">
                <a
                  style={{ textDecoration: "none" }}
                  className="!cursor-pointer"
                >
                  <img
                    src={path + service.image}
                    alt={service.title}
                    className="!rounded-lg !h-48 min-[375px]:!h-52 min-[425px]:!h-64 sm:!h-52 md:!h-60 lg:!h-52 xl:!h-64 !w-full !aspect-[3/2] !object-fit"
                  />
                  <p className="!text-base min-[425px]:!text-lg sm:!text-base md:!text-lg lg:!text-base xl:!text-lg !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                    {service.title}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* PUBLIC SECTOR CORPORATES SECTION */}
        <div className="!mt-10">
          {/* PUBLIC SECTOR CORPORATES HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-start !mt-10">
            <h3 className="!text-lg  min-[425px]:!text-2xl !font-semibold !text-gray-700 !px-1">
              Public Sector Corporates
            </h3>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
              }}
              className="!py-1.5 !px-2 min-[425px]:!px-4 !text-center !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
            >
              Explore More
            </Link>
          </div>

          {/* PUBLIC SECTOR CORPORATES GRID BRAND IMAGES AND TITLES */}
          <div className="!grid !grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-6 xl:!grid-cols-6 !gap-x-3.5 !gap-y-3.5 md:!gap-y-6 !mt-4 sm:!mt-6">
            {publicSectorCorporates.map((corporate, index) => (
              <div key={index} className="group">
                <a
                  style={{ textDecoration: "none" }}
                  className="!cursor-pointer !mx-auto !flex !flex-col !items-center"
                >
                  <div
                    className={`${corporate.borderColor} !text-center !rounded-full !transition-all`}
                  >
                    <img
                      src={path + corporate.image}
                      alt="Diagnostic Centre image"
                      className={` rounded-full !h-32 !w-32 min-[425px]:!h-36 min-[425px]:!w-36 sm:!h-36 sm:!w-36 md:!h-40 md:!w-40 lg:!h-36 lg:!w-36 xl:!h-44 xl:!w-44 !object-fit`}
                    />
                  </div>
                  <p className="!text-sm  min-[425px]:!text-lg sm:!text-lg lg:!text-base xl:!text-lg !text-center sm:!text-center !font-semibold !mt-2 !px-0 !text-gray-700 group-hover:!text-[#9b2482]">
                    {corporate.title}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* MORE SERVICES SECTION */}
        <div className="!mt-10">
          {/* MORE SERVICES HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-start !mt-10">
            <h3 className="text-lg min-[425px]:!text-2xl !font-semibold !text-gray-700 !px-1">
              More Services
            </h3>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
              }}
              className="!py-1.5 !px-2 min-[425px]:!px-4 !text-center !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
            >
              Explore More
            </Link>
          </div>

          {/* MORE SERVICES GRID IMAGES AND TITLE */}
          <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 xl:!grid-cols-4 !gap-x-3.5 !gap-y-3 !mt-4">
            {moreServices.map((service, index) => (
              <div key={index} className="group">
                <a
                  style={{ textDecoration: "none" }}
                  className="!cursor-pointer"
                >
                  <img
                    src={path + service.image}
                    alt={service.title}
                    className="!rounded-lg !h-48 min-[375px]:!h-52 min-[425px]:!h-64 sm:!h-52 md:!h-60 lg:!h-40 xl:!h-52 !w-full !aspect-[3/2] !object-fit"
                  />
                  <p className="!text-sm min-[425px]:!text-lg sm:!text-base md:!text-lg lg:!text-base xl:!text-lg !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                    {service.title}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* HEALTH CHECKUP IMAGE */}
        <div className="!mt-10 hidden sm:!block">
          <img
            src={path + "Health-Checkup.jpg"}
            alt="health checkup image"
            className="!rounded-xl sm:!h-56 md:!h-64 lg:!h-72 xl:!h-80 !w-full !aspect-[3/2] !object-fit"
          />
        </div>

        {/* SERVICES BY ACCREDITATIONS SECTION */}
        <div className="!mt-10">
          {/* SERVICES BY ACCREDITATIONS HEADING  */}
          <div className="flex justify-between items-start !mt-10">
            <h3 className="text-lg min-[425px]:!text-2xl !font-semibold !text-gray-700 !px-1">
              Services By Accreditations
            </h3>
          </div>

          {/* SERVICES BY ACCREDITATIONS GRID IMAGES AND TITLE */}
          <div className="!grid !grid-cols-1 sm:!grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-3 !gap-x-3.5 !gap-y-3 !mt-4">
            {servicesByAccrediations.map((service, index) => (
              <div
                key={index}
                className="group !grid !grid-cols-12 !gap-x-2.5 !shadow-lg !items-center !rounded-xl !py-2 sm:!py-4 lg:!py-2 xl:!py-2.5 !px-2"
              >
                <div className="!col-span-4 md:!col-span-4 !p-1 !h-20 sm:!h-28 md:!h-24 lg:!h-20 xl:!h-[104px] !w-full">
                  <img
                    src={path + service.image}
                    alt={service.title}
                    className="!rounded-full !object-contain !h-full !w-full"
                  />
                </div>
                <div className="!col-span-8 md:!col-span-8 !pr-4">
                  <p className="!text-xs min-[425px]:!text-lg md:!text-base lg:!text-sm xl:!text-base !font-medium !mt-2 !text-cyan-600">
                    {service.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SERVICES BY HEALTH CONCERN */}
        <div className="!mt-10">
          {/* SERVICES BY HEALTH CONCERN AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-start !mt-10">
            <h3 className="text-lg min-[425px]:!text-2xl !font-semibold !text-gray-700 !px-1">
              Services By Health Concern
            </h3>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
              }}
              className="!py-1.5 !px-2 min-[425px]:!px-4 !text-center !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
            >
              Explore More
            </Link>
          </div>

          {/* SERVICES BY HEALTH CONCERN GRID IMAGES AND TITLE */}
          <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-5 xl:!grid-cols-5 !gap-x-3.5 !gap-y-3 !mt-4">
            {servicesByHealthConcern.map((service, index) => (
              <div key={index} className="group">
                <a
                  style={{ textDecoration: "none" }}
                  className="cursor-pointer"
                >
                  <img
                    src={path + service.image}
                    alt={service.title}
                    className="!rounded-lg !h-64 sm:!h-68 md:!h-[310px] lg:!h-48 xl:!h-56 !w-full !aspect-square !object-fit"
                  />
                  <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-lg !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                    {service.title}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* POPULAR HOSPITALS IN INDIA */}
        <div className="!mt-10">
          {/* POPULAR HOSPITALS IN INDIA AND EXPLORE MORE BUTTON */}
          <div className="flex justify-between items-start !mt-10">
            <h3 className="text-lg min-[425px]:!text-2xl !font-semibold !text-gray-700 !px-1">
              Popular Hospitals In India
            </h3>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
              }}
              className="!py-1.5 !px-2 min-[425px]:!px-4 !text-center !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
            >
              Explore More
            </Link>
          </div>

          {/* POPULAR HOSPITALS IN INDIA GRID IMAGES AND TITLE */}
          <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 xl:!grid-cols-4 !gap-x-3.5 !gap-y-3 !mt-4">
            {popularHospitals.map((hospital, index) => (
              <div key={index} className="group">
                <a
                  style={{ textDecoration: "none" }}
                  className="!cursor-pointer"
                >
                  <img
                    src={path + hospital.image}
                    alt={hospital.title}
                    className="!rounded-lg !h-48 min-[375px]:!h-52 min-[425px]:!h-64 sm:!h-52 md:!h-60 lg:!h-40 xl:!h-52 !w-full !aspect-[3/2] !object-fit"
                  />
                  <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-base xl:!text-lg !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                    {hospital.title}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CHOOSE YOUR HEALTH INSURANCE */}
        <div className="!mt-10">
          {/* CHOOSE YOUR HEALTH INSURANCE AND EXPLORE MORE BUTTON */}
          <div className="flex justify-between items-start !mt-10">
            <h3 className="text-lg min-[425px]:!text-2xl !font-semibold !text-gray-700 !px-1">
              Choose Your Health Insurance
            </h3>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
              }}
              className="!py-1.5 !px-2 min-[425px]:!px-4 !text-center !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
            >
              Explore More
            </Link>
          </div>

          {/* CHOOSE YOUR HEALTH INSURANCE GRID IMAGES AND TITLE */}
          <div className="!grid !grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-6 xl:!grid-cols-6 !gap-x-4 !gap-y-4 !mt-4">
            {chooseYourHealthInsurance.map((insurance, index) => (
              <div
                key={index}
                className={`${insurance.bgColor} !flex !justify-center !items-center !rounded-lg`}
              >
                <img
                  src={path + insurance.image}
                  alt="insurance images"
                  className="!rounded-lg !h-24 sm:!h-28 md:!h-32 lg:!h-24 xl:!h-28 !w-full !aspect-[3/2] !object-fit"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CHOOSE YOUR TPA */}
        <div className="!mt-10">
          {/* CHOOSE YOUR TPA AND EXPLORE MORE BUTTON */}
          <div className="flex justify-between items-start !mt-10">
            <h3 className="text-lg min-[425px]:!text-2xl !font-semibold !text-gray-700 !px-1">
              Choose Your TPA
            </h3>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
              }}
              className="!py-1.5 !px-2 min-[425px]:!px-4 !text-center !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
            >
              Explore More
            </Link>
          </div>

          {/* CHOOSE YOUR TPA GRID IMAGES AND TITLE */}
          <div className="mb-10 !grid !grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-6 xl:!grid-cols-6 !gap-x-4 !gap-y-4 !mt-4">
            {chooseYourTPA.map((tpa, index) => (
              <div
                key={index}
                className={`${tpa.bgColor} !flex !justify-center !items-center !rounded-lg`}
              >
                <img
                  src={path + tpa.image}
                  alt="tpa images"
                  className="!rounded-lg !h-24 sm:!h-28 md:!h-32 lg:!h-24 xl:!h-28 !w-full !aspect-[3/2] !object-fit"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
