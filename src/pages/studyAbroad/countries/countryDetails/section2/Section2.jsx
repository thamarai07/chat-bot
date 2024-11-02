import React from "react";
import { Row } from "react-bootstrap";
import "./Section2.scss";

const InfoSections = ({ data = {} }) => {
  const { card = [], title, bgColour } = data;

  return (
    <div
      className="w-100 my-3 pt-3 country-highlights"
      
    >
      <div className="mt-5 pt-5"
      style={{ background: bgColour }}
      >
      <div className="pt-3 w-100 d-flex justify-content-center">
        <h1 className="text-center col-11 col-md-10 col-lg-8 ">{title}</h1>
      </div>
      <div className="w-100 m-0 p-0 d-flex flex-column justify-content-center p-4 p-sm-5 align-items-center">
        {card.map((section, index) => (
          <Row
            key={index}
            className="info-section mx-lg-3 mx-xl-5 my-4 p-4 px-md-2 px-lg-4 d-flex justify-content-center"
            style={{maxWidth: "74rem"}}
          >
            <div className="col-12 col-md-4 col-lg-2 info-header d-flex align-items-center justify-content-md-start p-0 pb-3 pb-md-0 mx-md-1 mx-lg-3 ml-lg-0">
              {section.title}
            </div>
            <div className="col-12 col-md-7 col-lg-9 info-content pt-3 pt-md-0 px-0 px-md-4 px-lg-3">
              {section.subtitle}
            </div>
          </Row>
        ))}
      </div>
      </div>
    </div>
  );
};

export default InfoSections;
