import React, { useState, useEffect } from 'react'
import toast from "react-hot-toast";

// Icons 
import { IoIosStar } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdOutlineDirections } from "react-icons/md";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { BsBookmarkCheck } from "react-icons/bs";


// Tippy React
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

// Main Images 
import Main_Hospital_Image from '/Images/hospital-details/main-images/main-hospital-image.png'
import Patint_Room from '/Images/hospital-details/main-images/patient-room.jpg'
import Hallway from '/Images/hospital-details/main-images/hallway.jpg'

// Rounded Images
import First_Logo from '/Images/hospital-details/rounded-images/first-logo.jpg'
import Second_Logo from '/Images/hospital-details/rounded-images/second-logo.jpg'
import Third_Logo from '/Images/hospital-details/rounded-images/third-logo.jpg'

// Dynamic Content Components imports
import Description from '../../Description'
import Photos from '../../Photos'
import Videos from '../../Videos'
import Reviews from '../../Reviews'

const HospitalDetailsPage = () => {


    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 425);

    const [activeTabButton, setActiveTabButton] = useState('description')

    const handleCopyUrl = () => {
        navigator.clipboard
          .writeText(window.location.href)
          .then(() => {
            toast.success(`URL copied to clipboard!`, {
              position: "bottom-right",
              duration: 3000,
            })
          })
          .catch(() => {
            toast.error(`Failed to copy URL`, {
              position: "bottom-right",
              duration: 3000,
            })
          })
      }


    useEffect(() => {
        const handleResize = () => setIsWideScreen(window.innerWidth >= 425);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const buttons = [
        { title: 'Add Review', icon: <MdEdit className='!text-yellow-400 !h-5 !w-5' />, Color: '!border-yellow-400 !text-yellow-500' },
        { title: 'Direction', icon: <MdOutlineDirections className='!text-pink-400 !h-5 !w-5' />, },
        { title: 'Save', icon: <BsBookmarkCheck className='!text-pink-400 !h-5 !w-5' />, Bold: '' },
        { title: 'Share', icon: <FaRegShareFromSquare className='!text-pink-400 !h-5 !w-5' />, onCick: handleCopyUrl },
    ]

    const roundedImages = [
        { image: First_Logo, alt: 'first logo', },
        { image: Second_Logo, alt: 'second logo', },
        { image: Third_Logo, alt: 'third logo', },

    ]

    const tabButtons = [
        { id: 'description', component: <Description />, title: 'Description', marginX: '!mr-2', paddingX: '!pr-1 min-[425px]:!pr-2' },
        { id: 'photos', component: <Photos />, title: 'Photos', marginX: '!mx-2', paddingX: '!px-1 min-[425px]:!px-2' },
        { id: 'videos', component: <Videos />, title: 'Videos', marginX: '!mx-2', paddingX: '!px-1 min-[425px]:!px-2' },
        { id: 'reviews', component: <Reviews />, title: 'Reviews', marginX: '!mx-2', paddingX: '!px-1 min-[425px]:!px-2' },
    ]

    return (
        <div className='lg:max-w-5xl xl:max-w-6xl !mx-auto !px-4'>

            <div className='!grid !grid-cols-12 !gap-2 sm:!gap-4 lg:!gap-3 !py-4 '>
                <div className='!col-span-12 lg:!col-span-8'>
                    <img src={Main_Hospital_Image} alt='main hospital' className='!h-[240px] min-[425px]:!h-[280px] sm:!h-[380px] lg:!h-[412px] !w-full !rounded-sm !object-cover' />
                </div>
                <div className='!grid !grid-cols-2 lg:!grid-cols-1 !gap-2 sm:!gap-3 md:!gap-4 lg:!gap-3 !col-span-12 lg:!col-span-4'>
                    <div>
                        <img
                            src={Patint_Room}
                            alt='Patient Room'
                            className='lg:!h-[200px] !w-full !object-cover !object-center !rounded-sm' />
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${Hallway})`,
                        }}
                        className="!relative lg:!h-[200px]  !w-full !bg-cover !bg-center !rounded-sm"
                    >
                        <div className="!absolute !inset-0 !bg-[rgba(0,0,0,0.5)] !flex !justify-center !items-center">
                            <div className="!flex !flex-col !justify-center !items-center !text-white !text-2xl">
                                <span>+</span>
                                <span>15 more</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Main Image Contents */}
            <div className='!flex !flex-col !items-start sm:!flex-row sm:!justify-between sm:!items-start !py-2 sm:!py-0'>
                {/* Left Side */}
                <div className='!flex !flex-col !justify-center !space-y-1.5'>
                    <span className='!text-2xl lg:!text-4xl !font-medium !text-wrap'>Kokilaben Dhirubhai Ambani Hospital</span>
                    {/* <span className='!text-md lg:!text-xl !font-medium text-gray-600'>Andheri, Mumbai</span> */}
                    <span className='!text-md lg:!text-xl !font-medium text-gray-600'>MultiSpeciality hospital</span>
                    <span className='!text-md lg:!text-xl !font-medium text-gray-600'>700 Beds</span>
                </div>

                {/* Right Side  */}
                <div className='!flex !flex-col !justify-center !text-white !my-2 sm:!my-0 !space-y-0.5 sm:!space-y-1.5 !text-left sm:!text-right'>
                    <div className='!flex !justify-center !items-center !bg-[#267e3e] !rounded !py-0.5 !px-0'>
                        <span className='!text-xl !font-semibold !mr-1 !px-0'>4.8</span>
                        <IoIosStar className='!h-5 !w-5 !mb-0.5 !px-0 !mx-0' />
                    </div>
                    <div className='!text-gray-600'>
                        <span>59 Reviews</span>
                    </div>
                </div>

            </div>



            {/* Buttons & Rounded Images*/}
            <div className='!flex !flex-col sm:!flex-row !items-start sm:!items-center sm:!space-y-0 !space-y-5 !justify-between !pb-4 sm:!py-4'>

                {/* Left Side for Buttons */}
                <div className='!flex !items-center !space-x-2 min-[425px]:!space-x-1 md:!space-x-2'>
                    {buttons.map((btn, index) => (
                        <Tippy key={index} content={btn.title}>
                            <button
                                onClick={btn.onClick}
                                key={index}
                                className={`!flex !justify-center !items-center !gap-x-[5px] !text-xs sm:!text-sm md:!text-base !border-2 !border-gray-300 !py-2 !px-5 min-[425px]:!px-2 md:!px-4 !rounded ${btn.Color} ${btn.Bold} `}
                            >
                                {btn.icon} {isWideScreen && btn.title}
                            </button>
                        </Tippy>
                    ))}
                </div>

                {/* Right Side for Rounded Images */}
                <div className='!flex !space-x-1.5 md:!space-x-2'>
                    {roundedImages.map((item, index) => (
                        <img
                            key={index}
                            src={item.image}
                            alt={item.alt}
                            className='!h-14 !w-14 md:!h-14 md:!w-14 !object-cover !object-center !rounded-full'
                        />
                    ))}
                </div>

            </div>


            {/* Dynamic Section */}

            <div className='!flex !flex-col !py-2 md:!py-0.5'>
                {/* For Tab Buttons */}
                <div className='!flex !items-center !justify-start !border-b-2'>
                    {tabButtons.map((btn) => (
                        <button
                            key={btn.id}
                            onClick={() => setActiveTabButton(btn.id)}
                            className={` ${btn.marginX} ${btn.paddingX} !pt-1 !pb-3 !text-xs sm:!text-base md:!text-lg !font-semibold !transition-all !duration-150 !ease-in-out ${activeTabButton === btn.id ? '!text-gray-900 !border-b-[6px] !border-gray-700 !rounded-sm' : '!border-b-[6px] !border-transparent !text-gray-500'} `}
                        >
                            {btn.title}
                        </button>
                    ))}
                </div>

                {/* For Contents */}
                <div className=''>

                    {tabButtons.map((btn) =>
                        activeTabButton === btn.id ? btn.component : null
                    )}


                </div>
            </div>
        </div>





    )
}

export default HospitalDetailsPage