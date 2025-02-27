import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { orderBy } from "lodash";


import servicesBySpecialities from '../../../data/servicesBySpecialities'


export default function Services() {

  const path = import.meta.env.VITE_APP_IMG_URL;

  const [list, setList] = useState([...servicesBySpecialities]);

  // Handle sorting
  const handleSort = (order) => {

    let sortedList = [...list];

    if (order === "a-z") {
      sortedList = orderBy(sortedList, ['title'], ['asc']);

    } else if (order === "z-a") {
      sortedList = orderBy(sortedList, ['title'], ['desc']);
    }
    setList(sortedList);
    // console.log("sorted list :" , sortedList)

  };


  return (
    <>

      <div className="!max-w-4xl lg:!max-w-5xl xl:!max-w-6xl !mx-auto !px-4 lg:!px-10 xl:!px-10">
        <div className='!mt-10 mb-16'>
          {/*HEADING AND SORT BUTTON  */}
          <div className='!flex !justify-between !items-center !mt-10'>
            <span className='text-xl min-[425px]:!text-2xl !font-semibold !text-gray-700 !px-1'>More Services</span>
            <div className=''>
              <Select onValueChange={handleSort}>
                <SelectTrigger className="min-w-[100px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a-z">Sort by A to Z</SelectItem>
                  <SelectItem value="z-a">Sort by Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* SERVICES GRID IMAGES AND TITLE */}
          <div className='!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 xl:!grid-cols-4 !gap-x-4 !gap-y-4 !mt-6'>
            {list.map((service, index) =>
              <div
                key={index}
                className='group'
              >
                <Link
                  to={'/services'}
                  style={{ textDecoration: 'none' }}
                  className='!cursor-pointer'
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
            )}
          </div>
        </div>
      </div>

    </>
  );
}


