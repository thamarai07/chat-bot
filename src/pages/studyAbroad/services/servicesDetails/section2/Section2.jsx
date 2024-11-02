import React from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import "./Section2.scss";
import { scrollToSection } from "../../../utils";
import star from "../../../assets/star.svg";

const Section2 = ({ data = {} }) => {
  const { bgColour, card = [], title } = data;
  return (
    <div className="counselling-container">
      <h1 className="title my-3 my-md-5 py-3 py-md-4 text-center p-1">
        {title}
      </h1>
      <Row
        style={{ background: bgColour }}
        className="w-100 m-0 p-2 p-lg-3 "
      >
        {card.map((each, idx) => {
          const { title, image, items = [], header, subtitle } = each || {};
          return idx % 2 === 0 ? (
            <div className="w-100 d-flex justify-content-center p-0">
              <Row className="m-0 p-0 mt-5 px-lg-4 d-flex justify-content-center" style={{ maxWidth: "68rem" }}>
                <Col sm={12} md={6} lg={5} className="image-container m-0 p-0 px-md-2">
                  <img
                    src={image}
                    alt="Application Hurdles"
                    className="img-fluid"
                    width={"100%"}
                  />
                </Col>
                <Col sm={12} md={6} lg={5} className="text-container m-0 p-0 px-md-2">
                  <Card className="card-content">
                    <Card.Body>
                      {title && (
                        <Card.Title className="title">{title}</Card.Title>
                      )}
                      {subtitle && (
                        <Card.Text className="subtitle">{subtitle}</Card.Text>
                      )}
                      {header && (
                        <Card.Title className="header">{header}</Card.Title>
                      )}
                      <ul className="items">
                        {items.map((value, index) => (
                          <li key={index} className="my-1">
                            <img src={star} width="50" height="40" />{" "}
                            <span>{value}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="enquire-button my-3 my-lg-4"
                        onClick={() => scrollToSection("services-contactus")}
                      >
                        <span className="color-text">Enquire Now</span>
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          ) : (
            <div className="w-100 d-flex justify-content-center p-0">
              <Row className="m-0 p-0 mt-5 px-lg-5 d-flex justify-content-center" style={{ maxWidth: "68rem" }}>
                <Col md={6} lg={5} className="text-container m-0 p-0 px-md-2">
                  <Card className="card-content">
                    <Card.Body>
                      {title && (
                        <Card.Title className="title">{title}</Card.Title>
                      )}
                      {subtitle && (
                        <Card.Text className="subtitle">{subtitle}</Card.Text>
                      )}
                      {header && (
                        <Card.Title className="header">{header}</Card.Title>
                      )}
                      <ul className="items">
                        {items.map((value, index) => (
                          <li key={index} className="my-1">
                            <img src={star} width="50" height="40" />{" "}
                            <span>{value}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="enquire-button my-3 my-lg-4"
                        onClick={() => scrollToSection("services-contactus")}
                      >
                        <span className="color-text">Enquire Now</span>
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={5} className="image-container m-0 p-0 px-md-2">
                  <img
                    src={image}
                    alt="Application Hurdles"
                    className="img-fluid"
                    width={"100%"}
                  />
                </Col>
              </Row>
            </div>
          );
        })}
      </Row>
    </div>
  );
};

export default Section2;
