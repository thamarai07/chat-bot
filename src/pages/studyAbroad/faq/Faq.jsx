import React, { useEffect, useState } from "react";
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';
import { STUDY_ABROAD_FAQ } from "constants/dbConstants";
import { getDocumentsData } from "../../../databaseConfig/dbConfig";
import './Faq.scss';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div className="card-header" onClick={decoratedOnClick}>
      {children}
    </div>
  );
}

function Faq() {
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    try {
      getDocumentsData(STUDY_ABROAD_FAQ).then((resp) => {
        setFaqs(resp);
      });
    } catch {
      console.log("Error");
    }
  }, []);
  return (
    <div className="faq-container m-2 p-2 p-md-4" id="faq">
      <h2 className="section-title">
        Frequently asked questions? <div className="highlight"></div>
      </h2>
      <Accordion>
        {faqs.map((each, index) => (
          <Card key={each.id}>
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
  );
}

export default Faq;
