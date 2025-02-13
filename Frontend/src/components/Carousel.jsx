import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function Carousel() {
  // const path = "src/assets/Images/";
  const path = import.meta.env.VITE_APP_IMG_URL + "/Banner";
  return (
   



    <div className="container-fluid p-0 carousel slide carousel-fade" data-wow-delay="0.1s">
      <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          >
          
          </button>
          <button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          >
          
          </button>
          <button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          >
           
          </button>
          <button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to={3}
            aria-label="Slide 4"
          >
           
          </button>
          <button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to={4}
            aria-label="Slide 5"
          >
          
          </button>
          <button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to={5}
            aria-label="Slide 6"
          >
          </button>




          <button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to={6}
            aria-label="Slide 7"
          >
          </button><button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to={7}
            aria-label="Slide 8"
          >
          </button><button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to={8}
            aria-label="Slide 9"
          >
          </button><button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to={9}
            aria-label="Slide 10"
          >
          </button><button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to={10}
            aria-label="Slide 11"
          >
          </button><button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to={11}
            aria-label="Slide 12"
          >
          </button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active main-back-color1">
            <img
              className="w-100"
              src={path + '/HCN Banner 1.jpg'}
              alt="Image"
            />
           
          </div>
          {/* 2nd */}
          <div className="carousel-item main-back-color2">
            <img
              className="w-100"
              src={path + '/HCN Banner 2.jpg'}
              alt="Image"
            />
           
          </div>
          {/* 3rd */}
          <div className="carousel-item">
            <img
              className="w-100"
              src={path + '/HCN Banner 3.jpg'}
              alt="Image"
            />
           
          </div>
          {/* 4th */}
          <div className="carousel-item">
            <img
              className="w-100"
              src={path + '/HCN Banner 4.jpg'}
              alt="Image"
            />
            
          </div>

          <div className="carousel-item">
            <img
              className="w-100"
              src={path + '/HCN Banner 5.jpg'}
              alt="Image"
            />
            
          </div>

          
          <div className="carousel-item">
            <img
              className="w-100"
              src={path + '/HCN Banner 6.jpg'}
              alt="Image"
            />
            
          </div>

          <div className="carousel-item">
            <img
              className="w-100"
              src={path + '/HCN Banner 7.jpg'}
              alt="Image"
            />
            
          </div>
          <div className="carousel-item">
            <img
              className="w-100"
              src={path + '/HCN Banner 8.jpg'}
              alt="Image"
            />
            
          </div>
          <div className="carousel-item">
            <img
              className="w-100"
              src={path + '/HCN Banner 9.jpg'}
              alt="Image"
            />
            
          </div>
          <div className="carousel-item">
            <img
              className="w-100"
              src={path + '/HCN Banner 10.jpg'}
              alt="Image"
            />
            
          </div>
          <div className="carousel-item">
            <img
              className="w-100"
              src={path + '/HCN Banner 11.jpg'}
              alt="Image"
            />
            
          </div>
          <div className="carousel-item">
            <img
              className="w-100"
              src={path + '/HCN Banner 12.jpg'}
              alt="Image"
            />
            
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#header-carousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#header-carousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>





  )
}

export default Carousel
