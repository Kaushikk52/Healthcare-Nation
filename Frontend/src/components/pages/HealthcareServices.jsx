import React from 'react'
import healthcareServices from "@/data/healthcareServices.js";
import { Link } from "react-router-dom";

const HealthcareServices = () => {
    const path = import.meta.env.VITE_APP_IMG_URL;

    return (
        <div className="!max-w-7xl mx-auto !mt-10 !mb-16">

            {/* HEALTHCARE SERVICES HEADING AND EXPLORE MORE BUTTON  */}
            <div className="flex justify-center items-start lg:items-center !space-x-2 !mb-10">
                <h3 className="!text-lg min-[425px]:!text-2xl lg:!text-xl xl:!text-xl !font-semibold !text-gray-700 !px-1">
                  
                    Healthcare Services
                </h3>
                {/* <Link
                    to={"/"}
                    style={{
                        textDecoration: "none",
                    }}
                    className="!py-1.5 !px-2 min-[425px]:!px-4 !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
                >
                    Explore More
                </Link> */}
            </div>

            <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 xl:!grid-cols-4 !gap-x-3.5 !gap-y-3 !mt-4">
                {healthcareServices.map((service, index) => (
                    <div key={index} className="group">
                        <Link to={`${service.path}`}
                            style={{ textDecoration: "none" }}
                            className="!cursor-pointer"
                        >
                            <img
                                src={path + service.image}
                                alt={service.title}
                                className="!rounded-lg !h-48 min-[375px]:!h-52 min-[425px]:!h-64 sm:!h-52 md:!h-60 lg:!h-36 xl:!h-52 !w-full !aspect-[3/2] !object-fit"
                            />
                            <p className="!text-sm min-[425px]:!text-lg sm:!text-base md:!text-lg lg:!text-sm xl:!text-lg !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                                {service.title}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default HealthcareServices