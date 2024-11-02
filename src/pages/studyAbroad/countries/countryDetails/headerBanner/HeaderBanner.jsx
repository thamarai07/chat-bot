import React from "react";
import { Container, Row } from "react-bootstrap";
import "./HeaderBanner.scss";
import { BreadCrumb, Button } from "../../../../../components";
import { scrollToSection } from "../../../utils";

const HeaderBanner = ({ data = {} }) => {
  const { bgImage, subTitle, title } = data;
  return (
    <Container fluid className="header-banner">
      <Row
        style={{
          background: `url("${bgImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
        className="pt-5 pt-lg-0 pt-xl-5"
      >
        <div className="service-details-header-title p-3 p-sm-4 p-lg-5 mt-xl-3">
          <div className="col-12 col-lg-10 col-xl-10 pt-xl-5">
            <BreadCrumb />
            <div className="title mt-2">{title}</div>
            <div className="subtitle mb-2">{subTitle}</div>
            <Button
              label="Get Free Expert Assistanat"
              handleClick={() => scrollToSection("country-contactus")}
              className="enquiry-now py-1 py-md-2 px-3"
            />
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default HeaderBanner;
