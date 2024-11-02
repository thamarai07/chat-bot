import React from "react";
import { Container, Row } from "react-bootstrap";
import "./HeaderBanner.scss";

const HeaderBanner = ({ data = {} }) => {
  const { bgImage, title } = data;
  return (
    <Container fluid className="gallery-header-banner m-0 p-0">
      <Row
        style={{
          backgroundImage: `url("${bgImage}")`,
        }}
        className="m-0 p-0 gallery-container"
      >
        <div className="gallery-details-header-title row p-0 my-0 d-flex align-items-center px-4 px-sm-5 py-5">
          <div className="col-12 col-md-4 m-0 p-0">
            <div className="title">{title}</div>
          </div>     
        </div>
      </Row>
    </Container>
  );
};

export default HeaderBanner;
