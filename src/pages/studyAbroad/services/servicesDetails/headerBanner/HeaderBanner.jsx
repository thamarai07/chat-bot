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
      >
        <div className="service-details-header-title p-4 p-lg-5">
          <div className="col-12 col-md-11 col-lg-9 col-xl-7">
            <BreadCrumb />
            <div className="title mt-4 mt-lg-4">{title}</div>
            <div className="subtitle mb-4">{subTitle}</div>
            <Button
              label="Enquire Now"
              handleClick={() => scrollToSection("services-contactus")}
              className="enquiry-now py-1 py-md-2 px-3"
            />
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default HeaderBanner;
