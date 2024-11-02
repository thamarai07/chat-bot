import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./Events.scss";

const Events = ({ data = {}, setShowGridModal, setGalleryType}) => {
  const { card = [], title } = data;
  return (
    <Container
      className="events-services-section p-0 p-md-3 py-md-5 p-lg-3 d-flex justify-content-center "
    >
      <div className="m-2 m-md-4 mt-md-5"
      style={{ maxWidth: "72rem" }}
      >
        <h2 className="services-title">{title}</h2>
        <Row className="mt-5">
          {card.map((service, index) => (
            <Col
              key={index}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              className="p-0 px-2 px-md-0 d-flex"
            >
              <Card className="service-card mx-4 p-0 mx-md-2 mb-4" onClick={()=> {
                  setShowGridModal(true);
                  setGalleryType({ title: service?.title || title, type: service?.type, years: service?.years });
                }}>
              <div className="service-icon-wrapper">
                  <Card.Img
                    variant="top"
                    src={service.image}
                    className="service-icon"
                  />
                </div>
                <Card.Body className="py-4 px-2">
                  <Card.Title className="service-title p-0 m-0 mb-2">
                    {service.title}
                  </Card.Title>
                  <Card.Text className="service-description p-0 m-0 px-1">
                    {service.subtitle}
                  </Card.Text>
                </Card.Body>
              
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default Events;
