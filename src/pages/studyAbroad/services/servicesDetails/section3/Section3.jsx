import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Section3.scss";

const Section3 = ({ data = {} }) => {
  const { card = [], title } = data;
  return (
    <Container className="counselling-services p-0">
      <h1 className="title my-5 mx-2">{title}</h1>
      <Row className="services-row my-3 my-lg-5 ">
        {card.map((service, index) => (
          <Col md={6} lg={4} key={index} className="service-col my-5">
            <Card className="service-card px-2 mx-3 mx-md-2  mb-5 pb-4">
              <Card.Img variant="top" src={service.icon} alt={service.title} className="p-2"/>
              <Card.Body>
                <Card.Title className="mt-5">{service.title}</Card.Title>
                <Card.Text>{service.subtitle}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Section3;
