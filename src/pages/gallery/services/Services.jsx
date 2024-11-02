import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./Services.scss";

const ServicesComponent = ({ data = {}, setShowGridModal, setGalleryType }) => {
  const { card = [], title } = data;
  return (
    <Container className="gallery-services-section p-0 p-md-3 py-4 py-lg-5 d-flex justify-content-center">
      <div className="m-2 m-md-4  mt-md-5" style={{ maxWidth: "75rem" }}>
        <h2 className="services-title">{title}</h2>
        <Row className="m-0 mt-4 mt-md-5">
          {card.map((service, index) => (
            <Col
              key={index}
              xs={12}
              sm={12}
              md={6}
              lg={3}
              className="p-0 d-flex"
            >
              <Card
                className="service-card m-0 flex-fill mx-4 p-0 mx-md-2 mb-4 mb-lg-0"
                onClick={() => {
                  setShowGridModal(true);
                  setGalleryType({ title: service?.title || title, type:service?.type, years: service?.years });
                }}
              >
                <Card.Body
                  className="p-1 p-md-3 pb-0 m-0 pt-4"
                  style={{ borderRadius: 0 }}
                >
                  <Card.Title className="service-title p-0 m-0 mb-2">
                    {service.title}
                  </Card.Title>
                  <Card.Text className="service-description p-1">
                    {service.subtitle}
                  </Card.Text>
                </Card.Body>
                <div className="service-icon-wrapper">
                  <Card.Img
                    variant="top"
                    src={service.image}
                    className="service-icon"
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default ServicesComponent;
