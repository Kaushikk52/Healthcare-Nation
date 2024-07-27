import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function Carousel() {
  const path = "src/assets/Images/"
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={path + 'banner1.jpg'} className="d-block w-100" alt="..." />

          <div className="d-flex justify-content-center align-items-center new-demo">

            <div class="carousel-caption d-flex justify-content-center align-items-center">
              <div className="">
              <h1 className=''>First slide label</h1>
              {/* <p className='frist-color1 '>Some representative placeholder content for the first slide.</p> */}
              </div>
            </div>
          </div>

        </div>
        <div className="carousel-item">
          <img src={path + 'Carousel_img2.png'} className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src={path + 'Carousel_img3.png'} className="d-block w-100" alt="..." />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

  )
}

export default Carousel
