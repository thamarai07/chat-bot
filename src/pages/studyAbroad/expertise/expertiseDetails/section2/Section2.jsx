import React from "react";
import { Row } from "react-bootstrap";
import "./Section2.scss";

const InfoSections = ({ data = {} }) => {
  const { cards = [], title, bgColour } = data;

  return (
    <div className="w-100 my-3 expertise-highlights">
      <div
        className="mt-5 py-5 d-flex flex-column justify-content-center align-items-center px-3"
        style={{ background: bgColour }}
      >
        <div style={{ maxWidth: "74rem" }} className="my-4 mx-0 mx-md-4">
          <div className="w-100 mb-4 mb-md-5">
            <h1>{title}</h1>
          </div>
          <div className="w-100 d-flex flex-column">
            {cards.map((section, index) => (
              <Row
                key={index}
                className="info-section p-0 m-0 mb-4"
              >
                <div className="col-12 info-header mb-1 p-0">
                  {section.title}
                </div>
                <div className="col-12 info-content p-0">
                  {section.summary}
                </div>
              </Row>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSections;
