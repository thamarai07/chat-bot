import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./Section3.scss";
import star from "../../../assets/star.svg";

const Section3 = ({ data = {} }) => {
  const { card = [], title } = data;
  return (
    <div className="counselling-container pt-5 pt-md-0">
      <h1 className="title my-md-5 py-md-4 text-center">
        {title}
      </h1>
      <Row className="w-100 m-0 p-3 p-lg-3 pt-0 py-md-0">
        {card.map((each, idx) => {
          const { title, image, items = [], header, subtitle } = each || {};
          return idx % 2 === 0 ? (
            <div className="w-100 d-flex justify-content-center p-0">
              <Row
                className="m-0 p-0 mt-5 px-md-3 px-lg-4 d-flex justify-content-center"
                style={{ maxWidth: "68rem" }}
              >
                <Col
                  sm={12}
                  md={6}
                  lg={5}
                  className="image-container m-0 p-0 px-md-2"
                >
                  <img
                    src={image}
                    alt="Application Hurdles"
                    className="img-fluid"
                    width={"100%"}
                  />
                </Col>
                <Col
                  sm={12}
                  md={6}
                  lg={5}
                  className="text-container m-0 p-0 px-md-2 mt-3 mt-md-0"
                >
                  <Card className="card-content">
                    <Card.Body className="p-0">
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
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          ) : (
            <div className="w-100 d-flex justify-content-center p-0">
              <Row
                className="m-0 p-0 mt-5 px-md-3 px-lg-5 d-flex justify-content-center"
                style={{ maxWidth: "68rem" }}
              >
                <Col
                  sm={12}
                  md={6}
                  lg={5}
                  className="text-container m-0 p-0 px-md-2"
                >
                  <Card className="card-content">
                    <Card.Body className="p-0">
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
                    </Card.Body>
                  </Card>
                </Col>
                <Col
                  sm={12}
                  md={6}
                  lg={5}
                  className="image-container m-0 p-0 px-md-2"
                >
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

export default Section3;
