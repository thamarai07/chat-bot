import React from "react";
import { Container, Row } from "react-bootstrap";
import "./HeaderBanner.scss";

const HeaderBanner = ({ data = {} }) => {
  const { bgImage, subTitle, title, description } = data;
  return (
    <Container fluid className="blog-header-banner m-0 p-0 pb-4">
      <Row
        style={{
          background: `url("${bgImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
        className="m-0 p-0"
      >
        <div className="blog-details-header-title row m-1 my-4 m-md-3 m-lg-5 py-1 py-md-3 ">
          <div className="col-12 col-md-6 col-lg-8 col-xl-7 m-0 p-0">
            <div className="title">{title}</div>
            <div className="subtitle">{subTitle}</div>
          </div>
          {description && <div className="col-12 col-md-5 col-lg-3 m-0 p-0">
            <div className="underline" ></div>
            <div className="description">{description}</div>
          </div>}
        </div>
      </Row>
    </Container>
  );
};

export default HeaderBanner;
