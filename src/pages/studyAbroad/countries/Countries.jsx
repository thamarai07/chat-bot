// CountriesComponent.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { STUDY_ABROAD_COUNTRIES } from "constants/dbConstants";
import { useLocation, useNavigate } from "react-router-dom";
import { getDocumentsData } from "../../../databaseConfig/dbConfig";
import "./Countries.scss";
import { COUNTRY } from "../constants";

const CountriesComponent = () => {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    try {
      getDocumentsData(STUDY_ABROAD_COUNTRIES).then((resp) => {
        setCountries(resp);
      });
    } catch {
      console.log("Error");
    }
  }, []);

  const handleClick = (e, title, id) => {
    e.stopPropagation();
    navigate(`/studyAbroad/${id}`, {
      state: { ...state, [id]: title, typeId: COUNTRY },
    });
  };

  return (
    <Container className="countries-section p-3 py-5 py-lg-5 p-lg-3" id="countries">
      <div className="m-0 m-md-3 mt-lg-4">
        <div className="d-flex flex-column align-items-start title-container">
          <h2 className="section-title">Countries</h2>
          <p className="section-subtitle">Bridging Dreams with Destinations</p>
          <div className="underline"></div>
        </div>
        <Row className="mt-5">
          {countries.map((country, index) => (
            <Col
              key={index}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              className="d-flex"
            >
              <Card className="country-card mb-4 flex-fill" onClick={(e) =>
                    handleClick(e, country.name, country.detailsId)
                  }>
                <Card.Img
                  src={country.image}
                  alt={country.name}
                  className="country-image"
                />
                <div className="overlay">
                  <div className="country-name">{country.name}</div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default CountriesComponent;
