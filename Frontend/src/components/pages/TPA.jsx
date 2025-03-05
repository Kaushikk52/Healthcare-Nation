import React from 'react'
import chooseYourTPA from "@/data/tpa.js";
import { Link } from "react-router-dom";

const TPA = () => {

    const path = import.meta.env.VITE_APP_IMG_URL;
    return (
        <div className="!max-w-4xl lg:!max-w-5xl xl:!max-w-6xl !mx-auto !px-4 lg:!px-10 xl:!px-10 !mb-10">
            {/* CHOOSE YOUR TPA AND EXPLORE MORE BUTTON */}
            <div className="flex justify-center items-start !my-3">
            <h2 className="text-gray-700 px-1 homepage-section-heading uppercase">
            Hospitals/Services covered by TPA
                </h2>
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
                                className="rounded-[10px] aspect-[4.2/3] shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                                />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TPA