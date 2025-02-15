import React from 'react'
import { Link } from 'react-router-dom';

import popularBrands from './BrandsInIndia'

const BrandsInIndia = () => {

    const path = import.meta.env.VITE_APP_IMG_URL;

    return (
        <>
            <div className='max-w-7xl mx-auto px-4'>
            
             <div className='!mt-10'>
                    <div className='flex justify-center items-start !mt-10'>
                        <h3 className='!text-2xl !text-center min-[425px]:!text-2xl sm:!text-3xl xl:!text-4xl !font-semibold !text-gray-700 !px-1'>Popular Healthcare Brands In India</h3>
                    </div>

                    <div className='!grid !grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-6 xl:!grid-cols-6 !gap-x-4 !gap-y-5 md:!gap-y-6 !mt-4 sm:!mt-6'>
                        {popularBrands.map((brand, index) =>
                            <div
                                key={index}
                                className='!cursor-pointer !mx-auto'
                            >
                                <a>
                                    <div className="!text-center !border-2 !border-black !rounded-full">
                                        <img src={path + brand.image} alt="brand image" className='rounded-full !h-32 !w-32 min-[425px]:!h-36 min-[425px]:!w-36 sm:!h-36 sm:!w-36 md:!h-40 md:!w-40 lg:!h-36 lg:!w-36 xl:!h-44 xl:!w-44 !object-contain' />
                                    </div>

                                </a>
                            </div>
                        )}
                    </div>
                </div>
                </div>
        </>
    )
}

export default BrandsInIndia