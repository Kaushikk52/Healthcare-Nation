import React from 'react'
import popularHospitals from "@/data/popularHospitals.js";
import { Link } from "react-router-dom";

const PopularHospitals = () => {

    const path = import.meta.env.VITE_APP_IMG_URL;

    return (
        <div className="!max-w-7xl mx-auto !mt-10 !mb-16">
            {/* POPULAR HOSPITALS IN INDIA AND EXPLORE MORE BUTTON */}
            <div className="flex justify-center items-start lg:items-center !mb-10">
                <h3 className="text-lg min-[425px]:!text-2xl lg:!text-xl xl:!text-2xl !font-semibold !text-gray-700 !px-1">
                    Popular Hospitals In India
                </h3>
                {/* <Link
                  to={"/"}
                  style={{
                    textDecoration: "none",
                  }}
                  className="!py-1.5 !px-2 min-[425px]:!px-4 !text-center !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
                >
                  Explore More
                </Link> */}
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
                            <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-lg !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
                                {hospital.title}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PopularHospitals