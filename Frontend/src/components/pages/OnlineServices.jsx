import React from 'react'
import onlineHealthcareServices from "@/data/onlineServices.js";
import { Link } from "react-router-dom";

const OnlineServices = () => {
  const path = import.meta.env.VITE_APP_IMG_URL;

  return (
    <div className="!max-w-4xl lg:!max-w-5xl xl:!max-w-6xl !mx-auto !px-4 lg:!px-10 xl:!px-10 !mb-10 h-screen">
      {/* ONLINE HEALTHCARE SERVICES HEADING AND EXPLORE MORE BUTTON  */}
      <div className="flex justify-center items-center lg:items-center !my-3">
      <h2 className="text-gray-700 px-1 homepage-section-heading uppercase">
        Online Consultation & Digital Health Services
        </h2>
        {/* <Link
          to={"/online-healthcare-services"}
          style={{
            textDecoration: "none",
          }}
          className="!py-1.5 !px-2 min-[425px]:!px-4 !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
        >
          Explore More
        </Link> */}
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
                className="rounded-[10px] aspect-[4.2/3] shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                />
                  <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                  {service.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OnlineServices