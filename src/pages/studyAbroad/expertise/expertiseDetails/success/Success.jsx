import React from "react";
import { Row } from "react-bootstrap";
import "./Success.scss";

const InfoSections = ({ data = [] }) => {

  return (
    <div className="w-100 mt-3 expertise-success">
      <div className="mt-5 d-flex flex-column justify-content-center align-items-center px-3">
        <div style={{ maxWidth: "74rem" }} className="my-4 mx-0 mx-md-4">
          <div className="w-100 d-flex flex-column">
            {data.map((section, index) => (
              <Row key={index} className="m-0 p-0 info-section mb-4">
                <h1 className="col-12 mb-3 p-0">{section.title}</h1>
                <div className="col-12 info-content p-0">{section.summary}</div>
              </Row>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSections;
