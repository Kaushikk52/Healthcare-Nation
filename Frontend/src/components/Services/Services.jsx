import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {orderBy} from "lodash";


import servicesBySpecialities from '../../data/servicesBySpecialities'


export default function Services() {

  const path = import.meta.env.VITE_APP_IMG_URL;

  const [list, setList] = useState([...servicesBySpecialities]);

  // Handle sorting
  const handleSort = (order) => {
   
    let sortedList = [...list];

    if (order === "a-z") {
      sortedList = orderBy(sortedList,['title'],['asc']);
   
    } else if (order === "z-a") {
      sortedList  = orderBy(sortedList,['title'],['desc']);
    }
    setList(sortedList);
    // console.log("sorted list :" , sortedList)
    
  };


  return (
    <>

      <div className='!max-w-7xl !container !mx-auto !px-4'>
        <div className='!mt-10'>
          {/*HEADING AND SORT BUTTON  */}
          <div className='!flex !justify-between !items-center'>
            <span className='!text-3xl !font-semibold !text-gray-700'>More Services</span>
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
          <div className='!grid !grid-cols-4 !gap-x-3 !gap-y-3 !mt-5'>
            {list.map((service, index) =>
              <div
                key={index}
                className='!group'
              >
                <Link
                  to={'/services'}
                  style={{ textDecoration: 'none' }}
                  className='!cursor-pointer'
                >
                  <img
                    src={path + service.image}
                    alt={service.title}
                    className='!rounded-xl !aspect-[3/2] !w-full'
                  />
                  <p className='!text-[17px] !font-semibold !mt-2 !text-gray-700 group-hover:!text-[#9b2482]'>{service.title}</p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  );
}


