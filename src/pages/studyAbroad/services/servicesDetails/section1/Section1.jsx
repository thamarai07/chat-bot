import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Section1.scss";

const Section1 = ({ data }) => {
  const { cards = [], title } = data;
  return (
    <div className="section ">
      <div className="deatils-container-header py-4 p-lg-4 my-5 w-100 d-flex justify-content-center">
        <h1 className="text-center col-11 col-md-10 col-lg-8 ">{title}</h1>
      </div>
      <Container className="text-center">
        <Row className="mt-4 d-flex justify-content-center">
          {cards.map((each, idx) => (
            <Col key={idx} md={4} sm={6}>
              <div className="icon-wrapper">
                <img className="icon icon-overwhelming" src={each.image} />
                <h2>{each.title}</h2>
                <p className="px-lg-5">{each.summary}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Section1;
