import React, { useEffect } from "react";
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
      <div className="!max-w-4xl lg:!max-w-5xl xl:!max-w-6xl !mx-auto !px-4 lg:!px-10 xl:!px-10">
        {/* HEALTHCARE SERVICES SECTION */}
        <div className="!mt-10">
          {/* HEALTHCARE SERVICES HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-start lg:items-center !space-x-2">
            <h2 className="text-gray-700 px-1 homepage-section-heading">
              {" "}
              Healthcare Services
            </h2>
            <Link
              to={"/healthcare-services"}
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
                    <Link
                      to={`${service.path}`}
                      aria-label={service.title}
                      className="!cursor-pointer"
                    >
                      <img
                        src={path + service.image}
                        alt={service.title}
                        className="rounded-[10px] aspect-[4.2/3] shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                      />
                      <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                        {service.title}
                      </p>
                    </Link>
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
            <h2 className="text-gray-700 px-1 homepage-section-heading">
              Hospitals/Services by Healthcare Brands in India
            </h2>
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
          <div className=" !mt-4 sm:!mt-6">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, A11y]}
              spaceBetween={16}
              slidesPerView={6}
              loop={true}
              navigation
              autoplay={{ delay: 10000 }}
              breakpoints={{
                0: { slidesPerView: 1 },
                520: { slidesPerView: 2 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
              }}
            >
              {popularBrands.map((brand, index) => (
                <SwiperSlide key={index}>
                  <div className="group text-center">
                    <Link
                      to="/"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <div className="!text-center !border-2 border-black !rounded-full">
                        <img
                          src={
                            brand.image
                              ? path + brand.image
                              : "/default-image.jpg"
                          }
                          alt={brand.title || "Diagnostic Centre"}
                          className={`rounded-full aspect-square ${brand.objectProperty} shadow-md shadow-[rgba(45,45,51,0.08)]  w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl`} />
                      </div>
                      <p className="text-base sm:text-lg lg:text-sm xl:text-base font-semibold mt-2 text-gray-700 group-hover:text-[#9b2482]">
                        {brand.title}
                      </p>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* SERVICES BY SPECIALITIES SECTION */}
        <div className="!mt-10">
          {/*  SERVICES BY SPECIALITIES HEADING AND EXPLORE MORE BUTTON */}
          <div className="flex justify-between items-start !mt-14">
            <h2 className="text-gray-700 px-1 homepage-section-heading">
              Hospitals/Services by Specialities
            </h2>
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
            {servicesBySpecialities.slice(0, 13).map((service, index) => (
              <SwiperSlide key={index} className="!mt-6">
                <div className="group">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={"/"}
                    className=""
                  >
                    <div className="!text-center">
                      <img
                        src={path + service.image}
                        alt={service.title}
                        className="rounded-[10px] aspect-[4.2/3] shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
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
            {servicesBySpecialities.slice(14).map((service, index) => (
              <SwiperSlide key={index} className="!mt-4">
                <div className="group">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={"/"}
                    className=""
                  >
                    <div className="user-image text-center">
                      <img
                        src={path + service.image}
                        alt={service.title}
                        className="rounded-[10px] aspect-[4.2/3] shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
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
            <h2 className="text-gray-700 px-1 homepage-section-heading">
              Diagnostic & Laboratory Services
            </h2>
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
          <div className=" !mt-4 sm:!mt-6">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, A11y]}
              spaceBetween={16}
              slidesPerView={6}
              loop={true}
              navigation
              autoplay={{ delay: 10000 }}
              breakpoints={{
                0: { slidesPerView: 1 },
                520: { slidesPerView: 2 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
              }}
            >
              {diagnosticCentres.map((center, index) => (
                <SwiperSlide key={index}>
                  <div className="group text-center">
                    <Link
                      to="/"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <div className="rounded-full transition-all group-hover:shadow-xl">
                        <img
                          src={
                            center.image
                              ? path + center.image
                              : "/default-image.jpg"
                          }
                          alt={center.title || "Diagnostic Centre"}
                          className="rounded-full aspect-square object-cover shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl" />
                      </div>
                      <p className="text-base sm:text-lg lg:text-sm xl:text-base font-semibold mt-2 text-gray-700 group-hover:text-[#9b2482]">
                        {center.title}
                      </p>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* ALTERNATIVE MEDICINE SECTION */}
        <div className="!mt-10">
          {/* ALTERNATIVE MEDICINE HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-start lg:items-center !mt-10">
            <h2 className="text-gray-700 px-1 homepage-section-heading">
              Alternative & Complementary Medicine Services
            </h2>
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
              {alternativeMedicine.map((service, index) => (
                <SwiperSlide key={index}>
                  <div className="group">
                    <Link
                      to={`${service.path}`}
                      aria-label={service.title}
                      className="!cursor-pointer"
                    >
                      <img
                        src={path + service.image}
                        alt={service.title}
                        className="rounded-[10px] aspect-[4.2/3] shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                      />
                      <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                        {service.title}
                      </p>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* ONLINE HEALTHCARE SERVICES SECTION*/}
        <div className="!mt-10">
          {/* ONLINE HEALTHCARE SERVICES HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-center lg:items-center">
            <h2 className="text-gray-700 px-1 homepage-section-heading">
              Online Consultation & Digital Health Services
            </h2>
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
                1024: { slidesPerView: 3 },
              }}
            >
              {onlineHealthcareServices.map((service, index) => (
                <SwiperSlide key={index}>
                  <div className="group">
                    <Link
                      to={`${service.path}`}
                      aria-label={service.title}
                      className="!cursor-pointer"
                    >
                      <img
                        src={path + service.image}
                        alt={service.title}
                        className="rounded-[10px] aspect-[4.2/3] shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                      />
                      <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                        {service.title}
                      </p>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* PUBLIC SECTOR CORPORATES SECTION */}
        <div className="!mt-10">
          {/* PUBLIC SECTOR CORPORATES HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-start lg:items-start xl:items-center !mt-10">
            <h2 className="text-gray-700 px-1 homepage-section-heading lg:max-w-2xl xl:max-w-full">
              Hospitals/Services covered by Public Sector health schemes
            </h2>
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
          <div className=" !mt-4 sm:!mt-6">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, A11y]}
              spaceBetween={16}
              slidesPerView={6}
              loop={true}
              navigation
              autoplay={{ delay: 10000 }}
              breakpoints={{
                0: { slidesPerView: 1 },
                520: { slidesPerView: 2 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
              }}
            >
              {publicSectorCorporates.map((center, index) => (
                <SwiperSlide key={index}>
                  <div className="group text-center">
                    <Link
                      to="/"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <div
                        className={`${center.borderColor} !text-center !rounded-full !transition-all !flex !flex-col !items-center`}
                      >
                        <img
                          src={
                            center.image
                              ? path + center.image
                              : "/default-image.jpg"
                          }
                          alt={center.title || "Diagnostic Centre"}
                          className="rounded-full aspect-square shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl" />
                      </div>
                      <p className="text-base sm:text-lg lg:text-sm xl:text-base font-semibold mt-2 text-gray-700 group-hover:text-[#9b2482]">
                        {center.title}
                      </p>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* MORE SERVICES SECTION */}
        <div className="!mt-10">
          {/* MORE SERVICES HEADING AND EXPLORE MORE BUTTON  */}
          <div className="flex justify-between items-start lg:items-center !mt-10">
            <h2 className="text-gray-700 px-1 homepage-section-heading">
              More Services
            </h2>
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
              {moreServices.map((service, index) => (
                <SwiperSlide key={index}>
                  <div className="group">
                    <Link
                      to={`${service.path}`}
                      aria-label={service.title}
                      className="!cursor-pointer"
                    >
                      <img
                        src={path + service.image}
                        alt={service.title}
                        className="rounded-[10px] aspect-[4.2/3] shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                      />
                      <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                        {service.title}
                      </p>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* HEALTH CHECKUP IMAGE */}
        <div className="!mt-10 ">
          <img
            src={path + "Health-Checkup.jpg"}
            alt="health checkup image"
            className="!rounded-xl !h-36 sm:!h-52 md:!h-56 lg:!h-60 xl:!h-72 !w-full !aspect-[3/2] !object-fit"
          />
        </div>

        {/* SERVICES BY ACCREDITATIONS SECTION */}
        <div className="!mt-10">
          {/* SERVICES BY ACCREDITATIONS HEADING  */}
          <div className="flex justify-between items-start lg:items-center !mt-10">
            <h2 className="text-gray-700 px-1 homepage-section-heading">
              Hospitals/Services By Accreditations
            </h2>
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
            <h2 className="text-gray-700 px-1 homepage-section-heading">
              Hospitals/Services By Health Concern
            </h2>
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
          <div className=" !mt-4">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, A11y]}
              spaceBetween={16}
              slidesPerView={5}
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
              {servicesByHealthConcern.map((service, index) => (
                <SwiperSlide key={index} className="!mt-4">
                  <div key={index} className="group">
                    <Link
                      to={"/"}
                      style={{ textDecoration: "none" }}
                      className="cursor-pointer"
                    >
                      <img
                        src={path + service.image}
                        alt={service.title}
                        className="rounded-[10px] aspect-[4.2/3] shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl object-cover"
                      />
                      <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                        {service.title}
                      </p>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>





          </div>
        </div>

        {/* POPULAR HOSPITALS IN INDIA */}
        <div className="!mt-10">
          {/* POPULAR HOSPITALS IN INDIA AND EXPLORE MORE BUTTON */}
          <div className="flex justify-between items-start lg:items-center !mt-10">
            <h2 className="text-gray-700 px-1 homepage-section-heading">
              Popular Hospitals In India
            </h2>
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
              {popularHospitals.map((service, index) => (
                <SwiperSlide key={index}>
                  <div className="group">
                    <Link
                      to={`${service.path}`}
                      aria-label={service.title}
                      className="!cursor-pointer"
                    >
                      <img
                        src={path + service.image}
                        alt={service.title}
                        className="rounded-[10px] aspect-[4.2/3] shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                      />
                      <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                        {service.title}
                      </p>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* CHOOSE YOUR HEALTH INSURANCE */}
        <div className="!mt-10">
          {/* CHOOSE YOUR HEALTH INSURANCE AND EXPLORE MORE BUTTON */}
          <div className="flex justify-between items-start !mt-10">
            <h2 className="text-gray-700 px-1 homepage-section-heading">
              Hospitals/Services covered by Health Insurance
            </h2>
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
                1024: { slidesPerView: 6 },
              }}
            >
              {chooseYourHealthInsurance.map((service, index) => (
                <SwiperSlide key={index}>
                  <div className="group">
                    <Link
                      to={`${service.path}`}
                      aria-label={service.title}
                      className={`${service.bgColor} !rounded-lg`}
                      >
                      <img
                        src={path + service.image}
                        alt={service.title}
                        className={`rounded-[10px] ${service.bgColor} aspect-[4.2/3] shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl`}
                        />
                      <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                        {service.title}
                      </p>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}

            </Swiper>
          </div>
        </div>

        {/* CHOOSE YOUR TPA */}
        <div className="!mt-10">
          {/* CHOOSE YOUR TPA AND EXPLORE MORE BUTTON */}
          <div className="flex justify-between items-start !mt-10">
            <h2 className="text-gray-700 px-1 homepage-section-heading">
              Hospitals/Services covered by TPA
            </h2>
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
          <div className="!gap-x-3.5 !gap-y-3 !mt-4 !mb-10">
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
                1024: { slidesPerView: 6 },
              }}
            >
              {chooseYourTPA.map((service, index) => (
                <SwiperSlide key={index}>
                  <div className="group">
                    <Link
                      to={`${service.path}`}
                      aria-label={service.title}
                      className={`${service.bgColor} !rounded-lg`}
                      >
                      <img
                        src={path + service.image}
                        alt={service.title}
                        className={`rounded-[10px] ${service.bgColor} aspect-[4.2/3] shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl`}
                        />
                      <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                        {service.title}
                      </p>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}

            </Swiper>
          </div>
        </div>
      </div >
    </>
  );
}

export default Home;
