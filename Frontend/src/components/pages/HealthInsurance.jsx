import React from 'react'
import chooseYourHealthInsurance from "@/data/healthInsurance.js";
import { Link } from "react-router-dom";

const HealthInsurance = () => {

    const path = import.meta.env.VITE_APP_IMG_URL;

    return (
        <div className="!max-w-7xl mx-auto !mt-10 !mb-16">
            {/* CHOOSE YOUR HEALTH INSURANCE AND EXPLORE MORE BUTTON */}
            <div className="flex justify-center items-start !mb-10">
                <h3 className="text-lg min-[425px]:!text-2xl lg:!text-xl xl:!text-2xl !font-semibold !text-gray-700 !px-1">
                    Choose Your Health Insurance
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
    )
}

export default HealthInsurance