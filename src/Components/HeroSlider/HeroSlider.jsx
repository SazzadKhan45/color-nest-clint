import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Optional container wrapper
const MyContainer = ({ children }) => (
  <div className="max-w-7xl mx-auto px-2 md:px-6 lg:px-8">{children}</div>
);

const HeroSlider = () => {
  const slides = [
    {
      image: "https://i.ibb.co.com/QFSHCyz8/dlider-1.jpg",
    },
    {
      image: "https://i.ibb.co.com/ZRwGjqr7/dlider-2.jpg",
    },
    {
      image: "https://i.ibb.co.com/1fTc2XjX/slider-3.jpg",
    },
    {
      image: "https://i.ibb.co.com/nsphbHPv/slider-4.jpg",
    },
    {
      image: "https://i.ibb.co.com/N6JBqxvt/slider-5.jpg",
    },
  ];

  return (
    <div className="px-2 md:px-0">
      <MyContainer>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          className="rounded-xl overflow-hidden"
        >
          <div className="">
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="">
                {/* Background Image */}
                <div className="h-[250px] md:h-[450px] lg:h-[600px]">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </MyContainer>
    </div>
  );
};

export default HeroSlider;
