import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { FaPhone, FaLocationDot, FaClock } from "react-icons/fa6";
import { FaGlobeAmericas, FaCheck } from "react-icons/fa";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import servicesBySpecialities from "@/data/servicesBySpecialities";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";

import PMJAY_Logo from "/Images/hospital-details/dynamic-content-images/description-images/pmjay-logo.png";
import Ex_Logo from "/Images/hospital-details/dynamic-content-images/description-images/ex-logo.jpg";

// Achievement Images
import Throphy from "/Images/hospital-details/dynamic-content-images/description-images/throphy.jpg";
import { CircleCheck, CircleCheckBig } from "lucide-react";

const Description = () => {
  const [showAll, setShowAll] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const departments = [...servicesBySpecialities];

  const visibleDepartments = showAll ? departments : departments.slice(0, 8);

  const corporates = [
    { image: Ex_Logo, title: "Railways" },
    { image: PMJAY_Logo, title: "PMJAY" },
    { image: Ex_Logo, title: "Railways" },
    { image: PMJAY_Logo, title: "PMJAY" },
    { image: Ex_Logo, title: "Railways" },
    { image: PMJAY_Logo, title: "PMJAY" },
    { image: Ex_Logo, title: "Railways" },
    { image: PMJAY_Logo, title: "PMJAY" },
    { image: Ex_Logo, title: "Railways" },
    { image: PMJAY_Logo, title: "PMJAY" },
    { image: Ex_Logo, title: "Railways" },
    { image: PMJAY_Logo, title: "PMJAY" },
  ];

  const achievements = [
    {
      image: Throphy,
      heading: `Western India's first bilateral hand transplant`,
    },
    {
      image: Throphy,
      heading: `Western India's first dual lobe liver transplant`,
    },
  ];

  return (
    <>
      <div className="!grid !grid-cols-1 lg:!grid-cols-12 !gap-6">
        {/* Left Side */}
        <div className="lg:!col-span-8  xl:!col-span-8 ">
          {/* About Us Section */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col justify-center space-y-5 py-5 my-5 border border-gray-200 p-4 rounded-md bg-slate-50">
              <h1 className="text-2xl font-semibold">About Us</h1>
                <div className="relative">
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? "" : `line-clamp-6`
                    }`}
                  >
                    <p className="text-base text-gray-700">
                      {" "}
                      The 750 bed multi-speciality hospital became operational
                      in the first week of 2009. The project was initiated in
                      1999 by Nitu Mandke as a large-scale heart hospital, but
                      ran into troubles after his death in 2003. Subsequently,
                      it was completed by the Anil Ambani-led Reliance ADA
                      group,!" The hospital has boasted of many firsts not only
                      in India but also in Asia. Kokilaben Dhirubhai Ambani
                      Hospital has the first 3-room intra-operative MRI suite
                      (IMRIS) in Asia, Asia's first EDGE Radiosurgery system
                      from Varian Medical Systems, India's 1st Spine Surgery
                      Suite featuring the O-arm and many more. The hospital
                      courted controversy in 2014 when it offered incentives to
                      doctors for referring patients. It later apologised to the
                      Maharashtra Medical Council, In 2016, the hospital
                      announced that it would be setting up 18 cancer-care
                      centres in rural Maharashtra, under the name Reliance
                      Cancer Centre's that will be operated and managed by
                      Kokilaben Dhirubhai Ambani Hospital,14
                    </p>
                  </div>

                  <AnimatePresence>
                    {!isExpanded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent"
                      />
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-2 flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleExpand}
                    className="flex items-center gap-1 text-sm font-medium text-primary"
                  >
                    {isExpanded ? "Read less" : "Read more"}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </div>
            </div>
          </div>

          {/* <div className="!flex !flex-col !justify-center !space-y-5 !py-5 my-5 border border-gray-200 !p-4 rounded-md bg-slate-50 ">
            <h1 className="!text-2xl !font-semibold">About Us</h1>
            <span className="!text-gray-600 text-pretty text-justify">
              The 750 bed multi-speciality hospital became operational in the
              first week of 2009. The project was initiated in 1999 by Nitu
              Mandke as a large-scale heart hospital, but ran into troubles
              after his death in 2003. Subsequently, it was completed by the
              Anil Ambani-led Reliance ADA group,!" The hospital has boasted of
              many firsts not only in India but also in Asia. Kokilaben
              Dhirubhai Ambani Hospital has the first 3-room intra-operative MRI
              suite (IMRIS) in Asia, Asia's first EDGE Radiosurgery system from
              Varian Medical Systems, India's 1st Spine Surgery Suite featuring
              the O-arm and many more.
              The hospital courted controversy in 2014 when it offered
              incentives to doctors for referring patients. It later apologised
              to the Maharashtra Medical Council, In 2016, the hospital
              announced that it would be setting up 18 cancer-care centres in
              rural Maharashtra, under the name Reliance Cancer Centre's that
              will be operated and managed by Kokilaben Dhirubhai Ambani
              Hospital,14
            </span>
          </div> */}

          {/* Achievements */}
          <div className="mb-5 border border-gray-200 !p-4 rounded-md bg-slate-50">
            <h1 className="!text-2xl !font-semibold">Achievements</h1>
            <div className="!py-4 sm:!py-2 ">
              {achievements.map((item, index) => (
                <div
                  key={index}
                  className="!flex !flex-col !justify-center !items-center !text-center !mb-6 !space-y-0 sm:!text-left sm:!space-y-0 sm:!flex-row sm:!justify-start sm:!items-center sm:!space-x-5 sm:!mb-4"
                >
                  <img
                    src={item.image}
                    alt={item.heading}
                    className="!rounded-full !h-15 !w-15 sm:!h-10 sm:!w-10"
                  />
                  <h1 className="!text-sm !font-medium uppercase">
                    {item.heading}
                  </h1>
                </div>
              ))}
            </div>
          </div>

          {/* Facts */}
          <div className="border border-gray-200 !p-4 rounded-md bg-slate-50">
            <h1 className="!text-2xl !font-semibold">Facts</h1>
            <div className="!grid !grid-cols-1 sm:!grid-cols-2 !gap-y-8 !py-4 sm:!py-2">
              <div className="!flex !flex-col !justify-center !items-start !space-y-2 sm:!space-y-3">
                <span className="!flex !items-center !text-sm !font-medium uppercase">
                  <CircleCheckBig className="!h-8 !w-8 !mr-3 sm:!mr-5 !flex-shrink-0" />
                  3 Tesla MRI Machine
                </span>
                <span className="!flex !items-center !text-sm !font-medium uppercase">
                  <CircleCheckBig className="!h-8 !w-8 !mr-3 sm:!mr-5 !flex-shrink-0" />
                  24/7 Pharmacy
                </span>
                <span className="!flex !items-center !text-sm !font-medium uppercase">
                  <CircleCheckBig className="!h-8 !w-8 !mr-3 sm:!mr-5 !flex-shrink-0" />
                  24/7 Casualty
                </span>
              </div>
              <div className="!flex !flex-col !justify-center !items-start !space-y-2 sm:!space-y-3">
                <span className="!flex !items-center !text-sm !font-medium uppercase">
                  <CircleCheckBig className="!h-8 !w-8 !mr-3 sm:!mr-5 !flex-shrink-0" />
                  CT Scan - 64 Slice
                </span>
                <span className="!flex !items-center !text-sm !font-medium uppercase">
                  <CircleCheckBig className="!h-8 !w-8  !mr-3 sm:!mr-5 !flex-shrink-0" />
                  8 Operation Theatres
                </span>
                <span className="!flex !items-center !text-sm !font-medium uppercase">
                  <CircleCheckBig className="!h-8 !w-8  !mr-3 sm:!mr-5 !flex-shrink-0" />
                  24/7 Cathlab
                </span>
              </div>
            </div>
          </div>

          {/* Departments Section */}
          <div className="!py-4 border border-gray-200 !p-4 rounded-md bg-slate-50 mt-5">
            <h1 className="!text-2xl !font-semibold">Specialities</h1>
            <div className="!flex !flex-wrap !gap-3 !py-5">
              {visibleDepartments.map((item, index) => (
                <button
                  key={index}
                  className="!bg-gray-100 !px-4 !py-2 !rounded-full !text-sm !text-gray-700 hover:!bg-gray-200 !transition"
                >
                  {item.title}
                </button>
              ))}
              {!showAll && (
                <button
                  className="!bg-cyan-600 !px-4 !py-2 !rounded-full !text-white !text-sm !font-medium hover:!bg-cyan-700 !transition"
                  onClick={() => setShowAll(true)}
                >
                  More
                </button>
              )}
              {showAll && (
                <button
                  className="!bg-cyan-600 !px-4 !py-2 !rounded-full !text-white !text-sm !font-medium hover:!bg-cyan-700 !transition"
                  onClick={() => setShowAll(false)}
                >
                  Show Less
                </button>
              )}
            </div>
          </div>

          {/* Corporates Section */}
          <div className="!py-4 border border-gray-200 !p-4 rounded-md bg-slate-50 my-5">
            <h1 className="!text-2xl !font-semibold">Corporates</h1>

            <Swiper
              modules={[Navigation, Pagination, Autoplay, A11y]}
              spaceBetween={8}
              slidesPerView={6}
              loop={true}
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
                  slidesPerView: 5,
                },
              }}
              className="!mt-0 "
            >
              {corporates.slice(0, 12).map((item, index) => (
                <SwiperSlide key={index} className="!mt-4">
                  <div key={index} className="group">
                    <div
                      key={index}
                      className="!flex !flex-col !justify-center !items-center !text-center"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="!rounded-full !h-24 !w-24 sm:!h-28 sm:!w-28 md:!h-32 md:!w-32 lg:!h-20 lg:!w-20 xl:!h-24 xl:!w-24 !object-cover"
                      />
                      <h1 className="!py-2 !text-gray-700 !font-medium !text-sm sm:!text-base">
                        {item.title}
                      </h1>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:!col-span-4  xl:!col-span-4 !py-5">
          <div className="!flex !flex-col !justify-center !space-y-10 !p-2">
            {/* Contact And Address Details  */}
            <div className="!flex !flex-col !space-y-6 !p-5 !bg-gray-50 !rounded-sm border">
              {/* Phone  */}
              <div className="!grid !grid-cols-12 !items-start">
                <FaPhone className="!col-span-2 sm:!col-span-1 lg:!col-span-2 !h-6 !w-6 !mt-1" />
                <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 !text-2xl lg:!text-xl">
                  (800) 570-3142
                </span>
              </div>

              {/* Location  */}
              <div className="!grid !grid-cols-12 !items-start">
                <FaLocationDot className="!col-span-2 sm:!col-span-1 lg:!col-span-2 !h-6 !w-6 !mt-0.5 !text-red-600" />
                <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 text-balance">
                  Rao Saheb, Achutrao Patwardhan Marg, Four Bungalows, Andheri
                  West, Mumbai, Maharashtra 400053
                </span>
              </div>

              {/* Website  */}
              <div className="!grid !grid-cols-12 !items-center">
                <FaGlobeAmericas className="!col-span-2 sm:!col-span-1 lg:!col-span-2 !h-6 !w-6 !mt-0.5 !text-blue-500" />
                <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 !text-md">
                  kokilabenhospital.com
                </span>
              </div>

              {/* Woring hours */}
              <div className="!grid !grid-cols-12 !items-center">
                <FaClock className="!col-span-2 sm:!col-span-1 lg:!col-span-2 !h-6 !w-6 !mt-0.5 !text-blue-500" />
                <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 !text-md !text-[#74c365]">
                  Open 24 hours
                </span>
              </div>
            </div>

            {/* Map Location  */}
            <div>
              <h1 className="!text-2xl !font-semibold">Map</h1>
              <iframe
                className="!my-3 !w-full !rounded-sm !h-[250px] sm:!h-[400px] md:!h-[500px] lg:!h-[300px] xl:!h-[280px]"
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d1169.3441339678525!2d72.82530259490001!3d19.13455891093334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x3be7b61f1a191fff%3A0xf3d2dd13d26ba8df!2sRao%20Saheb%20Achutrao%20Patwardhan%20Marg%2C%20Four%20Bungalows%2C%20Andheri%20West%2C%20Mumbai%2C%20Maharashtra%20400047!3m2!1d19.1343778!2d72.8256808!5e1!3m2!1sen!2sin!4v1737193864693!5m2!1sen!2sin"
                width=""
                height=""
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
