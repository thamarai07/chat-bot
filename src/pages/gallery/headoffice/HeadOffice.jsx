import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import map from '../assets/map.png';
import call from '../assets/call.png';
import mail from '../assets/mail.png';
import "./HeadOffice.scss";

const HeadOffice = ({ data = {} }) => {
  const { address, email, phoneNumber } = data;
  return (
    <Container className="head-office-container py-5">
      <h2 className="head-office-title">Head Office</h2>
      <Row className="p-0 m-0 mt-5">
        <Col md={6} className="contact-info p-0 m-0 px-0 px-md-1 px-lg-0">
          <div className="contact-item">
            <div className="icon-container">
            <img src={call} className="contact-icon" alt="phon number"/>
            </div>
            <span>{phoneNumber}</span>
          </div>
          <div className="contact-item">
          <div className="icon-container">
            <img src={mail} className="contact-icon" alt="email"/>
            </div>
            <span>{email}</span>
          </div>
          <div className="contact-item">
          <div className="icon-container">
            <img className="contact-icon" src={map} alt="address"/>
            </div>
            <span>{address}</span>
          </div>
        </Col>

        {/* Map Section */}
        <Col md={6} className="map-section m-0 p-0">
          <div className="google-map-code">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d237.84448131400077!2d78.39439972118626!3d17.48307028642981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91befb2b2b7b%3A0xb78a4a3f153bab02!2sBDR%20Residency!5e0!3m2!1sen!2sin!4v1702892645119!5m2!1sen!2sin"
              style={{ width:"100%",height: "100%", padding:"10px"}}
              title="NTS-NybbleTechnosoft"
              allowfullscreen={false}
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HeadOffice;
