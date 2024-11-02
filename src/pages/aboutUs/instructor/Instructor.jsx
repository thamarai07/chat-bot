import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import instructor from "../../../assets/ourstory/instructor.png";
import { Image } from "../../../components";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Carousel.Caption>
          <div className="instructor-card">
            <div className="instructor-img">
              <Image src={instructor} alt="instructor" className="intr-img" />
            </div>
            <div className="instructor-body">
              <div className="instructor-title">
                IT Training/ Software training
              </div>
              <div className="instructor-description">
                <div className="instructor-description1">
                  Sed ut perspiciatis unde Sed ut perspiciatis unde omnis iste
                  natus error sit voluptatem Sed ut perspiciatis unde omnis iste
                  natus error sit voluptatemSed ut perspiciatis unde omnis iste
                  natus error sit
                </div>
                <div className="instructor-description2">
                  voluptatemSed ut perspiciatis unde Sed ut perspiciatis unde
                  omnis iste natus error sit voluptatem.
                </div>
              </div>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

const Instructor = () => {
  return (
    <div className="instructor-container">
      <div className="instructor-wrapper">
        <ControlledCarousel />
      </div>
    </div>
  );
};
export default Instructor;
