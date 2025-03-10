import React from 'react'
import ExImage from '/Images/hospital-details/main-images/main-hospital-image.png'

import { GoDotFill } from "react-icons/go";

const Videos = (props) => {

  // const videos = [
  //   { image: ExImage, duration: '2:39', views: '93 views', relativeTime: '2 weeks ago', title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus officiis quaerat voluptatum enim', },
  //   { image: ExImage, duration: '3:40', views: '91 views', relativeTime: '3 weeks ago', title: 'Lorem ipsum dolor sit amet', },
  //   { image: ExImage, duration: '4:19', views: '92 views', relativeTime: '1 months ago', title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus officiis quaerat voluptatum enim', },
  //   { image: ExImage, duration: '0:55', views: '91 views', relativeTime: '2 months ago', title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus officiis quaerat voluptatum enim', },
  //   { image: ExImage, duration: '3:40', views: '92 views', relativeTime: '2 weeks ago', title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', },
  //   { image: ExImage, duration: '4:19', views: '91 views', relativeTime: '3 weeks ago', title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus officiis quaerat voluptatum enim', },
  //   { image: ExImage, duration: '2:39', views: '92 views', relativeTime: '1 months ago', title: 'Lorem ipsum dolor sit amet Accusamus officiis quaerat voluptatum enim', },
  //   { image: ExImage, duration: '0:55', views: '93 views', relativeTime: '2 months ago', title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', },

  // ]

  return (
    <>
      <div className='!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-4 !gap-x-36 !gap-y-6 !py-8'>
        {props.videos.map((video, index) => (
          <>
          {
            video !== "" && 
          <iframe width="300" height="200" src={`https://www.youtube.com/embed/${video}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          }
          </>
           
        
        ))}

      </div>
    </>
  )
}

export default Videos