import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Services() {
  const path = import.meta.env.VITE_APP_IMG_URL;
  const [servicesList, setServicesList] = useState([
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

  // Function to sort services Z to A
  const sortZToA = () => {
    const sortedList = [...servicesList].sort((a, b) => b.name.localeCompare(a.name));
    setServicesList(sortedList);
  };


  // Function to sort services A to Z
  const sortAToZ = () => {
    const sortedList = [...servicesList].sort((a, b) => a.name.localeCompare(b.name));
    setServicesList(sortedList);
  };




  return (
    <>

      <div>
        <img src={path + 'banner-new1.jpg'} alt="" className='img-fluid' />
      </div>
      <div className="container margin-top3">
        <div className="row d-flex justify-content-between">
          <div className="col-md-6 col-8">
            <h2 className='homepage-section-heading'>Healthcare Services</h2>
            {/* <div className="home-page-semi-head">Private online consultations with verified doctors in all specialists</div> */}


          </div>


          <div className="col-md-3 col-4 text-end d-flex justify-content-end align-items-center">

            <div class="dropdown ">
              <a class=" btn-small dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                Short By
              </a>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><a className="dropdown-item" href="#" onClick={sortAToZ}>Sort by A to Z</a></li>
                <li><a className="dropdown-item" href="#" onClick={sortZToA}>Sort by Z to A</a></li>
              </ul>
            </div>

          </div>

        </div>


        <div className="row g-3 mt-1">
          {servicesList.map(service => (
            <div className="col-md-3 col-6" key={service.id}>
              <Link to={`/ServiceListing`} className="a-links">
                <div>
                  <img src={`${path}${service.img}`} alt={service.name} className="img-fluid services-img" />
                </div>
                <p className="semi-head1 mb-0 ">{service.name}</p>
              </Link>
            </div>
          ))}

        </div >


      </div>
    </>
  );
}

export default Services;
