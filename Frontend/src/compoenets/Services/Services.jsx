import React from 'react'
import { useParams } from 'react-router-dom'

function Services() {

  const {id} = useParams();

  const Services = [
    {
        id: 1,
        name: "Skin Care Centres",
        img: 'Skincare-Centres1.jpg'
    },
    {
        id: 2,
        name: "Test Tube Baby Centres",
        img: 'Test-Tube-Baby-Centres1.jpg'
    },
    {
        id: 3,
        name: "Kidney Care Centres",
        img: 'Kidney-care-Centres.png'
    },
    {
        id: 4,
        name: "Cancer Care Centres",
        img: 'Cancer-Centres.jpg'
    },
    {
        id: 5,
        name: "Plastic Surgery",
        img: 'specialities/Plastic-Surgery.jpg'
    },
    {
        id: 6,
        name: "Pulmonology",
        img: 'specialities/Pulmonology.jpg'
    }

]

  return (
    <div>
      {
        Services.map(e=>(
          <div className="">{id} - {e.name}</div>
        ))
      }
      
    </div>
  )
}

export default Services
