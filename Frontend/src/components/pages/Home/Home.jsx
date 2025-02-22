import React from "react";
import { Link } from "react-router-dom";

// Data
import healthcareServices from "@/data/healthcareServices.js";
import popularBrands from "@/data/brands.js";
import servicesBySpecialities from "@/data/servicesBySpecialities";
import diagnosticCentres from "@/data/diagnostic.js";
import alternativeMedicine from "@/data/alternativeMedicine.js";
import onlineHealthcareServices from "@/data/onlineServices.js";
import moreServices from "@/data/moreServices.js";
import publicSectorCorporates from "@/data/publicSector.js";
import servicesByHealthConcern from "@/data/healthConcern.js";
import popularHospitals from "@/data/popularHospitals.js";
import servicesByAccrediations from "@/data/accrediations.js";
import chooseYourHealthInsurance from "@/data/healthInsurance.js";
import chooseYourTPA from "@/data/tpa.js";
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


function Home() {
  const path = import.meta.env.VITE_APP_IMG_URL;

  return (
    <>
      <div className="!max-w-4xl xl:!max-w-7xl !mx-auto !px-4">

        {/* HEALTHCARE SERVICES SECTION */}
        <div className="!mt-10">

          {/* HEALTHCARE SERVICES HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-start lg:items-center !space-x-2">
            <h3 className="!text-lg min-[425px]:!text-2xl lg:!text-xl xl:!text-xl !font-semibold !text-gray-700 !px-1">
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
                        className="!rounded-xl !h-48 min-[375px]:!h-52 min-[425px]:!h-64 sm:!h-52 md:!h-60 lg:!h-36 xl:!h-52 !w-full object-cover"
                      />
                      <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
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
          <div className="flex justify-between items-start lg:items-center !mt-10">
            <h3 className="!text-lg  min-[425px]:!text-2xl lg:!text-xl xl:!text-xl !font-semibold !text-gray-700 !px-1">
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
                      className="rounded-full !h-32 !w-32 min-[425px]:!h-36 min-[425px]:!w-36 sm:!h-36 sm:!w-36 md:!h-40 md:!w-40 lg:!h-32 lg:!w-32 xl:!h-44 xl:!w-44 object-contain"
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
            <h3 className="!text-lg min-[425px]:!text-2xl lg:!text-xl xl:!text-xl !font-semibold !text-gray-700 !px-1">
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
                  <Link style={{ textDecoration: "none" }} to={"/"} className="">
                    <div className="!text-center">
                      <img
                        src={path + service.image}
                        alt={service.title}
                        className="!rounded-xl !object-cover !w-full !aspect-[3/2]"
                      />
                    </div>
                    <p className="!text-base sm:!text-lg lg:!text-sm xl:text-base font-semibold mt-2 text-gray-700 group-hover:text-[#9b2482] !px-1">
                      {service.title}{" "}
                    </p>
                  </Link>
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
                  <Link style={{ textDecoration: "none" }} to={"/"} className="">
                    <div className="user-image text-center">
                      <img
                        src={path + service.image}
                        alt={service.title}
                        className="!rounded-xl !object-cover !w-full !aspect-[3/2]"
                      />
                    </div>
                    <p className="!text-base sm:!text-lg lg:!text-sm xl:!text-base font-semibold mt-2 text-gray-700 group-hover:text-[#9b2482] !px-1">
                      {service.title}{" "}
                    </p>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* DIAGNOSTIC CENTRES NEAR YOU SECTION */}
        <div className="!mt-10">
          {/* DIAGNOSTIC CENTRES NEAR YOU HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-start lg:items-center !mt-10">
            <h3 className="!text-lg  min-[425px]:!text-2xl lg:!text-xl xl:!text-xl !font-semibold !text-gray-700 !px-1">
              Diagnostic Centres Near You
            </h3>
            <Link
              to={"/diagnostic-centers"}
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
                <Link
                  to={"/"}
                  style={{ textDecoration: "none" }}
                  className="!cursor-pointer !mx-auto !flex !flex-col !items-center"
                >
                  <div className="!text-center !rounded-full group-hover:!shadow-xl !transition-all">
                    <img
                      src={path + center.image}
                      alt="Diagnostic Centre image"
                      className="rounded-full !h-32 !w-32 min-[425px]:!h-36 min-[425px]:!w-36 sm:!h-36 sm:!w-36 md:!h-40 md:!w-40 lg:!h-32 lg:!w-32 xl:!h-44 xl:!w-44 !object-contain"
                    />
                  </div>
                  <p className="!text-base  min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-center sm:!text-center !font-semibold !mt-2 !px-0 !text-gray-700 group-hover:!text-[#9b2482]">
                    {center.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ALTERNATIVE MEDICINE SECTION */}
        <div className="!mt-10">
          {/* ALTERNATIVE MEDICINE HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-start lg:items-center !mt-10">
            <h3 className="text-lg min-[425px]:!text-2xl lg:!text-xl xl:!text-xl !font-semibold !text-gray-700 !px-1">
              Alternative Medicine
            </h3>
            <Link
              to={"/alternative-medicines"}
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
                <Link to={"/"}
                  style={{ textDecoration: "none" }}
                  className="!cursor-pointer"
                >
                  <img
                    src={path + item.image}
                    alt={item.title}
                    className="!rounded-lg !h-48 min-[375px]:!h-52 min-[425px]:!h-64 sm:!h-52 md:!h-60 lg:!h-40 xl:!h-52 !w-full !aspect-[3/2] !object-fit"
                  />
                  <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                    {item.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ONLINE HEALTHCARE SERVICES SECTION*/}
        <div className="!mt-10">
          {/* ONLINE HEALTHCARE SERVICES HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-center lg:items-center">
            <h3 className="!text-lg min-[425px]:!text-2xl lg:!text-xl xl:!text-xl !font-semibold !text-gray-700 !px-1">
              Online Healthcare Services
            </h3>
            <Link
              to={"/online-healthcare-services"}
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
                <Link to={"/"}
                  style={{ textDecoration: "none" }}
                  className="!cursor-pointer"
                >
                  <img
                    src={path + service.image}
                    alt={service.title}
                    className="!rounded-lg !h-48 min-[375px]:!h-52 min-[425px]:!h-64 sm:!h-52 md:!h-60 lg:!h-44 xl:!h-64 !w-full !aspect-[3/2] !object-fit"
                  />
                  <p className="!text-base min-[425px]:!text-lg sm:!text-base md:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                    {service.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* PUBLIC SECTOR CORPORATES SECTION */}
        <div className="!mt-10">
          {/* PUBLIC SECTOR CORPORATES HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-start lg:items-center !mt-10">
            <h3 className="!text-lg  min-[425px]:!text-2xl lg:!text-xl xl:!text-xl !font-semibold !text-gray-700 !px-1">
              Public Sector Corporates
            </h3>
            <Link
              to={"/public-sector-corporates"}
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
                <Link to={"/"}
                  style={{ textDecoration: "none" }}
                  className="!cursor-pointer !mx-auto "
                >
                  <div
                    className={`${corporate.borderColor} !text-center !rounded-full !transition-all !flex !flex-col !items-center`}
                  >
                    <img
                      src={path + corporate.image}
                      alt="Diagnostic Centre image"
                      className={` rounded-full !h-32 !w-32 min-[425px]:!h-36 min-[425px]:!w-36 sm:!h-36 sm:!w-36 md:!h-40 md:!w-40 lg:!h-32 lg:!w-32 xl:!h-[186px] xl:!w-[186px] !object-fit`}
                    />
                  </div>
                  <p className="!text-sm  min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-center sm:!text-center !font-semibold !mt-2 !px-0 !text-gray-700 group-hover:!text-[#9b2482]">
                    {corporate.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* MORE SERVICES SECTION */}
        <div className="!mt-10">
          {/* MORE SERVICES HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-start lg:items-center !mt-10">
            <h3 className="text-lg min-[425px]:!text-2xl lg:!text-xl xl:!text-xl !font-semibold !text-gray-700 !px-1">
              More Services
            </h3>
            <Link
              to={"/more-services"}
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
                <Link to={"/"}
                  style={{ textDecoration: "none" }}
                  className="!cursor-pointer"
                >
                  <img
                    src={path + service.image}
                    alt={service.title}
                    className="!rounded-lg !h-48 min-[375px]:!h-52 min-[425px]:!h-64 sm:!h-52 md:!h-60 lg:!h-36 xl:!h-52 !w-full !aspect-[3/2] !object-fit"
                  />
                  <p className="!text-sm min-[425px]:!text-lg sm:!text-base md:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                    {service.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* HEALTH CHECKUP IMAGE */}
        <div className="!mt-10 hidden sm:!block">
          <img
            src={path + "Health-Checkup.jpg"}
            alt="health checkup image"
            className="!rounded-xl sm:!h-56 md:!h-64 lg:!h-64 xl:!h-80 !w-full !aspect-[3/2] !object-fit"
          />
        </div>

        {/* SERVICES BY ACCREDITATIONS SECTION */}
        <div className="!mt-10">
          {/* SERVICES BY ACCREDITATIONS HEADING  */}
          <div className="flex justify-between items-start lg:items-center !mt-10">
            <h3 className="text-lg min-[425px]:!text-2xl lg:!text-xl xl:!text-xl !font-semibold !text-gray-700 !px-1">
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
          <div className="flex justify-between items-start lg:items-center !mt-10">
            <h3 className="text-lg min-[425px]:!text-2xl lg:!text-xl xl:!text-xl !font-semibold !text-gray-700 !px-1">
              Services By Health Concern
            </h3>
            <Link
              to={"/health-concern"}
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
                <Link to={"/"}
                  style={{ textDecoration: "none" }}
                  className="cursor-pointer"
                >
                  <img
                    src={path + service.image}
                    alt={service.title}
                    className="!rounded-lg !h-64 sm:!h-68 md:!h-[310px] lg:!h-44 xl:!h-56 !w-full !aspect-square !object-fit"
                  />
                  <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                    {service.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* POPULAR HOSPITALS IN INDIA */}
        <div className="!mt-10">
          {/* POPULAR HOSPITALS IN INDIA AND EXPLORE MORE BUTTON */}
          <div className="flex justify-between items-start lg:items-center !mt-10">
            <h3 className="text-lg min-[425px]:!text-2xl lg:!text-xl xl:!text-xl !font-semibold !text-gray-700 !px-1">
              Popular Hospitals In India
            </h3>
            <Link
              to={"/popular-hospitals"}
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
                <Link to={"/"}
                  style={{ textDecoration: "none" }}
                  className="!cursor-pointer"
                >
                  <img
                    src={path + hospital.image}
                    alt={hospital.title}
                    className="!rounded-lg !h-48 min-[375px]:!h-52 min-[425px]:!h-64 sm:!h-52 md:!h-60 lg:!h-36 xl:!h-52 !w-full !aspect-[3/2] !object-fit"
                  />
                  <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                    {hospital.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CHOOSE YOUR HEALTH INSURANCE */}
        <div className="!mt-10">
          {/* CHOOSE YOUR HEALTH INSURANCE AND EXPLORE MORE BUTTON */}
          <div className="flex justify-between items-start !mt-10">
            <h3 className="text-lg min-[425px]:!text-2xl lg:!text-xl xl:!text-xl !font-semibold !text-gray-700 !px-1">
              Choose Your Health Insurance
            </h3>
            <Link
              to={"/health-insurance"}
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

              >
                <Link to={"/"} className={`${insurance.bgColor} !flex !justify-center !items-center !rounded-lg`}>
                  <img
                    src={path + insurance.image}
                    alt="insurance images"
                    className="!rounded-lg !h-24 sm:!h-28 md:!h-32 lg:!h-20 xl:!h-28 !w-full !aspect-[3/2] !object-fit"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CHOOSE YOUR TPA */}
        <div className="!mt-10">
          {/* CHOOSE YOUR TPA AND EXPLORE MORE BUTTON */}
          <div className="flex justify-between items-start !mt-10">
            <h3 className="text-lg min-[425px]:!text-2xl lg:!text-xl xl:!text-xl !font-semibold !text-gray-700 !px-1">
              Choose Your TPA
            </h3>
            <Link
              to={"/tpa"}
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

              >
                <Link to={"/"} className={`${tpa.bgColor} !flex !justify-center !items-center !rounded-lg`}>
                  <img
                    src={path + tpa.image}
                    alt="tpa images"
                    className="!rounded-lg !h-24 sm:!h-28 md:!h-32 lg:!h-20 xl:!h-28 !w-full !aspect-[3/2] !object-fit"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
