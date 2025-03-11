import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { FaPhone, FaLocationDot, FaClock } from "react-icons/fa6";
import { FaGlobeAmericas, FaCheck } from "react-icons/fa";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import servicesBySpecialities from "@/data/servicesBySpecialities";
import publicSectorCorporates from "@/data/publicSector";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";

// Achievement Images
import Throphy from "/Images/hospital-details/dynamic-content-images/description-images/throphy.jpg";
import { CircleCheckBig } from "lucide-react";

const Description = (props) => {
  const [showAll, setShowAll] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    setPhones(props.phones);
    console.log(phones, props.phones);
  }, [props]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const corporates = [
    ...publicSectorCorporates.map((psu) => ({
      title: psu.title,
      image: "/Images/" + psu.image,
      borderColor: psu.borderColor,
    })),
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
                    {props.details.description}
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

          {/* Achievements */}
          <div className="mb-5 border border-gray-200 !p-4 rounded-md bg-slate-50">
            <h1 className="!text-2xl !font-semibold">Achievements</h1>
            <div className="!py-4 sm:!py-2 ">
              {props.details.achievements?.map((item, index) => (
                <div
                  key={index}
                  className="!flex !flex-col !justify-center !items-center !text-center !mb-6 !space-y-0 sm:!text-left sm:!space-y-0 sm:!flex-row sm:!justify-start sm:!items-center sm:!space-x-5 sm:!mb-4"
                >
                  <img
                    src={Throphy}
                    alt={item}
                    className="!rounded-full !h-15 !w-15 sm:!h-10 sm:!w-10"
                  />
                  <h1 className="!text-sm !font-medium uppercase">{item}</h1>
                </div>
              ))}
            </div>
          </div>

          {/* Facts */}
          <div className="border border-gray-200 !p-4 rounded-md bg-slate-50">
            <h1 className="!text-2xl !font-semibold">Facts</h1>
            <div className="!py-4 sm:!py-2">
              <div className="grid grid-cols-2 gap-y-4">
                {props.details.facts?.map((fact) => {
                  return (
                    <span className="!flex !items-center !text-sm !font-medium uppercase">
                    <CircleCheckBig className="!h-8 !w-8 !mr-3 sm:!mr-5 !flex-shrink-0" />
                    {fact}
                  </span>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Specialities Section */}
          <div className="!py-4 border border-gray-200 !p-4 rounded-md bg-slate-50 mt-5">
            <h1 className="!text-2xl !font-semibold">Specialities</h1>
            <div className="!flex !flex-wrap !gap-3 !py-5">
              {props.details.specialities?.map((speciality, index) => (
                <button
                  key={index}
                  className="!bg-gray-200 !px-4 !py-2 !rounded-full !text-sm !text-gray-700 hover:!bg-gray-200 !transition"
                >
                  {speciality}
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
              {props.details.psu?.map((item, index) => {
                const corp = corporates.find((corp) => corp.title === item); // Find instead of filter
                const corpImg = corp?.image; // Get the image

                return (
                  <SwiperSlide key={index} className="!mt-4">
                    <div className="group">
                      <div className="!flex !flex-col !justify-center !items-center !text-center h-full">
                        <img
                          src={corpImg}
                          alt={item}
                          className={`rounded-full h-full aspect-square w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-20 xl:max-w-20`}
                        />
                        <h1 className="!py-2 !text-gray-700 !font-medium !text-sm sm:!text-base">
                          {item}
                        </h1>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:!col-span-4  xl:!col-span-4 !py-5">
          <div className="!flex !flex-col !justify-center !space-y-10 !p-2">
            {/* Contact And Address Details  */}
            <div className="!flex !flex-col !space-y-6 !p-5 !bg-gray-50 !rounded-sm border">
              {/* Phone  */}
              {props.phones?.map((number) => (
                <div key={number} className="!grid !grid-cols-12 !items-start">
                  <FaPhone className="!col-span-2 sm:!col-span-1 lg:!col-span-2 !h-6 !w-6 !mt-1" />
                  <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 !text-2xl lg:!text-xl">
                    {number}
                  </span>
                </div>
              ))}

              {/* Location  */}
              <div className="!grid !grid-cols-12 !items-start">
                <FaLocationDot className="!col-span-2 sm:!col-span-1 lg:!col-span-2 !h-6 !w-6 !mt-0.5 !text-red-600" />
                <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 text-balance">
                  {props.details.address?.street} {props.details.address?.city}{" "}
                  - {props.details.address?.zipCode}
                  {/* 
                  Rao Saheb, Achutrao Patwardhan Marg, Four Bungalows, Andheri
                  West, Mumbai, Maharashtra 400053 */}
                </span>
              </div>

              {/* Website  */}
              <div className="!grid !grid-cols-12 !items-center">
                <FaGlobeAmericas className="!col-span-2 sm:!col-span-1 lg:!col-span-2 !h-6 !w-6 !mt-0.5 !text-blue-500" />
                <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 !text-md">
                  {props.details.website}
                </span>
              </div>

              {/* Woring hours */}
              <div className="!grid !grid-cols-12 !items-center">
                <FaClock className="!col-span-2 sm:!col-span-1 lg:!col-span-2 !h-6 !w-6 !mt-0.5 !text-blue-500" />
                <span className="!col-span-10 sm:!col-span-11 lg:!col-span-10 !text-md !text-[#74c365] capitalize">
                  {props.details.openDay} - {props.details.closeDay}{" "}
                  {props.details.hours} Hrs
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
