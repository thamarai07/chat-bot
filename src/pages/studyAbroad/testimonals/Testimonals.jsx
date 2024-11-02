import React, { useEffect, useState } from "react";
import { STUDY_ABROAD_TESTIMONIALS } from "constants/dbConstants";
import { getDocumentsData } from "../../../databaseConfig/dbConfig";
import "./Testimonial.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    try {
      getDocumentsData(STUDY_ABROAD_TESTIMONIALS).then((resp) => {
        setTestimonials(resp);
      });
    } catch {
      console.log("Error");
    }
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div className="testimonials-container" id="testimonials">
      <div className="testimonials-title-container">
        <h2 className="section-title">
          Our Students Share Insightful Feedback
        </h2>
      </div>
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        containerClass="mx-0 mx-md-5  testimonials-carousel-container"
        removeArrowOnDeviceType={["mobile"]}
        // dotListClass="custom-dot-list-style"
        // itemClass="m-3"
      >
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <div className="testimonial-image-container">
              <img
                src={testimonial.picture}
                alt={testimonial.name}
                className="testimonial-image"
              />
            </div>
            <h3>{testimonial.name}</h3>
            <h4>{testimonial.studyAt}</h4>
            <p>{testimonial.feedback}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Testimonials;
