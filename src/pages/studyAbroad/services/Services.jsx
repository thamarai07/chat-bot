// ServicesComponent.js
import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { STUDY_ABROAD_SERVICES } from "constants/dbConstants";
import { getDocumentsData } from "../../../databaseConfig/dbConfig";
import "./Services.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { SERVICES } from "../constants";

const ServicesComponent = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    try {
      getDocumentsData(STUDY_ABROAD_SERVICES).then((resp) => {
        setServices(resp);
      });
    } catch {
      console.log("Error");
    }
  }, []);

  const handleClick = (e, title, id) => {
    e.stopPropagation();
    navigate(`/studyAbroad/${id}`, {
      state: { ...state, [id]: title, typeId: SERVICES },
    });
  };

  return (
    <Container
      className="services-section p-3 py-5 py-lg-5 p-lg-3"
      id="services"
    >
      <div className="m-2 m-md-4 mt-lg-4">
        <h2 className="services-title">Services</h2>
        <Row className="mt-5">
          {services.map((service, index) => (
            <Col
              key={index}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              className="p-0 d-flex"
            >
              <Card className="service-card my-4 flex-fill py-3">
                <div className="service-icon-wrapper">
                  <Card.Img
                    variant="top"
                    src={service.cardIcon}
                    className="service-icon"
                  />
                </div>
                <Card.Body className="p-0">
                  <Card.Title className="service-title">
                    {service.title}
                  </Card.Title>
                  <Card.Text className="service-description">
                    {service.summary}
                  </Card.Text>
                </Card.Body>
                <Button
                  className="service-button my-4"
                  onClick={(e) =>
                    handleClick(e, service.title, service.detailsId)
                  }
                >
                  <span className="color-text">Know more</span>
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default ServicesComponent;
