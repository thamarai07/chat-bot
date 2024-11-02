import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./Office.scss";

const Office = ({ data = {}, setShowGridModal, setGalleryType}) => {
  const { card = [], title } = data;
  return (
    <Container
      className="office-services-section p-3 py-5 py-lg-5 p-lg-3"
    >
      <div className="m-2 m-md-4 mt-lg-4" style={{maxWidth: "65rem"}}>
        <h2 className="services-title">{title}</h2>
        <Row className="mt-5">
          {card.map((service, index) => (
            <Col
              key={index}
              xs={12}
              sm={12}
              md={4}
              className="p-0 d-flex"
            >
              <Card className="service-card m-0 flex-fill p-0 mx-md-3 mb-4" 
              // onClick={()=> {
              //     setShowGridModal(true);
              //     setGalleryType({ title: service?.title || title, type:service?.type });
              //   }}
                >
                <Card.Body className="p-4">
                  <Card.Title className="service-title p-0 m-0 pb-1">
                    {service.title}
                  </Card.Title>
                  <Card.Text className="service-description p-0">
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

export default Office;
