import React from 'react'
import ExImage from '/Images/hospital-details/main-images/main-hospital-image.png'

const Photos = (props) => {
  const hospitalImgs = import.meta.env.VITE_APP_CLOUDINARY_HOSPITALS;
  const photos = Array(16).fill(null)

  return (
    <div>
      <div className='!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-4 !gap-4 !py-8'>
        {props.images.map((photo) => (
          <img
          src={hospitalImgs+photo}
          alt='ex image'
          className='!rounded-sm !object-cover !object-top !shadow-lg hover:!opacity-75  aspect-[4.3/3] !transition-all !duration-75 !ease-in-out'
          />
        ))}
      </div>
    </div>
  )
}

export default Photos