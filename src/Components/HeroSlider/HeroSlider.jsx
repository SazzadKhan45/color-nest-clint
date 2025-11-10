import MyContainer from "../MyContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  const slides = [
    {
      image: "https://i.ibb.co.com/CpXg1h4q/dlider-1.jpg",
    },
    {
      image: "https://i.ibb.co.com/2Yhhbmbw/dlider-2.jpg",
    },
    {
      image: "https://i.ibb.co.com/HfQD8fvr/slider-3.jpg",
    },
    {
      image: "https://i.ibb.co.com/8DNn4hDF/slider-4.jpg",
    },
    {
      image: "https://i.ibb.co.com/DPwnwksV/slider-5.jpg",
    },
  ];

  return (
    <div className="px-2 md:px-0">
      <MyContainer>
        <div className="w-full">
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
        </div>
      </MyContainer>
    </div>
  );
};

export default HeroSlider;
