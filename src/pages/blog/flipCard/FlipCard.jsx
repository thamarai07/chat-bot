import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './FlipCard.scss';

const FlipCard = ({ data = [] }) => {
  const [flipped, setFlipped] = useState(Array(data.length).fill(false));

  const handleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  return (
    <Row className="flip-card-container">
      {data.map((card, index) => (
        <Col md={3} lg={3} key={index} className="mb-3">
          <div
            className={`flip-card ${flipped[index] ? 'flipped' : ''}`}
            onClick={() => handleFlip(index)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={card.frontCard} alt={`Front ${index}`} className="card-image" />
              </div>
              <div className="flip-card-back">
                <img src={card.backCard} alt={`Back ${index}`} className="card-image" />
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default FlipCard;
