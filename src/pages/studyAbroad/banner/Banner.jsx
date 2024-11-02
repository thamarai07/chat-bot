import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Banner.scss";
import Clixbanner from "../assets/ClixBanner.png"; //Update this path as necessary

const Banner = () => {
  return (
    <Container fluid className="banner">
      <Row className="align-items-center row justify-content-center">
        <Col className="text-right col-11 col-md-11 px-0 mx-0 mx-md-2 mx-lg-4 my-2 my-md-4">
          <img src={Clixbanner} alt="CLIX logo" className="clixlogo" />
        </Col>
      </Row>
    </Container>
  );
};

export default Banner;
