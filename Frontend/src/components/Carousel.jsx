import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function Carousel() {
  // const path = "src/assets/Images/";
  const path = import.meta.env.VITE_APP_IMG_URL;
  return (
    // <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
    //   <div className="carousel-inner">
    //     <div className="carousel-item active">
    //       <img src={path + 'banner1.jpg'} className="d-block w-100" alt="..." />

    //       <div className="d-flex justify-content-center align-items-center new-demo">

    //         <div className="carousel-caption d-flex justify-content-center align-items-center">
    //           <div className="">
    //           <h1 className=''>First slide label</h1>
    //           {/* <p className='frist-color1 '>Some representative placeholder content for the first slide.</p> */}
    //           </div>
    //         </div>
    //       </div>

    //     </div>
    //     <div className="carousel-item">
    //       <img src={path + 'Carousel_img2.png'} className="d-block w-100" alt="..." />
    //     </div>
    //     <div className="carousel-item">
    //       <img src={path + 'Carousel_img3.png'} className="d-block w-100" alt="..." />
    //     </div>
    //   </div>
    //   <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    //     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //     <span className="visually-hidden">Previous</span>
    //   </button>
    //   <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    //     <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //     <span className="visually-hidden">Next</span>
    //   </button>
    // </div>


    // <div className="container-fluid p-0  carousel slide carousel-fade" data-wow-delay="0.1s">
    //   <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
    //     <div className="carousel-indicators">
    //       <button
    //         type="button"
    //         data-bs-target="#header-carousel"
    //         data-bs-slide-to={0}
    //         className="active"
    //         aria-current="true"
    //         aria-label="Slide 1"
    //       >
    //         {/* <img
    //           className="img-fluid"
    //           src={path + 'banner-1.jpg'}
    //           alt="Image"
    //           height="100vh"
    //         /> */}
    //       </button>
    //       <button
    //         type="button"
    //         data-bs-target="#header-carousel"
    //         data-bs-slide-to={1}
    //         aria-label="Slide 2"
    //       >
    //         {/* <img
    //           className="img-fluid"
    //           src={path + 'banner-2.jpg'}
    //           alt="Image"
    //         /> */}
    //       </button>
    //       <button
    //         type="button"
    //         data-bs-target="#header-carousel"
    //         data-bs-slide-to={2}
    //         aria-label="Slide 3"
    //       >
    //         {/* <img
    //           className="img-fluid"
    //           src={path + 'banner-3.jpg'}
    //           alt="Image"
    //         /> */}
    //       </button>
    //     </div>
    //     <div className="carousel-inner">
    //       <div className="carousel-item active main-back-color1">
    //         <img
    //           className="w-100"
    //           src={path + 'banner-1.jpg'}
    //           alt="Image"
    //         />
    //         <div className="carousel-caption ">

    //           <div className="container">


    //             <div className="banner-main-head mb-0">One stop solution to various </div>
    //             <div className="banner-main-head ">healthcare services</div>
    //             <div className="banner-semi-head mt-3">Lorem ipsum dolor sit amet.lorem5 ipsum dolor sit amet.lorem5</div>
    //             <div className="">Lorem ipsum dolor sit amet.lorem5</div>
    //             <button className='banner-btn mt-3'>Consult Now</button>
    //           </div>

    //         </div>
    //       </div>
    //       {/* 2nd */}
    //       <div className="carousel-item main-back-color2">
    //         <img
    //           className="w-100"
    //           src={path + 'banner-2.jpg'}
    //           alt="Image"
    //         />
    //         <div className="carousel-caption">
    //           <div className="container">


    //             <div className="banner-main-head mb-0">One stop solution to various </div>
    //             <div className="banner-main-head ">healthcare services</div>
    //             <div className="banner-semi-head mt-3">Lorem ipsum dolor sit amet.lorem5 ipsum dolor sit amet.lorem5</div>
    //             <div className="">Lorem ipsum dolor sit amet.lorem5</div>
    //             <button className='banner-btn mt-3'>See All Speciality</button>

    //           </div>
    //         </div>
    //       </div>
    //       <div className="carousel-item">
    //         <img
    //           className="w-100"
    //           src={path + 'banner-3.jpg'}
    //           alt="Image"
    //         />
    //         <div className="carousel-caption">
    //           <div className="container">


    //             <div className="banner-main-head mb-0">One stop solution to various </div>
    //             <div className="banner-main-head ">healthcare services</div>
    //             <div className="banner-semi-head mt-3">Lorem ipsum dolor sit amet.lorem5 ipsum dolor sit amet.lorem5</div>
    //             <div className="">Lorem ipsum dolor sit amet.lorem5</div>
    //             <button className='banner-btn mt-3'>Read more articles</button>

    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <button
    //       className="carousel-control-prev"
    //       type="button"
    //       data-bs-target="#header-carousel"
    //       data-bs-slide="prev"
    //     >
    //       <span className="carousel-control-prev-icon" aria-hidden="true" />
    //       <span className="visually-hidden">Previous</span>
    //     </button>
    //     <button
    //       className="carousel-control-next"
    //       type="button"
    //       data-bs-target="#header-carousel"
    //       data-bs-slide="next"
    //     >
    //       <span className="carousel-control-next-icon" aria-hidden="true" />
    //       <span className="visually-hidden">Next</span>
    //     </button>
    //   </div>
    // </div>




    // 3rd 


    // <div className="container-fluid p-0  carousel slide carousel-fade" data-wow-delay="0.1s">
    //   <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
    //     <div className="carousel-indicators">
    //       <button
    //         type="button"
    //         data-bs-target="#header-carousel"
    //         data-bs-slide-to={0}
    //         className="active"
    //         aria-current="true"
    //         aria-label="Slide 1"
    //       >
    //         {/* <img
    //     className="img-fluid"
    //     src={path + 'banner-1.jpg'}
    //     alt="Image"
    //     height="100vh"
    //   /> */}
    //       </button>
    //       <button
    //         type="button"
    //         data-bs-target="#header-carousel"
    //         data-bs-slide-to={1}
    //         aria-label="Slide 2"
    //       >
    //         {/* <img
    //     className="img-fluid"
    //     src={path + 'banner-2.jpg'}
    //     alt="Image"
    //   /> */}
    //       </button>
    //       <button
    //         type="button"
    //         data-bs-target="#header-carousel"
    //         data-bs-slide-to={2}
    //         aria-label="Slide 3"
    //       >
    //         {/* <img
    //     className="img-fluid"
    //     src={path + 'banner-3.jpg'}
    //     alt="Image"
    //   /> */}
    //       </button>

    //     </div>
    //     <div className="carousel-inner">
    //       <div className="carousel-item active main-back-color1">
    //         <img
    //           className="w-100"
    //           src={path + 'HCN Banner 3 (2).jpg'}
    //           alt="Image"
    //         />
    //         {/* <div className="carousel-caption ">

    //           <div className="container">


    //             <div className="banner-main-head mb-0">One stop solution to various </div>
    //             <div className="banner-main-head ">healthcare services</div>
    //             <div className="banner-semi-head mt-3">Lorem ipsum dolor sit amet.lorem5 ipsum dolor sit amet.lorem5</div>
    //             <div className="">Lorem ipsum dolor sit amet.lorem5</div>
    //             <button className='banner-btn mt-3'>Consult Now</button>
    //           </div>

    //         </div> */}
    //       </div>
    //       {/* 2nd */}
    //       <div className="carousel-item main-back-color2">
    //         <img
    //           className="w-100"
    //           src={path + 'HCN Banner 2 (1).jpg'}
    //           alt="Image"
    //         />
    //         {/* <div className="carousel-caption">
    //           <div className="container">


    //             <div className="banner-main-head mb-0">One stop solution to various </div>
    //             <div className="banner-main-head ">healthcare services</div>
    //             <div className="banner-semi-head mt-3">Lorem ipsum dolor sit amet.lorem5 ipsum dolor sit amet.lorem5</div>
    //             <div className="">Lorem ipsum dolor sit amet.lorem5</div>
    //             <button className='banner-btn mt-3'>See All Speciality</button>

    //           </div>
    //         </div> */}
    //       </div>
    //       <div className="carousel-item">
    //         <img
    //           className="w-100"
    //           src={path + 'HCN Banner 4 (1).jpg'}
    //           alt="Image"
    //         />
    //         {/* <div className="carousel-caption">
    //           <div className="container">


    //             <div className="banner-main-head mb-0">One stop solution to various </div>
    //             <div className="banner-main-head ">healthcare services</div>
    //             <div className="banner-semi-head mt-3">Lorem ipsum dolor sit amet.lorem5 ipsum dolor sit amet.lorem5</div>
    //             <div className="">Lorem ipsum dolor sit amet.lorem5</div>
    //             <button className='banner-btn mt-3'>Read more articles</button>

    //           </div>
    //         </div> */}
    //       </div>




    //     </div>
    //     <button
    //       className="carousel-control-prev"
    //       type="button"
    //       data-bs-target="#header-carousel"
    //       data-bs-slide="prev"
    //     >
    //       <span className="carousel-control-prev-icon" aria-hidden="true" />
    //       <span className="visually-hidden">Previous</span>
    //     </button>
    //     <button
    //       className="carousel-control-next"
    //       type="button"
    //       data-bs-target="#header-carousel"
    //       data-bs-slide="next"
    //     >
    //       <span className="carousel-control-next-icon" aria-hidden="true" />
    //       <span className="visually-hidden">Next</span>
    //     </button>
    //   </div>
    // </div>



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
            {/* <img
          className="img-fluid"
          src={path + 'banner-1.jpg'}
          alt="Image"
          height="100vh"
        /> */}
          </button>
          <button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          >
            {/* <img
          className="img-fluid"
          src={path + 'banner-2.jpg'}
          alt="Image"
        /> */}
          </button>
          <button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          >
            {/* <img
          className="img-fluid"
          src={path + 'banner-3.jpg'}
          alt="Image"
        /> */}
          </button>
          <button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to={3}
            aria-label="Slide 4"
          >
            {/* <img
          className="img-fluid"
          src={path + 'banner-4.jpg'}
          alt="Image"
        /> */}
          </button>
          <button
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide-to={4}
            aria-label="Slide 5"
          >
            {/* <img
          className="img-fluid"
          src={path + 'banner-5.jpg'}
          alt="Image"
        /> */}
          </button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active main-back-color1">
            <img
              className="w-100"
              src={path + 'banner-new1.jpg'}
              alt="Image"
            />
            {/* <div className="carousel-caption">
          <div className="container">
            <div className="banner-main-head mb-0">One stop solution to various</div>
            <div className="banner-main-head">healthcare services</div>
            <div className="banner-semi-head mt-3">Lorem ipsum dolor sit amet.lorem5 ipsum dolor sit amet.lorem5</div>
            <div className="">Lorem ipsum dolor sit amet.lorem5</div>
            <button className='banner-btn mt-3'>Consult Now</button>
          </div>
        </div> */}
          </div>
          {/* 2nd */}
          <div className="carousel-item main-back-color2">
            <img
              className="w-100"
              src={path + 'banner-new2.jpg'}
              alt="Image"
            />
            {/* <div className="carousel-caption">
          <div className="container">
            <div className="banner-main-head mb-0">One stop solution to various</div>
            <div className="banner-main-head">healthcare services</div>
            <div className="banner-semi-head mt-3">Lorem ipsum dolor sit amet.lorem5 ipsum dolor sit amet.lorem5</div>
            <div className="">Lorem ipsum dolor sit amet.lorem5</div>
            <button className='banner-btn mt-3'>See All Speciality</button>
          </div>
        </div> */}
          </div>
          {/* 3rd */}
          <div className="carousel-item">
            <img
              className="w-100"
              src={path + 'banner-new3.jpg'}
              alt="Image"
            />
            {/* <div className="carousel-caption">
          <div className="container">
            <div className="banner-main-head mb-0">One stop solution to various</div>
            <div className="banner-main-head">healthcare services</div>
            <div className="banner-semi-head mt-3">Lorem ipsum dolor sit amet.lorem5 ipsum dolor sit amet.lorem5</div>
            <div className="">Lorem ipsum dolor sit amet.lorem5</div>
            <button className='banner-btn mt-3'>Read more articles</button>
          </div>
        </div> */}
          </div>
          {/* 4th */}
          <div className="carousel-item">
            <img
              className="w-100"
              src={path + 'banner-new4.jpg'}
              alt="Image"
            />
            {/* <div className="carousel-caption">
          <div className="container">
            <div className="banner-main-head mb-0">One stop solution to various</div>
            <div className="banner-main-head">healthcare services</div>
            <div className="banner-semi-head mt-3">Lorem ipsum dolor sit amet.lorem5 ipsum dolor sit amet.lorem5</div>
            <div className="">Lorem ipsum dolor sit amet.lorem5</div>
            <button className='banner-btn mt-3'>Contact Us</button>
          </div>
        </div> */}
          </div>

          <div className="carousel-item">
            <img
              className="w-100"
              src={path + 'banner-new5.jpg'}
              alt="Image"
            />
            {/* <div className="carousel-caption">
          <div className="container">
            <div className="banner-main-head mb-0">One stop solution to various</div>
            <div className="banner-main-head">healthcare services</div>
            <div className="banner-semi-head mt-3">Lorem ipsum dolor sit amet.lorem5 ipsum dolor sit amet.lorem5</div>
            <div className="">Lorem ipsum dolor sit amet.lorem5</div>
            <button className='banner-btn mt-3'>Contact Us</button>
          </div>
        </div> */}
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
