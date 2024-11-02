import React from "react";
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';
import './Section5.scss';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div className="card-header" onClick={decoratedOnClick}>
      {children}
    </div>
  );
}

function Section5({data ={}}) {
    const { qa=[], title } = data
  return (
    <div className="faq-container m-2 p-2 p-sm-4 m-md-3 m-lg-4 m-xl-5 p-md-4 mt-5 mt-md-4" id="faq">
      <h2 className="section-title text-center">
        {title}
      </h2>
      <div className="w-100 d-flex justify-content-center">
      <div style={{width:"80rem"}}>
      <Accordion>
        {qa.map((each, index) => (
          <Card key={index}>
            <CustomToggle eventKey={`${index}`}>{each.quetion}</CustomToggle>
            <Accordion.Collapse eventKey={`${index}`}>
              <Card.Body>
                {each.answer || "Still working..."}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
      </div>
      </div>
    </div>
  );
}

export default Section5;
