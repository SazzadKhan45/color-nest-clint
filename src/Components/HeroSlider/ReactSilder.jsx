import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import MyContainer from "../MyContainer";

const ReactSlider = () => {
  const images = [
    {
      original: "https://i.ibb.co.com/CpXg1h4q/dlider-1.jpg",
      thumbnail: "https://i.ibb.co.com/CpXg1h4q/dlider-1.jpg",
    },
    {
      original: "https://i.ibb.co.com/2Yhhbmbw/dlider-2.jpg",
      thumbnail: "https://i.ibb.co.com/2Yhhbmbw/dlider-2.jpg",
    },
    {
      original: "https://i.ibb.co.com/HfQD8fvr/slider-3.jpg",
      thumbnail: "https://i.ibb.co.com/HfQD8fvr/slider-3.jpg",
    },
    {
      original: "https://i.ibb.co.com/8DNn4hDF/slider-4.jpg",
      thumbnail: "https://i.ibb.co.com/8DNn4hDF/slider-4.jpg",
    },
    {
      original: "https://i.ibb.co.com/DPwnwksV/slider-5.jpg",
      thumbnail: "https://i.ibb.co.com/DPwnwksV/slider-5.jpg",
    },
  ];

  return (
    <MyContainer>
      <ImageGallery
        items={images}
        renderItem={(item) => (
          <div className="h-[250px] md:h-[450px] lg:h-[600px]">
            <img
              src={item.original}
              alt={item.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
        showThumbnails={true}
        showPlayButton={false}
        autoPlay={true}
        slideInterval={3000}
      />
    </MyContainer>
  );
};

export default ReactSlider;
