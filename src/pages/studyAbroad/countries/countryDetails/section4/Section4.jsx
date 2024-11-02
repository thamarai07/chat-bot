import React from "react";
import "./Section4.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Section4({ data = {} }) {
  const { title, cards = [], bgColour } = data;
  const groupedCards = cards.reduce((result, card, index) => {
    const chunkIndex = Math.floor(index / 2);

    if (!result[chunkIndex]) {
      result[chunkIndex] = []; // start a new chunk
    }

    result[chunkIndex].push(card);

    return result;
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1440 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div
      className="country-universities-container"
      id="country-universities"
      style={{ backgroundColor: bgColour }}
    >
      <div className="country-universities-title-container">
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="py-4 d-flex justify-content-center">
        <div className="w-100">
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          containerClass="mx-0 mx-lg-5 country-universities-carousel-container"
          removeArrowOnDeviceType={["mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {groupedCards.map((group, index) => (
            <div
              className="card-group"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                alignItems: "center",
              }}
              key={index}
            >
              {group.map((card, idx) => (
                <div key={idx} className="px-2">
                  <img src={card} alt="...Loading" className="uni-card"/>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Section4;
