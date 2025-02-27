import React from 'react'
import diagnosticCentres from '@/data/diagnostic.js'
import { Link } from 'react-router-dom'

const DiagnosticCenters = () => {
  const path = import.meta.env.VITE_APP_IMG_URL;

  return (
    <div className="!max-w-4xl lg:!max-w-5xl xl:!max-w-6xl !mx-auto !px-4 lg:!px-10 xl:!px-10">
      {/* DIAGNOSTIC CENTRES NEAR YOU HEADING AND EXPLORE MORE BUTTON  */}
      <div className="flex justify-center items-start lg:items-center !mb-10">
        <h2 className="text-gray-700 px-1 homepage-section-heading">
          Diagnostic & Laboratory Services
        </h2>
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
      <div className="!grid !grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-6 xl:!grid-cols-6 !gap-x-3.5 !gap-y-3.5 md:!gap-y-6 !mt-4 sm:!mt-6 !mb-10">
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
                  className="rounded-full aspect-square object-cover shadow-md shadow-[rgba(45,45,51,0.08)] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                />
              </div>
              <p className="!text-base min-[425px]:!text-lg sm:!text-lg lg:!text-sm xl:!text-base !text-left sm:!text-left !font-semibold !mt-2 !px-1 !text-gray-700 group-hover:!text-[#9b2482]">
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