import React from "react";
import "./FinalSection.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function FinalSection({ data = {} }) {
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
  const { bgColor, cards = [], title, subTitle } = data;
  return (
    <div className="FinalSection-container py-5">
      <div className="FinalSection-title-container pb-2">
        <h1 className="section-title text-center">{title}</h1>
        <h2 className="section-sub-title text-center">{subTitle}</h2>
      </div>
      <div style={{ backgroundColor: bgColor }}>
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          containerClass="mx-0 mx-lg-5  FinalSection-carousel-container"
          removeArrowOnDeviceType={["mobile"]}
        >
          {cards.map((card, index) => (
            <div
              className="w-100 row d-flex justify-content-center align-items-center pt-5 pb-0 m-0 py-lg-5 px-3"
              key={index}
            >
              <div className="col-12 col-md-5 pb-3 pb-md-0">
                <img
                  src={card?.image}
                  alt={"Loading..."}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-12 col-md-5">
                <h3 style={{color: "#000"}}>{card?.title}</h3>
                <p  style={{color: "#000", textAlign:"justify"}}>{card?.description}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default FinalSection;
