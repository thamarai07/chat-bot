import React from "react";
import "./OurServices.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function OurServices({ data = {} }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const { videos = [], title, subTitle } = data;
  return (
    <div className="Gallery-OurServices-container py-5 m-0 d-lg-flex justify-content-lg-center">
      <div style={{ maxWidth: "65rem" }}>
      <div className="FinalSection-title-container pb-2">
        <h1 className="section-title text-center">{title}</h1>
      </div>
      <div className="FinalSection-subtitle-container pb-4 mx-2 mx-md-5 text-center">
        <p className="section-sub-title text-center">{subTitle}</p>
      </div>
      <div>
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          containerClass="mx-0 mx-md-5  FinalSection-carousel-container"
          removeArrowOnDeviceType={["mobile"]}
        >
          {videos.map((each, index) => (
            <div
              className="video-wrapper text-center"
              key={index}
            >
              <iframe
                src={`https://www.youtube.com/embed/${each}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </Carousel>
      </div>
      </div>
    </div>
  );
}

export default OurServices;
