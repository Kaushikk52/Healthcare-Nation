import React from 'react'

import popularBrands from '../data/brands'

const BrandsInIndia = () => {

    const path = import.meta.env.VITE_APP_IMG_URL;

    return (
        <>
            <div className='max-w-7xl mx-auto px-4'>
                <div className='!mt-0'>
                    {/* POPULAR HEALTHCARE BRANDS IN INDIA HEADING*/}
                    <div className='flex justify-between items-center !mt-10'>
                        <h3 className='!font-semibold !text-gray-700'>Popular Healthcare Brands In India</h3>
                    </div>

                    {/* POPULAR HEALTHCARE GRID BRAND IMAGES */}
                    <div className='grid grid-cols-6 gap-x-4 gap-y-8 mt-3'>
                        {popularBrands.map((brand, index) =>
                            <div
                                key={index}
                                className='cursor-pointer'
                            >
                                <a>
                                    <div className="text-center border-2 border-black rounded-full h-39 w-39">
                                        <img src={path + brand.image} alt="brand image" className='rounded-full h-full w-full object-contain' />
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