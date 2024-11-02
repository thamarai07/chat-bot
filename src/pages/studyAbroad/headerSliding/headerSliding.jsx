import React, { useEffect, useState } from "react";
import { getDocumentsData } from "../../../databaseConfig/dbConfig";
import { BreadCrumb, Button } from "../../../components";
import Carousel from "react-bootstrap/Carousel";
import { STUDYABROADSLIDES } from "constants/dbConstants";
import "./headerSliding.scss";

const HeaderSliding = () => {
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    try {
      getDocumentsData(STUDYABROADSLIDES).then((resp) => {
        setSlides(resp);
      });
    } catch {
      console.log("Error");
    }
  }, []);
  if (slides.length <= 0) {
    return null;
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 150,
        behavior: "smooth",
      });
    }
  };

  return (
    <Carousel
      className="study-header-sliding"
      controls={false}
      id="studyabroad"
    >
      {slides.map((each, index) => (
        <Carousel.Item
          interval={5000}
          key={index}
          style={{ background: `url("${each.bgImg}")`, backgroundSize: "cover"}}
        >
          <div className="study-header-title p-4 p-lg-5">
            <div className="my-4 py-3">
              <BreadCrumb />
              <div className="title mt-4  mb-3 mb-lg-4 mt-lg-5">
                {each?.title}
              </div>
              <Button
                label="Know More"
                handleClick={() => scrollToSection("contactus")}
                className="know-more p-2 px-3"
              />
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeaderSliding;
