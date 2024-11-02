import React from "react";
import "./OurTeam.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function OurTeam({ data = {}, setShowGridModal, setGalleryType }) {
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
  const { card = [], title } = data;
  return (
    <div className="Gallery-OurTeam-container py-5 d-lg-flex justify-content-lg-center">
      <div style={{maxWidth: "65rem"}}>
      <div className="FinalSection-title-container pb-2">
        <h1 className="section-title text-center">{title}</h1>
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
          containerClass="mx-2 mx-md-3 mx-lg-5  FinalSection-carousel-container"
          removeArrowOnDeviceType={["mobile"]}
        >
          {card.map((each, index) => (
            <div
              className="w-100 row d-flex justify-content-center align-items-center pt-0 pb-0 m-0 py-lg-5 px-0 px-md-3 card-img"
              key={index}
              style={{ height: "100%" }}
              onClick={() => {
                setShowGridModal(true);
                setGalleryType({
                  title: each?.title || title,
                  type: each?.type,
                  years: each?.years
                });
              }}
            >
              <div className="col-12 m-0 p-0">
                <img
                  src={each?.image}
                  alt={"Loading..."}
                  style={{ width: "100%" }}
                  className="image-container"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      </div>
      </div>
  );
}

export default OurTeam;
