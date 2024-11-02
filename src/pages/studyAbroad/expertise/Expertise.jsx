import React, { useEffect, useState } from "react";
import "./Expertise.scss";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { STUDY_ABROAD_EXPERTISE } from "constants/dbConstants";
import { getDocumentsData } from "../../../databaseConfig/dbConfig";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { EXPERTISE } from "../constants";

function AboutNTS() {
  const [expertise, setExpertise] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    try {
      getDocumentsData(STUDY_ABROAD_EXPERTISE).then((resp) => {
        setExpertise(resp);
      });
    } catch {
      console.log("Error");
    }
  }, []);

  const handleClick = (e, title, id) => {
    e.stopPropagation();
    navigate(`/studyAbroad/${id}`, {
      state: { ...state, [id]: title, typeId: EXPERTISE },
    });
  };

  return (
    <Container className="about-nts p-3 py-5 py-lg-5 p-lg-3" id="expertise">
      <div className="m-0 m-md-3 mt-lg-4">
        <h2 className="section-title">About NTS and Their Expertise</h2>
        <Row className="mt-5">
          {expertise
            .sort(function (a, b) {
              return a.order - b.order;
            })
            .map((card, index) => (
              <Col key={index} xs={12} sm={12} md={6} lg={4} className="d-flex">
                <Card className="custom-card mb-4 flex-fill">
                  <div className="service-icon-wrapper">
                    <Card.Img
                      variant="top"
                      src={card.cardIcon}
                      className="exprtise-icon"
                    />
                  </div>
                  <Card.Body className="p-0 my-3 mb-4">
                    <Card.Title className="my-3">{card.title}</Card.Title>
                    <Card.Text>{card.summary}</Card.Text>
                  </Card.Body>
                  <Button variant="primary" className="learn-more" onClick={(e)=>handleClick(e, card.title, card.detailsId)}>
                    Learn More
                    <KeyboardArrowRightOutlinedIcon className="right-arrow" />
                  </Button>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </Container>
  );
}

export default AboutNTS;
