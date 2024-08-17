import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Services() {
  const path = import.meta.env.VITE_APP_IMG_URL;
  const [servicesList,setServicesList] = useState([
    { id: 1, name: "Skin Care Centres", img: 'Skincare-Centres1.jpg' },
    { id: 2, name: "Test Tube Baby Centres", img: 'Test-Tube-Baby-Centres1.jpg' },
    { id: 3, name: "Kidney Care Centres", img: 'Kidney-care-Centres.png' },
    { id: 4, name: "Cancer Care Centres", img: 'Cancer-Centres.jpg' },
    { id: 5, name: "Plastic Surgery", img: 'specialities/Plastic-Surgery.jpg' },
    { id: 6, name: "Pulmonology", img: 'specialities/Pulmonology.jpg' },
    { id: 7, name: "Occupational therapy", img: 'specialities/Physiotherapy-Occupational-therapy.png' },
    { id: 8, name: "Pediatric Surgery", img: 'specialities/Pediatric-Surgery.jpg' },
    { id: 9, name: "Oncology", img: 'specialities/Oncology.jpg' },
    { id: 10, name: "Obstetrics & Gynecology", img: 'specialities/Obstetrics-Gynecology.jpg' },
    { id: 11, name: "Neurosurgery", img: 'specialities/Neurosurgery.jpg' },
    { id: 12, name: "Neurology", img: 'specialities/Neurology.jpg' },
    { id: 13, name: "Laboratory Services", img: 'specialities/Laboratory-Services.jpg' },
    { id: 14, name: "Hematology", img: 'specialities/Hematology.jpg' },
    { id: 15, name: "General Medicine", img: 'specialities/General-Medicine.jpg' },
    { id: 16, name: "Endocrinology", img: 'specialities/Endocrinology.jpg' },
    { id: 17, name: "Emergency Care", img: 'specialities/Emergency-Care.jpg' },
    { id: 18, name: "Ear Nose Throat Surgeon", img: 'specialities/Ear-Nose-Throat-Surgeon.jpg' },
    { id: 19, name: "Dietetics", img: 'specialities/Dietetics.jpg' },
    { id: 20, name: "Dentistry", img: 'specialities/Dentistry.jpg' },
    { id: 21, name: "Critical Care", img: 'specialities/Critical-Care.jpg' }

  ]);

  return (
    <div className="row">
      {servicesList.map(service => (
        <div className="col-md-3 col-6" key={service.id}>
          <Link to={`/ServiceListing/service/${service.id}`} className="a-links">
            <div>
              <img src={`${path}${service.img}`} alt={service.name} className="img-fluid services-img" />
            </div>
            <p className="semi-head1 mb-0">{service.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Services;
