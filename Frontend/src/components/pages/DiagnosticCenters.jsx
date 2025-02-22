import React from 'react'
import diagnosticCentres from '@/data/diagnostic.js'
import { Link } from 'react-router-dom'

const DiagnosticCenters = () => {
  const path = import.meta.env.VITE_APP_IMG_URL;

  return (
    <div className="!max-w-7xl mx-auto !mt-10 !mb-16">
      {/* DIAGNOSTIC CENTRES NEAR YOU HEADING AND EXPLORE MORE BUTTON  */}
      <div className="flex justify-center items-start lg:items-center !mb-10">
        <h3 className="!text-lg  min-[425px]:!text-2xl lg:!text-xl xl:!text-2xl !font-semibold !text-gray-700 !px-1">
          Diagnostic Centres Near You
        </h3>
        {/* <Link
          to={"/diagnostic-centers"}
          style={{
            textDecoration: "none",
          }}
          className="!py-1.5 !px-2 min-[425px]:!px-4 !text-center !text-[11px] min-[425px]:!text-sm !rounded-[5px] !border !text-[#2277b2] cursor-pointer hover:!bg-[#2277b2] hover:!text-[#fff]"
        >
          Explore More
        </Link> */}
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
              <p className="!text-base  min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-lg !text-center sm:!text-center !font-semibold !mt-2 !px-0 !text-gray-700 group-hover:!text-[#9b2482]">
                {center.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DiagnosticCenters