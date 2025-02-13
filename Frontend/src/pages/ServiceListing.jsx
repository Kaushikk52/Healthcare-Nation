import React from 'react'

// icons from react-icons library
import { FaStar, FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const filters = [
    {
        title: 'No of beds',
        options: [
            { id: 'Less then 50 Beds', text: 'Less then 50 Beds' },
            { id: '100 to 300', text: '100 to 300' },
            { id: 'More than 300', text: 'More than 300' },
        ],
    },
    {
        title: 'Accreditation',
        options: [
            { id: 'NABH', text: 'NABH', },
            { id: 'JCI', text: 'JCI', },
        ],
    },
    {
        title: 'Ownership',
        options: [
            { id: 'Private', text: 'Private', },
            { id: 'Government', text: 'Government', },
        ],
    },
    {
        title: 'Specialities',
        options: [
            { id: 'Eye-care', text: 'Eye-care', },
            { id: 'Maternity', text: 'Maternity', },
        ],
    },
    {
        title: 'Corporates',
        options: [
            { id: 'MPT Hospitals', text: 'MPT Hospitals', },
            { id: 'CGHS Hospitals', text: 'CGHS Hospitals', },
            { id: 'MJPJAY Hospitals', text: 'MJPJAY Hospitals', },
            { id: 'PMJAY Hospitals', text: 'PMJAY Hospitals', },
            { id: 'Railway Hospitals', text: 'Railway Hospitals', },
        ],
    },
]

const hospitalDetails = [
    {
        id: 1,
        hName: 'Kokilaben Hospital',
        image: 'demo/Kokliaben-hospital.jpeg',
        location: 'Andheri',
        city: 'Mumbai',
        beds: '323',
        type: 'Multispeciality Hospital',
        accreditations: [
            'national-accreditations.png',
            'joint-commision.png',
        ],
        rating: '4.8',
        reviews: '59',
        contactNo: '+91 1234567890',


    },
    {
        id: 2,
        hName: 'Hiranandani Hospital',
        image: 'demo/hiranandani-hospital.jpeg',
        location: 'Powai',
        city: 'Mumbai',
        beds: '323',
        type: 'Multispeciality Hospital',
        accreditations: [
            'national-accreditations.png',
            'joint-commision.png',
        ],
        rating: '4.8',
        reviews: '59',
        contactNo: '+91 1234567890',

    },
]

const ServiceListing = () => {
    const path = import.meta.env.VITE_APP_IMG_URL;
    return (
        <>
            {/* BREADCRUMB & HERO IMAGE SECTION */}
            {/* <div className='!w-full !bg-white'>
                <div className='!max-w-7xl !mx-auto !px-4'>
                    Home / Mumbai / Pediatric Hospital
                </div>
                <div
                    style={{
                        backgroundImage: `url(${path + 'demo/pediatric-banner2.jpg'})`,
                    }}
                    className="!h-[300px] !w-full !bg-cover !bg-bottom"
                />
            </div> */}

            {/* SERVICE LISTING SECTON */}
            <div className='!max-w-7xl !mx-auto !px-4'>

                {/* HEADING OF SERVICE */}
                <div className='!mt-3'>
                    <span className='!text-2xl !font-semibold'>Pediatric Hospitals in Mumbai</span>
                </div>

                {/* GRID CREATED FOR SERVICE LISTING */}
                <div className='md:!grid md:!grid-cols-12 !gap-2 !my-4'>

                    {/* COLS FOR FILTERS */}
                    <div className='md:!col-span-3 !hidden md:!block'>
                        <div className='!flex !flex-col !px-1'>

                            {/* FILTER TEXT HEADING AND CLEAR ALL BUTTON */}
                            <div className='!flex !justify-between !items-center !border-b !border-gray-500 !pb-3.5'>
                                <span>Filters</span>
                                <button className='!text-[#9B2482]'>Clear All</button>
                            </div>

                            {/* FILTER CATEGORY TEXT AND OPTIONS */}
                            <div className='!flex !flex-col !items-start !justify-center'>
                                {filters.map((filter, index) =>
                                    <div key={index} className='!mt-6'>
                                        <span className='md:!text-base lg:!text-lg !font-semibold'>{filter.title}</span>
                                        <div className='!mt-0.5'>
                                            {filter.options.map((option) =>
                                                <div key={option.id} className='!flex !items-center !space-x-2 !mt-0.5'>
                                                    <input type="checkbox" className='!cursor-pointer' />
                                                    <span className='!text-sm !tracking-wide lg:!text-base'>{option.text}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>


                    {/* COLS GRID FOR HOSPITAL DETAILS || CONTENTS */}
                    <div className='md:!col-span-9 md:!border-l !border-gray-500 md:!pl-2'>

                        {/* SORTING AND BUTTONS */}
                        <div className='!flex !flex-col sm:!px-2'>
                            <div className='!flex !justify-between !items-center !border-b !border-gray-500 !pb-2'>
                                <div className='!flex !justify-center !items-center !space-x-2'>
                                    <button className='!border !border-gray-500 !text-xs min-[425px]:!text-sm !font-semibold !rounded !py-1 !px-2 min-[425px]:!px-4'>NABH</button>
                                    <button className='!border !border-gray-500 !text-xs min-[425px]:!text-sm !font-semibold !rounded !py-1 !px-2 min-[425px]:!px-4'>Private</button>
                                </div>
                                <div className='!border !border-gray-500 !rounded !px-2 !py-0.5 !text-sm min-[425px]:!text-base sm:!text-base flex items-center'>
                                    <span className='!text-gray-600'>sort by : </span>
                                    <select name='sort by' className='!outline-none !ml-1'>
                                        <option value="">default</option>
                                        <option value="">ABC</option>
                                        <option value="">DEF</option>
                                        <option value="">XYZ</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* LIST OF HOSPITALS WITH DETAILS */}
                        <div>
                            {hospitalDetails.map((detail) =>
                                <>
                                    <div key={detail.id} className='!grid !grid-cols-1 lg:!grid-cols-10 !gap-x-4 !gap-y-2 !mt-6 !mb-6 sm:!px-2'>

                                        {/* HOSPITAL IMAGE */}
                                        <div className='lg:!col-span-4'>
                                            <img src={path + detail.image} alt={detail.hName} className='!rounded !aspect-[12/7] !object-fill' />
                                        </div>

                                        {/* HOSPITAL DETAILS  */}
                                        <div className='lg:!col-span-6 !flex !flex-col !justify-between'>

                                            {/* HOSPITAL NAME, LOCATION, RATING & REVIEWS COUNT*/}
                                            {/* FIRST ELEMENT FOR FLEX-COL JUSTIFY-BETWEEN */}
                                            <div className='!flex !justify-between !items-start !space-x-2'>

                                                {/* NAME AND LOCATION */}
                                                <div className='!flex !flex-col'>
                                                    <span className='!line-clamp-1 !text-lg min-[425px]:!text-2xl sm:!text-3xl lg:!text-2xl xl:!text-3xl !font-bold !text-gray-700'>{detail.hName}</span>
                                                    <span className='!text-sm min-[425px]:!text-base sm:!text-lg lg:!text-base xl:!text-lg !font-semibold !text-gray-700'>{detail.location}, {detail.city}</span>
                                                </div>

                                                {/* RATING AND REVIEW COUNT */}
                                                <div className='!flex !flex-col !items-end'>
                                                    <div className="!flex !items-center">
                                                        <span className='!text-base min-[425px]:!text-lg !mt-1 sm:!text-lg !mr-1 !text-[#28A745]'>{detail.rating}</span>
                                                        {Array(5).fill().map((_, index) => (
                                                            <FaStar key={index} className="!text-[#28A745] min-[425px]:!h-4 min-[425px]:!w-4 sm:!w-5 sm:!h-5 lg:!h-4 lg:!w-4 xl:!h-5 xl:!w-5  !flex-shrink-0" />
                                                        ))}
                                                    </div>
                                                    <span className='!text-sm min-[425px]:!text-base sm:!text-base lg:!text-sm xl:!text-base !text-gray-500'>{detail.reviews} Reviews</span>
                                                </div>

                                            </div>

                                            {/* SECOND ELEMENT FOR FLEX-COL JUSTIFY-BETWEEN */}
                                            <div className='!flex !flex-col !space-y-2.5'>

                                                {/* HOSPITAL BEDS COUNT, TYPE & CONTACT NO */}
                                                <div className='!flex !justify-between !items-end'>

                                                    {/* BEDS COUNT AND TYPE */}
                                                    <div className='!flex !flex-col'>
                                                        <span className='!text-sm min-[425px]:!text-base sm:!text-lg lg:!text-base xl:!text-lg !font-semibold !text-gray-700'>{detail.beds} Beds</span>
                                                        <span className='!text-sm min-[425px]:!text-base sm:!text-lg lg:!text-base xl:!text-lg !font-semibold !text-gray-700'>{detail.type}</span>
                                                    </div>

                                                    {/* CONTACT NO */}
                                                    <div className='!flex !items-center'>
                                                        <FaPhoneAlt className='min-[425px]:!h-4 min-[425px]:!w-4 !mr-1 min-[425px]:!mr-2 !flex-shrink-0' />
                                                        <span className='!text-sm min-[425px]:!text-base sm:!text-lg lg:!text-base xl:!text-lg !font-semibold !text-gray-700'>{detail.contactNo}</span>
                                                    </div>

                                                </div>

                                                {/* HOSPITAL ACCREDITATIONS IMAGES & VIEW DETAILS BUTTON */}
                                                <div className='!flex !justify-between !items-center'>

                                                    {/* ACCREDITATIONS IMAGES*/}
                                                    <div className='!flex !items-center !space-x-2'>
                                                        {detail.accreditations.map((acc, index) =>
                                                            <img
                                                                key={index}
                                                                src={path + acc}
                                                                alt='accreditation image'
                                                                className='!h-12 !w-12 !rounded-full'
                                                            />
                                                        )}
                                                    </div>

                                                    {/* VIEW DETAILS BUTTON */}
                                                    <div>
                                                        <Link
                                                         to={'/hospital-details-page'} 
                                                         style={{textDecoration: 'none'}}
                                                        className='!py-2 !px-4 sm:!py-2 sm:!px-8 lg:!py-2 lg:!px-4 xl:!py-2 xl:!px-8 !border !text-gray-700  !border-black !font-semibold !rounded !transition-all !duration-150 hover:!bg-gray-800 hover:!text-white'>
                                                        View Details
                                                        </Link>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                    <hr />
                                </>
                            )}
                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default ServiceListing