import React from 'react';
import { Button } from 'react-bootstrap';
import './Section6.scss';

const Banner = () => {
  return (
    <div className="banner py-4 py-md-5 p-lg-5 w-100 d-flex justify-content-center">
      <div style={{maxWidth: "60rem"}} className='row w-100 d-flex justify-content-between'>
      <div className="banner-text col-12 col-md-8 pb-3 pb-md-0">
        <h2>Need guidance? Let us help you.</h2>
      </div>
      <div className="col-12 col-md-4">
      <Button variant="outline-light" className="enquire-button">Enquire Now</Button>
      </div>
      </div>
    </div>
  );
};

export default Banner;
