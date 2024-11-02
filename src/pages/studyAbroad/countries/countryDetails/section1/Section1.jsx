import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Section1.scss";

const Section1 = ({ data = {} }) => {
  const { image, title, summary } = data;
  return (
    <div className="section w-100">
      <div className="py-4 pb-0 pb-md-4 p-lg-4 mt-5 w-100 d-flex justify-content-center">
        <h1 className="text-center col-11 col-md-10 col-lg-8 ">{title}</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center" >
        <Row className="px-2 mt-4 d-flex justify-content-center px-sm-3 px-md-0" style={{maxWidth: "68rem"}}>
          <div
            className="col-12 col-md-4 d-flex justify-content-center image-container d-none d-md-block"
          >
            <img
              src={image}
              alt="Application Hurdles"
              className="img-fluid"
            />
          </div>
          <div className="col-12 col-md-6 m-0 p-0 px-4 text-align-justify pl-md-5 d-flex align-items-center">
            <p>{summary}</p>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Section1;
