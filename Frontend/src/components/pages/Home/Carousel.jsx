import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "@/App.css"

const banners = [
  "HCN Banner 1.jpg",
  "HCN Banner 2.jpg",
  "HCN Banner 3.jpg",
  "HCN Banner 4.jpg",
  "HCN Banner 5.jpg",
  "HCN Banner 6.jpg",
  "HCN Banner 7.jpg",
  "HCN Banner 8.jpg",
  "HCN Banner 9.jpg",
  "HCN Banner 10.jpg",
  "HCN Banner 11.jpg",
  "HCN Banner 12.jpg",
];

function CarouselComponent() {
  const path = import.meta.env.VITE_APP_IMG_URL + "/Banner";

  return (
    <div className="w-full h-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full">
              <img
                src={`${path}/${banner}`}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      ;
    </div>
  );
}

export default CarouselComponent;
