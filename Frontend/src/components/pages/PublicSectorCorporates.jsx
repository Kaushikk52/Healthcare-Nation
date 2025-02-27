import React from 'react'
import publicSectorCorporates from "@/data/publicSector.js";
import { Link } from "react-router-dom";

const PublicSectorCorporates = () => {
  const path = import.meta.env.VITE_APP_IMG_URL;

  return (
    <div className="!max-w-4xl lg:!max-w-5xl xl:!max-w-6xl !mx-auto !px-4 lg:!px-10 xl:!px-10 !mb-10">
      {/* PUBLIC SECTOR CORPORATES HEADING AND EXPLORE MORE BUTTON  */}
      <div className="flex justify-center items-start lg:items-center !mb-10">
        <h3 className="!text-lg  min-[425px]:!text-2xl lg:!text-xl xl:!text-2xl !font-semibold !text-gray-700 !px-1">
          Public Sector Corporates
        </h3>
        {/* <Link
          to={"/public-sector-corporates"}
          style={{
            textDecoration: "none",
          }}
          className="!py-1.5 !px-2 min-[425px]:!px-4 !text-center !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
        >
          Explore More
        </Link> */}
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
                  className="rounded-full aspect-square shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                  />
              </div>
              <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
              {corporate.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PublicSectorCorporates