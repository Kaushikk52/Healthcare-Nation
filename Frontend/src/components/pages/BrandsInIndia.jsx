import React from 'react'
import { Link } from 'react-router-dom';

import popularBrands from '../../data/brands'

const BrandsInIndia = () => {

    const path = import.meta.env.VITE_APP_IMG_URL;

    return (
        <>
            <div className="!max-w-4xl lg:!max-w-5xl xl:!max-w-6xl !mx-auto !px-4 lg:!px-10 xl:!px-10">

                <div className=''>
                    <div className='flex justify-center items-start !mb-6'>
                    <h2 className="text-gray-700 px-1 homepage-section-heading">
                    Hospitals/Services by Healthcare Brands in India
                        </h2>
                    </div>

                    <div className='!grid !grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-6 xl:!grid-cols-6 !gap-x-4 !gap-y-5 md:!gap-y-6 !mt-4 sm:!mt-6 !mb-10'>
                        {popularBrands.map((brand, index) =>
                            <div
                                key={index}
                                className='!cursor-pointer !mx-auto flex items-center justify-center '
                            >
                                <Link>
                                    <div
                                        className="flex items-center justify-center overflow-hidden !text-center bg-white !border-2 !border-black !rounded-full !h-32 !w-32 min-[425px]:!h-36 min-[425px]:!w-36 sm:!h-36 sm:!w-36 md:!h-40 md:!w-40 lg:!h-32 lg:!w-32 xl:!h-40 xl:!w-40">
                                        <img
                                            src={path + brand.image}
                                            alt="brand image"
                                            className={` ${brand.objectProperty} overflow-visible ${brand.height} ${brand.width}`} />
                                    </div>

                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BrandsInIndia